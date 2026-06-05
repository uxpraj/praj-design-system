import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Spinner } from ".";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 32, alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 32, alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: "center" }}>
      <Spinner variant="primary" size="md" />
      <Spinner variant="neutral" size="md" />
      <View style={{ backgroundColor: colorTokens["neutral-high"], padding: 16, borderRadius: 12 }}>
        <Spinner variant="white" size="md" />
      </View>
    </View>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: "center" }}>
      <Spinner label="Loading..." />
      <Spinner label="Saving changes..." variant="neutral" />
    </View>
  ),
};
