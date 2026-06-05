import { ChevronDown } from "lucide-react-native";
import { useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const rotate = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;
  const height = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;

  const toggle = () => {
    const toValue = open ? 0 : 1;
    Animated.parallel([
      Animated.spring(rotate, { toValue, useNativeDriver: true, bounciness: 0 }),
      Animated.spring(height, { toValue, useNativeDriver: false, bounciness: 0 }),
    ]).start();
    setOpen(!open);
  };

  const chevronRotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const maxHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  return (
    <View className="border-b border-neutral-faint">
      <Pressable
        onPress={toggle}
        className="flex-row items-center justify-between py-16"
      >
        <Text className="font-base-semibold text-title text-neutral-high flex-1 pr-16">
          {title}
        </Text>
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <ChevronDown size={18} color={colorTokens["neutral-muted"]} />
        </Animated.View>
      </Pressable>
      <Animated.View style={{ maxHeight, overflow: "hidden" }}>
        <View className="pb-16">
          {typeof children === "string" ? (
            <Text className="font-base text-body text-neutral-subtle leading-relaxed">
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      </Animated.View>
    </View>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <View className={cn("border-t border-neutral-faint", className)}>
      {children}
    </View>
  );
}
