import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Alert } from ".";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

// ── All variants ──────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert variant="success" description="Your changes have been saved successfully." />
      <Alert variant="error"   description="Something went wrong. Please try again." />
      <Alert variant="warning" description="Your plan is nearing its usage limit." />
      <Alert variant="info"    description="A new version of the app is available." />
      <Alert variant="neutral" description="Scheduled maintenance on Sunday, 2am UTC." />
    </View>
  ),
};

// ── With title ────────────────────────────────────────
export const WithTitle: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert
        variant="success"
        title="Payment successful"
        description="Your subscription has been activated. You now have access to all Pro features."
      />
      <Alert
        variant="error"
        title="Upload failed"
        description="The file exceeds the 10MB limit. Please compress it and try again."
      />
      <Alert
        variant="warning"
        title="Account limit reached"
        description="You have used 90% of your storage. Upgrade your plan to continue."
      />
      <Alert
        variant="info"
        title="Tip"
        description="You can drag and drop files directly into the canvas."
      />
    </View>
  ),
};

// ── With action ───────────────────────────────────────
export const WithAction: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert
        variant="warning"
        title="Account limit reached"
        description="You have used 90% of your storage."
        action={{ label: "Upgrade plan", onPress: () => {} }}
      />
      <Alert
        variant="error"
        description="Failed to connect to the server."
        action={{ label: "Retry", onPress: () => {} }}
      />
      <Alert
        variant="info"
        description="Enable two-factor authentication to secure your account."
        action={{ label: "Set up 2FA", onPress: () => {} }}
      />
    </View>
  ),
};

// ── With dismiss ──────────────────────────────────────
export const WithDismiss: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert
        variant="info"
        title="New feature"
        description="You can now export your projects as PDF."
        onDismiss={() => {}}
      />
      <Alert
        variant="neutral"
        description="Maintenance window scheduled for Sunday at 2am UTC."
        onDismiss={() => {}}
      />
    </View>
  ),
};

// ── Full (title + action + dismiss) ───────────────────
export const Full: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert
        variant="warning"
        title="Storage almost full"
        description="You have used 4.8 GB of your 5 GB storage. Upgrade to avoid disruption."
        action={{ label: "Upgrade now", onPress: () => {} }}
        onDismiss={() => {}}
      />
      <Alert
        variant="error"
        title="Payment failed"
        description="We couldn't process your payment. Please update your billing details."
        action={{ label: "Update billing", onPress: () => {} }}
        onDismiss={() => {}}
      />
    </View>
  ),
};
