const sizes = {
  sizeS: "600px",
  sizeM: "900px",
  sizeL: "1200px",
  sizeXL: "1536px",
};

export const devices = {
  largeMobile: `(min-width: ${sizes.sizeS})`,
  tablet: `(min-width: ${sizes.sizeM})`,
  laptop: `(min-width: ${sizes.sizeL})`,
  desktop: `(min-width: ${sizes.sizeXL})`,
};
