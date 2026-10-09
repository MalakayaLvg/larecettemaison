import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import {
  accentButtonClassName,
  accentOnNavyButtonClassName,
  buttonClassName,
  containerClassName,
  primaryOnNavyButtonClassName,
} from "@/components/home/Section";
import { headerNav, siteName } from "@/lib/site";

// Header buttons are a little smaller than the standard pill (48px high instead of 56px).
const compactClassName = "h-12! px-6! text-base!";

// Figma "01 — Header" (V4, node 186:107): navy bar (104px high), white logo, buttons with the
// green cut-out shadow.
export function Header() {
  return (
    <header className="bg-ink text-white">
      <div className={`${containerClassName} flex items-center justify-between gap-6 py-4`}>
        <Link href="/" className="shrink-0">
          <Image src="/brand/logo-blanc.svg" alt={siteName} width={89} height={72} priority className="h-14 w-auto lg:h-[72px]" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex gap-6 xl:gap-8">
            {headerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-lg leading-[1.4] font-semibold whitespace-nowrap hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/podcast" className={`${accentOnNavyButtonClassName} ${compactClassName} max-xl:hidden`}>
            Écouter le podcast
          </Link>
          <Link href="/devis" className={`${primaryOnNavyButtonClassName} ${compactClassName} max-sm:hidden`}>
            Contact / devis
          </Link>

          <MobileMenu>
            <nav
              aria-label="Menu mobile"
              className="absolute right-0 z-20 mt-3 w-80 rounded-lg border-2 border-ink bg-background p-6 text-ink shadow-cut"
            >
              <ul className="space-y-4 text-lg">
                {headerNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/podcast" className={`${accentButtonClassName} w-full`}>
                  Écouter le podcast
                </Link>
                <Link href="/devis" className={`${buttonClassName} w-full`}>
                  Demander un devis
                </Link>
              </div>
            </nav>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
