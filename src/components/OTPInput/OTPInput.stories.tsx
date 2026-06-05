import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { OTPInput } from ".";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof OTPInput> = {
  title: "Components/OTPInput",
  component: OTPInput,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 32, alignItems: "flex-start" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

function Label({ text }: { text: string }) {
  return (
    <Text style={{ fontFamily: "DMSans_500Medium", fontSize: 12, color: colorTokens["neutral-muted"], marginBottom: 8 }}>
      {text}
    </Text>
  );
}

// ── Default 4-digit ───────────────────────────────────
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <View>
        <Label text="4-digit OTP (default)" />
        <OTPInput value={value} onChange={setValue} onComplete={(v) => console.log("Complete:", v)} />
      </View>
    );
  },
};

// ── 6-digit ───────────────────────────────────────────
export const SixDigit: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <View>
        <Label text="6-digit OTP" />
        <OTPInput length={6} value={value} onChange={setValue} />
      </View>
    );
  },
};

// ── Underline variant ─────────────────────────────────
export const Underline: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <View>
        <Label text="Underline variant" />
        <OTPInput variant="underline" value={value} onChange={setValue} />
      </View>
    );
  },
};

// ── Error state ───────────────────────────────────────
export const ErrorState: Story = {
  render: () => (
    <View>
      <Label text="Error — wrong code" />
      <OTPInput value="1234" onChange={() => {}} error />
    </View>
  ),
};

// ── Secure (PIN) ──────────────────────────────────────
export const Secure: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <View>
        <Label text="Secure PIN (shows dots)" />
        <OTPInput value={value} onChange={setValue} secure />
      </View>
    );
  },
};

// ── Disabled ──────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <View>
      <Label text="Disabled" />
      <OTPInput value="12" onChange={() => {}} disabled />
    </View>
  ),
};

// ── All variants ──────────────────────────────────────
export const AllVariants: Story = {
  render: () => {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    return (
      <View style={{ gap: 28 }}>
        <View>
          <Label text="Default" />
          <OTPInput value={a} onChange={setA} />
        </View>
        <View>
          <Label text="Underline" />
          <OTPInput variant="underline" value={b} onChange={setB} />
        </View>
        <View>
          <Label text="Error" />
          <OTPInput value="1234" onChange={() => {}} error />
        </View>
        <View>
          <Label text="Disabled" />
          <OTPInput value="12" onChange={() => {}} disabled />
        </View>
      </View>
    );
  },
};
