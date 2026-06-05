import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";

export interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
}

function usePulse() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return opacity;
}

// ── Base Skeleton ────────────────────────────────────────────────────────────

export function Skeleton({ width = "100%", height = 16, radius = 8 }: SkeletonProps) {
  const opacity = usePulse();
  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: colorTokens["neutral-faint"],
        opacity,
      }}
    />
  );
}

// ── Presets ──────────────────────────────────────────────────────────────────

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  const opacity = usePulse();
  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: 1000,
        backgroundColor: colorTokens["neutral-faint"],
        opacity,
      }}
    />
  );
}

export function SkeletonText({ width = "100%", lines = 1 }: { width?: number | `${number}%`; lines?: number }) {
  return (
    <View style={{ gap: 8, width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 && lines > 1 ? "60%" : "100%"}
          height={14}
          radius={1000}
        />
      ))}
    </View>
  );
}

// ── Composed presets ─────────────────────────────────────────────────────────

export function SkeletonCard() {
  return (
    <View
      style={{
        backgroundColor: colorTokens["surface"],
        borderRadius: 16,
        padding: 16,
        gap: 16,
        ...shadowStyles.subtle,
      }}
    >
      {/* Image placeholder */}
      <Skeleton width="100%" height={160} radius={12} />
      {/* Text lines */}
      <View style={{ gap: 8 }}>
        <Skeleton width="70%" height={16} radius={1000} />
        <Skeleton width="100%" height={12} radius={1000} />
        <Skeleton width="85%" height={12} radius={1000} />
      </View>
    </View>
  );
}

export function SkeletonListItem() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 16 }}>
      <SkeletonAvatar size={44} />
      <View style={{ flex: 1, gap: 8 }}>
        <Skeleton width="50%" height={14} radius={1000} />
        <Skeleton width="80%" height={12} radius={1000} />
      </View>
    </View>
  );
}
