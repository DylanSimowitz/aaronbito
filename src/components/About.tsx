import { css } from "@emotion/react"
import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Heading from "./Heading"
import Subheading from "./Subheading"
import Container from "./Container"
import SocialLinks from "./SocialLinks"
import Iceberg from "../images/svg/iceberg.svg"
import AaronPortrait from "../images/aaron_portrait.jpg"
import { ContentfulSectionAbout } from "../../graphql-types"

const About: React.FC<Partial<ContentfulSectionAbout>> = ({
  heading,
  subheading,
  description: desc,
  photo,
}) => {
  const src = photo?.file?.url || AaronPortrait
  //@ts-ignore
  const description = desc?.raw
    ? documentToReactComponents(JSON.parse(desc?.raw))
    : ""
  return (
    <section id="about" css={css``}>
      <Iceberg
        css={css`
          width: 100%;
        `}
      />
      <Container
        css={css`
          padding: 96px 0;
        `}
      >
        <Heading size={2}>{heading}</Heading>
        <Subheading>{subheading}</Subheading>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <p
            css={css`
              max-width: 550px;
            `}
          >
            {description}
          </p>
          <img
            src={src}
            alt="Aaron Bito"
            css={css`
              width: 375px;
              height: 375px;
              border-radius: 50%;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 200px;
            fill: #fff;

            a {
              &:hover {
                fill: var(--color-accent);
              }
              &:nth-of-type(2n) {
                svg {
                  fill: var(--color-accent);
                }
              }
            }
          `}
        >
          <SocialLinks />
        </div>
      </Container>
      <Iceberg
        css={css`
          width: 100%;
          transform: rotate(180deg);
        `}
      />
    </section>
  )
}

export default About
