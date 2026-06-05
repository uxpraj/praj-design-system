import type { Meta, StoryObj } from "@storybook/react-native";
import {
  Home,
  Music,
  ShoppingBag,
  User,
  Search,
  Heart,
  Bell,
  Settings,
  Grid,
  MessageCircle,
} from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import { BottomNav } from "./index";

const meta: Meta<typeof BottomNav> = {
  title: "Navigation/BottomNav",
  component: BottomNav,
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <View className="flex-1 bg-surface-subtle justify-end pb-8">
        <BottomNav
          activeKey={active}
          onTabPress={setActive}
          tabs={[
            { key: "home",    label: "Home",    icon: Home },
            { key: "tanpura", label: "Tanpura", icon: Music },
            { key: "bag",     label: "My Bag",  icon: ShoppingBag },
            { key: "profile", label: "Profile", icon: User },
          ]}
        />
      </View>
    );
  },
};

export const ThreeTabs: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <View className="flex-1 bg-surface-subtle justify-end pb-8">
        <BottomNav
          activeKey={active}
          onTabPress={setActive}
          tabs={[
            { key: "home",   label: "Home",   icon: Home },
            { key: "search", label: "Search", icon: Search },
            { key: "profile",label: "Profile",icon: User },
          ]}
        />
      </View>
    );
  },
};

export const FiveTabs: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <View className="flex-1 bg-surface-subtle justify-end pb-8">
        <BottomNav
          activeKey={active}
          onTabPress={setActive}
          tabs={[
            { key: "home",     label: "Home",     icon: Home },
            { key: "explore",  label: "Explore",  icon: Grid },
            { key: "messages", label: "Messages", icon: MessageCircle },
            { key: "favorites",label: "Saved",    icon: Heart },
            { key: "profile",  label: "Profile",  icon: User },
          ]}
        />
      </View>
    );
  },
};

export const AllTabsActive: Story = {
  render: () => {
    const tabs = [
      { key: "home",    label: "Home",    icon: Home },
      { key: "search",  label: "Search",  icon: Search },
      { key: "alerts",  label: "Alerts",  icon: Bell },
      { key: "settings",label: "Settings",icon: Settings },
    ];
    return (
      <View className="bg-surface-subtle gap-4 p-4 pt-8">
        {tabs.map((tab) => (
          <BottomNav
            key={tab.key}
            activeKey={tab.key}
            onTabPress={() => {}}
            tabs={tabs}
          />
        ))}
      </View>
    );
  },
};
