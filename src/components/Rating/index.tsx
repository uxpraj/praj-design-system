import { Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { typographyTokens } from "../../theme/typography";

export type RatingSize = "sm" | "md" | "lg";

export interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  count?: number;
  size?: RatingSize;
  allowHalf?: boolean;
  showValue?: boolean;
  reviewCount?: number;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

const sizeConfig: Record<RatingSize, { star: number; gap: number; fontSize: number }> = {
  sm: { star: 16, gap: 4,  fontSize: fs("label") },
  md: { star: 24, gap: 6,  fontSize: fs("body")  },
  lg: { star: 32, gap: 8,  fontSize: fs("title") },
};

export function Rating({
  value,
  onChange,
  count     = 5,
  size      = "md",
  allowHalf = false,
  showValue = false,
  reviewCount,
}: RatingProps) {
  const { star: starSize, gap, fontSize } = sizeConfig[size];
  const interactive = !!onChange;

  const handlePress = (index: number, locationX: number) => {
    if (!onChange) return;
    if (allowHalf && locationX < starSize / 2) {
      onChange(index - 0.5);
    } else {
      onChange(index);
    }
  };

  const formatValue = (v: number) =>
    Number.isInteger(v) ? `${v}` : v.toFixed(1);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      {/* Stars */}
      <View style={{ flexDirection: "row", gap }}>
        {Array.from({ length: count }, (_, i) => {
          const index  = i + 1;
          const filled = value >= index;
          const half   = allowHalf && value >= index - 0.5 && value < index;

          const StarCell = (
            <View style={{ width: starSize, height: starSize }}>
              {/* Empty base */}
              <Star
                size={starSize}
                color={colorTokens["neutral-faint"]}
                fill={colorTokens["neutral-faint"]}
                strokeWidth={0}
              />
              {/* Filled / half overlay */}
              {(filled || half) && (
                <View
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: half ? starSize / 2 : starSize,
                    height: starSize,
                    overflow: "hidden",
                  }}
                >
                  <Star
                    size={starSize}
                    color={colorTokens["warning"]}
                    fill={colorTokens["warning"]}
                    strokeWidth={0}
                  />
                </View>
              )}
            </View>
          );

          return interactive ? (
            <Pressable
              key={index}
              hitSlop={4}
              onPress={(e) => handlePress(index, e.nativeEvent.locationX)}
            >
              {StarCell}
            </Pressable>
          ) : (
            <View key={index}>{StarCell}</View>
          );
        })}
      </View>

      {/* Value label */}
      {showValue && (
        <Text
          style={{
            fontFamily: font("base-semibold"),
            fontSize,
            color: colorTokens["neutral-high"],
          }}
        >
          {formatValue(value)}
        </Text>
      )}

      {/* Review count */}
      {reviewCount !== undefined && (
        <Text
          style={{
            fontFamily: font("base"),
            fontSize,
            color: colorTokens["neutral-muted"],
          }}
        >
          ({reviewCount.toLocaleString()})
        </Text>
      )}
    </View>
  );
}
