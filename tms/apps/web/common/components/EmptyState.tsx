"use client";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EmptyStateProps {
  message?: string;
  icon?: typeof faExclamationTriangle;
  className?: string;
}

export function EmptyState({ 
  message = "データがありません", 
  icon = faExclamationTriangle,
  className = "" 
}: EmptyStateProps) {
  return (
    <div className={`text-center py-4 ${className}`}>
      <FontAwesomeIcon icon={icon} className="text-gray-500 mb-2" />
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}
