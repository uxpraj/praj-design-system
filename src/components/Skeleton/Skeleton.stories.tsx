import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Skeleton, SkeletonAvatar, SkeletonCard, SkeletonListItem, SkeletonText } from ".";
import { colorTokens } from "../../theme/colors";
import { Divider } from "../Divider";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 32, backgroundColor: "#f4f4f5", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// ── Base shapes ───────────────────────────────────────
export const BaseShapes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Skeleton width="100%" height={16} radius={1000} />
      <Skeleton width="70%"  height={16} radius={1000} />
      <Skeleton width="100%" height={120} radius={12} />
      <SkeletonAvatar size={48} />
    </View>
  ),
};

// ── Text lines ────────────────────────────────────────
export const TextLines: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <SkeletonText lines={1} />
      <SkeletonText lines={2} />
      <SkeletonText lines={3} />
    </View>
  ),
};

// ── List items ────────────────────────────────────────
export const ListItems: Story = {
  render: () => (
    <View style={{ backgroundColor: colorTokens["surface"], borderRadius: 16, overflow: "hidden" }}>
      <SkeletonListItem />
      <Divider />
      <SkeletonListItem />
      <Divider />
      <SkeletonListItem />
    </View>
  ),
};

// ── Card ──────────────────────────────────────────────
export const Card: Story = {
  render: () => <SkeletonCard />,
};

// ── Feed (cards stacked) ──────────────────────────────
export const Feed: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SkeletonCard />
      <SkeletonCard />
    </View>
  ),
};

// ── Profile header ────────────────────────────────────
export const ProfileHeader: Story = {
  render: () => (
    <View style={{ backgroundColor: colorTokens["surface"], borderRadius: 16, padding: 20, gap: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <SkeletonAvatar size={64} />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton width="50%" height={18} radius={1000} />
          <Skeleton width="70%" height={13} radius={1000} />
        </View>
      </View>
      <SkeletonText lines={3} />
    </View>
  ),
};
