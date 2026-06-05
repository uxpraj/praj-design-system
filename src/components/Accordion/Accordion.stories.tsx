import type { Meta, StoryObj } from "@storybook/react-native";
import { Text } from "react-native";

import { Accordion, AccordionItem } from "./index";

const meta: Meta<typeof AccordionItem> = {
  title: "Components/Accordion",
  component: AccordionItem,
  argTypes: {
    defaultOpen: { control: "boolean" },
  },
  args: {
    title: "What is Praj Design System?",
    defaultOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof AccordionItem>;

export const Closed: Story = {
  args: {
    title: "What is Praj Design System?",
    children: "A personal component library built with NativeWind and Storybook for React Native.",
    defaultOpen: false,
  },
};

export const Open: Story = {
  args: {
    title: "What is Praj Design System?",
    children: "A personal component library built with NativeWind and Storybook for React Native.",
    defaultOpen: true,
  },
};

export const FAQ: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="What is NativeWind?" defaultOpen>
        NativeWind lets you use Tailwind CSS class names in React Native. It
        compiles your className props to StyleSheet objects at build time.
      </AccordionItem>
      <AccordionItem title="Can I use this in production?">
        Yes. All components are unstyled at their core and built on React
        Native primitives — no third-party UI library required.
      </AccordionItem>
      <AccordionItem title="How do I add a new component?">
        <Text className="font-base text-base text-neutral-subtle">
          Create a folder in{" "}
          <Text className="font-base-medium text-neutral-high">
            src/components/ComponentName/
          </Text>{" "}
          with an index.tsx and a ComponentName.stories.tsx file.
        </Text>
      </AccordionItem>
      <AccordionItem title="What font is used?">
        DM Sans — loaded via @expo-google-fonts/dm-sans. Available in Regular,
        Medium, SemiBold, and Bold weights.
      </AccordionItem>
    </Accordion>
  ),
};
