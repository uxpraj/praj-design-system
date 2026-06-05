import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { DatePicker } from ".";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, backgroundColor: "#f4f4f5" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ── Default ───────────────────────────────────────────
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <View style={{ gap: 16 }}>
        <DatePicker value={date} onChange={setDate} />
        {date && (
          <Text style={{ fontFamily: "DMSans_400Regular", fontSize: 14, color: colorTokens["neutral-subtle"], textAlign: "center" }}>
            Selected: {date.toDateString()}
          </Text>
        )}
      </View>
    );
  },
};

// ── Pre-selected ──────────────────────────────────────
export const PreSelected: Story = {
  render: () => {
    const [date, setDate] = useState(new Date());
    return <DatePicker value={date} onChange={setDate} />;
  },
};

// ── With min/max ──────────────────────────────────────
export const WithMinMax: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontFamily: "DMSans_500Medium", fontSize: 12, color: colorTokens["neutral-muted"] }}>
          Only next 14 days selectable
        </Text>
        <DatePicker value={date} onChange={setDate} minDate={today} maxDate={maxDate} />
      </View>
    );
  },
};
