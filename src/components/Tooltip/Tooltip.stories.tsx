import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Info, HelpCircle, Settings } from "lucide-react-native";

import { Tooltip } from ".";
import { Button } from "../Button";
import { IconButton } from "../Button";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 40, alignItems: "center", justifyContent: "center", gap: 40 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ── Top (default) ─────────────────────────────────────
export const Top: Story = {
  render: () => (
    <Tooltip content="This shows above the element" position="top">
      <Button label="Hold or tap me" />
    </Tooltip>
  ),
};

// ── Bottom ────────────────────────────────────────────
export const Bottom: Story = {
  render: () => (
    <Tooltip content="This shows below the element" position="bottom">
      <Button label="Hold or tap me" variant="outline" />
    </Tooltip>
  ),
};

// ── On icon ───────────────────────────────────────────
export const OnIcon: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
      <Tooltip content="More information about this field">
        <Info size={20} color={colorTokens["neutral-muted"]} />
      </Tooltip>
      <Tooltip content="Help and documentation">
        <HelpCircle size={20} color={colorTokens["neutral-muted"]} />
      </Tooltip>
      <Tooltip content="App settings and preferences" position="bottom">
        <Settings size={20} color={colorTokens["neutral-muted"]} />
      </Tooltip>
    </View>
  ),
};

// ── Long content ──────────────────────────────────────
export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a longer tooltip with more detailed information about this feature." position="top">
      <Button label="What does this do?" variant="ghost" />
    </Tooltip>
  ),
};
