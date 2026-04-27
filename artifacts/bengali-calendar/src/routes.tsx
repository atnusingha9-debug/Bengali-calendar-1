import type { ReactNode } from "react";
import Home from "@/pages/Home";
import Year from "@/pages/Year";
import Month from "@/pages/Month";
import DateConverter from "@/pages/DateConverter";
import Festivals from "@/pages/Festivals";
import Download from "@/pages/Download";
import About from "@/pages/About";
import PoylaBoishakh from "@/pages/PoylaBoishakh";
import DurgaPuja from "@/pages/DurgaPuja";
import NotFound from "@/pages/NotFound";
import {
  BENGALI_MONTHS,
  SUPPORTED_BS_YEARS,
  monthSlug,
} from "@/lib/bengali-calendar";

export type RouteDef = {
  path: string;
  element: ReactNode;
  staticProps?: Record<string, string>;
};

export function buildRoutes(): RouteDef[] {
  const monthRoutes: RouteDef[] = [];
  for (const y of SUPPORTED_BS_YEARS) {
    monthRoutes.push({ path: `/year/${y}`, element: <Year bsYear={y} /> });
    for (let m = 0; m < 12; m++) {
      monthRoutes.push({
        path: `/year/${y}/${monthSlug(BENGALI_MONTHS[m])}`,
        element: <Month bsYear={y} bsMonth0={m} />,
      });
    }
  }

  return [
    { path: "/", element: <Home /> },
    { path: "/date-converter", element: <DateConverter /> },
    { path: "/festivals", element: <Festivals /> },
    { path: "/poyla-boishakh", element: <PoylaBoishakh /> },
    { path: "/durga-puja", element: <DurgaPuja /> },
    { path: "/download", element: <Download /> },
    { path: "/about", element: <About /> },
    ...monthRoutes,
    { path: "*", element: <NotFound /> },
  ];
}
