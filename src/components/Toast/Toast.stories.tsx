import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Toast } from ".";

function ShowButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#7c3aed",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        alignSelf: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
        Show Toast
      </Text>
    </Pressable>
  );
}

function ControlledToast(props: Omit<React.ComponentProps<typeof Toast>, "visible" | "onDismiss">) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ gap: 24 }}>
      <ShowButton onPress={() => setVisible(true)} />
      <Toast {...props} visible={visible} onDismiss={() => setVisible(false)} />
    </View>
  );
}

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// ── All variants (static) ─────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Toast visible message="Changes saved successfully." variant="success" />
      <Toast visible message="Something went wrong. Please try again." variant="error" />
      <Toast visible message="Your session will expire in 5 minutes." variant="warning" />
      <Toast visible message="A new version is available." variant="info" />
      <Toast visible message="Copied to clipboard." variant="neutral" />
    </View>
  ),
};

// ── With dismiss ──────────────────────────────────────
export const WithDismiss: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Toast visible message="Changes saved successfully." variant="success" onDismiss={() => {}} />
      <Toast visible message="Something went wrong." variant="error" onDismiss={() => {}} />
      <Toast visible message="Copied to clipboard." variant="neutral" onDismiss={() => {}} />
    </View>
  ),
};

// ── With action ───────────────────────────────────────
export const WithAction: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Toast
        visible
        message="Message moved to archive."
        variant="neutral"
        action={{ label: "Undo", onPress: () => {} }}
        onDismiss={() => {}}
      />
      <Toast
        visible
        message="Failed to upload file."
        variant="error"
        action={{ label: "Retry", onPress: () => {} }}
        onDismiss={() => {}}
      />
      <Toast
        visible
        message="Update available."
        variant="info"
        action={{ label: "Install", onPress: () => {} }}
        onDismiss={() => {}}
      />
    </View>
  ),
};

// ── Interactive ───────────────────────────────────────
export const Success: Story = {
  render: () => (
    <ControlledToast message="Profile updated successfully." variant="success" />
  ),
};

export const Error: Story = {
  render: () => (
    <ControlledToast message="Failed to save changes." variant="error" />
  ),
};

export const WithActionInteractive: Story = {
  render: () => (
    <ControlledToast
      message="Email moved to trash."
      variant="neutral"
      action={{ label: "Undo", onPress: () => {} }}
    />
  ),
};
