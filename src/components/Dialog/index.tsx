import { X } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";
import { typographyTokens } from "../../theme/typography";
import { Button } from "../Button";

export interface DialogProps {
  visible: boolean;
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  destructive?: boolean;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);
const lh   = (key: string): number => parseFloat(t.fontSize[key][1].lineHeight);

export function Dialog({
  visible,
  title,
  description,
  cancelLabel  = "Cancel",
  confirmLabel = "Continue",
  onCancel,
  onConfirm,
  destructive = false,
}: DialogProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(scale,   { toValue: 1, bounciness: 4, speed: 20, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0,    duration: 120, useNativeDriver: true }),
        Animated.timing(scale,   { toValue: 0.94, duration: 120, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onCancel}
    >
      {/* Overlay */}
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          backgroundColor: "rgba(0,0,0,0.4)",
          opacity,
        }}
      >
        {/* Card */}
        <Animated.View
          style={{
            backgroundColor: colorTokens["surface"],
            borderRadius: 16,
            overflow: "hidden",
            transform: [{ scale }],
            ...shadowStyles.strong,
          }}
        >
          {/* Content */}
          <View style={{ padding: 24, gap: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <Text
                style={{
                  fontFamily: font("heading-semibold"),
                  fontSize:   fs("display"),
                  lineHeight: lh("display"),
                  color:      colorTokens["neutral-high"],
                  flex: 1,
                }}
              >
                {title}
              </Text>
              <Pressable onPress={onCancel} hitSlop={8}>
                <X size={20} color={colorTokens["neutral-muted"]} strokeWidth={2} />
              </Pressable>
            </View>

            {description && (
              <Text
                style={{
                  fontFamily: font("base"),
                  fontSize:   fs("body"),
                  lineHeight: lh("body"),
                  color:      colorTokens["neutral-subtle"],
                }}
              >
                {description}
              </Text>
            )}
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: colorTokens["neutral-faint"] }} />

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 8,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <Button
              label={cancelLabel}
              variant="ghost"
              size="sm"
              onPress={onCancel}
            />

            {destructive ? (
              <Pressable
                onPress={onConfirm}
                style={({ pressed }) => ({
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 1000,
                  borderCurve: "continuous",
                  backgroundColor: colorTokens["error"],
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text
                  style={{
                    fontFamily: font("base-semibold"),
                    fontSize:   fs("body"),
                    color:      colorTokens["surface"],
                  }}
                >
                  {confirmLabel}
                </Text>
              </Pressable>
            ) : (
              <Button
                label={confirmLabel}
                variant="primary"
                size="sm"
                onPress={onConfirm}
              />
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
