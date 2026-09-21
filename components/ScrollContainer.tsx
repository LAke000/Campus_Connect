"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useMotionValue, animate, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export interface ScrollContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  maxStretch?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
    bounce?: number;
  };
}

/**
 * Performance-optimized rubber-band overscroll container.
 *
 * Architecture:
 * - Zero React state during gestures. Pure MotionValue & GPU styling.
 * - Raw PointerEvents: Ensures instantaneous, zero-threshold drag capture.
 * - iOS Asymptotic Math: Tracks pointer start bounds to map stretch cleanly via stretch = c * x / (c + x).
 */
export function ScrollContainer({
  children,
  className,
  contentClassName,
  maxStretch = 150,
  springConfig = {
    stiffness: 350,
    damping: 32,
    mass: 0.8,
  },
  ...props
}: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overscrollY = useMotionValue(0);
  const activeAnimationRef = useRef<{ stop: () => void } | null>(null);
  const wheelIdleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Pointer Gesture Mutable State ──
  const isDraggingRef = useRef(false);
  const isPullingRef = useRef(false);
  const isPullingAtTopRef = useRef(false);
  const isPullingAtBottomRef = useRef(false);
  const startYRef = useRef(0);
  const rawPullOffsetRef = useRef(0);

  const CONSTANT = 700;
  const MAX_STRETCH = maxStretch;

  const springTransition: Transition = {
    type: "spring",
    stiffness: springConfig.stiffness ?? 350,
    damping: springConfig.damping ?? 32,
    mass: springConfig.mass ?? 0.8,
  };

  const stopActiveAnimation = useCallback(() => {
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
      activeAnimationRef.current = null;
    }
    overscrollY.stop();
  }, [overscrollY]);

  const snapBack = useCallback(() => {
    stopActiveAnimation();
    isPullingRef.current = false;
    
    // Pass instantaneous momentum velocity to the spring for a buttery fluid handoff!
    activeAnimationRef.current = animate(overscrollY, 0, {
      ...springTransition,
      velocity: overscrollY.getVelocity(),
      onComplete: () => {
        activeAnimationRef.current = null;
      },
    });
  }, [overscrollY, springTransition, stopActiveAnimation]);

  // ── Authentic iOS Asymptotic Math ──
  const mappedRubberBand = useCallback(
    (rawDelta: number) => {
      const absRaw = Math.abs(rawDelta);
      const mapped = (CONSTANT * absRaw) / (CONSTANT + absRaw);
      const capped = Math.min(mapped, MAX_STRETCH);
      return rawDelta > 0 ? capped : -capped;
    },
    []
  );

  const reverseMapRubberBand = useCallback(
    (visualY: number) => {
      if (visualY === 0) return 0;
      const absY = Math.abs(visualY);
      if (absY >= MAX_STRETCH) return visualY > 0 ? 10000 : -10000;
      const raw = (CONSTANT * absY) / (CONSTANT - absY);
      return visualY > 0 ? raw : -raw;
    },
    []
  );

  // ── Raw Pointer Events Listener ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerDown = (e: PointerEvent) => {
      stopActiveAnimation();
      if (wheelIdleTimeoutRef.current) clearTimeout(wheelIdleTimeoutRef.current);
      
      isDraggingRef.current = true;
      const currentY = overscrollY.get();
      isPullingRef.current = currentY !== 0; 
      
      // Attempt to guess which boundary if mid-air
      if (currentY > 0) isPullingAtTopRef.current = true;
      else if (currentY < 0) isPullingAtBottomRef.current = true;

      startYRef.current = e.clientY;
      rawPullOffsetRef.current = reverseMapRubberBand(currentY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const currentY = e.clientY;
      const activeY = overscrollY.get();

      // If already bouncing or actively pulling, skip ALL layout reads
      if (activeY !== 0 || isPullingRef.current) {
        const rawDelta = currentY - startYRef.current;
        const totalRaw = rawPullOffsetRef.current + rawDelta;
        
        // If they crossed back to 0, release back to native scrolling!
        if ((isPullingAtTopRef.current && totalRaw <= 0) || (isPullingAtBottomRef.current && totalRaw >= 0)) {
           overscrollY.set(0);
           isPullingRef.current = false;
           isPullingAtTopRef.current = false;
           isPullingAtBottomRef.current = false;
           return;
        }

        overscrollY.set(mappedRubberBand(totalRaw));
        return;
      }

      // At rest (activeY === 0): Need 1 layout read to see if we hit the actual boundary
      const { scrollTop, scrollHeight, clientHeight } = container;
      const maxScroll = Math.max(0, scrollHeight - clientHeight);
      
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop >= maxScroll - 1;

      if (atTop || atBottom) {
        // We just hit the edge THIS FRAME. Anchor startY.
        isPullingRef.current = true;
        isPullingAtTopRef.current = atTop;
        isPullingAtBottomRef.current = atBottom;
        startYRef.current = currentY;
        rawPullOffsetRef.current = 0; // Fresh tug from exact 0

        const rawDelta = currentY - startYRef.current;
        
        // Prevent pushing the wrong way (e.g., pushing up at top)
        if ((atTop && rawDelta <= 0) || (atBottom && rawDelta >= 0)) {
           isPullingRef.current = false;
           isPullingAtTopRef.current = false;
           isPullingAtBottomRef.current = false;
        } else {
           overscrollY.set(mappedRubberBand(rawDelta));
        }
      }
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      isPullingRef.current = false;
      isPullingAtTopRef.current = false;
      isPullingAtBottomRef.current = false;
      snapBack();
    };

    const handleWheel = (e: WheelEvent) => {
      stopActiveAnimation();

      const activeY = overscrollY.get();

      // Skip layout reads during active overscroll float
      if (activeY !== 0) {
        const raw = reverseMapRubberBand(activeY);
        const totalRaw = raw - e.deltaY;
        
        const isTop = activeY > 0;
        if ((isTop && totalRaw <= 0) || (!isTop && totalRaw >= 0)) {
           overscrollY.set(0);
        } else {
           overscrollY.set(mappedRubberBand(totalRaw));
        }

        if (wheelIdleTimeoutRef.current) clearTimeout(wheelIdleTimeoutRef.current);
        wheelIdleTimeoutRef.current = setTimeout(() => snapBack(), 15);
        return;
      }

      // At rest: single layout read
      const { scrollTop, scrollHeight, clientHeight } = container;
      const maxScroll = Math.max(0, scrollHeight - clientHeight);
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop >= maxScroll - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        const totalRaw = -e.deltaY;
        overscrollY.set(mappedRubberBand(totalRaw));

        if (wheelIdleTimeoutRef.current) clearTimeout(wheelIdleTimeoutRef.current);
        wheelIdleTimeoutRef.current = setTimeout(() => snapBack(), 15);
      }
    };

    container.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      container.removeEventListener("wheel", handleWheel);
      if (wheelIdleTimeoutRef.current) clearTimeout(wheelIdleTimeoutRef.current);
    };
  }, [mappedRubberBand, reverseMapRubberBand, snapBack, stopActiveAnimation, overscrollY]);

  // ── Fix for Route Change Rendering Bug ──
  // Resets overscroll state and forces repaint on route changes
  const pathname = usePathname();
  useEffect(() => {
    // Reset the scroll position to eliminate visual freezing on route changes
    overscrollY.set(0);
    
    // Force a repaint to ensure new content renders immediately
    // This triggers a layout reflow which forces the browser to paint
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);
    
    // Force DOM reflow by reading a layout property
    void document.body.offsetHeight;
  }, [pathname, overscrollY]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-y-auto overscroll-y-none [touch-action:pan-y]",
        className
      )}
      {...props}
    >
      <motion.div
        style={{
          y: overscrollY,
          willChange: "transform",
        }}
        className={cn("w-full transform-gpu", contentClassName)}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ScrollContainer;
