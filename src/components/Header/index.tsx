import { ArrowLeft, Bell } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { typographyTokens } from "../../theme/typography";

export interface HeaderProps {
  title: string;
  onBack?: () => void;
  onNotification?: () => void;
  notificationCount?: number;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

export function Header({
  title,
  onBack,
  onNotification,
  notificationCount = 0,
}: HeaderProps) {
  return (
    <View
      style={{
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: colorTokens["surface"],
        borderBottomWidth: 1,
        borderBottomColor: colorTokens["neutral-faint"],
      }}
    >
      {/* Left — back icon + title */}
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 12 }}>
        {onBack && (
          <Pressable onPress={onBack} hitSlop={8}>
            <ArrowLeft size={24} color={colorTokens["neutral-high"]} strokeWidth={2} />
          </Pressable>
        )}
        <Text
          numberOfLines={1}
          style={{
            fontFamily: font("base-semibold"),
            fontSize:   fs("title"),
            color:      colorTokens["neutral-high"],
            flex: 1,
          }}
        >
          {title}
        </Text>
      </View>

      {/* Right — notification bell */}
      <View style={{ alignItems: "flex-end" }}>
        {onNotification && (
          <Pressable onPress={onNotification} hitSlop={8} style={{ position: "relative" }}>
            <Bell size={24} color={colorTokens["neutral-high"]} strokeWidth={2} />

            {notificationCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  minWidth: 16,
                  height: 16,
                  borderRadius: 1000,
                  backgroundColor: colorTokens["primary-high"],
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 3,
                }}
              >
                <Text
                  style={{
                    fontFamily: font("base-bold"),
                    fontSize: 9,
                    color: colorTokens["surface"],
                    lineHeight: 12,
                  }}
                >
                  {notificationCount > 99 ? "99+" : notificationCount}
                </Text>
              </View>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
