import { X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

type Variant = "primary" | "neutral" | "success" | "error" | "warning" | "info";
type Appearance = "filled" | "subtle" | "outline";
type Size = "sm" | "md";

interface BadgeProps {
  label: string;
  variant?: Variant;
  appearance?: Appearance;
  size?: Size;
  leftIcon?: React.ReactNode;
  onDismiss?: () => void;
}

const containerStyles: Record<Appearance, Record<Variant, string>> = {
  filled: {
    primary: "bg-primary-high",
    neutral: "bg-neutral-subtle",
    success: "bg-success",
    error:   "bg-error",
    warning: "bg-warning",
    info:    "bg-info",
  },
  subtle: {
    primary: "bg-primary-disabled",
    neutral: "bg-neutral-faint",
    success: "bg-success-bg",
    error:   "bg-error-bg",
    warning: "bg-warning-bg",
    info:    "bg-info-bg",
  },
  outline: {
    primary: "border border-primary-high",
    neutral: "border border-neutral-disabled",
    success: "border border-success",
    error:   "border border-error",
    warning: "border border-warning",
    info:    "border border-info",
  },
};

const labelStyles: Record<Appearance, Record<Variant, string>> = {
  filled: {
    primary: "text-white",
    neutral: "text-white",
    success: "text-white",
    error:   "text-white",
    warning: "text-white",
    info:    "text-white",
  },
  subtle: {
    primary: "text-primary-high",
    neutral: "text-neutral-subtle",
    success: "text-success",
    error:   "text-error",
    warning: "text-warning",
    info:    "text-info",
  },
  outline: {
    primary: "text-primary-high",
    neutral: "text-neutral-subtle",
    success: "text-success",
    error:   "text-error",
    warning: "text-warning",
    info:    "text-info",
  },
};

const dismissColors: Record<Appearance, Record<Variant, string>> = {
  filled: {
    primary: colorTokens["surface"],
    neutral: colorTokens["surface"],
    success: colorTokens["surface"],
    error:   colorTokens["surface"],
    warning: colorTokens["surface"],
    info:    colorTokens["surface"],
  },
  subtle: {
    primary: colorTokens["primary-high"],
    neutral: colorTokens["neutral-subtle"],
    success: colorTokens["success"],
    error:   colorTokens["error"],
    warning: colorTokens["warning"],
    info:    colorTokens["info"],
  },
  outline: {
    primary: colorTokens["primary-high"],
    neutral: colorTokens["neutral-subtle"],
    success: colorTokens["success"],
    error:   colorTokens["error"],
    warning: colorTokens["warning"],
    info:    colorTokens["info"],
  },
};

const sizeStyles: Record<Size, string> = {
  sm: "px-8 py-2 gap-4 rounded-1000",
  md: "px-12 py-6 gap-6 rounded-1000",
};

const labelSizeStyles: Record<Size, string> = {
  sm: "text-label font-base-medium",
  md: "text-body font-base-medium",
};

const dismissSizes: Record<Size, number> = {
  sm: 10,
  md: 12,
};

export function Badge({
  label,
  variant = "primary",
  appearance = "subtle",
  size = "md",
  leftIcon,
  onDismiss,
}: BadgeProps) {
  return (
    <View
      className={cn(
        "flex-row items-center self-start",
        sizeStyles[size],
        containerStyles[appearance][variant]
      )}
    >
      {leftIcon}
      <Text className={cn(labelSizeStyles[size], labelStyles[appearance][variant])}>
        {label}
      </Text>
      {onDismiss && (
        <Pressable onPress={onDismiss} hitSlop={8}>
          <X
            size={dismissSizes[size]}
            color={dismissColors[appearance][variant]}
            strokeWidth={2.5}
          />
        </Pressable>
      )}
    </View>
  );
}
