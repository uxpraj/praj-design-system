import { Image, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";

export type AvatarSize  = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarColor = "primary" | "success" | "info" | "warning" | "error" | "neutral";

export interface AvatarProps {
  name: string;
  size?:  AvatarSize;
  color?: AvatarColor;
  uri?:   string;
}

const bgColors: Record<AvatarColor, string> = {
  primary: colorTokens["primary-high"],
  success: colorTokens["success"],
  info:    colorTokens["info"],
  warning: colorTokens["warning"],
  error:   colorTokens["error"],
  neutral: colorTokens["neutral-subtle"],
};

const autoColors: AvatarColor[] = ["primary", "success", "info", "warning", "error", "neutral"];

const sizeConfig: Record<AvatarSize, { dim: number; fontSize: number }> = {
  xs: { dim: 24, fontSize: 9  },
  sm: { dim: 32, fontSize: 12 },
  md: { dim: 40, fontSize: 14 },
  lg: { dim: 48, fontSize: 18 },
  xl: { dim: 64, fontSize: 22 },
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getAutoColor(name: string): AvatarColor {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return autoColors[Math.abs(hash) % autoColors.length];
}

export function Avatar({ name, size = "md", color, uri }: AvatarProps) {
  const { dim, fontSize } = sizeConfig[size];
  const bg = bgColors[color ?? getAutoColor(name)];

  return (
    <View
      style={{
        width: dim,
        height: dim,
        borderRadius: 1000,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: dim, height: dim }} resizeMode="cover" />
      ) : (
        <Text
          style={{
            color: colorTokens["surface"],
            fontSize,
            fontFamily: "DMSans_600SemiBold",
            includeFontPadding: false,
          }}
        >
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
}

// ── AvatarGroup ──────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  names: string[];
  size?: AvatarSize;
  maxVisible?: number;
}

export function AvatarGroup({ names, size = "md", maxVisible = 4 }: AvatarGroupProps) {
  const { dim, fontSize } = sizeConfig[size];
  const overlap = Math.round(dim * 0.28);
  const visible  = names.slice(0, maxVisible);
  const overflow = names.length - maxVisible;

  return (
    <View style={{ flexDirection: "row" }}>
      {visible.map((name, i) => (
        <View
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -overlap,
            borderRadius: 1000,
            borderWidth: 2,
            borderColor: colorTokens["surface"],
          }}
        >
          <Avatar name={name} size={size} />
        </View>
      ))}

      {overflow > 0 && (
        <View
          style={{
            marginLeft: -overlap,
            width: dim,
            height: dim,
            borderRadius: 1000,
            backgroundColor: colorTokens["surface-subtle"],
            borderWidth: 2,
            borderColor: colorTokens["surface"],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colorTokens["neutral-subtle"],
              fontSize,
              fontFamily: "DMSans_600SemiBold",
              includeFontPadding: false,
            }}
          >
            +{overflow}
          </Text>
        </View>
      )}
    </View>
  );
}
