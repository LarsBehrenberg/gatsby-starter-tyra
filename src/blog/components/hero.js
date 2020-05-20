import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import 'tachyons'

const ImageWrapper = styled.div`
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: -10;
  }
`

export default props => (
  <div>
    <Img fluid={props.image} className="h5" />
    <div
      className="ph2 pv5 flex flex-column justify-center items-center"
      style={{ position: 'absolute', left: '0', right: '0', top: '20px' }}
    >
      <Link
        to={`/${props.category}`}
        className="sans-serif ttu white tracked f6"
      >
        {props.category}
      </Link>
      <h1 className="white display fw4 f1-l f2 tc">{props.title}</h1>
      <span className="sans-serif white tracked ttu f6 mb2">
        by {props.author}
      </span>
      <span className="sans-serif white tracked ttu f6">{props.date}</span>
    </div>
  </div>
)
