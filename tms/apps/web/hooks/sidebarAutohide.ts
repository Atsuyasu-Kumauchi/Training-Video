import { useSettings } from "@/tmsui/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SidebarAutohide() {
  const pathname = usePathname();
  const { setIsSidebarOpen } = useSettings();

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [pathname, setIsSidebarOpen]);
}
