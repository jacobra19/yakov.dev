// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
        // docs: { // TODO: consider changing this to projects
        //   sidebarPath: require.resolve('./sidebars.js'),
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // TODO: update this
          editUrl: 'https://github.com/jacobra19/yakov.dev/tree/master/blog/',
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
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

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
          // {
          //     type: 'docSidebar',
          //     sidebarId: 'tutorialSidebar',
          //     position: 'left',
          //     label: 'Tutorial',
          //   },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/facebook/docusaurus',
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
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/jacobra19',
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
    }),
};

module.exports = config;
