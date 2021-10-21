import { css } from "@emotion/react"
import React from "react"
import Subheading from "./Subheading"
import Container from "./Container"
import ServiceCard from "./ServiceCard"
import { useStaticQuery, graphql } from "gatsby"

const Services: React.FC<{}> = () => {
  const services = ["Mixing", "Combo", "Mastering"]
  const {
    file: { publicURL: backgroundURL },
  } = useStaticQuery(graphql`
    query {
      file(base: { eq: "blurry-gradient.svg" }) {
        publicURL
      }
    }
  `)
  return (
    <section
      id="services"
      css={css`
        position: relative;
        padding: 130px;
        background: url(${backgroundURL});
        background-size: cover;
      `}
    >
      <Container>
        <Subheading light center>
          Professional Audio Engineering at Any Budget
        </Subheading>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 164px 0;
          `}
        >
          {services.map((item, idx) => (
            <ServiceCard
              key={item}
              id={item}
              title={item}
              featured={idx === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Services
