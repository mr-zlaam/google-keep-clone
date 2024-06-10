import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/_components/theme/theme-provider";
import DivWrapper from "../DivWrapper/DivWrapper";

export function ModeToggler() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="fixed left-[-10px] sm:static bottom-[200px]  sm:z-0 z-[102]">
      {theme && theme === "dark" ? (
        <DivWrapper
          onClick={() => {
            setTheme("light");
          }}
        >
          <SunIcon />
        </DivWrapper>
      ) : (
        <DivWrapper
          onClick={() => {
            setTheme("dark");
          }}
        >
          <MoonIcon />
        </DivWrapper>
      )}
    </div>
  );
}
