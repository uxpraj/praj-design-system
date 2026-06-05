import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { Checkbox } from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    label: "Accept terms and conditions",
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const Unchecked: Story = {
  args: { checked: false, label: "Unchecked" },
};

export const Checked: Story = {
  args: { checked: true, label: "Checked" },
};

export const Indeterminate: Story = {
  args: { checked: false, indeterminate: true, label: "Indeterminate" },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, label: "Disabled unchecked" },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true, label: "Disabled checked" },
};

export const NoLabel: Story = {
  args: { checked: true, label: undefined },
};

export const AllStates: Story = {
  render: () => {
    const [states, setStates] = useState({
      one: false,
      two: true,
      three: false,
      four: true,
    });
    return (
      <View className="gap-4 p-4">
        <Checkbox
          checked={states.one}
          onChange={(v) => setStates((s) => ({ ...s, one: v }))}
          label="Subscribe to newsletter"
        />
        <Checkbox
          checked={states.two}
          onChange={(v) => setStates((s) => ({ ...s, two: v }))}
          label="Remember me"
        />
        <Checkbox
          checked={false}
          indeterminate
          onChange={() => {}}
          label="Select all (indeterminate)"
        />
        <Checkbox
          checked={false}
          disabled
          onChange={() => {}}
          label="Disabled option"
        />
        <Checkbox
          checked={true}
          disabled
          onChange={() => {}}
          label="Disabled checked"
        />
      </View>
    );
  },
};
