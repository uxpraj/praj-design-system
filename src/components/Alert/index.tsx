import { AlertCircle, AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import { colorTokens } from "../../theme/colors";
import { cn } from "../../lib/utils";

export type AlertVariant = "success" | "error" | "warning" | "info" | "neutral";

export interface AlertAction {
  label: string;
  onPress: () => void;
}

export interface AlertProps {
  description: string;
  variant?: AlertVariant;
  title?: string;
  action?: AlertAction;
  onDismiss?: () => void;
}

type VariantConfig = {
  container: string;
  iconColor: string;
  actionClass: string;
  Icon: LucideIcon;
};

const variantConfig: Record<AlertVariant, VariantConfig> = {
  success: {
    container: "bg-success-bg border border-success",
    iconColor: colorTokens["success"],
    actionClass: "text-success",
    Icon: CheckCircle,
  },
  error: {
    container: "bg-error-bg border border-error",
    iconColor: colorTokens["error"],
    actionClass: "text-error",
    Icon: XCircle,
  },
  warning: {
    container: "bg-warning-bg border border-warning",
    iconColor: colorTokens["warning"],
    actionClass: "text-warning",
    Icon: AlertTriangle,
  },
  info: {
    container: "bg-info-bg border border-info",
    iconColor: colorTokens["info"],
    actionClass: "text-info",
    Icon: Info,
  },
  neutral: {
    container: "bg-surface-subtle border border-neutral-faint",
    iconColor: colorTokens["neutral-subtle"],
    actionClass: "text-primary-high",
    Icon: AlertCircle,
  },
};

export function Alert({
  description,
  variant = "info",
  title,
  action,
  onDismiss,
}: AlertProps) {
  const { container, iconColor, actionClass, Icon } = variantConfig[variant];

  return (
    <View className={cn("rounded-12 p-16", container)}>
      <View className="flex-row gap-12">

        <Icon size={20} color={iconColor} strokeWidth={2} style={{ marginTop: 1 }} />

        <View className="flex-1 gap-4">
          {title && (
            <Text className="font-base-semibold text-body text-neutral-high">
              {title}
            </Text>
          )}
          <Text className="font-base text-body text-neutral-subtle leading-relaxed">
            {description}
          </Text>
          {action && (
            <Pressable onPress={action.onPress} className="mt-4">
              <Text className={cn("font-base-semibold text-body", actionClass)}>
                {action.label}
              </Text>
            </Pressable>
          )}
        </View>

        {onDismiss && (
          <Pressable onPress={onDismiss} hitSlop={8} style={{ marginTop: 1 }}>
            <X size={16} color={colorTokens["neutral-muted"]} strokeWidth={2} />
          </Pressable>
        )}

      </View>
    </View>
  );
}
