import { css } from "@emotion/react"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Logo from "../images/svg/logo.svg"

const Header: React.FC<{}> = () => {
  const {
    site: {
      siteMetadata: { menuLinks },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            menuLinks {
              name
              link
            }
          }
        }
      }
    `
  )

  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 60px;
        padding: 8px 32px;
        border-bottom: 1px solid var(--color-primary);
        background: #000;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
      `}
    >
      <Logo
        css={css`
          height: 48px;
          width: auto;
        `}
      />
      <ul
        css={css`
          list-style: none;
          display: flex;
          align-items: center;
          padding: 0;
          flex: 1;
          justify-content: end;
          text-transform: uppercase;
          margin: 0 -30px;
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: 36px;
          letter-spacing: -0.055em;
          text-align: left;
        `}
      >
        {menuLinks.map(item => (
          <li
            css={css`
              padding: 0 30px;
            `}
            key={item.name}
          >
            <a
              href={item.link}
              css={css`
                text-decoration: none;
                color: #fff;
              `}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
