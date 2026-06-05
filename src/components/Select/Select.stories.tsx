import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { Select } from "./index";

const countries = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "India", value: "in" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  args: {
    placeholder: "Select a country",
    label: "Country",
    disabled: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <View className="p-4">
        <Select
          label="Country"
          placeholder="Select a country"
          options={countries}
          value={value}
          onChange={setValue}
        />
      </View>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("in");
    return (
      <View className="p-4">
        <Select
          label="Country"
          options={countries}
          value={value}
          onChange={setValue}
        />
      </View>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <View className="p-4">
        <Select
          label="Country"
          placeholder="Select a country"
          options={countries}
          value={value}
          onChange={setValue}
          error="Please select a country"
        />
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <View className="p-4">
      <Select
        label="Country"
        placeholder="Not available"
        options={countries}
        value={undefined}
        onChange={() => {}}
        disabled
      />
    </View>
  ),
};

export const AllStates: Story = {
  render: () => {
    const [country, setCountry] = useState<string | undefined>();
    const [plan, setPlan] = useState("pro");
    return (
      <View className="gap-4 p-4">
        <Select
          label="Country"
          placeholder="Select a country"
          options={countries}
          value={country}
          onChange={setCountry}
        />
        <Select
          label="Plan"
          options={[
            { label: "Free", value: "free" },
            { label: "Pro", value: "pro" },
            { label: "Enterprise", value: "enterprise" },
          ]}
          value={plan}
          onChange={setPlan}
        />
        <Select
          label="Region"
          placeholder="Select a region"
          options={countries}
          value={undefined}
          onChange={() => {}}
          error="Region is required"
        />
        <Select
          label="Currency (disabled)"
          placeholder="Not available"
          options={[]}
          value={undefined}
          onChange={() => {}}
          disabled
        />
      </View>
    );
  },
};
