import { notFound } from "next/navigation";

// With two root layouts ((site) and (payload)) there is no top-level layout to render a
// global 404, so unmatched URLs land here and get the site's not-found page.
export default function CatchAll() {
  notFound();
}
