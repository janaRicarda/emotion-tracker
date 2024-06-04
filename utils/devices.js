const sizes = {
  sizeXS: "600px",
  sizeS: "600px",
  sizeM: "900px",
  sizeL: "1200px",
  sizeXL: "1536px",
};

export const devices = {
  mobile: `(max-width: ${sizes.sizeXS})`,
  mobileLandscape: "(min-width: 480px)",
  largeMobile: `(min-width: ${sizes.sizeS})`,
  tablet: `(min-width: ${sizes.sizeM})`,
  laptop: `(min-width: ${sizes.sizeL})`,
  desktop: `(min-width: ${sizes.sizeXL})`,
};

export const breakpoints = {
  mobileLandscape: "(min-width: 480px) and (orientation: landscape)",
  largeMobile: "(min-width: 600px)",
  tablet: "(min-width: 940px)",
  laptop: "(min-width: 1025px)",
  desktop: "{min-width: 1281px)",
};
