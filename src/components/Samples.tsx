import { css } from "@emotion/react"
import React from "react"
import { ContentfulSectionSamples, ContentfulSong } from "../../graphql-types"
import Container from "./Container"
import Heading from "./Heading"
import { Player } from "./Player"

export const Samples: React.FC<ContentfulSectionSamples> = ({
  heading,
  songs,
}) => {
  return (
    <section
      css={css`
        padding: 96px 0;
      `}
    >
      <Container>
        <div
          css={css`
            text-align: center;
            margin-bottom: 32px;
          `}
        >
          <Heading size={2} center>
            {heading}
          </Heading>
        </div>
        <Player songs={songs as ContentfulSong[]} />
      </Container>
    </section>
  )
}

export default Samples
