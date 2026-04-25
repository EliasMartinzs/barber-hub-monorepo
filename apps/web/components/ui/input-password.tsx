"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Input, InputProps } from "./input";

interface Props extends InputProps {
  value: string;
  onChange: (...event: any[]) => void;
}

export const InputPassword = ({ onChange, value, ...props }: Props) => {
  const [showPassword, setShowPassword] = useState<"password" | "text">(
    "password",
  );

  const handlePassowrd = () => {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="flex w-full items-center gap-x-2 relative">
      <Input value={value} onChange={onChange} type={showPassword} {...props} />

      <button
        onClick={handlePassowrd}
        className="absolute right-3"
        type="button"
      >
        {showPassword === "text" ? (
          <EyeClosed className="size-5" />
        ) : (
          <Eye className="size-5" />
        )}
      </button>
    </div>
  );
};
