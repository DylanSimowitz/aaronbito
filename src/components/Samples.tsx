import { css } from "@emotion/react"
import React from "react"
import Container from "./Container"
import Heading from "./Heading"
import { Player } from "./Player"

export const Samples: React.FC<{}> = () => {
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
            Listen for Yourself
          </Heading>
        </div>
        <Player />
      </Container>
    </section>
  )
}

export default Samples
