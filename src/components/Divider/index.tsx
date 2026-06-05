import { useState } from "react";
import { Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";

export type DividerVariant = "solid" | "dashed";
export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  label?: string;
}

const DASH = 12;
const GAP  = 6;

function DashedH({ flex, fullWidth }: { flex?: number; fullWidth?: boolean }) {
  const color = colorTokens["neutral-faint"];
  const [width, setWidth] = useState(0);
  const count = Math.ceil(width / (DASH + GAP)) + 1;

  return (
    <View
      style={fullWidth ? { width: "100%" } : { flex }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View style={{ flexDirection: "row", overflow: "hidden", height: 1 }}>
        {Array.from({ length: count }).map((_, i) => (
          <View
            key={i}
            style={{ width: DASH, height: 1, backgroundColor: color, marginRight: GAP }}
          />
        ))}
      </View>
    </View>
  );
}

function DashedV() {
  const color = colorTokens["neutral-faint"];
  const [height, setHeight] = useState(0);
  const count = Math.ceil(height / (DASH + GAP)) + 1;

  return (
    <View
      style={{ alignSelf: "stretch" }}
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
    >
      <View style={{ flexDirection: "column", overflow: "hidden", width: 1 }}>
        {Array.from({ length: count }).map((_, i) => (
          <View
            key={i}
            style={{ height: DASH, width: 1, backgroundColor: color, marginBottom: GAP }}
          />
        ))}
      </View>
    </View>
  );
}

export function Divider({
  variant = "solid",
  orientation = "horizontal",
  label,
}: DividerProps) {
  const color = colorTokens["neutral-faint"];

  if (orientation === "vertical") {
    return variant === "solid"
      ? <View style={{ width: 1, alignSelf: "stretch", backgroundColor: color }} />
      : <DashedV />;
  }

  if (label) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {variant === "solid"
          ? <View style={{ flex: 1, height: 1, backgroundColor: color }} />
          : <DashedH flex={1} />}
        <Text
          style={{ color: colorTokens["neutral-muted"] }}
          className="text-label font-base-medium"
        >
          {label}
        </Text>
        {variant === "solid"
          ? <View style={{ flex: 1, height: 1, backgroundColor: color }} />
          : <DashedH flex={1} />}
      </View>
    );
  }

  return variant === "solid"
    ? <View style={{ width: "100%", height: 1, backgroundColor: color }} />
    : <DashedH fullWidth />;
}
