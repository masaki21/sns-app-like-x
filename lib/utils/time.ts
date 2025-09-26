const RELATIVE_TIME_THRESHOLDS: Array<{ unit: Intl.RelativeTimeFormatUnit; ms: number }> = [
  { unit: "year", ms: 1000 * 60 * 60 * 24 * 365 },
  { unit: "month", ms: 1000 * 60 * 60 * 24 * 30 },
  { unit: "week", ms: 1000 * 60 * 60 * 24 * 7 },
  { unit: "day", ms: 1000 * 60 * 60 * 24 },
  { unit: "hour", ms: 1000 * 60 * 60 },
  { unit: "minute", ms: 1000 * 60 },
];

const rtf = new Intl.RelativeTimeFormat("ja", { numeric: "auto" });

export function formatRelativeTime(date: Date) {
  const diff = date.getTime() - Date.now();

  for (const { unit, ms } of RELATIVE_TIME_THRESHOLDS) {
    if (Math.abs(diff) >= ms) {
      return rtf.format(Math.round(diff / ms), unit);
    }
  }

  return "たった今";
}
