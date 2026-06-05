import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Header } from ".";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: "#f4f4f5" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

// ── Full (back + title + notification) ───────────────
export const Full: Story = {
  render: () => (
    <Header
      title="Notifications"
      onBack={() => {}}
      onNotification={() => {}}
      notificationCount={3}
    />
  ),
};

// ── With badge count ──────────────────────────────────
export const WithBadge: Story = {
  render: () => (
    <View style={{ gap: 2 }}>
      <Header title="Messages"  onBack={() => {}} onNotification={() => {}} notificationCount={1}   />
      <Header title="Feed"      onBack={() => {}} onNotification={() => {}} notificationCount={12}  />
      <Header title="Activity"  onBack={() => {}} onNotification={() => {}} notificationCount={100} />
    </View>
  ),
};

// ── Back only ─────────────────────────────────────────
export const BackOnly: Story = {
  render: () => (
    <Header title="Settings" onBack={() => {}} />
  ),
};

// ── Notification only ─────────────────────────────────
export const NotificationOnly: Story = {
  render: () => (
    <Header title="Home" onNotification={() => {}} notificationCount={5} />
  ),
};

// ── Title only ────────────────────────────────────────
export const TitleOnly: Story = {
  render: () => (
    <Header title="Profile" />
  ),
};
