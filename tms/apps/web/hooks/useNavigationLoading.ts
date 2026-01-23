"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useNavigationLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  useEffect(() => {
    // Reset loading when pathname changes (navigation complete)
    if (loadingPath && pathname === loadingPath) {
      setIsLoading(false);
      setLoadingPath(null);
    }
  }, [pathname, loadingPath]);

  const startLoading = (path: string) => {
    if (path !== pathname) {
      setLoadingPath(path);
      setIsLoading(true);
    }
  };

  return { isLoading, startLoading };
}
