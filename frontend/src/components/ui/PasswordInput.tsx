"use client";

import React, { useState, useEffect } from "react";
import { TextInput } from "./TextInput";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showRequirements?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = "Password", error, showRequirements = true, value = "", onChange, ...props }, ref) => {
    const [password, setPassword] = useState(String(value));

    useEffect(() => {
      setPassword(String(value));
    }, [value]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (onChange) onChange(e);
    };

    // Requirement validations
    const reqs = {
      length: password.length >= 10,
      number: /[0-9]/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
    };

    return (
      <div className="flex flex-col w-full gap-2">
        <TextInput
          ref={ref}
          type="password"
          label={label}
          error={error}
          value={value}
          onChange={handlePasswordChange}
          {...props}
        />

        {showRequirements && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mt-1 px-1">
            <div className="flex items-center gap-1.5 text-xs">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  reqs.length ? "bg-status-green" : "bg-gray-medium"
                }`}
              />
              <span className={reqs.length ? "text-status-green" : "text-gray-medium"}>
                A minimum of 10 characters
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  reqs.lowercase ? "bg-status-green" : "bg-gray-medium"
                }`}
              />
              <span className={reqs.lowercase ? "text-status-green" : "text-gray-medium"}>
                At least one lowercase letter
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  reqs.number ? "bg-status-green" : "bg-gray-medium"
                }`}
              />
              <span className={reqs.number ? "text-status-green" : "text-gray-medium"}>
                At least one number
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  reqs.uppercase ? "bg-status-green" : "bg-gray-medium"
                }`}
              />
              <span className={reqs.uppercase ? "text-status-green" : "text-gray-medium"}>
                At least one uppercase letter
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
