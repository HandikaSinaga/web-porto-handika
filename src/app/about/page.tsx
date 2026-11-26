import HomePage from "../page";
import { buildPageMetadata, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/about",
});

export default HomePage;
