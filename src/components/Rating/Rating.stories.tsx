import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { Rating } from ".";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Rating>;

// ── Display only ──────────────────────────────────────
export const DisplayOnly: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Rating value={5}   />
      <Rating value={4}   />
      <Rating value={3.5} allowHalf />
      <Rating value={2.5} allowHalf />
      <Rating value={1}   />
      <Rating value={0}   />
    </View>
  ),
};

// ── With value + review count ─────────────────────────
export const WithLabel: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Rating value={4.5} allowHalf showValue reviewCount={2341} />
      <Rating value={3.8} allowHalf showValue reviewCount={128}  />
      <Rating value={5}             showValue reviewCount={47}   />
    </View>
  ),
};

// ── Sizes ─────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Rating value={4} size="sm" showValue />
      <Rating value={4} size="md" showValue />
      <Rating value={4} size="lg" showValue />
    </View>
  ),
};

// ── Interactive ───────────────────────────────────────
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <Rating value={value} onChange={setValue} size="lg" showValue />;
  },
};

// ── Interactive half star ─────────────────────────────
export const InteractiveHalf: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <Rating value={value} onChange={setValue} size="lg" allowHalf showValue />;
  },
};
