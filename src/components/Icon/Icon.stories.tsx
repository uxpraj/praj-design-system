import type { Meta, StoryObj } from "@storybook/react-native";
import {
  AlertCircle, AlertTriangle, Archive, ArrowDown, ArrowLeft,
  ArrowRight, ArrowUp, Bell, Bookmark, Calendar, Camera,
  Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  Clipboard, Clock, Cloud, Code, Copy, CreditCard, Download,
  Edit, Eye, EyeOff, File, Filter, Flag, Folder, Globe,
  Grid, Heart, Home, Image, Info, Link, List, Lock, LogOut,
  Mail, MapPin, Menu, MessageCircle, Minus, Moon, MoreHorizontal,
  MoreVertical, Phone, Plus, Printer, RefreshCw, Search, Send,
  Settings, Share, Shield, ShoppingCart, Star, Sun, Trash2,
  Upload, User, Users, Video, Wifi, X, Zap,
} from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import { Icon, IconColor, IconSize } from "./index";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  args: {
    icon: Search,
    color: "neutral-subtle",
    size: "md",
    strokeWidth: 2,
  },
  argTypes: {
    color: {
      control: "select",
      options: [
        "neutral-high", "neutral-subtle", "neutral-muted", "neutral-disabled",
        "primary-high", "primary-subtle", "primary-muted", "primary-disabled",
        "error", "success", "warning", "info", "surface",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    strokeWidth: { control: { type: "range", min: 1, max: 3, step: 0.5 } },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {};

// ── Color variants ──────────────────────────────────────
export const ColorVariants: Story = {
  render: () => (
    <ScrollView>
      <View className="p-4 gap-3">
        {(
          [
            ["neutral-high",     "Neutral High",     "#111827"],
            ["neutral-subtle",   "Neutral Subtle",   "#4b5563"],
            ["neutral-muted",    "Neutral Muted",    "#9ca3af"],
            ["neutral-disabled", "Neutral Disabled", "#d1d5db"],
            ["primary-high",     "Primary High",     "#7c3aed"],
            ["primary-subtle",   "Primary Subtle",   "#8b5cf6"],
            ["primary-muted",    "Primary Muted",    "#c4b5fd"],
            ["primary-disabled", "Primary Disabled", "#ddd6fe"],
            ["error",    "Error",   "#ef4444"],
            ["success",  "Success", "#16a34a"],
            ["warning",  "Warning", "#d97706"],
            ["info",     "Info",    "#2563eb"],
          ] as [IconColor, string, string][]
        ).map(([color, label]) => (
          <View key={color} className="flex-row items-center gap-4">
            <Icon icon={Bell} color={color} size="md" />
            <Text className="font-base text-body text-neutral-high flex-1">{label}</Text>
            <Text className="font-base text-label text-neutral-muted">{color}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  ),
};

// ── Sizes ───────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <View className="p-4 gap-5">
      {(["xs", "sm", "md", "lg", "xl"] as IconSize[]).map((size) => (
        <View key={size} className="flex-row items-center gap-4">
          <Icon icon={Star} color="primary-high" size={size} />
          <Text className="font-base text-body text-neutral-high flex-1">{size}</Text>
          <Text className="font-base text-label text-neutral-muted">
            {({ xs: 12, sm: 16, md: 20, lg: 24, xl: 32 }[size])}px
          </Text>
        </View>
      ))}
    </View>
  ),
};

// ── Icon showcase ────────────────────────────────────────
const iconGroups: { label: string; icons: [string, any][] }[] = [
  {
    label: "Navigation",
    icons: [
      ["Home", Home], ["ArrowLeft", ArrowLeft], ["ArrowRight", ArrowRight],
      ["ArrowUp", ArrowUp], ["ArrowDown", ArrowDown], ["ChevronLeft", ChevronLeft],
      ["ChevronRight", ChevronRight], ["ChevronUp", ChevronUp], ["ChevronDown", ChevronDown],
      ["Menu", Menu], ["MoreHorizontal", MoreHorizontal], ["MoreVertical", MoreVertical],
    ],
  },
  {
    label: "Actions",
    icons: [
      ["Plus", Plus], ["Minus", Minus], ["X", X], ["Check", Check],
      ["Edit", Edit], ["Trash2", Trash2], ["Copy", Copy], ["Share", Share],
      ["Download", Download], ["Upload", Upload], ["Send", Send], ["RefreshCw", RefreshCw],
    ],
  },
  {
    label: "Communication",
    icons: [
      ["Mail", Mail], ["MessageCircle", MessageCircle], ["Bell", Bell],
      ["Phone", Phone], ["Video", Video], ["Link", Link],
      ["Globe", Globe], ["Wifi", Wifi], ["Send", Send], ["Clipboard", Clipboard],
    ],
  },
  {
    label: "Media & Files",
    icons: [
      ["Image", Image], ["Camera", Camera], ["File", File], ["Folder", Folder],
      ["Archive", Archive], ["Printer", Printer], ["Cloud", Cloud],
      ["Code", Code], ["Grid", Grid], ["List", List],
    ],
  },
  {
    label: "User & Account",
    icons: [
      ["User", User], ["Users", Users], ["Lock", Lock], ["Shield", Shield],
      ["Settings", Settings], ["LogOut", LogOut], ["Eye", Eye], ["EyeOff", EyeOff],
      ["CreditCard", CreditCard], ["ShoppingCart", ShoppingCart],
    ],
  },
  {
    label: "Status & Feedback",
    icons: [
      ["Info", Info], ["AlertCircle", AlertCircle], ["AlertTriangle", AlertTriangle],
      ["Check", Check], ["Star", Star], ["Heart", Heart], ["Bookmark", Bookmark],
      ["Flag", Flag], ["Zap", Zap],
    ],
  },
  {
    label: "Utility",
    icons: [
      ["Search", Search], ["Filter", Filter], ["Calendar", Calendar],
      ["Clock", Clock], ["MapPin", MapPin], ["Sun", Sun], ["Moon", Moon],
    ],
  },
];

export const AllIcons: Story = {
  render: () => (
    <ScrollView>
      <View className="p-4 gap-8">
        {iconGroups.map(({ label, icons }) => (
          <View key={label}>
            <Text className="font-base-semibold text-label text-neutral-muted uppercase mb-3" style={{ letterSpacing: 1 }}>
              {label}
            </Text>
            <View className="flex-row flex-wrap gap-4">
              {icons.map(([name, IconComponent]) => (
                <View key={name} className="items-center gap-1.5" style={{ width: 56 }}>
                  <Icon icon={IconComponent} color="neutral-subtle" size="md" />
                  <Text className="font-base text-neutral-muted" style={{ fontSize: 9, textAlign: "center" }}>
                    {name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  ),
};

// ── Stroke weights ───────────────────────────────────────
export const StrokeWeights: Story = {
  render: () => (
    <View className="p-4 gap-4">
      {([1, 1.5, 2, 2.5, 3] as const).map((sw) => (
        <View key={sw} className="flex-row items-center gap-4">
          <Icon icon={Settings} color="neutral-high" size="lg" strokeWidth={sw} />
          <Text className="font-base text-body text-neutral-high">strokeWidth={sw}</Text>
        </View>
      ))}
    </View>
  ),
};
