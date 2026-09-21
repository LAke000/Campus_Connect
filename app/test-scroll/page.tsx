'use client';

import { ScrollContainer } from '@/components/ScrollContainer';

export default function TestScrollPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Scroll Container Test</h1>
        <p className="text-center text-gray-600 mb-8">
          Scroll to the top or bottom to see the iOS-like rubber band effect
        </p>
        
        <ScrollContainer className="h-[500px] border-2 border-dashed border-gray-300 rounded-lg">
          <div className="h-[1000px] bg-gradient-to-b from-blue-50 to purple-50">
            <div className="flex items-center justify-center h-full space-y-6">
              <h2 className="text-2xl font-bold text-blue-600">Scrollable Content Area</h2>
              <p className="text-center text-gray-600 max-w-xl">
                Try scrolling past the top or bottom edge to experience the fluid rubber band overscroll animation.
                The animation uses iOS-inspired physics with asymptotic resistance and velocity-based snapback
                for a buttery smooth, native-like feel.
              </p>
              
              {/* Add some visual markers */}
              <div className="space-y-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-2">
                  <h3 className="font-semibold mb-1">Top Edge</h3>
                  <p className="text-sm text-gray-500">Scroll up from here to see top rubber band</p>
                </div>
                
                <div className="h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg"></div>
                
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-2">
                  <h3 className="font-semibold mb-1">Bottom Edge</h3>
                  <p className="text-sm text-gray-500">Scroll down from here to see bottom rubber band</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
}