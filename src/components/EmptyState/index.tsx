import { Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { typographyTokens } from "../../theme/typography";
import { Button } from "../Button";

export interface EmptyStateAction {
  label: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "ghost";
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);
const lh   = (key: string): number => parseFloat(t.fontSize[key][1].lineHeight);

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <View
      style={{
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 40,
        gap: 16,
      }}
    >
      {/* Icon container */}
      {icon && (
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            backgroundColor: colorTokens["surface-subtle"],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </View>
      )}

      {/* Text content */}
      <View style={{ alignItems: "center", gap: 8 }}>
        <Text
          style={{
            fontFamily:  font("base-semibold"),
            fontSize:    fs("title"),
            lineHeight:  lh("title"),
            color:       colorTokens["neutral-high"],
            textAlign:   "center",
          }}
        >
          {title}
        </Text>

        {description && (
          <Text
            style={{
              fontFamily: font("base"),
              fontSize:   fs("body"),
              lineHeight: lh("body"),
              color:      colorTokens["neutral-subtle"],
              textAlign:  "center",
            }}
          >
            {description}
          </Text>
        )}
      </View>

      {/* Action button */}
      {action && (
        <View style={{ marginTop: 16 }}>
          <Button
            label={action.label}
            variant={action.variant ?? "primary"}
            onPress={action.onPress}
          />
        </View>
      )}
    </View>
  );
}
