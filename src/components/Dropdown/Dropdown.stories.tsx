import type { Meta, StoryObj } from "@storybook/react-native";
import { useState, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import {
  User, CreditCard, Settings, Users, UserPlus,
  Plus, Github, LifeBuoy, Code, LogOut, ChevronRight
} from "lucide-react-native";

import { Dropdown } from ".";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

function TriggerButton({
  label,
  onPress,
}: {
  label: string;
  onPress: (pos: { top: number; left: number }) => void;
}) {
  const ref = useRef<View>(null);
  return (
    <View ref={ref} collapsable={false}>
      <Pressable
        onPress={() => {
          ref.current?.measure((_x, _y, _w, height, pageX, pageY) => {
            onPress({ top: pageY + height + 8, left: pageX });
          });
        }}
        style={{
          backgroundColor: colorTokens["primary-high"],
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 12,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ color: "white", fontFamily: "DMSans_500Medium", fontSize: 14 }}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

// ── Matches screenshot exactly ────────────────────────
const nc = colorTokens["neutral-subtle"];
const nm = colorTokens["neutral-muted"];

const accountGroups = [
  {
    label: "My Account",
    items: [
      { label: "Profile",  shortcut: "⇧⌘P", onPress: () => {}, icon: <User       size={16} color={nc} /> },
      { label: "Billing",  shortcut: "⌘B",   onPress: () => {}, icon: <CreditCard size={16} color={nc} /> },
      { label: "Settings", shortcut: "⌘S",   onPress: () => {}, icon: <Settings   size={16} color={nc} /> },
    ],
  },
  {
    items: [
      { label: "Team",         onPress: () => {},  icon: <Users    size={16} color={nc} /> },
      { label: "Invite users", hasSubmenu: true,   icon: <UserPlus size={16} color={nc} /> },
      { label: "New Team",     shortcut: "⌘+T", onPress: () => {}, icon: <Plus size={16} color={nc} /> },
    ],
  },
  {
    items: [
      { label: "GitHub",  onPress: () => {}, icon: <Github   size={16} color={nc} /> },
      { label: "Support", onPress: () => {}, icon: <LifeBuoy size={16} color={nc} /> },
      { label: "API",     disabled: true,    icon: <Code     size={16} color={nm} /> },
    ],
  },
  {
    items: [
      { label: "Log out", shortcut: "⇧⌘Q", onPress: () => {}, icon: <LogOut size={16} color={nc} /> },
    ],
  },
];

export const AccountMenu: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    return (
      <View>
        <TriggerButton
          label="My Account ▾"
          onPress={(p) => { setPos(p); setVisible(true); }}
        />
        <Dropdown
          visible={visible}
          onClose={() => setVisible(false)}
          position={pos}
          groups={accountGroups}
        />
      </View>
    );
  },
};

// ── Static preview (Storybook web safe) ──────────────
type PreviewItem = {
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  chevron?: boolean;
  disabled?: boolean;
};

const group1: PreviewItem[] = [
  { label: "Profile",  shortcut: "⇧⌘P", icon: <User       size={16} color={colorTokens["neutral-subtle"]} /> },
  { label: "Billing",  shortcut: "⌘B",   icon: <CreditCard size={16} color={colorTokens["neutral-subtle"]} /> },
  { label: "Settings", shortcut: "⌘S",   icon: <Settings   size={16} color={colorTokens["neutral-subtle"]} /> },
];
const group2: PreviewItem[] = [
  { label: "Team",         icon: <Users    size={16} color={colorTokens["neutral-subtle"]} /> },
  { label: "Invite users", icon: <UserPlus size={16} color={colorTokens["neutral-subtle"]} />, chevron: true },
  { label: "New Team",     icon: <Plus     size={16} color={colorTokens["neutral-subtle"]} />, shortcut: "⌘+T" },
];
const group3: PreviewItem[] = [
  { label: "GitHub",  icon: <Github   size={16} color={colorTokens["neutral-subtle"]} /> },
  { label: "Support", icon: <LifeBuoy size={16} color={colorTokens["neutral-subtle"]} /> },
  { label: "API",     icon: <Code     size={16} color={colorTokens["neutral-muted"]}  />, disabled: true },
];
const group4: PreviewItem[] = [
  { label: "Log out", shortcut: "⇧⌘Q", icon: <LogOut size={16} color={colorTokens["neutral-subtle"]} /> },
];

const RowItem = ({ item }: { item: PreviewItem }) => (
  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10, gap: 12 }}>
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
      {item.icon}
      <Text style={{ fontSize: 16, fontFamily: "DMSans_400Regular", color: item.disabled ? colorTokens["neutral-muted"] : colorTokens["neutral-high"] }}>
        {item.label}
      </Text>
    </View>
    {item.chevron && <ChevronRight size={16} color={colorTokens["neutral-muted"]} strokeWidth={2} />}
    {item.shortcut && <Text style={{ fontSize: 12, fontFamily: "DMSans_400Regular", color: colorTokens["neutral-muted"] }}>{item.shortcut}</Text>}
  </View>
);

const Divider = () => <View style={{ height: 1, backgroundColor: colorTokens["neutral-faint"], marginVertical: 4 }} />;

export const StaticPreview: Story = {
  render: () => (
    <View style={{ backgroundColor: colorTokens["surface"], borderRadius: 12, paddingVertical: 4, minWidth: 220, alignSelf: "flex-start", shadowColor: colorTokens["shadow"], shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 12 }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 }}>
        <Text style={{ fontSize: 12, fontFamily: "DMSans_500Medium", color: colorTokens["neutral-muted"] }}>My Account</Text>
      </View>
      {group1.map(item => <RowItem key={item.label} item={item} />)}
      <Divider />
      {group2.map(item => <RowItem key={item.label} item={item} />)}
      <Divider />
      {group3.map(item => <RowItem key={item.label} item={item} />)}
      <Divider />
      {group4.map(item => <RowItem key={item.label} item={item} />)}
    </View>
  ),
};

// ── Simple (no icons, no shortcuts) ──────────────────
export const Simple: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    return (
      <View>
        <TriggerButton
          label="Options ▾"
          onPress={(p) => { setPos(p); setVisible(true); }}
        />
        <Dropdown
          visible={visible}
          onClose={() => setVisible(false)}
          position={pos}
          groups={[
            {
              items: [
                { label: "Edit",      onPress: () => {} },
                { label: "Duplicate", onPress: () => {} },
                { label: "Archive",   onPress: () => {} },
              ],
            },
            {
              items: [
                { label: "Delete", onPress: () => {}, destructive: true },
              ],
            },
          ]}
        />
      </View>
    );
  },
};
