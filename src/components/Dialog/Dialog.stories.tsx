import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { Dialog } from ".";
import { Button } from "../Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// ── Default ───────────────────────────────────────────
export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View style={{ alignItems: "center" }}>
        <Button label="Open Dialog" onPress={() => setVisible(true)} />
        <Dialog
          visible={visible}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your account from our servers."
          cancelLabel="Cancel"
          confirmLabel="Continue"
          onCancel={() => setVisible(false)}
          onConfirm={() => setVisible(false)}
        />
      </View>
    );
  },
};

// ── Destructive ───────────────────────────────────────
export const Destructive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View style={{ alignItems: "center" }}>
        <Button label="Delete Account" onPress={() => setVisible(true)} />
        <Dialog
          visible={visible}
          title="Delete account?"
          description="This will permanently delete your account and all associated data. This action cannot be reversed."
          cancelLabel="Cancel"
          confirmLabel="Delete"
          onCancel={() => setVisible(false)}
          onConfirm={() => setVisible(false)}
          destructive
        />
      </View>
    );
  },
};

// ── Title only ────────────────────────────────────────
export const TitleOnly: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View style={{ alignItems: "center" }}>
        <Button label="Open" variant="outline" onPress={() => setVisible(true)} />
        <Dialog
          visible={visible}
          title="Are you sure you want to leave?"
          cancelLabel="Stay"
          confirmLabel="Leave"
          onCancel={() => setVisible(false)}
          onConfirm={() => setVisible(false)}
        />
      </View>
    );
  },
};

// ── Log out ───────────────────────────────────────────
export const LogOut: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View style={{ alignItems: "center" }}>
        <Button label="Log Out" variant="ghost" onPress={() => setVisible(true)} />
        <Dialog
          visible={visible}
          title="Log out of your account?"
          description="You will need to sign in again to access your workspace."
          cancelLabel="Stay"
          confirmLabel="Log out"
          onCancel={() => setVisible(false)}
          onConfirm={() => setVisible(false)}
        />
      </View>
    );
  },
};
