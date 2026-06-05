import { Check } from "lucide-react-native";
import { useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

export type ChipSize = "sm" | "md";

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  size?: ChipSize;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
}

const sizeStyles: Record<ChipSize, string> = {
  sm: "px-8 py-4 gap-4 rounded-1000",
  md: "px-12 py-6 gap-6 rounded-1000",
};

const textSizes: Record<ChipSize, string> = {
  sm: "text-label",
  md: "text-body",
};

const checkSizes: Record<ChipSize, number> = {
  sm: 12,
  md: 14,
};

export function Chip({
  label,
  selected = false,
  onPress,
  size = "md",
  leftIcon,
  disabled = false,
}: ChipProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled || !onPress) return;
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.93, useNativeDriver: true, bounciness: 0 }),
      Animated.spring(scale, { toValue: 1,    useNativeDriver: true, bounciness: 8 }),
    ]).start();
    onPress();
  };

  return (
    <Pressable onPress={handlePress} disabled={disabled}>
      <Animated.View
        style={{
          transform: [{ scale }],
          backgroundColor: selected ? colorTokens["primary-disabled"] : colorTokens["surface"],
          borderWidth: 1,
          borderColor: selected ? colorTokens["primary-high"] : colorTokens["neutral-faint"],
          opacity: disabled ? 0.4 : 1,
        }}
        className={cn("flex-row items-center self-start", sizeStyles[size])}
      >
        {selected && !leftIcon && (
          <Check
            size={checkSizes[size]}
            color={colorTokens["primary-high"]}
            strokeWidth={2.5}
          />
        )}
        {leftIcon}
        <Text
          style={{ color: selected ? colorTokens["primary-high"] : colorTokens["neutral-subtle"] }}
          className={cn(
            textSizes[size],
            selected ? "font-base-semibold" : "font-base-medium"
          )}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

// ── ChipGroup ────────────────────────────────────────────────────────────────

export interface ChipOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface ChipGroupBase {
  options: ChipOption[];
  size?: ChipSize;
  scrollable?: boolean;
}

interface SingleChipGroup extends ChipGroupBase {
  multiSelect?: false;
  value: string;
  onChange: (value: string) => void;
}

interface MultiChipGroup extends ChipGroupBase {
  multiSelect: true;
  value: string[];
  onChange: (value: string[]) => void;
}

export type ChipGroupProps = SingleChipGroup | MultiChipGroup;

export function ChipGroup({ options, size = "md", scrollable = false, ...rest }: ChipGroupProps) {
  const isSelected = (val: string) =>
    rest.multiSelect
      ? (rest.value as string[]).includes(val)
      : rest.value === val;

  const handlePress = (val: string) => {
    if (rest.multiSelect) {
      const current = rest.value as string[];
      rest.onChange(
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
      );
    } else {
      (rest as SingleChipGroup).onChange(val === rest.value ? "" : val);
    }
  };

  const chips = options.map((option) => (
    <Chip
      key={option.value}
      label={option.label}
      selected={isSelected(option.value)}
      onPress={() => handlePress(option.value)}
      size={size}
      leftIcon={option.icon}
    />
  ));

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
      >
        {chips}
      </ScrollView>
    );
  }

  return (
    <View className="flex-row flex-wrap gap-8">
      {chips}
    </View>
  );
}
