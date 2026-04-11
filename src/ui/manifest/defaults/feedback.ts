import type { ManifestConfig } from "../types";
import { defaultEnglishCatalog } from "./i18n-en";

export const defaultFeedbackFragment: Pick<ManifestConfig, "i18n"> = {
  i18n: {
    default: "en",
    locales: ["en"],
    strings: {
      en: defaultEnglishCatalog,
    },
  },
};
