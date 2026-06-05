import { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, ScrollView, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";
import { typographyTokens } from "../../theme/typography";
import { Button } from "../Button";

export interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  title?: string;
  applyLabel?: string;
  children: React.ReactNode;
}

export interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  divider?: boolean;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

// ── FilterSection ────────────────────────────────────────────────────────────

export function FilterSection({ title, children, divider = true }: FilterSectionProps) {
  return (
    <View>
      {divider && (
        <View style={{ height: 1, backgroundColor: colorTokens["neutral-faint"] }} />
      )}
      <View style={{ padding: 20, gap: 16 }}>
        <Text
          style={{
            fontFamily: font("base-semibold"),
            fontSize:   fs("label"),
            color:      colorTokens["neutral-muted"],
            textTransform: "uppercase",
            letterSpacing: 0.8,
          }}
        >
          {title}
        </Text>
        {children}
      </View>
    </View>
  );
}

// ── FilterSheet ──────────────────────────────────────────────────────────────

export function FilterSheet({
  visible,
  onClose,
  onApply,
  onReset,
  title      = "Filters",
  applyLabel = "Apply Filters",
  children,
}: FilterSheetProps) {
  const translateY = useRef(new Animated.Value(600)).current;
  const opacity    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity,    { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, bounciness: 0, speed: 14, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity,    { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 600, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      {/* Overlay */}
      <Animated.View
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", opacity }}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          backgroundColor: colorTokens["surface"],
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          maxHeight: "90%",
          transform: [{ translateY }],
          ...shadowStyles.strong,
          shadowOffset: { width: 0, height: -4 },
        }}
      >
        {/* Handle */}
        <View style={{ alignItems: "center", paddingTop: 12 }}>
          <View style={{ width: 40, height: 4, borderRadius: 1000, backgroundColor: colorTokens["neutral-faint"] }} />
        </View>

        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          <Text style={{ fontFamily: font("base-bold"), fontSize: fs("title"), color: colorTokens["neutral-high"] }}>
            {title}
          </Text>
          <Pressable onPress={onReset} hitSlop={8}>
            <Text style={{ fontFamily: font("base-medium"), fontSize: fs("body"), color: colorTokens["primary-high"] }}>
              Reset
            </Text>
          </Pressable>
        </View>

        {/* Scrollable content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ flexGrow: 0 }}
        >
          {children}
        </ScrollView>

        {/* Footer */}
        <View
          style={{
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: colorTokens["neutral-faint"],
          }}
        >
          <Button label={applyLabel} onPress={onApply} />
        </View>
      </Animated.View>
    </Modal>
  );
}
