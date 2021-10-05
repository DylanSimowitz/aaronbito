import { css } from "@emotion/core"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Twitter from "../images/svg/twitter.svg"
import Instagram from "../images/svg/instagram.svg"
import Soundcloud from "../images/svg/soundcloud.svg"

const SocialLinks: React.FC<{}> = ({ ...props }) => {
  const {
    site: {
      siteMetadata: { socialLinks },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            socialLinks {
              name
              link
            }
          }
        }
      }
    `
  )
  return (
    <>
      {socialLinks.map(({ link, name }) => {
        let Icon
        switch (name) {
          case "Soundcloud":
            Icon = <Soundcloud />
            break
          case "Instagram":
            Icon = <Instagram />
            break
          case "Twitter":
            Icon = <Twitter />
            break

          default:
            break
        }
        return (
          <a href={link} target="_blank" {...props} key={name}>
            {Icon}
          </a>
        )
      })}
    </>
  )
}

export default SocialLinks
