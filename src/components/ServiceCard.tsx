import { css } from "@emotion/react"
import React from "react"
import Subheading from "./Subheading"
import CAB from "./CAB"

const ServiceCard: React.FC<{
  title: string
  features: string[]
  featured?: boolean
}> = ({ title, featured, features, ...props }) => {
  const baseStyles = css`
    width: 365px;
    height: 485px;
    background: #000;
    box-shadow: -1.84061px 16.5655px 38.6528px 3.68121px
      rgba(150, 150, 150, 0.1);
    border-radius: 43px;
    transform-origin: center;
    display: flex;
    flex-direction: column;
    padding: 16px 30px;
    order: 0;
    text-align: center;

    ul {
      margin-top: 24px;
      padding: 0;
    }
    li {
      margin-bottom: 24px;
    }
  `

  const featuredStyles = css`
    order: 1;
    @media (min-width: 1360px) {
      background: #1b1b1b;
      order: 0;
      transform: scale(1.25);
      z-index: 5;
    }
  `

  const styles = [baseStyles]
  if (featured) {
    styles.push(featuredStyles)
  }

  return (
    <div css={styles} {...props}>
      <Subheading center>{title}</Subheading>
      <div
        css={css`
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <ul>
          {features.map(feature => (
            <li>{feature}</li>
          ))}
        </ul>
      </div>
      <CAB
        css={css`
          width: 75%;
          margin: 0 auto;
        `}
      >
        Get a Quote
      </CAB>
    </div>
  )
}

export default ServiceCard
