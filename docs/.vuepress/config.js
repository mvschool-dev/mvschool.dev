// .vuepress/config.js

const DEPLOY_DOMAIN = 'https://ms.kencloud.com'
const SPEEDCURVE_ID = process.env.SPEEDCURVE_ID || ''
const COUNTLY_KEY = process.env.COUNTLY_KEY || ''
const pageSuffix = '/'

module.exports = {
  base: '/',
  head: require('./head'),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Metaverse School',
      description: 'Metaverse Developer Resources'
    }
  },
  markdown: {
    pageSuffix,
    extendMarkdown: md => {
      md.set({
        breaks: true
      })
      md.use(require('markdown-it-video'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-deflist')),
        md.use(require('markdown-it-imsize')),
        md.use(require('markdown-it-image-lazy-loading'))
    }
  },
  themeConfig: {
    defaultImage: '/images/metaverse.png',
    author: {
      name: 'Metaverse School',
      twitter: '@KenLabs_Web3'
    },
    keywords:
      'Metaverse, IPFS, NFT, KEN Labs',
    domain: DEPLOY_DOMAIN,
    docsRepo: 'kenlabs/metaverse-school',
    docsDir: 'docs',
    docsBranch: 'main',
    feedbackWidget: {
      docsRepoIssue: 'kenlabs/metaverse-school'
    },
    editLinks: false,
    // page nav
    nextLinks: false,
    prevLinks: false,
    sidebarDepth: 3,
    // ui/ux
    logo: '/images/metaverse.png',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: require('./nav/en'),
        sidebar: [
          {
            title: 'prequel',
            collapsable: true,
            children: [
              '/prequel/Introduction',
              '/prequel/The History of the Metaverse',
              '/prequel/9 Megatrends Shaping the Metaverse',
              '/prequel/A Brief History of Crypto Markets',
              '/prequel/The State of the Metaverse Today'
            ]
          },
          {
            title: 'definition',
            collapsable: true,
            children:
              [
                '/definition/Introduction',
                '/definition/Metaverse vs. Multiverse vs. Omniverse',
                '/definition/Open vs. Closed - The Competing Visions',
                '/definition/Web3 vs. Metaverse',
                '/definition/XR 2.0 vs. Metaverse',
                '/definition/Perspectives on the Metaverse'
              ]
          },
          {
            title: 'framework',
            collapsable: true,
            children:
              [
                '/framework/The Metaverse Value-Chain',
                '/framework/Matthew Ball’s Metaverse Primer',
                '/framework/Coinbase Metaverse Stack',
                '/framework/OV Open Metaverse OS',
                '/framework/Protocol Labs Metaverse Stack'
              ]
          },
          {
            title: 'primitives',
            collapsable: true,
            children: [
              '/primitives/Introduction',
              '/primitives/Computation in Metaverse',
              '/primitives/Storage - The Cornerstone of the Metaverse Ecosystem',
              '/primitives/Connecting the Metaverse with Bridges',
              '/primitives/The Role of Identity in Connecting the Metaverse',
              '/primitives/Carry Your Reputation Across Metaverse',
              '/primitives/NFTs and Their Role in The Metaverse',
              '/primitives/MetaFi - DeFi for the Metaverse',
              '/primitives/Metaverse-DAO - A Superior Combination and Solution'
            ]
          },
          {
            title: 'buidl',
            collapsable: true,
            children:
              [
                '/buidl/Opportunities in the Metaverse',
                '/buidl/Value Creation in the Metaverse',
                '/buidl/Community-Driven Technical Capability Framework',
                '/buidl/The Metaverse Industry Landscape'
              ]
          },
          {
            title: 'Resource',
            collapsable: true,
            children: [

              '/resource/All Things Web',
              '/resource/Building the Metaverse',
              '/resource/Reed Smith Guide to the Metaverse',
              '/resource/28 slides explaining 11 frontiers of tech-driven innovation',
              '/resource/The Metaverse Builders',
              '/resource/Recommended tools',
              '/resource/Featured Metaverse dev sites',
              '/resource/Miscellaneous'
            ]
          },
          {
            title: 'Contribute',
            collapsable: true,
            children: [
              '/contribute/'
            ]
          }
        ]
      }
    },
  },
  plugins: [
    [require('./plugins/vuepress-plugin-speedcurve'), { id: SPEEDCURVE_ID }],
    [require('./plugins/vuepress-plugin-countly'), {
      domain: DEPLOY_DOMAIN,
      key: COUNTLY_KEY
    }],
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: pageSuffix,
        indexSuffix: pageSuffix,
        notFoundPath: '/ipfs-404.html'
      }
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: ($page, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: ($page, $site) =>
          $page.frontmatter.author || $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page =>
          ['articles', 'posts', 'blog'].some(folder =>
            $page.regularPath.startsWith('/' + folder)
          )
            ? 'article'
            : 'website',
        url: ($page, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image
            ? ($site.themeConfig.domain || '') + $page.frontmatter.image
            : ($site.themeConfig.domain || '') + $site.themeConfig.defaultImage,
        publishedAt: $page =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        customMeta: (add, context) => {
          const { $site, image } = context
          add(
            'twitter:site',
            ($site.themeConfig.author && $site.themeConfig.author.twitter) || ''
          )
          add('image', image)
          add('keywords', $site.themeConfig.keywords)
        }
      }
    ],
    [
      'vuepress-plugin-canonical',
      {
        // add <link rel="canonical" header (https://tools.ietf.org/html/rfc6596)
        // to deduplicate SEO across all copies loaded from various public gateways
        baseURL: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-sitemap',
      {
        hostname: DEPLOY_DOMAIN,
        exclude: ['/ipfs-404.html']
      }
    ],
    [
      'vuepress-plugin-robots',
      {
        host: DEPLOY_DOMAIN
      }
    ],
    [
      '@vuepress/html-redirect',
      {
        countdown: 0
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'callout',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'left',
        defaultTitle: ''
      }
    ],
    'vuepress-plugin-chunkload-redirect',
    'vuepress-plugin-ipfs'
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
