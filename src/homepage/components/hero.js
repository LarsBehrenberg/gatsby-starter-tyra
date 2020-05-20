import React from 'react'
import Img from 'gatsby-image'
import '../../common/styles/custom.tachyons.css'
import 'tachyons'
import { graphql, useStaticQuery } from 'gatsby'

export default props => {
  const data = useStaticQuery(graphql`
    query {
      banner: file(relativePath: { eq: "img/blog-cover.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 720, maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div>
      <Img
        className="w-100 vh-93 center mb2"
        fluid={data.banner.childImageSharp.fluid}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        <h1 className="white w-9">BearandGirl - A blog about life</h1>
      </div>
    </div>
  )
}
