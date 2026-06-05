import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

export interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  hint?: string;
  error?: string;
  disabled?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export function TextArea({
  label,
  placeholder,
  value = "",
  onChangeText,
  hint,
  error,
  disabled   = false,
  numberOfLines = 4,
  maxLength,
  autoCapitalize = "sentences",
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;

  // Min height: top padding (12) + lines × lineHeight (24) + bottom padding (12)
  const minHeight = 12 + numberOfLines * 24 + 12;

  const containerBorder = cn(
    "rounded-12 border bg-surface px-12",
    focused && !hasError && "border-primary-high",
    !focused && !hasError && "border-neutral-disabled",
    hasError && "border-error",
    disabled && "bg-surface-subtle border-neutral-faint"
  );

  const atLimit = maxLength !== undefined && value.length >= maxLength;

  return (
    <View className="gap-6">
      {label && (
        <Text className="font-base-medium text-body text-neutral-subtle">
          {label}
        </Text>
      )}

      <View className={containerBorder}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colorTokens["neutral-muted"]}
          editable={!disabled}
          multiline
          textAlignVertical="top"
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize={autoCapitalize}
          style={{ minHeight }}
          className={cn(
            "font-base text-title text-neutral-high py-12",
            disabled && "text-neutral-muted"
          )}
        />
      </View>

      {/* Hint / error + character counter */}
      {(hint || error || maxLength !== undefined) && (
        <View className="flex-row items-center justify-between">
          <Text
            className={cn(
              "font-base text-label flex-1",
              hasError ? "text-error" : "text-neutral-muted"
            )}
          >
            {error || hint || ""}
          </Text>
          {maxLength !== undefined && (
            <Text
              className="font-base text-label"
              style={{ color: atLimit ? colorTokens["error"] : colorTokens["neutral-muted"] }}
            >
              {value.length}/{maxLength}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
