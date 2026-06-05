import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { typographyTokens } from "../../theme/typography";

export type OTPVariant = "default" | "underline";

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  variant?: OTPVariant;
  error?: boolean;
  disabled?: boolean;
  secure?: boolean;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

export function OTPInput({
  length   = 4,
  value,
  onChange,
  onComplete,
  variant  = "default",
  error    = false,
  disabled = false,
  secure   = false,
}: OTPInputProps) {
  const inputRef  = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const blinkAnim = useRef(new Animated.Value(1)).current;

  const activeIndex = focused
    ? value.length < length ? value.length : length - 1
    : -1;

  // Blinking cursor animation
  useEffect(() => {
    if (focused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
          Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      blinkAnim.stopAnimation();
      blinkAnim.setValue(1);
    }
  }, [focused]);

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, length);
    onChange(cleaned);
    if (cleaned.length === length) onComplete?.(cleaned);
  };

  // Box size: wider for short codes, narrower for 6-digit
  const boxSize = 48;

  return (
    <Pressable
      onPress={() => !disabled && inputRef.current?.focus()}
      style={{ opacity: disabled ? 0.5 : 1, alignSelf: "flex-start" }}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
        {Array.from({ length }).map((_, i) => {
          const char      = value[i] || "";
          const isActive  = i === activeIndex;
          const isFilled  = !!char;

          const borderColor = error
            ? colorTokens["error"]
            : isActive
            ? colorTokens["primary-high"]
            : isFilled
            ? colorTokens["neutral-disabled"]
            : colorTokens["neutral-faint"];

          const boxStyle =
            variant === "default"
              ? {
                  width: boxSize, height: boxSize,
                  alignItems: "center" as const,
                  justifyContent: "center" as const,
                  backgroundColor: error
                    ? colorTokens["error-bg"]
                    : colorTokens["surface"],
                  borderWidth: 1.5,
                  borderRadius: 12,
                  borderColor,
                }
              : {
                  width: boxSize, height: boxSize,
                  alignItems: "center" as const,
                  justifyContent: "center" as const,
                  backgroundColor: "transparent" as const,
                  borderBottomWidth: 2,
                  borderColor,
                };

          return (
            <View key={i} style={boxStyle}>
              {isFilled ? (
                <Text
                  style={{
                    fontFamily: font("base-bold"),
                    fontSize:   fs("title"),
                    color:      colorTokens["neutral-high"],
                  }}
                >
                  {secure ? "•" : char}
                </Text>
              ) : isActive ? (
                <Animated.View
                  style={{
                    opacity: blinkAnim,
                    width: 2,
                    height: 22,
                    borderRadius: 1,
                    backgroundColor: colorTokens["primary-high"],
                  }}
                />
              ) : null}
            </View>
          );
        })}
      </View>

      {/* Single hidden TextInput captures all keypresses */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={!disabled}
        textContentType="oneTimeCode"
        caretHidden
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
      />
    </Pressable>
  );
}
