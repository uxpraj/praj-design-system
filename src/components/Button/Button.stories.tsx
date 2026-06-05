import type { Meta, StoryObj } from "@storybook/react-native";
import { ArrowRight, Plus, Star, Trash2 } from "lucide-react-native";
import { View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { Button, IconButton } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    onPress: { action: "pressed" },
  },
  args: {
    label: "Button",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { label: "Primary Button", variant: "primary" },
};

export const Outline: Story = {
  args: { label: "Outline Button", variant: "outline" },
};

export const Ghost: Story = {
  args: { label: "Ghost Button", variant: "ghost" },
};

export const Small: Story = {
  args: { label: "Small", size: "sm" },
};

export const Large: Story = {
  args: { label: "Large Button", size: "lg" },
};

export const Loading: Story = {
  args: { label: "Loading...", loading: true },
};

export const Disabled: Story = {
  args: { label: "Disabled", disabled: true },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Continue",
    icon: <ArrowRight size={18} color={colorTokens["surface"]} />,
    iconPosition: "right",
  },
};

export const AllVariants: Story = {
  render: () => (
    <View className="gap-3 p-4">
      <Button label="Primary" variant="primary" />
      <Button label="Outline" variant="outline" />
      <Button label="Ghost" variant="ghost" />
      <View className="flex-row gap-3">
        <Button label="Sm" size="sm" />
        <Button label="Md" size="md" />
        <Button label="Lg" size="lg" />
      </View>
      <Button
        label="Continue"
        icon={<ArrowRight size={18} color={colorTokens["surface"]} />}
        iconPosition="right"
      />
      <Button
        label="Add Item"
        variant="outline"
        icon={<Plus size={18} color={colorTokens["primary-high"]} />}
      />
      <Button label="Loading" loading />
      <Button label="Disabled" disabled />
      <View className="flex-row gap-3">
        <IconButton icon={<Plus size={18} color={colorTokens["surface"]} />} size="sm" />
        <IconButton icon={<Star size={20} color={colorTokens["surface"]} />} size="md" />
        <IconButton icon={<Trash2 size={22} color={colorTokens["primary-high"]} />} size="lg" variant="outline" />
      </View>
    </View>
  ),
};
