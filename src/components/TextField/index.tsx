import { Search } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

type TextFieldVariant = "default" | "search";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  variant?: TextFieldVariant;
  hint?: string;
  error?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  variant = "default",
  hint,
  error,
  disabled = false,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  autoCapitalize = "sentences",
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  const hasError = !!error;

  const containerBorder = cn(
    "flex-row items-center rounded-12 border bg-surface px-12 gap-8",
    focused && !hasError && "border-primary-high",
    !focused && !hasError && "border-neutral-disabled",
    hasError && "border-error",
    disabled && "bg-surface-subtle border-neutral-faint"
  );

  return (
    <View className="gap-6">
      {label && (
        <Text className="font-base-medium text-body text-neutral-subtle">{label}</Text>
      )}
      <View className={containerBorder}>
        {variant === "search" && <Search size={18} color={colorTokens["neutral-muted"]} />}
        {leftIcon && <View>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colorTokens["neutral-muted"]}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize={autoCapitalize}
          className={cn(
            "flex-1 font-base text-title text-neutral-high py-12",
            disabled && "text-neutral-muted"
          )}
        />
        {rightIcon && (
          <Pressable onPress={onRightIconPress}>
            <View>{rightIcon}</View>
          </Pressable>
        )}
      </View>
      {(hint || error) && (
        <Text
          className={cn(
            "font-base text-label",
            hasError ? "text-error" : "text-neutral-muted"
          )}
        >
          {error || hint}
        </Text>
      )}
    </View>
  );
}
