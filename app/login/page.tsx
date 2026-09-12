"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type AuthMode = "sign-in" | "sign-up" | "recovery";

function formatAuthError(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("invalid login credentials")) {
    return "Invalid credentials. Check your email and password and try again.";
  }

  if (normalizedMessage.includes("password") && normalizedMessage.includes("6")) {
    return "Password must be at least 6 characters.";
  }

  return message;
}

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const switchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    setPassword("");
    clearMessages();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    clearMessages();
    setIsLoading(true);
    let isRedirecting = false;

    try {
      if (authMode === "sign-in") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(formatAuthError(error.message));
          return;
        }

        if (data.session) {
          isRedirecting = true;
          router.refresh();
          window.setTimeout(() => router.push("/dashboard"), 100);
          return;
        }

        setErrorMessage("Sign in did not create a session. Please try again.");
        return;
      }

      if (authMode === "sign-up") {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
        });

        if (error) {
          setErrorMessage(formatAuthError(error.message));
          return;
        }

        router.push(`/verify-and-set-password?email=${encodeURIComponent(email.trim())}`);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/verify-and-set-password`,
      });

      if (error) {
        setErrorMessage(formatAuthError(error.message));
        return;
      }

      setSuccessMessage("Check your email for a password reset link.");
    } catch (error) {
      console.error("Authentication error:", error);
      setErrorMessage("We could not complete that request. Please try again.");
    } finally {
      if (!isRedirecting) setIsLoading(false);
    }
  };

  const isPasswordMode = authMode === "sign-in";
  const isRecoveryMode = authMode === "recovery";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex min-h-screen w-full bg-slate-50"
    >
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-slate-900 relative overflow-hidden p-12 text-white">
        <div className="relative z-10 flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold tracking-tight">Campus Connect</span>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center max-w-md mx-auto space-y-6">
          <div className="p-4 bg-slate-800/50 rounded-2xl ring-1 ring-white/10">
            <Orbit className="h-16 w-16 text-blue-400" />
          </div>
          <div className="space-y-4">
            <h1 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight">Welcome back</h1>
            <p className="text-slate-300 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
              One secure sign-in for your classes, campus workflows, and academic progress.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex space-x-2">
          <div className="h-1.5 w-6 bg-white rounded-full" />
          <div className="h-1.5 w-1.5 bg-white/30 rounded-full" />
          <div className="h-1.5 w-1.5 bg-white/30 rounded-full" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        <div className="lg:hidden flex items-center space-x-2 mb-8 absolute top-8 left-6 sm:left-12">
          <GraduationCap className="h-6 w-6 text-slate-900" />
          <span className="text-lg font-bold text-slate-900">Campus Connect</span>
        </div>

        <div className="w-full max-w-[400px] flex flex-col space-y-6 mt-12 lg:mt-0">
          <div className="space-y-2">
            <h2 className="font-extrabold text-2xl text-slate-950 tracking-tight">
              {isRecoveryMode ? "Set your password" : isPasswordMode ? "Sign in" : "Create your account"}
            </h2>
            <p className="text-sm text-slate-500">
              {isRecoveryMode
                ? "Enter your email and we will send a secure password reset link."
                : isPasswordMode
                  ? "Use your Campus Connect email and password."
                  : "Verify your email first, then create a password."}
            </p>
          </div>

          {!isRecoveryMode && (
            <div className="flex bg-slate-100 p-1 rounded-md" role="tablist" aria-label="Authentication mode">
              <button
                type="button"
                role="tab"
                aria-selected={isPasswordMode}
                onClick={() => switchMode("sign-in")}
                className={`flex-1 text-sm font-semibold py-2 rounded-sm transition-colors ${isPasswordMode ? "bg-white shadow-sm text-slate-950 border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!isPasswordMode}
                onClick={() => switchMode("sign-up")}
                className={`flex-1 text-sm font-semibold py-2 rounded-sm transition-colors ${!isPasswordMode ? "bg-white shadow-sm text-slate-950 border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
              >
                Sign Up
              </button>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="bg-white border border-slate-200 rounded-md focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900 h-11"
                autoComplete="email"
                required
                disabled={isLoading}
              />
            </div>

            {isPasswordMode && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold text-slate-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="bg-white border border-slate-200 rounded-md focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900 h-11"
                  autoComplete="current-password"
                  minLength={6}
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-800 text-white h-11 font-semibold shadow-sm transition-colors"
              disabled={isLoading || !email.trim() || (isPasswordMode && !password)}
            >
              {isLoading ? "Working..." : isRecoveryMode ? "Send reset link" : isPasswordMode ? "Sign in" : "Continue with email"}
            </Button>
          </form>

          {isPasswordMode && (
            <button
              type="button"
              onClick={() => switchMode("recovery")}
              className="text-sm text-slate-500 hover:text-slate-950 font-medium transition-colors cursor-pointer hover:underline"
            >
              Forgot or need to set your password?
            </button>
          )}

          {isRecoveryMode && (
            <button
              type="button"
              onClick={() => switchMode("sign-in")}
              className="text-sm text-slate-500 hover:text-slate-950 font-medium transition-colors cursor-pointer hover:underline"
            >
              Back to sign in
            </button>
          )}

          {errorMessage && <p className="text-red-600 text-sm font-medium text-center" role="alert">{errorMessage}</p>}
          {successMessage && <p className="text-emerald-600 text-sm font-medium text-center" role="status">{successMessage}</p>}
        </div>
      </div>
    </motion.div>
  );
}
