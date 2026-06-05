import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { Slider } from "./index";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  args: {
    value: 40,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    showValue: true,
    label: "Volume",
  },
  argTypes: {
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
    onValueChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {};

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(40);
    return (
      <View className="p-4">
        <Slider value={value} onValueChange={setValue} label="Volume" showValue />
      </View>
    );
  },
};

export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState(2);
    return (
      <View className="p-4">
        <Slider
          value={value}
          onValueChange={setValue}
          label="Rating"
          min={1}
          max={5}
          step={1}
          showValue
        />
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <View className="p-4">
      <Slider value={60} onValueChange={() => {}} label="Disabled" showValue disabled />
    </View>
  ),
};

export const AllStates: Story = {
  render: () => {
    const [volume, setVolume] = useState(70);
    const [brightness, setBrightness] = useState(40);
    const [zoom, setZoom] = useState(1);
    return (
      <View className="gap-6 p-4">
        <Slider value={volume} onValueChange={setVolume} label="Volume" showValue />
        <Slider value={brightness} onValueChange={setBrightness} label="Brightness" showValue />
        <Slider
          value={zoom}
          onValueChange={setZoom}
          label="Zoom"
          min={1}
          max={10}
          step={0.5}
          showValue
        />
        <Slider value={50} onValueChange={() => {}} label="Disabled" showValue disabled />
      </View>
    );
  },
};
