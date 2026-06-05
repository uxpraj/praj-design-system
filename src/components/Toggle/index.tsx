import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";
import { cn } from "../../lib/utils";

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

const config = {
  sm: { track: "w-40 h-24", thumb: 16, on: 18, off: 2 },
  md: { track: "w-56 h-32", thumb: 22, on: 26, off: 3 },
};

export function Toggle({
  value,
  onValueChange,
  disabled = false,
  size = "md",
}: ToggleProps) {
  const { track, thumb, on, off } = config[size];
  const translateX = useRef(new Animated.Value(value ? on : off)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? on : off,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, [value]);

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      className={cn(
        "rounded-1000 justify-center",
        track,
        value ? "bg-primary-high" : "bg-neutral-disabled",
        disabled && "opacity-40"
      )}
    >
      <Animated.View
        style={{
          width: thumb,
          height: thumb,
          borderRadius: thumb / 2,
          backgroundColor: colorTokens["surface"],
          ...shadowStyles.subtle,
          transform: [{ translateX }],
        }}
      />
    </Pressable>
  );
}
