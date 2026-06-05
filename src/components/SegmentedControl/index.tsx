import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";
import { typographyTokens } from "../../theme/typography";

export interface SegmentedOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export type SegmentedSize = "sm" | "md";

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  size?: SegmentedSize;
  disabled?: boolean;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

const PADDING = 4;

const sizeConfig: Record<SegmentedSize, { height: number; fontSize: number }> = {
  sm: { height: 32, fontSize: fs("label") },
  md: { height: 40, fontSize: fs("body")  },
};

export function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  disabled = false,
}: SegmentedControlProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const { height, fontSize } = sizeConfig[size];
  const optionWidth = containerWidth > 0
    ? (containerWidth - PADDING * 2) / options.length
    : 0;

  useEffect(() => {
    if (optionWidth === 0) return;
    Animated.spring(translateX, {
      toValue: selectedIndex * optionWidth,
      useNativeDriver: true,
      bounciness: 0,
      speed: 28,
    }).start();
  }, [selectedIndex, optionWidth]);

  return (
    <View
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      style={{
        height,
        backgroundColor: colorTokens["surface-subtle"],
        borderRadius: 1000,
        padding: PADDING,
        flexDirection: "row",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* Sliding white indicator */}
      {containerWidth > 0 && (
        <Animated.View
          style={{
            position: "absolute",
            top: PADDING,
            left: PADDING,
            width: optionWidth,
            height: height - PADDING * 2,
            borderRadius: 1000,
            backgroundColor: colorTokens["surface"],
            transform: [{ translateX }],
            ...shadowStyles.subtle,
          }}
        />
      )}

      {/* Option labels */}
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => !disabled && onChange(option.value)}
            disabled={disabled}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 6,
              zIndex: 1,
            }}
          >
            {option.icon && (
              <View style={{ opacity: isSelected ? 1 : 0.5 }}>
                {option.icon}
              </View>
            )}
            <Text
              numberOfLines={1}
              style={{
                fontSize,
                fontFamily: isSelected ? font("base-semibold") : font("base"),
                color: isSelected
                  ? colorTokens["neutral-high"]
                  : colorTokens["neutral-subtle"],
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
