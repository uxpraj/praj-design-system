import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Star } from "lucide-react-native";

import { Badge } from ".";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 12, alignItems: "flex-start" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ── Appearance ──────────────────────────────────────────
export const Subtle: Story = {
  decorators: [
    () => (
      <View style={{ gap: 8, alignItems: "flex-start" }}>
        <Badge label="Primary" variant="primary" appearance="subtle" />
        <Badge label="Neutral" variant="neutral" appearance="subtle" />
        <Badge label="Success" variant="success" appearance="subtle" />
        <Badge label="Error"   variant="error"   appearance="subtle" />
        <Badge label="Warning" variant="warning" appearance="subtle" />
        <Badge label="Info"    variant="info"    appearance="subtle" />
      </View>
    ),
  ],
};

export const Filled: Story = {
  decorators: [
    () => (
      <View style={{ gap: 8, alignItems: "flex-start" }}>
        <Badge label="Primary" variant="primary" appearance="filled" />
        <Badge label="Neutral" variant="neutral" appearance="filled" />
        <Badge label="Success" variant="success" appearance="filled" />
        <Badge label="Error"   variant="error"   appearance="filled" />
        <Badge label="Warning" variant="warning" appearance="filled" />
        <Badge label="Info"    variant="info"    appearance="filled" />
      </View>
    ),
  ],
};

export const Outline: Story = {
  decorators: [
    () => (
      <View style={{ gap: 8, alignItems: "flex-start" }}>
        <Badge label="Primary" variant="primary" appearance="outline" />
        <Badge label="Neutral" variant="neutral" appearance="outline" />
        <Badge label="Success" variant="success" appearance="outline" />
        <Badge label="Error"   variant="error"   appearance="outline" />
        <Badge label="Warning" variant="warning" appearance="outline" />
        <Badge label="Info"    variant="info"    appearance="outline" />
      </View>
    ),
  ],
};

// ── Sizes ────────────────────────────────────────────────
export const Sizes: Story = {
  decorators: [
    () => (
      <View style={{ gap: 8, alignItems: "flex-start" }}>
        <Badge label="Small"  size="sm" variant="primary" appearance="subtle" />
        <Badge label="Medium" size="md" variant="primary" appearance="subtle" />
      </View>
    ),
  ],
};

// ── With Icon ────────────────────────────────────────────
export const WithIcon: Story = {
  decorators: [
    () => (
      <View style={{ gap: 8, alignItems: "flex-start" }}>
        <Badge
          label="Featured"
          variant="primary"
          appearance="subtle"
          leftIcon={<Star size={12} color={colorTokens["primary-high"]} fill={colorTokens["primary-high"]} />}
        />
        <Badge
          label="Featured"
          variant="primary"
          appearance="filled"
          leftIcon={<Star size={12} color={colorTokens["surface"]} fill={colorTokens["surface"]} />}
        />
      </View>
    ),
  ],
};

// ── Dismissible ──────────────────────────────────────────
export const Dismissible: Story = {
  decorators: [
    () => (
      <View style={{ gap: 8, alignItems: "flex-start" }}>
        <Badge label="React Native" variant="primary" appearance="subtle"  onDismiss={() => {}} />
        <Badge label="Design"       variant="neutral" appearance="subtle"  onDismiss={() => {}} />
        <Badge label="Urgent"       variant="error"   appearance="filled"  onDismiss={() => {}} />
        <Badge label="In Review"    variant="warning" appearance="outline" onDismiss={() => {}} />
      </View>
    ),
  ],
};
