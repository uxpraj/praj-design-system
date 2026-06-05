import type { Meta, StoryObj } from "@storybook/react-native";
import { Eye, EyeOff, Mail, Phone } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { TextField } from "./index";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    variant: { control: "select", options: ["default", "search"] },
    disabled: { control: "boolean" },
    secureTextEntry: { control: "boolean" },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder text",
    variant: "default",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com" },
};

export const Search: Story = {
  args: { label: undefined, placeholder: "Search...", variant: "search" },
};

export const WithHint: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    hint: "Must be 3–20 characters",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    value: "notanemail",
    error: "Please enter a valid email address",
  },
};

export const Disabled: Story = {
  args: { label: "Read only", value: "Cannot edit this", disabled: true },
};

export const Password: Story = {
  args: { label: "Password", placeholder: "••••••••", secureTextEntry: true },
};

export const WithIcons: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <View className="gap-4 p-4">
        <TextField
          label="Email"
          placeholder="you@example.com"
          leftIcon={<Mail size={18} color={colorTokens["neutral-muted"]} />}
        />
        <TextField
          label="Phone"
          placeholder="+1 (555) 000-0000"
          leftIcon={<Phone size={18} color={colorTokens["neutral-muted"]} />}
        />
        <TextField
          label="Password"
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          leftIcon={<Eye size={18} color={colorTokens["neutral-muted"]} />}
          rightIcon={
            showPassword
              ? <EyeOff size={18} color={colorTokens["neutral-muted"]} />
              : <Eye size={18} color={colorTokens["neutral-muted"]} />
          }
          onRightIconPress={() => setShowPassword(!showPassword)}
        />
      </View>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [text, setText] = useState("");
    return (
      <View className="gap-4 p-4">
        <TextField label="Default" placeholder="Enter text" value={text} onChangeText={setText} />
        <TextField variant="search" placeholder="Search..." />
        <TextField
          label="Email"
          placeholder="you@example.com"
          leftIcon={<Mail size={18} color={colorTokens["neutral-muted"]} />}
        />
        <TextField label="With hint" placeholder="Enter username" hint="3–20 characters" />
        <TextField label="With error" value="bad input" error="This field is required" />
        <TextField label="Disabled" value="Read only" disabled />
        <TextField label="Password" placeholder="••••••••" secureTextEntry />
      </View>
    );
  },
};
