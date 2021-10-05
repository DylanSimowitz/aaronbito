import { css } from "@emotion/react"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Container from "./Container"
import SocialLinks from "./SocialLinks"
import Logo from "../images/svg/logo.svg"
import LayeredWaves from "../images/svg/layered-waves.svg"

const Footer: React.FC<{}> = () => {
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
    <footer
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: end;
        height: 646px;
      `}
    >
      <LayeredWaves
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          z-index: -5;
        `}
      />
      <Container
        css={css`
          height: 300px;
          display: flex;
          align-items: center;
          margin: 24px 0;
        `}
      >
        <Logo
          css={css`
            flex: 1;
            height: 170px;
          `}
        />
        <div
          css={css`
            display: flex;
          `}
        >
          <ul
            css={css`
              border-left: 1px solid #fff;
              list-style: none;
              margin: -12px 0;
              padding: 0 128px 0 48px;
              font-family: Poppins;
              font-size: 24px;
              font-style: normal;
              font-weight: 400;
              line-height: 39px;
              letter-spacing: -0.055em;
              text-align: left;
              text-transform: lowercase;
            `}
          >
            {menuLinks.map(item => (
              <li
                css={css`
                  padding: 12px 0;
                `}
                key={item.name}
              >
                <a
                  href={item.link}
                  css={css`
                    text-decoration: none;
                    color: #fff;
                    &:hover {
                      color: var(--color-accent);
                    }
                  `}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div
            css={css`
              padding-left: 48px;
              border-left: 1px solid #fff;
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              a {
                margin: 6px 0;
                padding: 16px;
                display: block;
                &:hover {
                  svg {
                    fill: var(--color-accent);
                  }
                }
              }
              svg {
                fill: #fff;
              }
            `}
          >
            <SocialLinks />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
