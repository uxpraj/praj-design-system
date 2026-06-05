import { Text as RNText } from "react-native";

import { cn } from "../../lib/utils";

type Variant = "display" | "title" | "body" | "label";
type Weight = "regular" | "medium" | "semibold" | "bold";

interface TextProps {
  variant?: Variant;
  weight?: Weight;
  children: React.ReactNode;
  className?: string;
  numberOfLines?: number;
}

const variantSizes: Record<Variant, string> = {
  display: "text-display",
  title: "text-title",
  body: "text-body",
  label: "text-label",
};

const weightMap: Record<Variant, Record<Weight, string>> = {
  display: {
    regular: "font-heading",
    medium: "font-heading-medium",
    semibold: "font-heading-semibold",
    bold: "font-heading-bold",
  },
  title: {
    regular: "font-heading",
    medium: "font-heading-medium",
    semibold: "font-heading-semibold",
    bold: "font-heading-bold",
  },
  body: {
    regular: "font-base",
    medium: "font-base-medium",
    semibold: "font-base-semibold",
    bold: "font-base-bold",
  },
  label: {
    regular: "font-base",
    medium: "font-base-medium",
    semibold: "font-base-semibold",
    bold: "font-base-bold",
  },
};

export function Text({
  variant = "body",
  weight = "regular",
  children,
  className,
  numberOfLines,
}: TextProps) {
  return (
    <RNText
      numberOfLines={numberOfLines}
      className={cn(variantSizes[variant], weightMap[variant][weight], className)}
    >
      {children}
    </RNText>
  );
}
