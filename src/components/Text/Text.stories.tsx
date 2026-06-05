import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Text } from ".";

const meta: Meta<typeof Text> = {
  title: "Typography/Text",
  component: Text,
  args: {
    children: "The quick brown fox",
    variant: "body",
    weight: "regular",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["display", "title", "body", "label"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View className="p-6 gap-6">
      {(["display", "title", "body", "label"] as const).map((variant) => (
        <View key={variant} className="gap-2">
          <Text variant="label" weight="semibold" className="text-neutral-muted uppercase tracking-widest">
            {variant}
          </Text>
          {(["regular", "medium", "semibold", "bold"] as const).map((weight) => (
            <Text key={weight} variant={variant} weight={weight}>
              {weight} — The quick brown fox
            </Text>
          ))}
        </View>
      ))}
    </View>
  ),
};

export const Display: Story = {
  render: () => (
    <View className="p-6 gap-3">
      {(["regular", "medium", "semibold", "bold"] as const).map((weight) => (
        <Text key={weight} variant="display" weight={weight}>
          Display {weight}
        </Text>
      ))}
    </View>
  ),
};

export const Title: Story = {
  render: () => (
    <View className="p-6 gap-3">
      {(["regular", "medium", "semibold", "bold"] as const).map((weight) => (
        <Text key={weight} variant="title" weight={weight}>
          Title {weight}
        </Text>
      ))}
    </View>
  ),
};

export const Body: Story = {
  render: () => (
    <View className="p-6 gap-3">
      {(["regular", "medium", "semibold", "bold"] as const).map((weight) => (
        <Text key={weight} variant="body" weight={weight}>
          Body {weight}
        </Text>
      ))}
    </View>
  ),
};

export const Label: Story = {
  render: () => (
    <View className="p-6 gap-3">
      {(["regular", "medium", "semibold", "bold"] as const).map((weight) => (
        <Text key={weight} variant="label" weight={weight}>
          Label {weight}
        </Text>
      ))}
    </View>
  ),
};
