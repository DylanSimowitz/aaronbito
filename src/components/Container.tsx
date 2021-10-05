import { css } from "@emotion/react"
import React from "react"

const Container: React.FC<{}> = ({ children, ...props }) => {
  return (
    <div
      css={css`
        max-width: var(--screen-xl);
        margin: 0 auto;
        overflow: hidden;
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
