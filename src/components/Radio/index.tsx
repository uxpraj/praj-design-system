import { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

import { cn } from "../../lib/utils";

interface RadioProps {
  selected: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
}

export function Radio({
  selected,
  onPress,
  label,
  disabled = false,
}: RadioProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled) return;
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.85, useNativeDriver: true, bounciness: 0 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, bounciness: 6 }),
    ]).start();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className="flex-row items-center gap-12"
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View
          className={cn(
            "w-20 h-20 rounded-1000 border-2 items-center justify-center",
            selected ? "border-primary-high" : "border-neutral-disabled",
            disabled && "opacity-40"
          )}
        >
          {selected && (
            <View className="w-10 h-10 rounded-1000 bg-primary-high" />
          )}
        </View>
      </Animated.View>
      {label && (
        <Text
          className={cn(
            "font-base text-body text-neutral-high",
            disabled && "text-neutral-muted opacity-40"
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

interface RadioGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function RadioGroup({
  options,
  value,
  onChange,
  disabled = false,
}: RadioGroupProps) {
  return (
    <View className="gap-12">
      {options.map((option) => (
        <Radio
          key={option.value}
          selected={value === option.value}
          onPress={() => onChange(option.value)}
          label={option.label}
          disabled={disabled}
        />
      ))}
    </View>
  );
}
