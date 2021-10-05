import { css } from "@emotion/react"
import React from "react"
import Heading from "./Heading"
import Subheading from "./Subheading"
import Container from "./Container"
import SocialLinks from "./SocialLinks"
import Iceberg from "../images/svg/iceberg.svg"
import AaronPortrait from "../images/aaron_portrait.jpg"

const About: React.FC<{}> = () => {
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
        <Heading size={2}>I'm Aaron Bito</Heading>
        <Subheading>Nice to Meet You</Subheading>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non
            diam ut tellus feugiat interdum ac ut mauris. Proin maximus sodales
            nunc, non vehicula risus consequat id. Vestibulum vestibulum ex sed
            sem ullamcorper, non posuere diam pharetra.
          </p>
          <img
            src={AaronPortrait}
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
