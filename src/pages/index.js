import React, { useState } from 'react'
import Layout from '../common/layouts'
import { graphql } from 'gatsby'
import Hero from '../homepage/components/hero'
import Card from '../homepage/components/card'
import About from '../homepage/components/about'
import Bio from '../homepage/components/bio'
import Seo from '../common/seo'

export default ({ data }) => {
  let post = data.cards.edges[0].node

  const [state, setState] = useState({
    currentView: 'grid',
  })

  return (
    <Layout>
      <Seo
        title={'A Travel Life'}
        description={data.site.siteMetadata.description}
      />
      <Hero
        title={post.frontmatter.title}
        image={post.frontmatter.postImage.childImageSharp.fluid}
        to={post.frontmatter.slug}
        description={post.frontmatter.description}
      />

      {/* <About /> */}
      <Bio />
    </Layout>
  )
}

export const query = graphql`
  query {
    cards: allMarkdownRemark(
      sort: { order: ASC, fields: frontmatter___date }
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description: metaDescription
            slug
            postImage {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        description
      }
    }
  }
`
