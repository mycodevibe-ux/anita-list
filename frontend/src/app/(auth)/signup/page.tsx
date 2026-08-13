"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { TextInput } from "@/components/ui/TextInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    secondaryEmail: "",
    password: "",
    acceptTerms: false,
  });

  const [signupSettings, setSignupSettings] = useState({
    image: "/images/signup-banner.png",
    badge: "JOIN ANITA'S LIST",
    title: "Create an account to start curating your baby lists.",
    buttonText: "Create account",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/site-settings');
        if (res.data) {
          const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://anita-list-backend-production.up.railway.app/api';
          const storageUrl = apiBase.replace(/\/api\/?$/, '') + '/storage/';
          setSignupSettings({
            image: res.data.signup_image ? `${storageUrl}${res.data.signup_image}` : "/images/signup-banner.png",
            badge: res.data.signup_badge || "JOIN ANITA'S LIST",
            title: res.data.signup_title || "Create an account to start curating your baby lists.",
            buttonText: res.data.signup_button_text || "Create account",
          });
        }
      } catch (e) {
        console.error("Failed to load signup image settings", e);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
    if (errors.password) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.password;
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (formData.secondaryEmail && !/\S+@\S+\.\S+/.test(formData.secondaryEmail)) {
      newErrors.secondaryEmail = "Invalid email format";
    }

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 10) newErrors.password = "Password must be at least 10 characters";
    else if (!/[0-9]/.test(formData.password)) newErrors.password = "Password must contain a number";
    else if (!/[a-z]/.test(formData.password)) newErrors.password = "Password must contain a lowercase letter";
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = "Password must contain an uppercase letter";

    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await api.post('/register', {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
      });
      
      login(response.data.access_token, response.data.user);
      router.push("/hub");
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors({ email: error.response.data.message });
      } else {
        setErrors({ email: "Registration failed. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout imageUrl={signupSettings.image}>
      <div className="flex flex-col gap-6">
        {/* Title area */}
        <div className="text-center">
          <span className="block font-sans text-xs font-semibold tracking-[0.15em] text-brown-dark/70 uppercase mb-2">
            {signupSettings.badge}
          </span>
          <h2 className="font-accent italic text-2xl md:text-3xl text-brown-dark font-normal">
            {signupSettings.title}
          </h2>
        </div>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            name="firstName"
            label="First name"
            placeholder="Jane"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            disabled={isLoading}
          />

          <TextInput
            name="lastName"
            label="Last name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            disabled={isLoading}
          />

          <TextInput
            name="email"
            type="email"
            label="Email"
            placeholder="jane.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
          />

          <TextInput
            name="secondaryEmail"
            type="email"
            label="Secondary Email (Optional)"
            placeholder="partner@example.com"
            value={formData.secondaryEmail}
            onChange={handleChange}
            error={errors.secondaryEmail}
            disabled={isLoading}
          />

          <PasswordInput
            name="password"
            label="Password"
            value={formData.password}
            onChange={handlePasswordChange}
            error={errors.password}
            disabled={isLoading}
          />

          <Checkbox
            name="acceptTerms"
            label={
              <>
                By clicking the submit button, I declare that I have read the{" "}
                <a href="/terms-of-service" className="underline hover:text-text-dark font-semibold">
                  Terms of service
                </a>{" "}
                and accept the{" "}
                <a href="/privacy-policy" className="underline hover:text-text-dark font-semibold">
                  Privacy Policy
                </a>
              </>
            }
            checked={formData.acceptTerms}
            onChange={handleChange}
            error={errors.acceptTerms}
            disabled={isLoading}
          />

          <Button type="submit" variant="coral" rounded="md" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Creating account..." : signupSettings.buttonText}
          </Button>
        </form>

        {/* Link to login page */}
        <div className="text-center text-xs font-sans text-gray-medium">
          Already have an account?{" "}
          <Link href="/login" className="underline font-semibold hover:text-text-dark transition-colors">
            Log in.
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
