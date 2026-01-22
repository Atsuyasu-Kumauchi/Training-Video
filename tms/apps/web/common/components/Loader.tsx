"use client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LoaderProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loader({ fullScreen = false, size = "md", className = "" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const spinner = (
    <div className={`flex items-center justify-center ${className}`}>
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className={`${sizeClasses[size]} text-primary-600`}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
}
