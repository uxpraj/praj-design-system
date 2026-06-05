import { ActivityIndicator, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { typographyTokens } from "../../theme/typography";

export type SpinnerSize    = "sm" | "md" | "lg";
export type SpinnerVariant = "primary" | "neutral" | "white";

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

const sizeMap: Record<SpinnerSize, number> = {
  sm: 20,
  md: 32,
  lg: 48,
};

const colorMap: Record<SpinnerVariant, string> = {
  primary: colorTokens["primary-high"],
  neutral: colorTokens["neutral-muted"],
  white:   colorTokens["surface"],
};

export function Spinner({
  size    = "md",
  variant = "primary",
  label,
}: SpinnerProps) {
  return (
    <View style={{ alignItems: "center", gap: 8 }}>
      <ActivityIndicator size={sizeMap[size]} color={colorMap[variant]} />
      {label && (
        <Text
          style={{
            fontFamily: font("base"),
            fontSize:   fs("body"),
            color:      colorTokens["neutral-subtle"],
          }}
        >
          {label}
        </Text>
      )}
    </View>
  );
}
