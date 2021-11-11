import React from "react"
import { Global, css } from "@emotion/react"
import Header from "./Header"
import "normalize.css"
import "@fontsource/poppins/300.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "@fontsource/raleway/900.css"

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
            ::selection {
              background-color: rgba(var(--color-accent-rgb), 0.7);
            }
          }
          body {
            margin-top: 60px;
            color: #fff;
            background-color: #000;
            overflow-x: hidden;
          }
          p {
            font-family: Poppins;
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 36px;
            letter-spacing: 0em;
            text-align: left;
          }
          :root {
            --color-primary: #477fec;
            --color-accent: #edcf30;
            --color-accent-rgb: 237, 207, 48;
            --gradient-heading: linear-gradient(
              102.19deg,
              #182f82 16.27%,
              #5789eb 48.5%,
              #182f82 81.4%
            );
            --gradient-container: linear-gradient(
              203.95deg,
              #2d62df 0%,
              #4ebff0 97.48%
            );
            --screen-xl: 1180px;
            --screen-lg: 960px;
            --screen-md: 768px;
            --screen-sm: 540px;
            --screen-xs: 320px;
          }
          .grecaptcha-badge {
            visibility: hidden;
          }
        `}
      />
      <Header />
      {children}
    </div>
  )
}

export default Layout
