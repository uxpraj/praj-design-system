import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { ProgressBar } from ".";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// ── All variants ──────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ProgressBar value={70} variant="primary" label="Primary"  showValue />
      <ProgressBar value={85} variant="success" label="Success"  showValue />
      <ProgressBar value={40} variant="error"   label="Error"    showValue />
      <ProgressBar value={60} variant="warning" label="Warning"  showValue />
      <ProgressBar value={55} variant="info"    label="Info"     showValue />
      <ProgressBar value={30} variant="neutral" label="Neutral"  showValue />
    </View>
  ),
};

// ── Sizes ─────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ProgressBar value={65} size="sm" label="Small (4px)"  showValue />
      <ProgressBar value={65} size="md" label="Medium (8px)" showValue />
      <ProgressBar value={65} size="lg" label="Large (12px)" showValue />
    </View>
  ),
};

// ── Progress steps ────────────────────────────────────
export const ProgressSteps: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ProgressBar value={25}  variant="primary" label="Uploading…"   showValue />
      <ProgressBar value={50}  variant="primary" label="Processing…"  showValue />
      <ProgressBar value={75}  variant="warning" label="Almost done…" showValue />
      <ProgressBar value={100} variant="success" label="Complete!"    showValue />
    </View>
  ),
};

// ── Indeterminate ─────────────────────────────────────
export const Indeterminate: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ProgressBar indeterminate variant="primary" label="Loading…" />
      <ProgressBar indeterminate variant="info"    label="Syncing…" size="sm" />
      <ProgressBar indeterminate variant="neutral" label="Please wait…" size="lg" />
    </View>
  ),
};

// ── Interactive ───────────────────────────────────────
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <View style={{ gap: 24 }}>
        <ProgressBar value={value} variant="primary" label="Upload progress" showValue size="md" />
        <View style={{ flexDirection: "row", gap: 12, justifyContent: "center" }}>
          <Pressable
            onPress={() => setValue((v) => Math.max(0, v - 10))}
            style={{ backgroundColor: "#e5e7eb", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 }}
          >
            <Text style={{ fontFamily: "DM Sans", fontWeight: "600", color: "#4b5563" }}>−10</Text>
          </Pressable>
          <Pressable
            onPress={() => setValue((v) => Math.min(100, v + 10))}
            style={{ backgroundColor: "#7c3aed", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 }}
          >
            <Text style={{ fontFamily: "DM Sans", fontWeight: "600", color: "white" }}>+10</Text>
          </Pressable>
          <Pressable
            onPress={() => setValue(0)}
            style={{ backgroundColor: "#e5e7eb", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 }}
          >
            <Text style={{ fontFamily: "DM Sans", fontWeight: "600", color: "#4b5563" }}>Reset</Text>
          </Pressable>
        </View>
      </View>
    );
  },
};
