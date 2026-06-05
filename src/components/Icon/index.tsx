import { LucideIcon } from "lucide-react-native";

import { colorTokens } from "../../theme/colors";

export type IconColor =
  | "neutral-high"
  | "neutral-subtle"
  | "neutral-muted"
  | "neutral-disabled"
  | "primary-high"
  | "primary-subtle"
  | "primary-muted"
  | "primary-disabled"
  | "error"
  | "success"
  | "warning"
  | "info"
  | "surface";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

const colorMap: Record<IconColor, string> = {
  "neutral-high":     colorTokens["neutral-high"],
  "neutral-subtle":   colorTokens["neutral-subtle"],
  "neutral-muted":    colorTokens["neutral-muted"],
  "neutral-disabled": colorTokens["neutral-disabled"],
  "primary-high":     colorTokens["primary-high"],
  "primary-subtle":   colorTokens["primary-subtle"],
  "primary-muted":    colorTokens["primary-muted"],
  "primary-disabled": colorTokens["primary-disabled"],
  "error":            colorTokens["error"],
  "success":          colorTokens["success"],
  "warning":          colorTokens["warning"],
  "info":             colorTokens["info"],
  "surface":          colorTokens["surface"],
};

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

interface IconProps {
  icon: LucideIcon;
  color?: IconColor;
  size?: IconSize | number;
  strokeWidth?: number;
}

export function Icon({
  icon: IconComponent,
  color = "neutral-subtle",
  size = "md",
  strokeWidth = 2,
}: IconProps) {
  const resolvedSize = typeof size === "number" ? size : sizeMap[size];
  return (
    <IconComponent
      size={resolvedSize}
      color={colorMap[color]}
      strokeWidth={strokeWidth}
    />
  );
}
