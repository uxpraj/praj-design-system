import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";

import { Divider } from ".";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 32 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Divider>;

const Block = ({ label }: { label: string }) => (
  <View style={{ paddingVertical: 12 }}>
    <Text style={{ fontFamily: "DMSans_400Regular", fontSize: 14, color: "#9ca3af" }}>
      {label}
    </Text>
  </View>
);

// ── Solid ─────────────────────────────────────────────
export const Solid: Story = {
  render: () => (
    <View style={{ gap: 0 }}>
      <Block label="Section A" />
      <Divider variant="solid" />
      <Block label="Section B" />
      <Divider variant="solid" />
      <Block label="Section C" />
    </View>
  ),
};

// ── Dashed ────────────────────────────────────────────
export const Dashed: Story = {
  render: () => (
    <View style={{ gap: 0 }}>
      <Block label="Section A" />
      <Divider variant="dashed" />
      <Block label="Section B" />
      <Divider variant="dashed" />
      <Block label="Section C" />
    </View>
  ),
};

// ── With Label ────────────────────────────────────────
export const WithLabel: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <Divider variant="solid"  label="or" />
      <Divider variant="dashed" label="or" />
      <Divider variant="solid"  label="continue with" />
      <Divider variant="dashed" label="today" />
    </View>
  ),
};

// ── Vertical ──────────────────────────────────────────
export const Vertical: Story = {
  render: () => (
    <View style={{ flexDirection: "row", height: 48, alignItems: "center", gap: 16 }}>
      <Text style={{ fontFamily: "DMSans_400Regular", fontSize: 14, color: "#4b5563" }}>Home</Text>
      <Divider orientation="vertical" variant="solid" />
      <Text style={{ fontFamily: "DMSans_400Regular", fontSize: 14, color: "#4b5563" }}>Profile</Text>
      <Divider orientation="vertical" variant="dashed" />
      <Text style={{ fontFamily: "DMSans_400Regular", fontSize: 14, color: "#4b5563" }}>Settings</Text>
    </View>
  ),
};

// ── All ───────────────────────────────────────────────
export const All: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <Divider variant="solid" />
      <Divider variant="dashed" />
      <Divider variant="solid"  label="or" />
      <Divider variant="dashed" label="or" />
    </View>
  ),
};
