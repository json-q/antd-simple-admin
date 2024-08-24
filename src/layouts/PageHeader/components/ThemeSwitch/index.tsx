import { memo } from "react";
import { Button } from "antd";
import { useSelector } from "@/stores";
import { DarkIcon, LightIcon } from "@/assets/icons";
import { ThemeModeEnum } from "@/enums";

const isAppearanceTransition =
  typeof document.startViewTransition === "function" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ThemeSwitch: React.FC = memo(() => {
  const { themeMode, actionThemeMode } = useSelector(["themeMode", "actionThemeMode"]);

  // https://github.com/vbenjs/vue-vben-admin/blob/main/packages/effects/layouts/src/widgets/theme-toggle/theme-button.vue
  function toggleTheme(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const isDark = themeMode === ThemeModeEnum.Dark;
    const newTheme = isDark ? ThemeModeEnum.Light : ThemeModeEnum.Dark;

    // no support browser do nothing
    if (!isAppearanceTransition || !event) {
      actionThemeMode(newTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(async () => {
      actionThemeMode(newTheme);
      await Promise.resolve();
    });

    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: "ease-in",
          pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <Button
      type="text"
      shape="circle"
      icon={themeMode === "dark" ? <LightIcon /> : <DarkIcon />}
      onClick={toggleTheme}
    />
  );
});

export default ThemeSwitch;
