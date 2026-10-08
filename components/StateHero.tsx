import Image from "next/image";
import { containerClassName, Sticker } from "@/components/home/Section";

// Figma "États" (V4, node 310:1403): full-width green band with a sticker, a title, a text and
// actions; `success` adds the lime check on its bowl. Used for the booking confirmation, the 404
// and the newsletter links.
export function StateHero({
  eyebrow,
  title,
  text,
  success = false,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: React.ReactNode;
  success?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand">
      <div
        className={`${containerClassName} relative grid min-h-[50vh] items-center gap-12 pt-12 pb-28 lg:min-h-[760px] lg:pt-24 lg:pb-32 ${success ? "lg:grid-cols-[1036fr_660fr] lg:gap-16" : ""}`}
      >
        <div className="flex max-w-[1036px] flex-col items-start gap-8">
          <Sticker>{eyebrow}</Sticker>
          <h1 className="font-display text-[clamp(2.5rem,3.75vw,4.5rem)] leading-[0.95] font-extrabold">{title}</h1>
          {text && <div className="text-lg leading-[1.2] lg:text-[22px]">{text}</div>}
          {children}
        </div>
        {success && (
          <Image
            src="/deco/etat-confirme.svg"
            alt=""
            width={660}
            height={640}
            className="mx-auto w-full max-w-[460px] lg:max-w-[660px]"
          />
        )}
      </div>
      <Image
        src="/deco/carotte-lime.svg"
        alt=""
        width={118}
        height={330}
        className="pointer-events-none absolute -bottom-[46px] left-6 hidden w-[80px] -rotate-25 sm:block lg:w-[118px]"
      />
    </section>
  );
}
