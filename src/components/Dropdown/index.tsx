import { ChevronRight } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";

export interface DropdownMenuItem {
  label: string;
  onPress?: () => void;
  shortcut?: string;
  hasSubmenu?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownMenuGroup {
  label?: string;
  items: DropdownMenuItem[];
}

export interface DropdownProps {
  visible: boolean;
  onClose: () => void;
  groups: DropdownMenuGroup[];
  position: { top: number; left?: number; right?: number };
}

function GroupLabel({ label }: { label: string }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 }}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "DMSans_500Medium",
          color: colorTokens["neutral-muted"],
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function ItemRow({
  item,
  onClose,
}: {
  item: DropdownMenuItem;
  onClose: () => void;
}) {
  const handlePress = () => {
    if (item.disabled || !item.onPress) return;
    onClose();
    item.onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={item.disabled}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 12,
        backgroundColor: pressed && !item.disabled
          ? item.destructive
            ? colorTokens["error-bg"]
            : colorTokens["surface-subtle"]
          : "transparent",
      })}
    >
      {/* Left: icon + label */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
        {item.icon && (
          <View style={{ opacity: item.disabled ? 0.4 : 1 }}>
            {item.icon}
          </View>
        )}
        <Text
          style={{
            fontSize: 16,
            fontFamily: "DMSans_400Regular",
            color: item.disabled
              ? colorTokens["neutral-muted"]
              : item.destructive
              ? colorTokens["error"]
              : colorTokens["neutral-high"],
          }}
        >
          {item.label}
        </Text>
      </View>

      {/* Right: shortcut or submenu chevron */}
      {item.hasSubmenu && (
        <ChevronRight size={16} color={colorTokens["neutral-muted"]} strokeWidth={2} />
      )}
      {item.shortcut && !item.hasSubmenu && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: "DMSans_400Regular",
            color: colorTokens["neutral-muted"],
          }}
        >
          {item.shortcut}
        </Text>
      )}
    </Pressable>
  );
}

function GroupDivider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colorTokens["neutral-faint"],
        marginVertical: 4,
      }}
    />
  );
}

export function Dropdown({ visible, onClose, groups, position }: DropdownProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.spring(scale,   { toValue: 1, bounciness: 0, speed: 20, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.timing(opacity, { toValue: 0, duration: 100, useNativeDriver: true }).start();
      scale.setValue(0.96);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <Animated.View
          style={{
            position: "absolute",
            top: position.top,
            ...(position.right !== undefined
              ? { right: position.right }
              : { left: position.left ?? 0 }),
            opacity,
            transform: [{ scale }],
            minWidth: 220,
            backgroundColor: colorTokens["surface"],
            borderRadius: 12,
            paddingVertical: 4,
            ...shadowStyles.strong,
          }}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            {groups.map((group, gi) => (
              <View key={gi}>
                {gi > 0 && <GroupDivider />}
                {group.label && <GroupLabel label={group.label} />}
                {group.items.map((item, ii) => (
                  <ItemRow key={ii} item={item} onClose={onClose} />
                ))}
              </View>
            ))}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
