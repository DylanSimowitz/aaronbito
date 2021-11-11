import { css } from "@emotion/react"
import React from "react"

const Heading: React.FC<{ size?: number; center?: boolean }> = ({
  size = 1,
  center = false,
  children,
  ...props
}) => {
  const sizes = { 1: 4.5, 2: 2 }
  return (
    <h1
      css={css`
        background: var(--gradient-heading);
        background-clip: text;
        display: inline-block;
        padding-right: 4px;
        text-transform: uppercase;
        font-family: Raleway;
        font-size: ${sizes[size]}em;
        font-style: normal;
        font-weight: 900;
        line-height: ${sizes[size] * 16}px;
        letter-spacing: -0.04em;
        text-align: ${center ? "center" : "left"};
        margin: 0;
        text-fill-color: transparent;
        @media (min-width: 768px) {
          font-size: ${sizes[size] * 1.5}em;
          line-height: ${sizes[size] * 1.5 * 16}px;
        }
      `}
      {...props}
    >
      {children}
    </h1>
  )
}

export default Heading
