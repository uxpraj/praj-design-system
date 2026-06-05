import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { Toggle } from "./index";

function ControlledToggle(props: { size?: "sm" | "md"; disabled?: boolean }) {
  const [value, setValue] = useState(false);
  return <Toggle value={value} onValueChange={setValue} {...props} />;
}

function ToggleRow({ label, size }: { label: string; size?: "sm" | "md" }) {
  const [value, setValue] = useState(false);
  return (
    <View className="flex-row items-center justify-between">
      <Text className="font-base text-base text-neutral-high">{label}</Text>
      <Toggle value={value} onValueChange={setValue} size={size} />
    </View>
  );
}

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    value: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["sm", "md"] },
    onValueChange: { action: "changed" },
  },
  args: { value: false, disabled: false, size: "md" },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Off: Story = {
  args: { value: false },
};

export const On: Story = {
  args: { value: true },
};

export const Small: Story = {
  render: () => <ControlledToggle size="sm" />,
};

export const Disabled: Story = {
  args: { value: false, disabled: true },
};

export const Interactive: Story = {
  render: () => <ControlledToggle />,
};

export const InList: Story = {
  render: () => (
    <View className="gap-5 px-1">
      <ToggleRow label="Push Notifications" />
      <ToggleRow label="Dark Mode" />
      <ToggleRow label="Auto-save" size="sm" />
    </View>
  ),
};
