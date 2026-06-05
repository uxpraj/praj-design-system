import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import {
  Bell, Inbox, Search, ShoppingCart,
  FileText, Wifi, BookOpen,
} from "lucide-react-native";

import { EmptyState } from ".";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: "#f4f4f5", justifyContent: "center" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ── Default ───────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <EmptyState
      icon={<Inbox size={36} color={colorTokens["neutral-muted"]} />}
      title="No messages yet"
      description="When someone sends you a message it will appear here."
      action={{ label: "Start a conversation", onPress: () => {} }}
    />
  ),
};

// ── No results ────────────────────────────────────────
export const NoResults: Story = {
  render: () => (
    <EmptyState
      icon={<Search size={36} color={colorTokens["neutral-muted"]} />}
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
      action={{ label: "Clear filters", variant: "outline", onPress: () => {} }}
    />
  ),
};

// ── Notifications ─────────────────────────────────────
export const NoNotifications: Story = {
  render: () => (
    <EmptyState
      icon={<Bell size={36} color={colorTokens["neutral-muted"]} />}
      title="All caught up"
      description="You have no new notifications right now. Check back later."
    />
  ),
};

// ── Cart ──────────────────────────────────────────────
export const EmptyCart: Story = {
  render: () => (
    <EmptyState
      icon={<ShoppingCart size={36} color={colorTokens["neutral-muted"]} />}
      title="Your cart is empty"
      description="Looks like you haven't added anything yet. Start shopping to fill it up."
      action={{ label: "Browse products", onPress: () => {} }}
    />
  ),
};

// ── No internet ───────────────────────────────────────
export const NoInternet: Story = {
  render: () => (
    <EmptyState
      icon={<Wifi size={36} color={colorTokens["neutral-muted"]} />}
      title="No internet connection"
      description="Check your network settings and try again."
      action={{ label: "Retry", variant: "outline", onPress: () => {} }}
    />
  ),
};

// ── No documents ──────────────────────────────────────
export const NoDocuments: Story = {
  render: () => (
    <EmptyState
      icon={<FileText size={36} color={colorTokens["neutral-muted"]} />}
      title="No documents"
      description="Upload your first document to get started."
      action={{ label: "Upload", onPress: () => {} }}
    />
  ),
};

// ── Title only ────────────────────────────────────────
export const TitleOnly: Story = {
  render: () => (
    <EmptyState title="Nothing here yet" />
  ),
};
