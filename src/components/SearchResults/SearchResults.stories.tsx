import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { SearchResults } from ".";
import { TextField } from "../TextField";
import { Avatar } from "../Avatar";

const meta: Meta<typeof SearchResults> = {
  title: "Components/SearchResults",
  component: SearchResults,
  decorators: [
    (Story) => (
      <View style={{ padding: 24, gap: 8 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchResults>;

const ACTORS = [
  { value: "1", label: "Shah Rukh Khan",  subtitle: "Mumbai, Maharashtra" },
  { value: "2", label: "Deepika Padukone",subtitle: "Bengaluru, Karnataka" },
  { value: "3", label: "Ranveer Singh",   subtitle: "Mumbai, Maharashtra" },
  { value: "4", label: "Alia Bhatt",      subtitle: "Mumbai, Maharashtra" },
  { value: "5", label: "Vijay Deverakonda",subtitle: "Hyderabad, Telangana" },
  { value: "6", label: "Nayanthara",      subtitle: "Chennai, Tamil Nadu" },
];

export const ActorSearch: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState("");

    const results = ACTORS
      .filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
      .map(a => ({
        ...a,
        left: <Avatar name={a.label} size="sm" />,
      }));

    return (
      <View style={{ gap: 8 }}>
        <TextField
          variant="search"
          placeholder="Search actors..."
          value={query}
          onChangeText={setQuery}
        />
        <SearchResults
          visible={query.length > 0}
          results={results}
          onSelect={(item) => { setSelected(item.label); setQuery(""); }}
        />
      </View>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <TextField variant="search" placeholder="Search..." value="Shah" />
      <SearchResults visible loading results={[]} onSelect={() => {}} />
    </View>
  ),
};

export const Empty: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <TextField variant="search" placeholder="Search..." value="xyz" />
      <SearchResults visible results={[]} onSelect={() => {}} emptyText="No actors found" />
    </View>
  ),
};
