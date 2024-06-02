const sizes = {
  sizeXS: "600px",
  sizeS: "600px",
  sizeM: "900px",
  sizeL: "1200px",
  sizeXL: "1536px",
};

export const devices = {
  mobile: `(max-width: ${sizes.sizeXS})`,
  mobileLandscape: `(max-width: ${sizes.sizeXS}) and (orientation: landscape)`,
  largeMobile: `(min-width: ${sizes.sizeS})`,
  tablet: `(min-width: ${sizes.sizeM})`,
  laptop: `(min-width: ${sizes.sizeL})`,
  desktop: `(min-width: ${sizes.sizeXL})`,
};
