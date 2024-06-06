import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/_components/theme/theme-provider";
import DivWrapper from "../DivWrapper/DivWrapper";

export function ModeToggler() {
  const { setTheme, theme } = useTheme();
  return (
    <>
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
    </>
  );
}
