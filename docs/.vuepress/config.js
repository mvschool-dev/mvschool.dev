// .vuepress/config.js

const DEPLOY_DOMAIN = 'https://school.kencloud.com'
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
      description: 'Metaverse School Developer Resources'
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
      name: 'Metaverse School'
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
            title: 'Prequel',
            collapsable: false,
            children: [
              '/Prequel/'
            ]
          },
          {
            title: 'Definition',
            collapsable: false,
            children: [
              '/Definition/',
              '/Definition/OutlierVenture/',
              '/Definition/MatthewBall.vc/'
            ]
          },
          {
            title: 'Framework',
            collapsable: false,
            children: 
            [
              '/Framework/framework for the metaverse',
              '/Framework/hardware',
              '/Framework/networking',
              '/Framework/compute',
              '/Framework/virtual platforms',
              '/Framework/interchange tools and standards',
              '/Framework/payments, payment rails and blockchains',
              '/Framework/content, services and asset businesses',
              '/Framework/evolving user and business behaviors'
            ]
          },
          {
            title: 'Buidl',
            collapsable: false,
            children: [
              '/Buidl/',
              '/Buidl/Open Metaverse OS/',
              '/Buidl/Open Metaverse OS/Hardware Infrastructure/',
              '/Buidl/Open Metaverse OS/Software Backend/',
              '/Buidl/Open Metaverse OS/Software Backend/IPFS/',
              '/Buidl/Open Metaverse OS/Software Backend/Filecoin/',
              '/Buidl/Open Metaverse OS/Software Backend/Connecting the Metaverse with IPFS.md',
              '/Buidl/Open Metaverse OS/World Primitives & Rules/',
              '/Buidl/Open Metaverse OS/In-world Assets/',
              '/Buidl/Open Metaverse OS/End-user Hardware/',
              '/Buidl/Open Metaverse OS/End-user Software/',
              '/Buidl/Open Metaverse OS/Bridges/',
              '/Buidl/Web3 Toolbox/',
              '/Buidl/Web3 Toolbox/Peer-to-Peer Networks/',
              '/Buidl/Web3 Toolbox/Transaction Layer/',
              '/Buidl/Web3 Toolbox/Programmability Layer/',
              '/Buidl/Web3 Toolbox/Decentralised Finance/',
              '/Buidl/Web3 Toolbox/NFTs - Sovereign Virtual Goods/',
              '/Buidl/Web3 Toolbox/Decentralised Governance/',
              '/Buidl/Web3 Toolbox/Decentralised Cloud Services/',
              '/Buidl/Web3 Toolbox/Self-sovereign Identity/',
              '/Buidl/Web3 Toolbox/Agents/'
            ]
          },
          {
            title: 'Resource',
            collapsable: false,
            children: [
              '/Resource/'
            ]
          },
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
