import { Pressable, ScrollView, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";
import { typographyTokens } from "../../theme/typography";
import { Spinner } from "../Spinner";

export interface SearchResultItem {
  value: string;
  label: string;
  subtitle?: string;
  left?: React.ReactNode;
}

export interface SearchResultsProps {
  results: SearchResultItem[];
  visible: boolean;
  loading?: boolean;
  onSelect: (item: SearchResultItem) => void;
  emptyText?: string;
  maxHeight?: number;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

export function SearchResults({
  results,
  visible,
  loading   = false,
  onSelect,
  emptyText = "No results found",
  maxHeight = 280,
}: SearchResultsProps) {
  if (!visible) return null;

  return (
    <View
      style={{
        backgroundColor: colorTokens["surface"],
        borderRadius: 16,
        overflow: "hidden",
        maxHeight,
        ...shadowStyles.strong,
        borderWidth: 1,
        borderColor: colorTokens["neutral-faint"],
      }}
    >
      {loading ? (
        <View style={{ padding: 24, alignItems: "center" }}>
          <Spinner size="sm" />
        </View>
      ) : results.length === 0 ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontFamily: font("base"), fontSize: fs("body"), color: colorTokens["neutral-muted"] }}>
            {emptyText}
          </Text>
        </View>
      ) : (
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {results.map((item, i) => (
            <Pressable
              key={item.value}
              onPress={() => onSelect(item)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: pressed ? colorTokens["surface-subtle"] : "transparent",
                borderBottomWidth: i < results.length - 1 ? 1 : 0,
                borderBottomColor: colorTokens["neutral-faint"],
              })}
            >
              {item.left && (
                <View style={{ flexShrink: 0 }}>{item.left}</View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: font("base-medium"), fontSize: fs("body"), color: colorTokens["neutral-high"] }}>
                  {item.label}
                </Text>
                {item.subtitle && (
                  <Text style={{ fontFamily: font("base"), fontSize: fs("label"), color: colorTokens["neutral-muted"], marginTop: 2 }}>
                    {item.subtitle}
                  </Text>
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
