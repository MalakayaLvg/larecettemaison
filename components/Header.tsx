import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { accentButtonClassName, buttonClassName, containerClassName } from "@/components/home/Section";
import { mainNav, siteName } from "@/lib/site";

// Figma "01 — Header" (V4, node 186:107): navy bar, white logo.
export function Header() {
  return (
    <header className="bg-ink text-white">
      <div className={`${containerClassName} flex items-center justify-between gap-6 py-4 lg:py-6`}>
        <Link href="/" className="shrink-0">
          <Image src="/brand/logo-blanc.svg" alt={siteName} width={89} height={72} priority className="h-14 w-auto lg:h-[72px]" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex gap-6 xl:gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-lg leading-[1.4] font-semibold whitespace-nowrap hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/podcast" className={`${accentButtonClassName} max-2xl:hidden`}>
            Écouter le podcast
          </Link>
          <Link href="/devis" className={`${buttonClassName} max-sm:hidden`}>
            Demander un devis
          </Link>

          <MobileMenu>
            <nav
              aria-label="Menu mobile"
              className="absolute right-0 z-20 mt-3 w-64 rounded-lg border-2 border-ink bg-background p-6 text-ink shadow-cut"
            >
              <ul className="space-y-4 text-lg">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/devis" className={`${buttonClassName} mt-6 w-full sm:hidden`}>
                Demander un devis
              </Link>
            </nav>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
