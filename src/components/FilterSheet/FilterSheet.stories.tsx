import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { FilterSheet, FilterSection } from ".";
import { Button } from "../Button";
import { TextField } from "../TextField";
import { Select } from "../Select";
import { Radio } from "../Radio";
import { Toggle } from "../Toggle";
import { RangeSlider } from "../RangeSlider";
import { SegmentedControl } from "../SegmentedControl";
import { colorTokens } from "../../theme/colors";

const meta: Meta<typeof FilterSheet> = {
  title: "Components/FilterSheet",
  component: FilterSheet,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f5" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FilterSheet>;

const STATES = [
  { label: "Maharashtra", value: "mh" },
  { label: "Karnataka", value: "ka" },
  { label: "Tamil Nadu", value: "tn" },
  { label: "Delhi", value: "dl" },
  { label: "Uttar Pradesh", value: "up" },
  { label: "Gujarat", value: "gj" },
  { label: "West Bengal", value: "wb" },
  { label: "Rajasthan", value: "rj" },
];

const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi"];

// ── Actor Search Filter ───────────────────────────────
export const ActorFilter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const [name,     setName]     = useState("");
    const [location, setLocation] = useState("");
    const [gender,   setGender]   = useState("");
    const [age,      setAge]      = useState<[number, number]>([18, 60]);
    const [withReels,setWithReels]= useState(false);
    const [langs,    setLangs]    = useState<string[]>([]);
    const [mediaType,setMediaType]= useState("all");

const handleReset = () => {
      setName(""); setLocation(""); setGender("");
      setAge([18, 60]); setWithReels(false); setLangs([]);
      setMediaType("all");
    };

    return (
      <>
        <Button label="Filter Actors" onPress={() => setOpen(true)} />

        <FilterSheet
          visible={open}
          onClose={() => setOpen(false)}
          onApply={() => setOpen(false)}
          onReset={handleReset}
          title="Filter Actors"
        >
          {/* Name search */}
          <FilterSection title="Name" divider={false}>
            <TextField
              placeholder="Search by name..."
              value={name}
              onChangeText={setName}
              variant="search"
            />
          </FilterSection>

          {/* Location + Language side by side */}
          <FilterSection title="Location & Language">
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Select
                  placeholder="State"
                  options={STATES}
                  value={location}
                  onChange={setLocation}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Select
                  placeholder="Language"
                  options={LANGUAGES.map(l => ({ label: l, value: l.toLowerCase() }))}
                  value={langs[0] ?? ""}
                  onChange={(v) => setLangs([v])}
                />
              </View>
            </View>
          </FilterSection>

          {/* Gender */}
          <FilterSection title="Gender">
            <View style={{ flexDirection: "row", gap: 24 }}>
              {[
                { label: "Male",   value: "male"   },
                { label: "Female", value: "female" },
                { label: "Other",  value: "other"  },
              ].map(opt => (
                <Radio
                  key={opt.value}
                  label={opt.label}
                  selected={gender === opt.value}
                  onPress={() => setGender(opt.value)}
                />
              ))}
            </View>
          </FilterSection>

          {/* Age range */}
          <FilterSection title="Age Range">
            <RangeSlider
              min={18} max={80}
              value={age}
              onChange={setAge}
              step={1}
            />
          </FilterSection>

          {/* With Reels */}
          <FilterSection title="Content">
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <Text style={{ fontFamily: "DMSans_400Regular", fontSize: 14, color: colorTokens["neutral-high"] }}>
                With Reels
              </Text>
              <Toggle value={withReels} onValueChange={setWithReels} size="sm" />
            </View>
          </FilterSection>

          {/* Media type */}
          <FilterSection title="Media Type">
            <SegmentedControl
              options={[
                { label: "All",    value: "all"    },
                { label: "Movies", value: "movies" },
                { label: "Series", value: "series" },
              ]}
              value={mediaType}
              onChange={setMediaType}
            />
          </FilterSection>
        </FilterSheet>
      </>
    );
  },
};
