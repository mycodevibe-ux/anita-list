"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import api from "@/lib/api";
import { TextInput } from "@/components/ui/TextInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [generatedCode, setGeneratedCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // STEP 1: Request 6-digit Reset Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Please enter a valid registered email address." });
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const res = await api.post("/forgot-password", { email });
      if (res.data?.reset_code) {
        setGeneratedCode(res.data.reset_code);
        setCode(res.data.reset_code); // Pre-fill for convenience
      }
      setSuccessMessage(res.data.message || "Verification code generated!");
      setStep(2);
    } catch (err: any) {
      console.error(err);
      const msg =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        "No account found with this email. Please check your email or sign up first.";
      setErrors({ email: msg });
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Verify Code and Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!code) newErrors.code = "Verification code is required.";
    if (!newPassword) newErrors.password = "New password is required.";
    else if (newPassword.length < 10) newErrors.password = "Password must be at least 10 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await api.post("/reset-password", {
        email,
        code,
        password: newPassword,
      });

      setSuccessMessage(res.data.message || "Password reset successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      const msg =
        err.response?.data?.errors?.code?.[0] ||
        err.response?.data?.errors?.password?.[0] ||
        err.response?.data?.message ||
        "Failed to reset password. Please check your verification code.";
      setErrors({ code: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout imageUrl="/images/signup-banner.png" imageAlt="Forgot Password">
      <div className="flex flex-col gap-6">
        {/* Title area */}
        <div className="text-center">
          <span className="block font-sans text-xs font-semibold tracking-[0.15em] text-brown-dark/70 uppercase mb-2">
            {step === 1 ? "RECOVER ACCOUNT" : "RESET PASSWORD"}
          </span>
          <h2 className="font-accent italic text-2xl md:text-3xl text-brown-dark font-normal">
            {step === 1 ? "Forgot your password?" : "Set your new password"}
          </h2>
          <p className="font-sans text-xs text-brown-dark/70 mt-2">
            {step === 1
              ? "Enter your registered email address to receive your password reset code."
              : `Enter the verification code and your new password for ${email}.`}
          </p>
        </div>

        {/* Success / Alert Banner */}
        {successMessage && (
          <div className="p-4 bg-[#8B9A6B]/20 border border-[#8B9A6B] text-[#2D1A14] text-xs rounded-none">
            <p className="font-bold mb-1">✅ {successMessage}</p>
            {generatedCode && step === 2 && (
              <p className="mt-1 font-mono text-sm bg-white p-2 border border-[#CEBFA7] text-center font-bold">
                Your Reset Code: <span className="text-[#C77065] text-base">{generatedCode}</span>
              </p>
            )}
          </div>
        )}

        {/* STEP 1 FORM */}
        {step === 1 && (
          <form onSubmit={handleRequestCode} className="flex flex-col gap-4">
            <TextInput
              name="email"
              type="email"
              label="Registered Email Address"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({});
              }}
              error={errors.email}
              disabled={isLoading}
            />

            <Button type="submit" variant="coral" rounded="md" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Generating Reset Code..." : "Get Reset Code"}
            </Button>
          </form>
        )}

        {/* STEP 2 FORM */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <TextInput
              name="code"
              type="text"
              label="6-Digit Reset Code"
              placeholder="e.g. 123456"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (errors.code) setErrors({});
              }}
              error={errors.code}
              disabled={isLoading}
            />

            <PasswordInput
              name="password"
              label="New Password"
              placeholder="Min 10 characters..."
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.password) setErrors({});
              }}
              error={errors.password}
              disabled={isLoading}
            />

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 border border-[#CEBFA7] text-[#2D1A14] text-xs font-bold uppercase tracking-wider bg-transparent hover:bg-[#CEBFA7]/20 transition-colors"
              >
                ← Back
              </button>

              <Button type="submit" variant="coral" rounded="md" className="w-2/3" disabled={isLoading}>
                {isLoading ? "Updating Password..." : "Reset Password"}
              </Button>
            </div>
          </form>
        )}

        {/* Return to Login link */}
        <div className="text-center text-xs font-sans text-gray-medium pt-2">
          Remembered your password?{" "}
          <Link href="/login" className="underline font-semibold hover:text-text-dark transition-colors">
            Return to Log in.
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
