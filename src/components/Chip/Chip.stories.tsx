import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { Utensils, Shirt, Home, Dumbbell, Music, Plane } from "lucide-react-native";

import { Chip, ChipGroup } from ".";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chip>;

// ── States ────────────────────────────────────────────
export const States: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Chip label="Unselected" />
      <Chip label="Selected"   selected />
      <Chip label="Disabled"   disabled />
      <Chip label="Disabled selected" selected disabled />
    </View>
  ),
};

// ── Sizes ─────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Chip label="Small"  size="sm" />
        <Chip label="Small"  size="sm" selected />
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Chip label="Medium" size="md" />
        <Chip label="Medium" size="md" selected />
      </View>
    </View>
  ),
};

// ── With Icons ────────────────────────────────────────
export const WithIcons: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Chip
        label="Food"
        leftIcon={<Utensils size={14} color={colorTokens["neutral-muted"]} />}
      />
      <Chip
        label="Fashion"
        selected
        leftIcon={<Shirt size={14} color={colorTokens["primary-high"]} />}
      />
      <Chip
        label="Home"
        leftIcon={<Home size={14} color={colorTokens["neutral-muted"]} />}
      />
      <Chip
        label="Fitness"
        selected
        leftIcon={<Dumbbell size={14} color={colorTokens["primary-high"]} />}
      />
    </View>
  ),
};

// ── Single Select ─────────────────────────────────────
export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState("all");
    return (
      <ChipGroup
        options={[
          { value: "all",     label: "All" },
          { value: "active",  label: "Active" },
          { value: "draft",   label: "Draft" },
          { value: "archived",label: "Archived" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ── Multi Select ──────────────────────────────────────
export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["react-native"]);
    return (
      <ChipGroup
        multiSelect
        options={[
          { value: "react-native", label: "React Native" },
          { value: "expo",         label: "Expo" },
          { value: "typescript",   label: "TypeScript" },
          { value: "nativewind",   label: "NativeWind" },
          { value: "storybook",    label: "Storybook" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ── Scrollable Filter Bar ─────────────────────────────
export const ScrollableFilterBar: Story = {
  render: () => {
    const [value, setValue] = useState("all");
    return (
      <View style={{ marginHorizontal: -24 }}>
        <ChipGroup
          scrollable
          options={[
            { value: "all",     label: "All",     icon: <Home    size={14} color={value === "all"     ? colorTokens["primary-high"] : colorTokens["neutral-muted"]} /> },
            { value: "food",    label: "Food",    icon: <Utensils size={14} color={value === "food"    ? colorTokens["primary-high"] : colorTokens["neutral-muted"]} /> },
            { value: "fashion", label: "Fashion", icon: <Shirt   size={14} color={value === "fashion" ? colorTokens["primary-high"] : colorTokens["neutral-muted"]} /> },
            { value: "fitness", label: "Fitness", icon: <Dumbbell size={14} color={value === "fitness" ? colorTokens["primary-high"] : colorTokens["neutral-muted"]} /> },
            { value: "music",   label: "Music",   icon: <Music   size={14} color={value === "music"   ? colorTokens["primary-high"] : colorTokens["neutral-muted"]} /> },
            { value: "travel",  label: "Travel",  icon: <Plane   size={14} color={value === "travel"  ? colorTokens["primary-high"] : colorTokens["neutral-muted"]} /> },
          ]}
          value={value}
          onChange={setValue}
        />
      </View>
    );
  },
};
