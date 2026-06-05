import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Avatar, AvatarGroup } from ".";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// ── Sizes ─────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Avatar name="Prajwal Nair" size="xs" />
      <Avatar name="Prajwal Nair" size="sm" />
      <Avatar name="Prajwal Nair" size="md" />
      <Avatar name="Prajwal Nair" size="lg" />
      <Avatar name="Prajwal Nair" size="xl" />
    </View>
  ),
};

// ── Colors ────────────────────────────────────────────
export const Colors: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
      <Avatar name="Prajwal Nair" color="primary" />
      <Avatar name="Prajwal Nair" color="success" />
      <Avatar name="Prajwal Nair" color="info"    />
      <Avatar name="Prajwal Nair" color="warning" />
      <Avatar name="Prajwal Nair" color="error"   />
      <Avatar name="Prajwal Nair" color="neutral" />
    </View>
  ),
};

// ── Auto Color from Name ──────────────────────────────
export const AutoColor: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
      <Avatar name="Prajwal Nair"  />
      <Avatar name="Alaap Raga"    />
      <Avatar name="John Doe"      />
      <Avatar name="Sarah Connor"  />
      <Avatar name="Bruce Wayne"   />
      <Avatar name="Tony Stark"    />
    </View>
  ),
};

// ── AvatarGroup ───────────────────────────────────────
export const Group: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <AvatarGroup
        names={["Prajwal Nair", "Alaap Raga", "John Doe"]}
        size="md"
      />
      <AvatarGroup
        names={["Prajwal Nair", "Alaap Raga", "John Doe", "Sarah Connor", "Bruce Wayne", "Tony Stark"]}
        size="md"
        maxVisible={4}
      />
      <AvatarGroup
        names={["Prajwal Nair", "Alaap Raga", "John Doe", "Sarah Connor"]}
        size="sm"
        maxVisible={3}
      />
    </View>
  ),
};

// ── With Image ────────────────────────────────────────
export const WithImage: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Avatar
        name="Prajwal Nair"
        size="sm"
        uri="https://i.pravatar.cc/150?img=1"
      />
      <Avatar
        name="Prajwal Nair"
        size="md"
        uri="https://i.pravatar.cc/150?img=1"
      />
      <Avatar
        name="Prajwal Nair"
        size="lg"
        uri="https://i.pravatar.cc/150?img=1"
      />
      <Avatar
        name="Prajwal Nair"
        size="xl"
        uri="https://i.pravatar.cc/150?img=1"
      />
    </View>
  ),
};
