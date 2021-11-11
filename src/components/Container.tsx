import { css } from "@emotion/react"
import React from "react"

const Container: React.FC<{}> = ({ children, ...props }) => {
  return (
    <div
      css={css`
        margin: 0 20px;
        @media (min-width: 1400px) {
          margin: 0 auto;
          max-width: var(--screen-xl);
        }
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
