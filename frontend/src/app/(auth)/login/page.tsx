"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { TextInput } from "@/components/ui/TextInput";
import { Button } from "@/components/ui/Button";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginSettings, setLoginSettings] = useState({
    image: "/images/signup-banner.png",
    badge: "WELCOME BACK TO ANITA'S LIST",
    title: "Sign in to access your curated lists & recommendations.",
    buttonText: "Sign in",
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
          setLoginSettings({
            image: res.data.login_image ? `${storageUrl}${res.data.login_image}` : "/images/signup-banner.png",
            badge: res.data.login_badge || "WELCOME BACK TO ANITA'S LIST",
            title: res.data.login_title || "Sign in to access your curated lists & recommendations.",
            buttonText: res.data.login_button_text || "Sign in",
          });
        }
      } catch (e) {
        console.error("Failed to load login image settings", e);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password,
      });
      
      login(response.data.access_token, response.data.user);
      router.push("/hub");
    } catch (error: any) {
      console.error("Login failed:", error);
      let errMsg = "Invalid email or password. Please check your credentials or create an account first.";
      if (error.response?.data?.errors?.email) {
        errMsg = Array.isArray(error.response.data.errors.email) 
          ? error.response.data.errors.email[0] 
          : error.response.data.errors.email;
      } else if (error.response?.data?.message) {
        errMsg = error.response.data.message;
      }
      setErrors({ email: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Login Handler for Master Admin & Regular User
  const handleQuickLogin = (email: string, name: string) => {
    login("quick_demo_token", {
      id: 1,
      name: name,
      email: email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    router.push("/hub");
  };

  return (
    <AuthLayout imageUrl={loginSettings.image}>
      <div className="flex flex-col gap-6">
        {/* Title area */}
        <div className="text-center">
          <span className="block font-sans text-xs font-semibold tracking-[0.15em] text-brown-dark/70 uppercase mb-2">
            {loginSettings.badge}
          </span>
          <h2 className="font-accent italic text-2xl md:text-3xl text-brown-dark font-normal">
            {loginSettings.title}
          </h2>
        </div>

        {/* Standard Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            name="email"
            type="email"
            label="Email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
          />

          <div className="flex flex-col gap-1 w-full">
            <TextInput
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={isLoading}
            />
            <Link
              href="/forgot-password"
              className="text-xs font-sans text-gray-medium hover:text-text-dark underline self-start mt-1 transition-colors"
            >
              Forgotten password?
            </Link>
          </div>

          <Button type="submit" variant="coral" rounded="md" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Signing in..." : loginSettings.buttonText}
          </Button>
        </form>

        {/* Link to signup page for new Regular Users */}
        <div className="text-center text-xs font-sans text-gray-medium">
          Don't have an account?{" "}
          <Link href="/signup" className="underline font-semibold hover:text-text-dark transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
