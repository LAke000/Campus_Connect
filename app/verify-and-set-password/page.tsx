"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

function formatAuthError(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("expired") || normalizedMessage.includes("invalid")) {
    return "This code has already been used or expired. Please request a new one.";
  }

  if (normalizedMessage.includes("password") && normalizedMessage.includes("6")) {
    return "Password must be at least 6 characters.";
  }

  return message;
}

export default function VerifyAndSetPasswordPage() {
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("email") ?? "";
  });
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordStep, setIsPasswordStep] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setIsPasswordStep(true);
      setIsLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") && session) {
        setIsPasswordStep(true);
        setIsLoading(false);
      }
    });

    checkExistingSession();
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleVerifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || otpCode.length !== 6 || !email.trim()) return;

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otpCode,
        type: "email",
      });

      if (error) {
        setErrorMessage(formatAuthError(error.message));
        return;
      }

      if (!data.session) {
        setErrorMessage("Verification did not create a session. Please request a new code.");
        return;
      }

      setOtpCode("");
      setSuccessMessage("Email verified. Create a password to finish your account.");
      setIsPasswordStep(true);
    } catch (error) {
      console.error("OTP verification error:", error);
      setErrorMessage("We could not verify that code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setErrorMessage(formatAuthError(error.message));
        return;
      }

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        setErrorMessage("Your password was saved, but we could not load your profile.");
        return;
      }

      const metadata = userData.user.user_metadata ?? {};
      const registrationNumber = metadata.reg_no ?? metadata.registration_number;
      setSuccessMessage("Password created. Redirecting...");
      router.push(registrationNumber ? "/dashboard" : "/onboarding");
    } catch (error) {
      console.error("Password update error:", error);
      setErrorMessage("We could not save your password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section className="w-full max-w-[420px] space-y-7 rounded-xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-950">
            <GraduationCap className="size-7" />
            <span className="text-lg font-bold tracking-tight">Campus Connect</span>
          </div>
          <div className="flex size-11 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
            <KeyRound className="size-5" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">
              {isPasswordStep ? "Create Your Password" : "Verify your email"}
            </h1>
            <p className="text-sm leading-relaxed text-slate-500">
              {isPasswordStep
                ? "Use at least 6 characters. This password will be used for future sign-ins."
                : "Enter the 6-digit code sent to your email to continue."}
            </p>
          </div>
        </div>

        {!isPasswordStep ? (
          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                disabled={isLoading}
                className="h-11 border-slate-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-xs font-semibold text-slate-700">6-digit code</Label>
              <Input
                id="otp"
                inputMode="numeric"
                value={otpCode}
                onChange={(event) => setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                autoFocus
                required
                disabled={isLoading}
                className="h-14 border-slate-200 bg-white text-center font-mono text-2xl font-bold tracking-[1em]"
              />
            </div>
            <Button type="submit" disabled={isLoading || otpCode.length !== 6} className="h-11 w-full bg-slate-950 font-semibold text-white hover:bg-slate-800">
              {isLoading ? "Verifying..." : "Verify email"}
            </Button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSetPassword}>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-xs font-semibold text-slate-700">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
                disabled={isLoading}
                className="h-11 border-slate-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-xs font-semibold text-slate-700">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
                disabled={isLoading}
                className="h-11 border-slate-200 bg-white"
              />
            </div>
            <Button type="submit" disabled={isLoading || !newPassword || !confirmPassword} className="h-11 w-full bg-slate-950 font-semibold text-white hover:bg-slate-800">
              {isLoading ? "Saving password..." : "Create password"}
            </Button>
          </form>
        )}

        {errorMessage && <p className="text-center text-sm font-medium text-red-600" role="alert">{errorMessage}</p>}
        {successMessage && <p className="text-center text-sm font-medium text-emerald-600" role="status">{successMessage}</p>}
      </section>
    </main>
  );
}
