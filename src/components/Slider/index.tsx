import RNSlider from "@react-native-community/slider";
import { Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  showValue = false,
}: SliderProps) {
  return (
    <View className={cn("gap-4", disabled && "opacity-40")}>
      {(label || showValue) && (
        <View className="flex-row items-center justify-between">
          {label && (
            <Text className="font-base-medium text-body text-neutral-subtle">
              {label}
            </Text>
          )}
          {showValue && (
            <Text className="font-base-semibold text-body text-primary-high">
              {value}
            </Text>
          )}
        </View>
      )}
      <RNSlider
        value={value}
        onValueChange={onValueChange}
        minimumValue={min}
        maximumValue={max}
        step={step}
        disabled={disabled}
        minimumTrackTintColor={colorTokens["primary-high"]}
        maximumTrackTintColor={colorTokens["neutral-faint"]}
        thumbTintColor={colorTokens["primary-high"]}
      />
    </View>
  );
}
