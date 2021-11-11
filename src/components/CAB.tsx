import { css } from "@emotion/react"
import React from "react"

const CAB: React.FC<{}> = ({ children, ...props }) => {
  return (
    <button
      css={css`
        border: 4px solid #edcf30;
        box-sizing: border-box;
        border-radius: 15px;
        padding: 4px 36px;
        text-transform: uppercase;
        font-family: Poppins;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 42px;
        letter-spacing: -0.055em;
        text-align: center;
        background: transparent;
        color: #fff;
        cursor: pointer;
        a {
          color: inherit;
          text-decoration: none;
        }
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default CAB
