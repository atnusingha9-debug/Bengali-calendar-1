import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { CURRENT_BS_YEAR } from "@/lib/bengali-calendar";

const NAV: { to: string; label: string }[] = [
  { to: "/", label: "Today" },
  { to: `/year/${CURRENT_BS_YEAR}`, label: `Calendar ${CURRENT_BS_YEAR}` },
  { to: "/festivals", label: "Festivals & Holidays" },
  { to: "/poyla-boishakh", label: "Poyla Boishakh" },
  { to: "/durga-puja", label: "Durga Puja" },
  { to: "/date-converter", label: "Date Converter" },
  { to: "/download", label: "Download" },
  { to: "/about", label: "About" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const loc = useLocation();
  const path = loc.pathname.replace(/\/$/, "") || "/";
  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2] text-[#2d1b0f]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <header className="bg-[#7a1f12] text-amber-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Link
              to="/"
              className="flex items-center gap-3"
              aria-label="Bengali Calendar — Home"
            >
              <span className="bg-amber-100 text-[#7a1f12] rounded-md w-11 h-11 flex flex-col items-center justify-center font-bold leading-none">
                <span className="text-[10px] uppercase tracking-wider">BS</span>
                <span className="text-base">{CURRENT_BS_YEAR}</span>
              </span>
              <span>
                <span className="block text-xl font-serif font-semibold">
                  Bengali Calendar
                </span>
                <span className="block text-xs text-amber-200/80">
                  Bangla Panjika · Festivals · Date Converter
                </span>
              </span>
            </Link>
          </div>
          <nav aria-label="Primary" className="-mx-1 overflow-x-auto">
            <ul className="flex gap-1 text-sm font-medium whitespace-nowrap">
              {NAV.map((n) => {
                const active =
                  n.to === "/"
                    ? path === "/"
                    : path === n.to || path.startsWith(`${n.to}/`);
                return (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className={`block px-3 py-1.5 rounded-md transition-colors ${
                        active
                          ? "bg-amber-100 text-[#7a1f12]"
                          : "text-amber-50 hover:bg-[#5e1409]"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
      </main>
      <footer className="bg-[#2d1b0f] text-amber-50/80 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6">
          <section>
            <h2 className="text-base font-semibold text-amber-100 mb-2">
              Bengali Calendar
            </h2>
            <p className="text-sm leading-6">
              A free Bangla Panjika with festivals, holidays, Bengali date
              converter and printable monthly calendars for West Bengal,
              Tripura, Assam and Bangladesh.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-amber-100 mb-2">
              Calendar
            </h2>
            <ul className="space-y-1">
              <li>
                <Link
                  to={`/year/${CURRENT_BS_YEAR}`}
                  className="hover:text-amber-200"
                >
                  Bengali Calendar {CURRENT_BS_YEAR}
                </Link>
              </li>
              <li>
                <Link to={`/year/${CURRENT_BS_YEAR + 1}`} className="hover:text-amber-200">
                  Bengali Calendar {CURRENT_BS_YEAR + 1}
                </Link>
              </li>
              <li>
                <Link
                  to={`/year/${CURRENT_BS_YEAR}/boishakh`}
                  className="hover:text-amber-200"
                >
                  Boishakh {CURRENT_BS_YEAR}
                </Link>
              </li>
              <li>
                <Link
                  to={`/year/${CURRENT_BS_YEAR}/ashshin`}
                  className="hover:text-amber-200"
                >
                  Ashshin {CURRENT_BS_YEAR} (Durga Puja)
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-semibold text-amber-100 mb-2">
              Quick Links
            </h2>
            <ul className="space-y-1">
              <li>
                <Link to="/date-converter" className="hover:text-amber-200">
                  Bengali Date Converter
                </Link>
              </li>
              <li>
                <Link to="/festivals" className="hover:text-amber-200">
                  Festivals & Holidays
                </Link>
              </li>
              <li>
                <Link to="/poyla-boishakh" className="hover:text-amber-200">
                  Poyla Boishakh (Bengali New Year)
                </Link>
              </li>
              <li>
                <Link to="/durga-puja" className="hover:text-amber-200">
                  Durga Puja
                </Link>
              </li>
              <li>
                <Link to="/download" className="hover:text-amber-200">
                  Download Calendar
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="border-t border-amber-50/10">
          <div className="max-w-6xl mx-auto px-4 py-4 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>
              © {new Date().getFullYear()} Bengali Calendar. All festival data
              is informational.
            </span>
            <span>
              <Link to="/about" className="hover:text-amber-200">
                About this calendar
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
