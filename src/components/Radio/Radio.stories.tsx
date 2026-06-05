import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { Radio, RadioGroup } from "./index";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  args: {
    selected: false,
    disabled: false,
    label: "Option A",
  },
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    onPress: { action: "pressed" },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Playground: Story = {};

export const Unselected: Story = {
  args: { selected: false, label: "Unselected" },
};

export const Selected: Story = {
  args: { selected: true, label: "Selected" },
};

export const Disabled: Story = {
  args: { selected: false, disabled: true, label: "Disabled" },
};

export const DisabledSelected: Story = {
  args: { selected: true, disabled: true, label: "Disabled selected" },
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState("b");
    return (
      <View className="p-4">
        <RadioGroup
          value={value}
          onChange={setValue}
          options={[
            { label: "Free plan", value: "a" },
            { label: "Pro plan", value: "b" },
            { label: "Enterprise", value: "c" },
          ]}
        />
      </View>
    );
  },
};

export const GroupDisabled: Story = {
  render: () => (
    <View className="p-4">
      <RadioGroup
        value="a"
        onChange={() => {}}
        disabled
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" },
        ]}
      />
    </View>
  ),
};
