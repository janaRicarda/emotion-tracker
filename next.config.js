/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: `/(.*)`,
        headers: [
          {
            key: `Referrer-Policy`,
            value: `no-referrer-when-downgrade`,
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
