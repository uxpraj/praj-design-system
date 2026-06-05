import { Check, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { typographyTokens } from "../../theme/typography";
import { cn } from "../../lib/utils";
import { Badge } from "../Badge";

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

export function MultiSelect({
  options,
  value,
  onChange,
  label,
  placeholder = "Select options",
  hint,
  error,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const hasError = !!error;

  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  const remove = (v: string) => onChange(value.filter((x) => x !== v));

  const containerClass = cn(
    "rounded-12 border bg-surface",
    open && !hasError   && "border-primary-high",
    !open && !hasError  && "border-neutral-disabled",
    hasError            && "border-error",
    disabled            && "bg-surface-subtle border-neutral-faint"
  );

  return (
    <View className="gap-6">
      {label && (
        <Text className="font-base-medium text-body text-neutral-subtle">{label}</Text>
      )}

      {/* Trigger */}
      <Pressable
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
      >
        <View
          className={containerClass}
          style={{ paddingHorizontal: 12, paddingVertical: 8 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            {/* Chips + placeholder */}
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              {value.length > 0 ? (
                value.map((v) => {
                  const opt = options.find((o) => o.value === v);
                  return (
                    <Badge
                      key={v}
                      label={opt?.label ?? v}
                      appearance="subtle"
                      variant="primary"
                      size="md"
                      onDismiss={disabled ? undefined : () => remove(v)}
                    />
                  );
                })
              ) : (
                <Text
                  style={{
                    fontFamily: font("base"),
                    fontSize:   fs("body"),
                    color:      colorTokens["neutral-muted"],
                  }}
                >
                  {placeholder}
                </Text>
              )}
            </View>

            {/* Chevron */}
            <ChevronDown
              size={18}
              color={disabled ? colorTokens["neutral-muted"] : colorTokens["neutral-subtle"]}
              strokeWidth={2}
            />
          </View>
        </View>
      </Pressable>

      {/* Hint / error */}
      {(hint || error) && (
        <Text className={cn("font-base text-label", hasError ? "text-error" : "text-neutral-muted")}>
          {error || hint}
        </Text>
      )}

      {/* Dropdown modal */}
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable
          style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}
          onPress={() => setOpen(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View
              style={{
                backgroundColor: colorTokens["surface"],
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: colorTokens["neutral-faint"],
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: font("base-semibold"),
                    fontSize:   fs("title"),
                    color:      colorTokens["neutral-high"],
                  }}
                >
                  {label ?? "Select"}
                </Text>
                {value.length > 0 && (
                  <Pressable onPress={() => onChange([])} hitSlop={8}>
                    <Text
                      style={{
                        fontFamily: font("base-medium"),
                        fontSize:   fs("body"),
                        color:      colorTokens["primary-high"],
                      }}
                    >
                      Clear all
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* Options */}
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                style={{ maxHeight: 360 }}
                renderItem={({ item }) => {
                  const selected = value.includes(item.value);
                  return (
                    <Pressable
                      onPress={() => toggle(item.value)}
                      style={({ pressed }) => ({
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 16,
                        paddingVertical: 14,
                        borderBottomWidth: 1,
                        borderBottomColor: colorTokens["neutral-faint"],
                        backgroundColor: pressed ? colorTokens["surface-subtle"] : "transparent",
                      })}
                    >
                      <Text
                        style={{
                          fontFamily: selected ? font("base-semibold") : font("base"),
                          fontSize:   fs("body"),
                          color: selected ? colorTokens["primary-high"] : colorTokens["neutral-high"],
                          flex: 1,
                        }}
                      >
                        {item.label}
                      </Text>
                      {selected && (
                        <Check size={18} color={colorTokens["primary-high"]} strokeWidth={2.5} />
                      )}
                    </Pressable>
                  );
                }}
              />

              {/* Done button */}
              <Pressable
                onPress={() => setOpen(false)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  borderTopWidth: 1,
                  borderTopColor: colorTokens["neutral-faint"],
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: font("base-semibold"),
                    fontSize:   fs("body"),
                    color:      colorTokens["primary-high"],
                  }}
                >
                  Done ({value.length} selected)
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
