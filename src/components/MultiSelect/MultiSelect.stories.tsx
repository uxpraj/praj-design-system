import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { MultiSelect } from ".";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const LANGUAGES = [
  { label: "Hindi",     value: "hindi"     },
  { label: "English",   value: "english"   },
  { label: "Tamil",     value: "tamil"     },
  { label: "Telugu",    value: "telugu"    },
  { label: "Kannada",   value: "kannada"   },
  { label: "Malayalam", value: "malayalam" },
  { label: "Bengali",   value: "bengali"   },
  { label: "Marathi",   value: "marathi"   },
  { label: "Punjabi",   value: "punjabi"   },
];

const SKILLS = [
  { label: "React Native", value: "rn"   },
  { label: "TypeScript",   value: "ts"   },
  { label: "Swift",        value: "swift"},
  { label: "Kotlin",       value: "kt"   },
  { label: "Flutter",      value: "fl"   },
  { label: "Expo",         value: "expo" },
];

// ── Default ───────────────────────────────────────────
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        label="Languages"
        placeholder="Select languages"
        options={LANGUAGES}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ── Pre-selected ──────────────────────────────────────
export const PreSelected: Story = {
  render: () => {
    const [value, setValue] = useState(["hindi", "tamil", "bengali"]);
    return (
      <MultiSelect
        label="Languages"
        options={LANGUAGES}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ── With hint ─────────────────────────────────────────
export const WithHint: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        label="Skills"
        placeholder="Select your skills"
        hint="Select all that apply"
        options={SKILLS}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ── Error state ───────────────────────────────────────
export const ErrorState: Story = {
  render: () => (
    <MultiSelect
      label="Languages"
      placeholder="Select languages"
      options={LANGUAGES}
      value={[]}
      onChange={() => {}}
      error="Please select at least one language"
    />
  ),
};

// ── Disabled ──────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <MultiSelect
      label="Languages"
      options={LANGUAGES}
      value={["hindi", "tamil"]}
      onChange={() => {}}
      disabled
    />
  ),
};
