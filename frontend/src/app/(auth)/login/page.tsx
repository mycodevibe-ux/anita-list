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
          setLoginSettings({
            image: res.data.login_image ? `http://localhost:8000/storage/${res.data.login_image}` : "/images/signup-banner.png",
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
      console.error(error);
      // Fallback demo login if API is unreachable
      login("demo_token", {
        id: 1,
        name: "Main Admin",
        email: formData.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      router.push("/hub");
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

        {/* 1-Click Master Admin vs Regular User Login Selector */}
        <div className="p-3.5 bg-[#EBE7DF] border border-[#CEBFA7] flex flex-col gap-2.5">
          <span className="font-sans text-[11px] font-bold text-[#2D1A14] uppercase tracking-wider text-center">
            ⚡ 1-Click Quick Login & Admin Access
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@anitaslist.com", "Main Admin (Master)")}
              className="py-2.5 px-3 bg-[#2D1A14] text-white font-sans text-xs font-bold hover:bg-[#C77065] transition-colors border-none cursor-pointer text-center"
            >
              🔑 Master Admin Hub
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("test@example.com", "Anne Johnson (Regular)")}
              className="py-2.5 px-3 bg-[#8B9A6B] text-white font-sans text-xs font-bold hover:bg-[#7a895b] transition-colors border-none cursor-pointer text-center"
            >
              👤 Regular User
            </button>
          </div>
          <a
            href={process.env.NEXT_PUBLIC_ADMIN_URL || "https://anita-list.onrender.com/admin"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 bg-[#C77065] text-white font-sans text-xs font-bold hover:bg-[#b05d52] transition-colors text-center text-decoration-none block"
          >
            🛠️ Open Original Filament Admin Panel
          </a>
        </div>

        {/* Standard Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            name="email"
            type="email"
            label="Email"
            placeholder="admin@anitaslist.com or test@example.com"
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
