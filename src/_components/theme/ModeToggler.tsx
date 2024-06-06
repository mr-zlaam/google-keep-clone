import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/_components/theme/theme-provider";

export function ModeToggler() {
  const { setTheme, theme } = useTheme();
  return (
    <>
      {theme && theme === "dark" ? (
        <div
          onClick={() => {
            setTheme("light");
          }}
          className="mx-4 h-[45px] w-[45px] rounded-full cursor-pointer flex items-center justify-center duration-300 transition-all hover:bg-foreground/15 "
        >
          <SunIcon />
        </div>
      ) : (
        <div
          onClick={() => {
            setTheme("dark");
          }}
          className="mx-4 h-[45px] w-[45px] rounded-full cursor-pointer flex items-center justify-center duration-300 transition-all hover:bg-foreground/15 "
        >
          <MoonIcon />
        </div>
      )}
    </>
  );
}
