import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { DateISO8601 } from "../domain/types";

function formatMonthAndYear(date: DateISO8601): string {
  return format(date, "MMMM yyyy", { locale: enUS });
}

export const dateUtils = {
  formatMonthAndYear,
};
