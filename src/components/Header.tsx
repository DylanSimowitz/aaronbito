import { css } from "@emotion/react"
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Squash as Hamburger } from "hamburger-react"
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

  const [open, setOpen] = useState(false)

  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 8px 32px;
        border-bottom: 1px solid var(--color-primary);
        background: #000;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        .hamburger-react {
          order: 1;
        }
        @media (min-width: 768px) {
          height: 60px;
          flex-direction: row;
          .hamburger-react {
            display: none;
          }
        }
      `}
    >
      <Logo
        css={css`
          height: 48px;
          width: auto;
          order: 0;
        `}
      />
      <ul
        css={css`
          order: 2;
          list-style: none;
          flex-direction: column;
          align-items: center;
          padding: 0;
          flex: 1;
          flex-basis: 100%;
          text-transform: uppercase;
          margin: 0 -30px;
          font-style: normal;
          font-weight: 700;
          line-height: 36px;
          letter-spacing: -0.055em;
          text-align: left;
          background: #000;
          height: 100vh;
          justify-content: center;
          font-size: 30px;
          display: ${open ? "flex" : "none"};
          @media (min-width: 768px) {
            flex-direction: row;
            flex-basis: auto;
            justify-content: end;
            font-size: 20px;
            display: flex !important;
            height: 100%;
          }
        `}
      >
        {menuLinks.map(item => (
          <li
            css={css`
              padding: 20px 0;
              @media (min-width: 768px) {
                padding: 0 30px;
              }
            `}
            key={item.name}
            onClick={() => {
              setOpen(false)
            }}
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
      <Hamburger toggled={open} toggle={setOpen} />
    </header>
  )
}

export default Header
