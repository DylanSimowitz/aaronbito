import { css } from "@emotion/react"
import React from "react"
import Heading from "./Heading"
import Subheading from "./Subheading"
import CAB from "./CAB"
import Container from "./Container"
import Waveform from "../images/svg/waveform.svg"

const Hero: React.FC<{ heading?: string; subheading?: string }> = ({
  heading,
  subheading,
}) => {
  return (
    <section
      css={css`
        padding: 86px 0;
      `}
    >
      <Waveform
        css={css`
          width: 100%;
          position: absolute;
          z-index: -100;
        `}
      />
      <Container>
        <Heading>{heading}</Heading>
        <Subheading>{subheading}</Subheading>
        <CAB
          css={css`
            margin-top: 80px;
          `}
        >
          Get in Touch
        </CAB>
      </Container>
    </section>
  )
}

export default Hero
