import { LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { shadowStyles } from "../../theme/shadows";
import { Icon } from "../Icon";
import { Text } from "../Text";

export interface NavTab {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface BottomNavProps {
  tabs: NavTab[];
  activeKey: string;
  onTabPress: (key: string) => void;
}

export function BottomNav({ tabs, activeKey, onTabPress }: BottomNavProps) {
  return (
    <View
      className="flex-row bg-surface rounded-24 mx-16"
      style={{
        ...shadowStyles.medium,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            className="flex-1 items-center justify-center py-16 gap-4"
          >
            <Icon
              icon={tab.icon}
              color={isActive ? "primary-high" : "neutral-subtle"}
              size="md"
            />
            <Text
              variant="label"
              weight="medium"
              className={isActive ? "text-primary-high" : "text-neutral-subtle"}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
