import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { TextArea } from ".";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

// ── Default ───────────────────────────────────────────
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        label="Message"
        placeholder="Write your message..."
        value={value}
        onChangeText={setValue}
      />
    );
  },
};

// ── With hint ─────────────────────────────────────────
export const WithHint: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        label="Bio"
        placeholder="Tell us about yourself..."
        hint="This will appear on your public profile."
        value={value}
        onChangeText={setValue}
      />
    );
  },
};

// ── With character counter ────────────────────────────
export const WithCounter: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        label="Review"
        placeholder="Write your review..."
        value={value}
        onChangeText={setValue}
        maxLength={200}
      />
    );
  },
};

// ── Error state ───────────────────────────────────────
export const ErrorState: Story = {
  render: () => (
    <TextArea
      label="Description"
      value="Too short"
      error="Description must be at least 20 characters."
    />
  ),
};

// ── Disabled ──────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <TextArea
      label="Notes"
      value="This field is read-only."
      disabled
    />
  ),
};

// ── Custom rows ───────────────────────────────────────
export const CustomRows: Story = {
  render: () => {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    return (
      <View style={{ gap: 20 }}>
        <TextArea label="2 rows"  numberOfLines={2} placeholder="Short note..." value={a} onChangeText={setA} />
        <TextArea label="6 rows"  numberOfLines={6} placeholder="Long description..." value={b} onChangeText={setB} />
      </View>
    );
  },
};

// ── Full featured ─────────────────────────────────────
export const FullFeatured: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        label="Feedback"
        placeholder="Share your thoughts..."
        hint="Your feedback helps us improve."
        value={value}
        onChangeText={setValue}
        maxLength={500}
        numberOfLines={5}
      />
    );
  },
};
