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
            flex-direction: column;
            margin: -24px 0;
            > * {
              margin: 24px 0;
            }
            @media (min-width: 1024px) {
              flex-direction: row;
              margin: 0 -24px;
              > * {
                margin: 0 24px;
              }
            }
          `}
        >
          <p
            css={css`
              max-width: 550px;
              flex: 1 0;
              @media (min-width: 1024px) {
                flex-direction: row;
                flex-basis: 550px;
              }
            `}
          >
            {description}
          </p>
          <div
            css={css`
              flex: 0 1 375px;
              max-width: 375px;
            `}
          >
            <img
              src={src}
              alt="Aaron Bito"
              css={css`
                width: 100%;
                height: 100%;
                border-radius: 50%;
              `}
            />
          </div>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 auto;
            margin-top: 48px;
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
            @media (min-width: 1024px) {
              margin: 0;
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
