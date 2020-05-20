import React, { useState } from 'react'
import Layout from '../common/layouts'
import { Link, graphql } from 'gatsby'
import Breadcrumbs from './components/breadcrumbs'
import Preview from './components/post-preview.js'
import Seo from '../common/seo'
import Card from '../homepage/components/card'
import 'tachyons'

export default ({ data }) => {
  const [state, setState] = useState({
    currentView: 'grid',
  })
  console.log(data)
  // const posts = this.props.data.posts.edges
  // const hasNext = this.props.data.posts.pageInfo.hasNextPage
  return (
    <Layout>
      <Seo
        title={`All Blog Posts | BearandGirl`}
        description={`Index of all blog posts`}
      />
      {/* <div className="pv5 flex items-center justify-center bg-gray">
          <h1 className="fw1 tc f2 display white">All Blog Posts</h1>
        </div>
        <div className="mw9 center">
          <Breadcrumbs
            lastName="Blog"
            lastPath="/blog"
            currentPage={`Page ${this.props.pageContext.pageNumber}`} />
          {posts.map(({node}) => (
            <Preview
              fluidImage={node.frontmatter.postImage.childImageSharp.fluid}
              slug={node.frontmatter.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              category={node.frontmatter.category}
              description={node.frontmatter.metaDescription} />
          ))}
          <div className="pv5 flex w-100">
            {hasNext &&
                <Link
                  className="dark-gray sans-serif ttu tracked no-underline"
                  to={this.props.pageContext.nextPage}>Next Page &rarr;</Link>
            }
          </div>
        </div> */}
      <div className="ml6 pl4 pb3 right" style={{ maxWidth: '1000px' }}>
        <button
          className="mt3 dib no-underline ph5 pv3 sans-serif near-white bg-dark-gray ttu tracked b grow"
          onClick={() =>
            state.currentView === 'grid'
              ? setState({ currentView: 'list' })
              : setState({ currentView: 'grid' })
          }
        >
          Toggle View
        </button>
      </div>
      <div
        className="flex flex-wrap center mw9 justify-around pb3 pt4"
        style={{ maxWidth: '1200px' }}
      >
        {data.posts.edges.map(({ node }) => (
          <Card
            title={node.frontmatter.title}
            image={node.frontmatter.postImage.childImageSharp.fluid}
            to={node.frontmatter.slug}
            description={node.frontmatter.description}
            view={state.currentView}
          />
        ))}
      </div>
    </Layout>
  )
}

export const blogQuery = graphql`
  query posts {
    posts: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "post" } } }
      sort: { fields: frontmatter___date, order: DESC }
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
  }
`
