module.exports = {
  siteMetadata: {
    navbarLinks: [{ to: '/blog', name: 'Blog' }],
    title: 'Bear & a Girl',
    description:
      'A couple from German/Japan traveling Japan & the world. Currently living in Kyoto and enjoying the local culture.',
    siteUrl: 'https://bearandchi.netlify.com',
    homepageHeader: 'Bear & a Girl',
    homepageAbout:
      'A couple from German/Japan traveling Japan & the world. Currently living in Kyoto and enjoying the local culture.',
    mailChimpUrl: 'https://mailchimp.com',
    mailChimpToken: 'MAILCHIMP TOKEN HERE',
    twitter: 'https://twitter.com/bearandchi', // YOUR TWITTER PROFILE HERE
    youtube: '', // YOUR YOUTUBE PROFILE HERE
    github: '', // YOUR GITHUB PROFILE HERE
    pinterest: '', // YOUR PINTEREST PROFILE HERE
    facebook: '', // YOUR FACEBOOK PROFILE HERE
    instagram: 'https://instagram.com/bearandchiii',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {frontmatter: {type: {eq: "post"}}}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    frontmatter {
                      slug
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: 'Gatsby RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1400,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Noto Sans', 'Raleway', 'Montserrat'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-158085534-1',
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ['/success'],
        cookieDomain: 'bearandchi.netlify.com',
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-2914010296721637`,
      },
    },
    'gatsby-plugin-netlify-cms',
  ],
}
