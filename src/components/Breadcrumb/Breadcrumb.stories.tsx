import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Breadcrumb } from ".";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 32 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// ── Short (no collapse) ───────────────────────────────
export const Short: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home",       onPress: () => {} },
        { label: "Components", onPress: () => {} },
        { label: "Button" },
      ]}
    />
  ),
};

// ── Two items ─────────────────────────────────────────
export const TwoItems: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home",   onPress: () => {} },
        { label: "Button" },
      ]}
    />
  ),
};

// ── Collapsed (matches screenshot) ───────────────────
export const Collapsed: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home",          onPress: () => {} },
        { label: "Documentation", onPress: () => {} },
        { label: "Themes",        onPress: () => {} },
        { label: "GitHub",        onPress: () => {} },
        { label: "Components",    onPress: () => {} },
        { label: "Breadcrumb" },
      ]}
      maxVisible={3}
    />
  ),
};

// ── maxVisible = 4 ────────────────────────────────────
export const MaxVisible4: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home",       onPress: () => {} },
        { label: "Settings",   onPress: () => {} },
        { label: "Account",    onPress: () => {} },
        { label: "Privacy",    onPress: () => {} },
        { label: "Appearance" },
      ]}
      maxVisible={4}
    />
  ),
};

// ── Deep navigation ───────────────────────────────────
export const Deep: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <Breadcrumb
        items={[
          { label: "Home",     onPress: () => {} },
          { label: "Products", onPress: () => {} },
          { label: "Electronics", onPress: () => {} },
          { label: "Phones",   onPress: () => {} },
          { label: "iPhone 15" },
        ]}
        maxVisible={3}
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", onPress: () => {} },
          { label: "Projects",  onPress: () => {} },
          { label: "Design",    onPress: () => {} },
          { label: "Components", onPress: () => {} },
          { label: "Atoms",     onPress: () => {} },
          { label: "Button" },
        ]}
        maxVisible={3}
      />
    </View>
  ),
};
