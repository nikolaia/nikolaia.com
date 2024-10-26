import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://nikolaia.com", // replace this with your deployed domain
  author: "Nikolai Norman Andersen",
  profile: "https://nikolaia.com",
  desc: "Writings of Nikolai Norman Andersen",
  title: "nikolaia",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN", "nb-NO"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/nikolaia",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nikolaia",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/nikolaia",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "Mastodon",
    href: "https://hachyderm.io/@nikolaia",
    linkTitle: `${SITE.title} on Mastodon`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/nikolaiii",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
];
