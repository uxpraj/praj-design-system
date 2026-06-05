import { AlertTriangle, Bell, CheckCircle, Info, X, XCircle } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";
import { cn } from "../../lib/utils";

export type ToastVariant = "success" | "error" | "warning" | "info" | "neutral";

export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastProps {
  visible: boolean;
  message: string;
  variant?: ToastVariant;
  action?: ToastAction;
  onDismiss?: () => void;
  duration?: number;
}

type VariantConfig = {
  container: string;
  iconColor: string;
  Icon: LucideIcon;
};

const variantConfig: Record<ToastVariant, VariantConfig> = {
  success: {
    container: "bg-success-bg border border-success",
    iconColor: colorTokens["success"],
    Icon: CheckCircle,
  },
  error: {
    container: "bg-error-bg border border-error",
    iconColor: colorTokens["error"],
    Icon: XCircle,
  },
  warning: {
    container: "bg-warning-bg border border-warning",
    iconColor: colorTokens["warning"],
    Icon: AlertTriangle,
  },
  info: {
    container: "bg-info-bg border border-info",
    iconColor: colorTokens["info"],
    Icon: Info,
  },
  neutral: {
    container: "bg-neutral-high",
    iconColor: colorTokens["surface"],
    Icon: Bell,
  },
};

const messageClass: Record<ToastVariant, string> = {
  success: "text-neutral-high",
  error:   "text-neutral-high",
  warning: "text-neutral-high",
  info:    "text-neutral-high",
  neutral: "text-white",
};

const actionClass: Record<ToastVariant, string> = {
  success: "text-success",
  error:   "text-error",
  warning: "text-warning",
  info:    "text-info",
  neutral: "text-primary-muted",
};

const dismissColor: Record<ToastVariant, string> = {
  success: colorTokens["neutral-muted"],
  error:   colorTokens["neutral-muted"],
  warning: colorTokens["neutral-muted"],
  info:    colorTokens["neutral-muted"],
  neutral: colorTokens["neutral-faint"],
};

export function Toast({
  visible,
  message,
  variant = "neutral",
  action,
  onDismiss,
  duration = 3000,
}: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const { Icon, container, iconColor } = variantConfig[variant];

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(opacity,    { toValue: 1, useNativeDriver: true, bounciness: 0 }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 4 }),
      ]).start();

      if (duration > 0 && onDismiss) {
        const timer = setTimeout(onDismiss, duration);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.parallel([
        Animated.timing(opacity,    { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 16, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View
      pointerEvents={visible ? "auto" : "none"}
      style={{ opacity, transform: [{ translateY }] }}
    >
      <View
        className={cn(
          "flex-row items-center gap-12 px-16 py-12 rounded-8 mx-16",
          container
        )}
        style={{
          ...shadowStyles.medium,
        }}
      >
        <Icon size={20} color={iconColor} strokeWidth={2} />

        <Text className={cn("flex-1 font-base text-body", messageClass[variant])}>
          {message}
        </Text>

        {action && (
          <Pressable onPress={action.onPress} hitSlop={8}>
            <Text className={cn("font-base-semibold text-body", actionClass[variant])}>
              {action.label}
            </Text>
          </Pressable>
        )}

        {onDismiss && (
          <Pressable onPress={onDismiss} hitSlop={8}>
            <X size={16} color={dismissColor[variant]} strokeWidth={2} />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}
