// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const copyright = `Copyright © ${new Date().getFullYear()} Yakov Rakhamimov. Built with Docusaurus.`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'yakov.dev',
  tagline: 'Software Development blog by Yakov Rakhamimov',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://yakov.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  //   organizationName: 'facebook', // Usually your GitHub org/user name.
  //   projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-44N96DYZYC',
          anonymizeIP: true,
        },
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          editUrl: 'https://github.com/jacobra19/yakov.dev/tree/master/',
          feedOptions: {
            type: ['rss'],
            copyright,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          // Enable Open Graph meta tags for blog posts
          blogTitle: 'yakov.dev',
          blogDescription: 'Software Development blog by Yakov Rakhamimov',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  // Note: Google Analytics (gtag) is configured via the classic preset above.
  // Avoid adding '@docusaurus/plugin-google-gtag' here to prevent duplicate instances.
  plugins: [],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card // TODO: update this
      //   image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'yakov.dev',
        logo: {
          alt: 'My Site Logo',
          src: 'img/code-icon.png',
        },
        items: [
          {
            href: 'https://github.com/jacobra19/yakov.dev',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Get in Touch',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/yakovify/',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/yakovify/',
              },
            ],
          },
          {
            title: 'Cross Postings',
            items: [
              {
                label: 'medium',
                href: 'https://medium.com/@yakovify',
              },
              {
                label: 'dev.to',
                href: 'https://dev.to/yakovify',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/jacobra19/yakov.dev',
              },
            ],
          },
        ],
        copyright,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        {
          'http-equiv': 'Content-Security-Policy',
          "content": "connect-src 'self' https://*.vercel-insights.com"
        },
      ],
    }),
  clientModules: [require.resolve('./client-modules/vercel-analytics.js')],
};

module.exports = config;
