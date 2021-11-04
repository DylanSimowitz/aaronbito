import { css } from "@emotion/react"
import React from "react"
import Subheading from "./Subheading"
import Container from "./Container"
import ServiceCard from "./ServiceCard"
import { useStaticQuery, graphql } from "gatsby"
import { ContentfulSectionServices } from "../../graphql-types"

const Services: React.FC<ContentfulSectionServices> = ({
  id,
  heading,
  service,
}) => {
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
          {service!.map((item, idx) => (
            <ServiceCard
              key={item?.name!}
              title={item?.name!}
              features={item?.feature!}
              featured={idx === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Services
