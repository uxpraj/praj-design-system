import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, Text, View } from "react-native";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";
import { typographyTokens } from "../../theme/typography";

export interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  label?: string;
  showValues?: boolean;
  disabled?: boolean;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

const THUMB = 24;
const TRACK = 4;

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  step     = 1,
  label,
  showValues = true,
  disabled = false,
}: RangeSliderProps) {
  const [trackW, setTrackW] = useState(0);
  const maxPos = trackW - THUMB;

  const lowerAnim = useRef(new Animated.Value(0)).current;
  const upperAnim = useRef(new Animated.Value(0)).current;
  const lowerRef  = useRef(value[0]);
  const upperRef  = useRef(value[1]);
  const lowerStart = useRef(0);
  const upperStart = useRef(0);

  // Set positions when trackW is measured or value changes
  useEffect(() => {
    if (maxPos <= 0) return;
    lowerAnim.setValue(((value[0] - min) / (max - min)) * maxPos);
    upperAnim.setValue(((value[1] - min) / (max - min)) * maxPos);
    lowerRef.current = value[0];
    upperRef.current = value[1];
  }, [trackW, value[0], value[1]]);

  const snap = (v: number) => {
    const stepped = Math.round(v / step) * step;
    return Math.min(max, Math.max(min, stepped));
  };

  const lowerPan = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder:  () => !disabled,
    onPanResponderGrant: () => {
      lowerStart.current = ((lowerRef.current - min) / (max - min)) * maxPos;
    },
    onPanResponderMove: (_, gs) => {
      const upperPos = ((upperRef.current - min) / (max - min)) * maxPos;
      const newPos   = Math.max(0, Math.min(lowerStart.current + gs.dx, upperPos - THUMB));
      lowerAnim.setValue(newPos);
      const newVal = snap(min + (newPos / maxPos) * (max - min));
      lowerRef.current = newVal;
      onChange([newVal, upperRef.current]);
    },
  });

  const upperPan = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder:  () => !disabled,
    onPanResponderGrant: () => {
      upperStart.current = ((upperRef.current - min) / (max - min)) * maxPos;
    },
    onPanResponderMove: (_, gs) => {
      const lowerPos = ((lowerRef.current - min) / (max - min)) * maxPos;
      const newPos   = Math.min(maxPos, Math.max(upperStart.current + gs.dx, lowerPos + THUMB));
      upperAnim.setValue(newPos);
      const newVal = snap(min + (newPos / maxPos) * (max - min));
      upperRef.current = newVal;
      onChange([lowerRef.current, newVal]);
    },
  });

  // Range fill: left = lowerPos + THUMB/2, width = upperPos - lowerPos
  const fillLeft  = Animated.add(lowerAnim, THUMB / 2);
  const fillWidth = Animated.subtract(upperAnim, lowerAnim);

  const thumbStyle = {
    width: THUMB, height: THUMB,
    borderRadius: 1000,
    backgroundColor: disabled ? colorTokens["neutral-disabled"] : colorTokens["surface"],
    borderWidth: 2,
    borderColor: disabled ? colorTokens["neutral-disabled"] : colorTokens["primary-high"],
    ...shadowStyles.subtle,
  };

  return (
    <View style={{ gap: 12, opacity: disabled ? 0.5 : 1 }}>
      {/* Label + values row */}
      {(label || showValues) && (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          {label && (
            <Text style={{ fontFamily: font("base-medium"), fontSize: fs("body"), color: colorTokens["neutral-subtle"] }}>
              {label}
            </Text>
          )}
          {showValues && (
            <Text style={{ fontFamily: font("base-semibold"), fontSize: fs("body"), color: colorTokens["primary-high"] }}>
              {value[0]} – {value[1]}
            </Text>
          )}
        </View>
      )}

      {/* Track */}
      <View
        onLayout={(e) => setTrackW(e.nativeEvent.layout.width)}
        style={{ height: THUMB, justifyContent: "center" }}
      >
        {trackW > 0 && (
          <>
            {/* Track background */}
            <View style={{
              position: "absolute",
              left: THUMB / 2, right: THUMB / 2,
              height: TRACK, borderRadius: 1000,
              backgroundColor: colorTokens["neutral-faint"],
            }} />

            {/* Selected range fill */}
            <Animated.View style={{
              position: "absolute",
              left: fillLeft,
              width: fillWidth,
              height: TRACK, borderRadius: 1000,
              backgroundColor: colorTokens["primary-high"],
            }} />

            {/* Lower thumb */}
            <Animated.View
              {...lowerPan.panHandlers}
              style={[thumbStyle, { position: "absolute", transform: [{ translateX: lowerAnim }] }]}
            />

            {/* Upper thumb */}
            <Animated.View
              {...upperPan.panHandlers}
              style={[thumbStyle, { position: "absolute", transform: [{ translateX: upperAnim }] }]}
            />
          </>
        )}
      </View>

      {/* Min / max labels */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: font("base"), fontSize: fs("label"), color: colorTokens["neutral-muted"] }}>{min}</Text>
        <Text style={{ fontFamily: font("base"), fontSize: fs("label"), color: colorTokens["neutral-muted"] }}>{max}</Text>
      </View>
    </View>
  );
}
