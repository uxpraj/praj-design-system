import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { RangeSlider } from ".";

const meta: Meta<typeof RangeSlider> = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 32 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([20, 60]);
    return <RangeSlider min={0} max={100} value={value} onChange={setValue} label="Price Range" />;
  },
};

export const AgeRange: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 45]);
    return <RangeSlider min={18} max={80} value={value} onChange={setValue} label="Age" step={1} />;
  },
};

export const Disabled: Story = {
  render: () => (
    <RangeSlider min={0} max={100} value={[30, 70]} onChange={() => {}} disabled label="Disabled" />
  ),
};
