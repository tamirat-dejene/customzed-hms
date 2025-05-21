import { differenceInDays, formatDistance, parseISO } from "date-fns";

export const formatCurrency = (value: number, t: (_: string) => string) => {
  return new Intl.NumberFormat("en", { style: "currency", currency: t('usd') }).format(
    value
  );
};
interface IOptions {
  end?: boolean;
}

export const getToday = (options?: IOptions): string => {
  const today = new Date();
  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};

export const formatDistanceFromNow = (dateStr: string, t2: (_: string) => string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("ago", t2('ago'))
    .replace("months", t2('months'))
    .replace("month", t2('month'))
    .replace("days", t2("days"))
    .replace("in", t2("In"));

export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(dateStr1), parseISO(dateStr2));

export const tDate = (date: string, t2: (_: string) => string) => {
  let mnth = date.split(' ')
  mnth[0]= t2(mnth[0])
  return mnth.join(' ')
};
