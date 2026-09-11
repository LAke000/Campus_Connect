"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { GraduationCap, Mail, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState<'auth' | 'otp' | 'onboarding'>('auth');
  const [isLoginView, setIsLoginView] = useState(true);
  const [otpCode, setOtpCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<'Student' | 'Faculty'>('Student');
  const [fullName, setFullName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleAuthStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMessages();
    setIsSubmitting(true);

    try {
      const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: { role: selectedRole },
          shouldCreateUser: true,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsSubmitting(false);
        return;
      }

      setPendingEmail(email);
      setCurrentStep('otp');
      setCountdown(60);

    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Auth step error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    clearMessages();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: pendingEmail,
        options: {
          data: { role: selectedRole },
          shouldCreateUser: true,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setSuccessMessage("Code resent successfully!");
      setCountdown(60);
    } catch (err) {
      setErrorMessage("An unexpected error occurred while resending.");
      console.error("Resend error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpStep = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (isSubmitting || otpCode.length !== 6) return;

    clearMessages();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: pendingEmail,
        token: otpCode,
        type: 'email',
      });

      if (error) {
        if (error.message.includes('expired or is invalid')) {
          const { data: signupData, error: signupError } = await supabase.auth.verifyOtp({
            email: pendingEmail,
            token: otpCode,
            type: 'signup',
          });
          if (signupError) {
            setErrorMessage(signupError.message);
            setIsSubmitting(false);
            return;
          }
          if (signupData.session) {
            await supabase.auth.setSession(signupData.session);
            setCurrentStep('onboarding');
            setIsSubmitting(false);
            return;
          }
        }
        setErrorMessage(error.message);
        setIsSubmitting(false);
        return;
      }

      setCurrentStep('onboarding');
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("OTP step error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnboardingStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMessages();
    setIsSubmitting(true);

    try {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error || !userData.user) {
        setErrorMessage("Session expired. Please restart the login process.");
        setIsSubmitting(false);
        router.push('/login');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          registration_number: registrationNumber,
        },
      });

      if (updateError) {
        setErrorMessage(updateError.message);
        setIsSubmitting(false);
        return;
      }

      router.push('/');
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Onboarding step error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (currentStep === 'otp' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep, countdown]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
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
            <h1 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight">Welcome!</h1>
            <p className="text-slate-300 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
              Connecting minds, classes, and campus workflows into a single workspace.
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
          <AnimatePresence mode="wait">
            {currentStep === 'auth' && (
              <motion.div
                key="auth"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="space-y-6 w-full"
              >
                <div className="space-y-2">
                  <h2 className="font-extrabold text-2xl text-slate-950 tracking-tight">
                    {isLoginView ? "Log In" : "Create Account"}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {isLoginView ? "Enter your email to sign in to your account." : "Choose your role and enter your email to get started."}
                  </p>
                </div>

                {!isLoginView && (
                  <motion.div layout className="flex bg-slate-100 p-1 rounded-md">
                    {['Student', 'Faculty'].map((role) => (
                      <motion.button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role as 'Student' | 'Faculty')}
                        layout
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        className={`flex-1 text-xs font-semibold py-2 rounded-sm transition-all duration-300 ${selectedRole === role
                            ? "bg-white shadow-sm text-slate-950 border border-slate-200"
                            : "text-slate-500 hover:text-slate-900"
                          }`}
                      >
                        {role}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                <form className="space-y-4" onSubmit={handleAuthStep}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={selectedRole === 'Student' || isLoginView ? "student@college.edu" : "faculty@college.edu"}
                      className="bg-white border border-slate-200 rounded-md focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900 h-11"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-slate-950 hover:bg-slate-800 text-white h-11 font-semibold shadow-sm transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending code..." : "Continue"}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginView(!isLoginView);
                      clearMessages();
                    }}
                    className="text-sm text-slate-500 hover:text-slate-950 font-medium transition-colors cursor-pointer hover:underline outline-none"
                  >
                    {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="space-y-6 w-full"
              >
                <div className="space-y-2 mt-4">
                  <h2 className="font-extrabold text-2xl text-slate-950 tracking-tight">Check your email</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We sent a 6-digit verification code to{" "}
                    <span className="font-medium text-slate-950">{pendingEmail}</span>.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleOtpStep}>
                  <div className="space-y-2">
                    <Input
                      id="otp"
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center tracking-[1em] font-mono text-2xl font-bold bg-white border border-slate-200 rounded-md focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900 h-14 uppercase"
                      required
                      autoFocus
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleOtpStep}
                    className="w-full bg-slate-950 hover:bg-slate-800 text-white h-11 font-semibold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting || otpCode.length !== 6}
                  >
                    {isSubmitting ? "Verifying..." : "Verify Code"}
                  </Button>

                  <div className="text-center mt-6">
                    {countdown > 0 ? (
                      <span className="text-slate-500 text-sm font-medium">
                        Resend code in {countdown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-slate-950 font-semibold hover:underline text-sm transition-all"
                      >
                        Didn't receive it? Resend code
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}

            {currentStep === 'onboarding' && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="space-y-6 w-full"
              >
                <div className="space-y-2">
                  <h2 className="font-extrabold text-2xl text-slate-950 tracking-tight">Complete Your Profile</h2>
                  <p className="text-sm text-slate-500">
                    Add your full name and registration number to finish setting up your account.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleOnboardingStep}>
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-xs font-semibold text-slate-700">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-white border border-slate-200 rounded-md focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900 h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber" className="text-xs font-semibold text-slate-700">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      type="text"
                      placeholder="BTech CSE 2025123456"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className="bg-white border border-slate-200 rounded-md focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900 h-11"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-slate-950 hover:bg-slate-800 text-white h-11 font-semibold shadow-sm transition-colors"
                    disabled={isSubmitting || !fullName || !registrationNumber}
                  >
                    {isSubmitting ? "Setting up your account..." : "Complete Setup"}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {errorMessage && (
            <div className="text-red-600 text-sm font-medium text-center mt-3">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="text-emerald-600 text-sm font-medium text-center mt-3">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}