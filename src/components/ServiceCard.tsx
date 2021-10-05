import { css } from "@emotion/react"
import React from "react"
import Subheading from "./Subheading"
import CAB from "./CAB"

const ServiceCard: React.FC<{ title: string; featured?: boolean }> = ({
  title,
  featured,
  ...props
}) => {
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

    ul {
      margin-top: 24px;
    }
    li {
      margin-bottom: 24px;
    }
  `

  const featuredStyles = css`
    transform: scale(1.25);
    z-index: 5;
    background: #1b1b1b;
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
        `}
      >
        <ul>
          <li>Lorem ipsum sit dolor amet</li>
          <li>Lorem ipsum sit dolor amet</li>
          <li>Lorem ipsum sit dolor amet</li>
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
