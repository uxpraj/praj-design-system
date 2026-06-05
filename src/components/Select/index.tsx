import { Check, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  disabled = false,
  error,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  const hasError = !!error;

  return (
    <View className="gap-6">
      {label && (
        <Text className="font-base-medium text-body text-neutral-subtle">{label}</Text>
      )}

      <Pressable
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        className={cn(
          "flex-row items-center justify-between rounded-12 border px-12 py-12 bg-surface",
          hasError ? "border-error" : "border-neutral-disabled",
          disabled && "bg-surface-subtle border-neutral-faint"
        )}
      >
        <Text
          className={cn(
            "font-base text-title flex-1",
            selected ? "text-neutral-high" : "text-neutral-muted",
            disabled && "text-neutral-muted"
          )}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <ChevronDown
          size={18}
          color={
            disabled
              ? colorTokens["neutral-muted"]
              : colorTokens["neutral-subtle"]
          }
        />
      </Pressable>

      {error && (
        <Text className="font-base text-label text-error">{error}</Text>
      )}

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onPress={() => setOpen(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="bg-surface rounded-t-16 overflow-hidden">
              <View className="px-16 py-16 border-b border-neutral-faint">
                <Text className="font-heading-semibold text-title text-neutral-high text-center">
                  {label || "Select"}
                </Text>
              </View>

              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                style={{ maxHeight: 320 }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    className="flex-row items-center justify-between px-16 py-16 border-b border-neutral-faint active:bg-surface-subtle"
                  >
                    <Text
                      className={cn(
                        "font-base text-body flex-1",
                        item.value === value
                          ? "text-primary-high font-base-semibold"
                          : "text-neutral-high"
                      )}
                    >
                      {item.label}
                    </Text>
                    {item.value === value && (
                      <Check size={18} color={colorTokens["primary-high"]} />
                    )}
                  </Pressable>
                )}
              />

              <Pressable
                onPress={() => setOpen(false)}
                className="px-16 py-16 border-t border-neutral-faint active:bg-surface-subtle"
              >
                <Text className="font-base-semibold text-body text-neutral-subtle text-center">
                  Cancel
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
