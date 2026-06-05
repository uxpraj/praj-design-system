import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label?: string;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const base =
  "flex-row items-center justify-center rounded-12 active:opacity-80";

const variants: Record<Variant, string> = {
  primary: "bg-primary-high",
  outline: "border border-primary-high bg-transparent",
  ghost: "bg-transparent",
};

const sizes: Record<Size, string> = {
  sm: "px-12 py-8 gap-6",
  md: "px-16 py-12 gap-8",
  lg: "px-24 py-16 gap-10",
};

const labelSizes: Record<Size, string> = {
  sm: "text-body",
  md: "text-title",
  lg: "text-display",
};

const labelVariants: Record<Variant, string> = {
  primary: "text-white font-base-semibold",
  outline: "text-primary-high font-base-semibold",
  ghost: "text-primary-high font-base-semibold",
};

const disabledVariants: Record<Variant, string> = {
  primary: "bg-neutral-faint",
  outline: "border-neutral-disabled",
  ghost: "",
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  onPress,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={{ borderCurve: "continuous" }}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        isDisabled && disabledVariants[variant],
        isDisabled && "opacity-50"
      )}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? colorTokens["surface"] : colorTokens["primary-high"]}
        />
      ) : (
        <>
          {icon && iconPosition === "left" && <View>{icon}</View>}
          {label && (
            <Text
              className={cn(
                labelVariants[variant],
                labelSizes[size],
                isDisabled && "text-neutral-muted"
              )}
            >
              {label}
            </Text>
          )}
          {icon && iconPosition === "right" && <View>{icon}</View>}
        </>
      )}
    </Pressable>
  );
}

interface IconButtonProps {
  icon: React.ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onPress?: () => void;
}

const iconSizes: Record<Size, string> = {
  sm: "w-32 h-32",
  md: "w-40 h-40",
  lg: "w-48 h-48",
};

export function IconButton({
  icon,
  variant = "primary",
  size = "md",
  disabled = false,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{ borderCurve: "continuous" }}
      className={cn(
        "items-center justify-center rounded-12 active:opacity-80",
        variants[variant],
        iconSizes[size],
        disabled && disabledVariants[variant],
        disabled && "opacity-50"
      )}
    >
      {icon}
    </Pressable>
  );
}
