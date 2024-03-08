import {
  darcula,
  coy,
  dark,
  funky,
  okaidia,
  solarizedlight,
  tomorrow,
  twilight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export const getThemeObject = (themeName) => {
  switch (themeName) {
    case "coy":
      return coy;
    case "dark":
      return dark;
    case "funky":
      return funky;
    case "okaidia":
      return okaidia;
    case "solarizedlight":
      return solarizedlight;
    case "tomorrow":
      return tomorrow;
    case "twilight":
      return twilight;
    case "darcula":
      return darcula;
    default:
      return okaidia;
  }
};

export const themes = [
  "okaidia",
  "coy",
  "dark",
  "funky",
  "solarizedlight",
  "tomorrow",
  "twilight",
  "darcula",
];
