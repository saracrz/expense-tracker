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

// Pastel accents that rotate every month (month index % 4); all light enough
// for black text on top, and none shared with the category colors
const monthColors = [
  "#FFEF7A", // lemon: Jan, May, Sep
  "#F7A8C8", // bubblegum: Feb, Jun, Oct
  "#7FE0C2", // mint: Mar, Jul, Nov
  "#9DB4FF", // periwinkle: Apr, Aug, Dec
];

export const getMonthTheme = (date = new Date()) => {
  const month = date.getMonth();
  const color = monthColors[month % monthColors.length];

  return {
    name: monthNames[month],
    style: { "--primary": color } as CSSProperties,
  };
};
