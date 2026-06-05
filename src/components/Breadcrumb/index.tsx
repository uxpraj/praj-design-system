import { ChevronRight } from "lucide-react-native";
import { useRef, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  maxVisible?: number;
}

function Separator() {
  return (
    <ChevronRight size={14} color={colorTokens["neutral-muted"]} strokeWidth={2} />
  );
}

export function Breadcrumb({ items, maxVisible = 3 }: BreadcrumbProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const ellipsisRef = useRef<View>(null);

  const needsCollapse = items.length > maxVisible;
  const endCount    = maxVisible - 1;
  const visibleEnd  = needsCollapse ? items.slice(-endCount) : items.slice(1);
  const collapsed   = needsCollapse ? items.slice(1, -endCount) : [];

  const handleEllipsisPress = () => {
    ellipsisRef.current?.measure((_x, _y, _w, height, pageX, pageY) => {
      setDropdownPos({ top: pageY + height + 6, left: pageX });
      setShowDropdown(true);
    });
  };

  const renderLabel = (item: BreadcrumbItem, isLast: boolean) => (
    <Pressable
      onPress={item.onPress}
      disabled={isLast || !item.onPress}
      hitSlop={6}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: isLast ? "DMSans_500Medium" : "DMSans_400Regular",
          color: isLast
            ? colorTokens["neutral-high"]
            : colorTokens["neutral-muted"],
        }}
      >
        {item.label}
      </Text>
    </Pressable>
  );

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 }}>

        {/* First item */}
        {renderLabel(items[0], items.length === 1)}

        {/* Ellipsis */}
        {needsCollapse && (
          <>
            <Separator />
            <View ref={ellipsisRef} collapsable={false}>
              <Pressable onPress={handleEllipsisPress}>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    backgroundColor: colorTokens["surface-subtle"],
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      color: colorTokens["neutral-subtle"],
                      fontFamily: "DMSans_500Medium",
                      fontSize: 12,
                      letterSpacing: 2,
                    }}
                  >
                    ···
                  </Text>
                </View>
              </Pressable>
            </View>
          </>
        )}

        {/* End items */}
        {visibleEnd.map((item, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Separator />
            {renderLabel(item, i === visibleEnd.length - 1)}
          </View>
        ))}

      </View>

      {/* Collapsed dropdown */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setShowDropdown(false)}
        >
          <View
            style={{
              position: "absolute",
              top: dropdownPos.top,
              left: dropdownPos.left,
              backgroundColor: colorTokens["surface"],
              borderRadius: 12,
              paddingVertical: 4,
              minWidth: 180,
              ...shadowStyles.medium,
            }}
          >
            {collapsed.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  setShowDropdown(false);
                  item.onPress?.();
                }}
                style={({ pressed }) => ({
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: pressed
                    ? colorTokens["surface-subtle"]
                    : "transparent",
                })}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans_400Regular",
                    color: colorTokens["neutral-high"],
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
