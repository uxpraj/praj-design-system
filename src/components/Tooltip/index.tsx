import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { typographyTokens } from "../../theme/typography";

export type TooltipPosition = "top" | "bottom";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: TooltipPosition;
  duration?: number;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

const ARROW   = 6;
const MAX_W   = 200;
const PADDING = 16;

export function Tooltip({
  content,
  children,
  position = "top",
  duration = 2500,
}: TooltipProps) {
  const [visible, setVisible]   = useState(false);
  const [tooltipH, setTooltipH] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0, triggerW: 0, triggerH: 0 });

  const triggerRef = useRef<View>(null);
  const opacity    = useRef(new Animated.Value(0)).current;
  const timer      = useRef<ReturnType<typeof setTimeout>>();

  const { width: screenW } = Dimensions.get("window");

  const show = () => {
    triggerRef.current?.measure((_x, _y, w, h, pageX, pageY) => {
      setPos({ x: pageX, y: pageY, triggerW: w, triggerH: h });
      setVisible(true);
    });
  };

  const hide = () => {
    clearTimeout(timer.current);
    Animated.timing(opacity, { toValue: 0, duration: 120, useNativeDriver: true }).start(() =>
      setVisible(false)
    );
  };

  useEffect(() => {
    if (!visible) return;
    Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    timer.current = setTimeout(hide, duration);
    return () => clearTimeout(timer.current);
  }, [visible]);

  // Horizontal: center tooltip on trigger, clamped to screen
  const left = Math.max(
    PADDING,
    Math.min(
      screenW - MAX_W - PADDING,
      pos.x + pos.triggerW / 2 - MAX_W / 2
    )
  );

  // Vertical: above or below trigger
  const tooltipTop =
    position === "top"
      ? pos.y - tooltipH - ARROW - 4
      : pos.y + pos.triggerH + ARROW + 4;

  const bg = colorTokens["neutral-high"];

  return (
    <>
      <Pressable onLongPress={show} delayLongPress={200} onPress={show}>
        <View ref={triggerRef} collapsable={false}>
          {children}
        </View>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={hide}
      >
        <Pressable style={{ flex: 1 }} onPress={hide}>
          <Animated.View
            style={{
              position: "absolute",
              top: tooltipTop,
              left,
              width: MAX_W,
              opacity,
              alignItems: "center",
            }}
            onLayout={(e) => setTooltipH(e.nativeEvent.layout.height)}
          >
            {/* Arrow above card (position = bottom) */}
            {position === "bottom" && (
              <View
                style={{
                  width: 0, height: 0,
                  borderLeftWidth: ARROW,
                  borderRightWidth: ARROW,
                  borderBottomWidth: ARROW,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: bg,
                }}
              />
            )}

            {/* Tooltip card */}
            <View
              style={{
                backgroundColor: bg,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontFamily: font("base"),
                  fontSize:   fs("label"),
                  color:      colorTokens["surface"],
                  lineHeight: 18,
                  textAlign:  "center",
                }}
              >
                {content}
              </Text>
            </View>

            {/* Arrow below card (position = top) */}
            {position === "top" && (
              <View
                style={{
                  width: 0, height: 0,
                  borderLeftWidth: ARROW,
                  borderRightWidth: ARROW,
                  borderTopWidth: ARROW,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderTopColor: bg,
                }}
              />
            )}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}
