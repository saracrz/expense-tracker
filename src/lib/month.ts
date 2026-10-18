import type { CSSProperties } from "react";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// One accent per month; all dark enough for white text on top
const monthColors = [
  "#2F4B8F", // January: ink blue
  "#A8285F", // February: raspberry
  "#2E7148", // March: leaf
  "#24698C", // April: rain
  "#6D45A3", // May: lilac
  "#B23A0B", // June: tangerine
  "#B42318", // July: watermelon
  "#8A5A06", // August: ochre
  "#58641B", // September: olive
  "#9A3412", // October: burnt amber
  "#6B4A36", // November: chestnut
  "#1F5C4F", // December: pine
];

export const getMonthTheme = (date = new Date()) => {
  const month = date.getMonth();
  const color = monthColors[month];

  return {
    name: monthNames[month],
    style: { "--primary": color, "--ring": color } as CSSProperties,
  };
};
