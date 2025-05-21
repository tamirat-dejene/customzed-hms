import { v4 as uuidv4 } from "uuid";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
export const navLinks = (locale: string, t: (_: string) => string) => {
  return [
    {
      id: uuidv4(),
      icon: HiOutlineHome,
      label: t("home"),
      pathname: `/${locale}/dashboard`,
    },
    {
      id: uuidv4(),
      icon: HiOutlineCalendarDays,
      label: t("bookings"),
      pathname: `/${locale}/bookings`,
    },
    {
      id: uuidv4(),
      icon: HiOutlineHomeModern,
      label: t("cabins"),
      pathname: `/${locale}/cabins`,
    },
    {
      id: uuidv4(),
      icon: HiOutlineUsers,
      label: t("users"),
      pathname: `/${locale}/users`,
    },
    {
      id: uuidv4(),
      icon: HiOutlineCog6Tooth,
      label: t("settings"),
      pathname: `/${locale}/settings`,
    },
  ];
};

export const discountFilterOptions = (t: (_: string) => string) => {
  return [
    {
      id: uuidv4(),
      value: "all",
      label: t("all"),
    },
    {
      id: uuidv4(),
      value: "no-discount",
      label: t("noDiscount"),
    },
    {
      id: uuidv4(),
      value: "with-discount",
      label: t("withDiscount"),
    },
  ];
};

export const sortByOptions = (t: (_: string) => string) => {
  return [
    {
      id: uuidv4(),
      value: "name-asc",
      label: t("sortby_a_z"),
    },
    {
      id: uuidv4(),
      value: "name-desc",
      label: t("sortby_z_a"),
    },
    {
      id: uuidv4(),
      value: "regularPrice-asc",
      label: t("sortby_lowprice"),
    },
    {
      id: uuidv4(),
      value: "regularPrice-dsc",
      label: t("sortby_highprice"),
    },
    {
      id: uuidv4(),
      value: "maxCapacity-asc",
      label: t("sortby_lowcap"),
    },
    {
      id: uuidv4(),
      value: "maxCapacity-dsc",
      label: t("sortby_highcap"),
    },
  ];
};

export const status = (t: (_: string) => string) => {
  return [
    { id: uuidv4(), value: "all", label: t("all") },
    { id: uuidv4(), value: "checked-out", label: t("checkedout") },
    { id: uuidv4(), value: "checked-in", label: t("checkedin") },
    { id: uuidv4(), value: "unconfirmed", label: t("unconfirmed") },
  ];
};

export const bookingSortByOptions = (t: (_: string) => string) => {
  return [
    {
      id: uuidv4(),
      value: "startDate-desc",
      label: t("recent_first"),
    },
    {
      id: uuidv4(),
      value: "startDate-asc",
      label: t("earlier_first"),
    },
    {
      id: uuidv4(),
      value: "totalPrice-desc",
      label: t("largest_first"),
    },
    {
      id: uuidv4(),
      value: "totalPrice-asc",
      label: t("smallest_first"),
    },
  ];
};

export const startDataLight = () => {
  return [
    {
      duration: `1 night`,
      value: 0,
      color: "#ef4444",
    },
    {
      duration: `2 nights`,
      value: 0,
      color: "#f97316",
    },
    {
      duration: `3 nights`,
      value: 0,
      color: "#eab308",
    },
    {
      duration: `4-5 nights`,
      value: 0,
      color: "#84cc16",
    },
    {
      duration: `6-7 nights`,
      value: 0,
      color: "#22c55e",
    },
    {
      duration: `8-14 nights`,
      value: 0,
      color: "#14b8a6",
    },
    {
      duration: `15-21 nights`,
      value: 0,
      color: "#3b82f6",
    },
    {
      duration: `21+ nights`,
      value: 0,
      color: "#a855f7",
    },
  ];
};

export const startDataDark = () => {
  return [
    {
      duration: `1 night`,
      value: 0,
      color: "#b91c1c",
    },
    {
      duration: `2 nights`,
      value: 0,
      color: "#c2410c",
    },
    {
      duration: `3 nights`,
      value: 0,
      color: "#a16207",
    },
    {
      duration: `4-5 nights`,
      value: 0,
      color: "#4d7c0f",
    },
    {
      duration: `6-7 nights`,
      value: 0,
      color: "#15803d",
    },
    {
      duration: `8-14 nights`,
      value: 0,
      color: "#0f766e",
    },
    {
      duration: `15-21 nights`,
      value: 0,
      color: "#1d4ed8",
    },
    {
      duration: `21+ nights`,
      value: 0,
      color: "#7e22ce",
    },
  ];
};
