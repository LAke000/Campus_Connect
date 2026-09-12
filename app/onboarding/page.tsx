"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function OnboardingPage() {
  const [fullName, setFullName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/login");
      setIsLoading(false);
    });
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    setErrorMessage("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName.trim(),
          reg_no: registrationNumber.trim(),
          registration_number: registrationNumber.trim(),
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      setErrorMessage("We could not save your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">Loading your profile...</main>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section className="w-full max-w-[420px] space-y-7 rounded-xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-950">
            <GraduationCap className="size-7" />
            <span className="text-lg font-bold tracking-tight">Campus Connect</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Complete your profile</h1>
          <p className="text-sm leading-relaxed text-slate-500">Add the details your campus workspace uses to personalize your account.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="full-name" className="text-xs font-semibold text-slate-700">Full name</Label>
            <Input id="full-name" value={fullName} onChange={(event) => setFullName(event.target.value)} required disabled={isLoading} className="h-11 border-slate-200 bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registration-number" className="text-xs font-semibold text-slate-700">Registration number</Label>
            <Input id="registration-number" value={registrationNumber} onChange={(event) => setRegistrationNumber(event.target.value)} required disabled={isLoading} className="h-11 border-slate-200 bg-white" />
          </div>
          <Button type="submit" disabled={isLoading || !fullName.trim() || !registrationNumber.trim()} className="h-11 w-full bg-slate-950 font-semibold text-white hover:bg-slate-800">
            {isLoading ? "Saving profile..." : "Continue to Campus Connect"}
          </Button>
        </form>

        {errorMessage && <p className="text-center text-sm font-medium text-red-600" role="alert">{errorMessage}</p>}
      </section>
    </main>
  );
}
