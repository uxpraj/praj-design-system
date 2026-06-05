import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import { TextField } from "../TextField";

import { colorTokens } from "../../theme/colors";
import { shadowStyles } from "../../theme/shadows";
import { typographyTokens } from "../../theme/typography";

export interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const t = typographyTokens as {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
};
const font = (key: string): string => t.fontFamily[key][0];
const fs   = (key: string): number => parseFloat(t.fontSize[key][0]);

const MONTHS   = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const YEAR_START = 1924;
const YEAR_END   = 2075;
const YEAR_ROW_H = 44;
const YEARS      = Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => YEAR_START + i);

// Group years into rows of 3
const YEAR_ROWS: number[][] = [];
for (let i = 0; i < YEARS.length; i += 3) {
  YEAR_ROWS.push(YEARS.slice(i, i + 3));
}

type CellType = "prev" | "current" | "next";
interface Cell { day: number; type: CellType }

function buildCalendar(year: number, month: number): Cell[][] {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();
  const cells: Cell[] = [];

  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, type: "prev" });
  for (let i = 1; i <= daysInMonth; i++)  cells.push({ day: i, type: "current" });
  let next = 1;
  const rows = Math.ceil(cells.length / 7);
  while (cells.length < rows * 7) cells.push({ day: next++, type: "next" });

  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function DatePicker({ value, onChange, minDate, maxDate }: DatePickerProps) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(value?.getFullYear()  ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(value?.getMonth()     ?? today.getMonth());
  const [mode, setMode] = useState<"calendar" | "year">("calendar");

  const yearScrollRef = useRef<ScrollView>(null);

  // Auto-scroll year picker to current viewYear
  useEffect(() => {
    if (mode === "year") {
      const idx = YEARS.indexOf(viewYear);
      const rowIdx = Math.floor(idx / 3);
      const offset = Math.max(0, rowIdx * YEAR_ROW_H - 100);
      setTimeout(() => yearScrollRef.current?.scrollTo({ y: offset, animated: false }), 50);
    }
  }, [mode]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectYear = (year: number) => {
    setViewYear(year);
    setMode("calendar");
  };

  const handleDayPress = (cell: Cell) => {
    let month = viewMonth, year = viewYear;
    if (cell.type === "prev") {
      month = viewMonth === 0 ? 11 : viewMonth - 1;
      year  = viewMonth === 0 ? viewYear - 1 : viewYear;
      setViewMonth(month); setViewYear(year);
    } else if (cell.type === "next") {
      month = viewMonth === 11 ? 0 : viewMonth + 1;
      year  = viewMonth === 11 ? viewYear + 1 : viewYear;
      setViewMonth(month); setViewYear(year);
    }
    const date = new Date(year, month, cell.day);
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;
    onChange(date);
  };

  const isSelected = (cell: Cell) =>
    !!value && cell.type === "current" &&
    value.getFullYear() === viewYear &&
    value.getMonth()    === viewMonth &&
    value.getDate()     === cell.day;

  const isToday = (cell: Cell) =>
    cell.type === "current" &&
    today.getFullYear() === viewYear &&
    today.getMonth()    === viewMonth &&
    today.getDate()     === cell.day;

  const isDisabled = (cell: Cell) => {
    const y = cell.type === "prev" ? (viewMonth === 0 ? viewYear - 1 : viewYear) :
              cell.type === "next" ? (viewMonth === 11 ? viewYear + 1 : viewYear) : viewYear;
    const m = cell.type === "prev" ? (viewMonth === 0 ? 11 : viewMonth - 1) :
              cell.type === "next" ? (viewMonth === 11 ? 0 : viewMonth + 1) : viewMonth;
    const date = new Date(y, m, cell.day);
    return (!!minDate && date < minDate) || (!!maxDate && date > maxDate);
  };

  const weeks = buildCalendar(viewYear, viewMonth);

  return (
    <View
      style={{
        backgroundColor: colorTokens["surface"],
        borderRadius: 16,
        padding: 20,
        ...shadowStyles.medium,
      }}
    >
      {/* ── Header ── */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        {mode === "calendar" ? (
          <Pressable onPress={prevMonth} hitSlop={8}>
            <ChevronLeft size={20} color={colorTokens["neutral-subtle"]} strokeWidth={2} />
          </Pressable>
        ) : <View style={{ width: 20 }} />}

        {/* Tappable month+year → toggles year picker */}
        <Pressable
          onPress={() => setMode(m => m === "calendar" ? "year" : "calendar")}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          hitSlop={8}
        >
          <Text
            style={{
              fontFamily: font("base-semibold"),
              fontSize:   fs("title"),
              color:      colorTokens["neutral-high"],
            }}
          >
            {mode === "calendar" ? `${MONTHS[viewMonth]} ${viewYear}` : `${viewYear}`}
          </Text>
          {mode === "calendar"
            ? <ChevronDown size={16} color={colorTokens["neutral-muted"]} strokeWidth={2} />
            : <ChevronUp   size={16} color={colorTokens["primary-high"]}  strokeWidth={2} />
          }
        </Pressable>

        {mode === "calendar" ? (
          <Pressable onPress={nextMonth} hitSlop={8}>
            <ChevronRight size={20} color={colorTokens["neutral-subtle"]} strokeWidth={2} />
          </Pressable>
        ) : <View style={{ width: 20 }} />}
      </View>

      {mode === "year" ? (
        /* ── Year picker grid ── */
        <ScrollView
          ref={yearScrollRef}
          style={{ height: 264 }}
          showsVerticalScrollIndicator={false}
        >
          {YEAR_ROWS.map((row, ri) => (
            <View key={ri} style={{ flexDirection: "row" }}>
              {row.map((year) => {
                const isCurrentYear = year === viewYear;
                const isTodayYear   = year === today.getFullYear();
                return (
                  <Pressable
                    key={year}
                    onPress={() => selectYear(year)}
                    style={{ flex: 1, alignItems: "center", paddingVertical: 4 }}
                  >
                    <View
                      style={{
                        paddingHorizontal: 12,
                        height: 36,
                        borderRadius: 1000,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isCurrentYear
                          ? colorTokens["primary-high"]
                          : isTodayYear
                          ? colorTokens["primary-disabled"]
                          : "transparent",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: isCurrentYear ? font("base-semibold") : font("base"),
                          fontSize:   fs("body"),
                          color: isCurrentYear
                            ? colorTokens["surface"]
                            : isTodayYear
                            ? colorTokens["primary-high"]
                            : colorTokens["neutral-high"],
                        }}
                      >
                        {year}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </ScrollView>
      ) : (
        <>
          {/* ── Weekday labels ── */}
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            {WEEKDAYS.map((d) => (
              <View key={d} style={{ flex: 1, alignItems: "center", paddingVertical: 6 }}>
                <Text style={{ fontFamily: font("base-medium"), fontSize: fs("label"), color: colorTokens["neutral-muted"] }}>
                  {d}
                </Text>
              </View>
            ))}
          </View>

          {/* ── Day grid ── */}
          {weeks.map((week, wi) => (
            <View key={wi} style={{ flexDirection: "row" }}>
              {week.map((cell, di) => {
                const selected   = isSelected(cell);
                const todayCell  = isToday(cell);
                const disabled   = isDisabled(cell);
                const otherMonth = cell.type !== "current";
                return (
                  <Pressable
                    key={di}
                    onPress={() => !disabled && handleDayPress(cell)}
                    style={{ flex: 1, alignItems: "center", paddingVertical: 4 }}
                  >
                    <View
                      style={{
                        width: 36, height: 36, borderRadius: 1000,
                        alignItems: "center", justifyContent: "center",
                        backgroundColor: selected
                          ? colorTokens["primary-high"]
                          : todayCell
                          ? colorTokens["primary-disabled"]
                          : "transparent",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: selected ? font("base-semibold") : font("base"),
                          fontSize:   fs("body"),
                          opacity:    disabled ? 0.4 : 1,
                          color: selected
                            ? colorTokens["surface"]
                            : todayCell
                            ? colorTokens["primary-high"]
                            : otherMonth || disabled
                            ? colorTokens["neutral-muted"]
                            : colorTokens["neutral-high"],
                        }}
                      >
                        {cell.day}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </>
      )}
    </View>
  );
}

// ── DatePickerInput ──────────────────────────────────────────────────────────

export interface DatePickerInputProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

function formatDate(date: Date): string {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function DatePickerInput({
  value,
  onChange,
  label,
  placeholder = "Select a date",
  hint,
  error,
  disabled = false,
  minDate,
  maxDate,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => !disabled && setOpen(true)}>
        <View pointerEvents="none">
          <TextField
            label={label}
            placeholder={placeholder}
            value={value ? formatDate(value) : ""}
            hint={hint}
            error={error}
            disabled={disabled}
            leftIcon={
              <Calendar size={18} color={colorTokens["neutral-muted"]} />
            }
          />
        </View>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          onPress={() => setOpen(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <DatePicker
              value={value}
              onChange={(date) => {
                onChange(date);
                setOpen(false);
              }}
              minDate={minDate}
              maxDate={maxDate}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
