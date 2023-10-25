import { getDaysInMonth } from "date-fns";

export function getMonthDays(date: Date) {
  const daysInMonth = getDaysInMonth(date);

  return Array.from({ length: daysInMonth }, (_, index) => index + 1);
}
