const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "http://localhost:3000";

function normaliseSiteUrl(value: string): string {
  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
    ? value
    : `https://${value}`;

  return withProtocol.replace(/\/+$/, "");
}

/**
 * Absolute origin used for canonical links, Open Graph URLs, and structured
 * data. On Netlify, `URL` is provided automatically for every deployment
 * (including deploy previews); set `NEXT_PUBLIC_SITE_URL` to override it with
 * a custom domain. No domain is hardcoded because none has been verified.
 */
export const siteUrl = normaliseSiteUrl(configuredSiteUrl);

export const siteName = "Sahan Nimnaka";

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}

export const ogImageAlt =
  "Sahan Nimnaka, Computer Science undergraduate — web, mobile, and backend portfolio";

/**
 * Explicit social images for routes whose own Open Graph metadata would
 * otherwise replace the file-based image from the root layout.
 */
export const openGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: ogImageAlt,
};

export const twitterImage = {
  url: "/twitter-image",
  alt: ogImageAlt,
};
