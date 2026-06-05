import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { LayoutGrid, List, Map } from "lucide-react-native";

import { SegmentedControl } from ".";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

// ── 2 options ─────────────────────────────────────────
export const TwoOptions: Story = {
  render: () => {
    const [value, setValue] = useState("day");
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { label: "Day",   value: "day"   },
          { label: "Night", value: "night" },
        ]}
      />
    );
  },
};

// ── 3 options ─────────────────────────────────────────
export const ThreeOptions: Story = {
  render: () => {
    const [value, setValue] = useState("week");
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { label: "Day",   value: "day"   },
          { label: "Week",  value: "week"  },
          { label: "Month", value: "month" },
        ]}
      />
    );
  },
};

// ── With Icons ────────────────────────────────────────
export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState("grid");
    const iconColor = (v: string) =>
      value === v ? colorTokens["neutral-high"] : colorTokens["neutral-subtle"];
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { label: "Grid", value: "grid", icon: <LayoutGrid size={14} color={iconColor("grid")} /> },
          { label: "List", value: "list", icon: <List       size={14} color={iconColor("list")} /> },
          { label: "Map",  value: "map",  icon: <Map        size={14} color={iconColor("map")}  /> },
        ]}
      />
    );
  },
};

// ── Sizes ─────────────────────────────────────────────
export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState("on");
    const [b, setB] = useState("on");
    return (
      <View style={{ gap: 16 }}>
        <SegmentedControl
          size="sm"
          value={a}
          onChange={setA}
          options={[{ label: "On", value: "on" }, { label: "Off", value: "off" }]}
        />
        <SegmentedControl
          size="md"
          value={b}
          onChange={setB}
          options={[{ label: "On", value: "on" }, { label: "Off", value: "off" }]}
        />
      </View>
    );
  },
};

// ── Disabled ──────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <SegmentedControl
      disabled
      value="week"
      onChange={() => {}}
      options={[
        { label: "Day",   value: "day"   },
        { label: "Week",  value: "week"  },
        { label: "Month", value: "month" },
      ]}
    />
  ),
};

// ── Common use: view mode ─────────────────────────────
export const ViewMode: Story = {
  render: () => {
    const [view, setView] = useState("all");
    return (
      <SegmentedControl
        value={view}
        onChange={setView}
        options={[
          { label: "All",       value: "all"       },
          { label: "Following", value: "following" },
          { label: "For You",   value: "foryou"    },
        ]}
      />
    );
  },
};
