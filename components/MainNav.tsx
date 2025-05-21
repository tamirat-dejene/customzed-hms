"use client";
import React, { use } from "react";

import NavLink from "./NavLink";
import { navLinks } from "@/utils/constants";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";


const MainNav = () => {
  const { locale }: { locale: 'en' | 'am' | 'or' } = useParams();
  const t = useTranslations("utils.constants");
  const modifiedNavlink = navLinks(locale, t);
  
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {modifiedNavlink.map(({ label, icon, id, pathname }) => (
          <li key={id}>
            <NavLink label={label} icon={icon} pathname={pathname} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
