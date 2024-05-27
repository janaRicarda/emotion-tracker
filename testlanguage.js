import i18next from "i18next";

i18next.init({
  lng: "en",
  resources: {
    en: {
      translation: {
        key: "hello world",
        look: {
          deeper: "some deep key",
        },
      },
    },
    de: {
      translation: { key: "hallo welt" },
    },
  },
});

const ret = i18next.t("look.deeper", { lng: "de" });
ret;
