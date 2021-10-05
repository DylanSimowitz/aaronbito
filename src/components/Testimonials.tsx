import { css } from "@emotion/react"
import { graphql, useStaticQuery } from "gatsby"
import React, { forwardRef } from "react"
import Container from "./Container"
import Slider from "./Slider"
import Heading from "./Heading"
import { ContentfulTestimonial } from "../../graphql-types"
import useSlider from "../hooks/useSlider"

const Testimonial: React.FC<{ quote: string; name: string }> = forwardRef(
  ({ quote, name, ...props }, ref) => {
    return (
      <figure
        css={css`
          font-family: Poppins;
          font-size: 24px;
          font-style: normal;
          font-weight: 400;
          line-height: 36px;
          letter-spacing: 0em;
          display: flex;
          align-items: center;
          justify-content: center;
          blockquote {
            margin: 16px 0;
          }
          cite {
            display: none;
          }
        `}
        {...props}
        ref={ref}
      >
        <figcaption>
          <cite>{name}</cite>
        </figcaption>
        <blockquote>{quote}</blockquote>
      </figure>
    )
  }
)

const Portrait: React.FC<{ active: boolean }> = ({ active, ...props }) => {
  const baseStyles = css`
    border-radius: 50%;
    cursor: pointer;
    position relative;
  `
  const activeStyles = css`
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
  `
  const styles = [baseStyles]
  if (active) styles.push(activeStyles)
  return <img css={styles} {...props} />
}

const Testimonials: React.FC<{}> = () => {
  const {
    allContentfulTestimonial: { nodes: testimonials },
  } = useStaticQuery<ContentfulTestimonial[]>(graphql`
    {
      allContentfulTestimonial {
        nodes {
          id
          name
          quote {
            quote
          }
          image {
            fixed(width: 400) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  `)

  const slides = testimonials.map(({ id, name, quote: { quote } }) => {
    return <Testimonial name={name} quote={quote} key={id} data-id={id} />
  })

  const slider = useSlider(slides)
  const { selected, setSelected, Wrapper, parent } = slider

  const positions = [
    css`
      top: -100px;
      right: -50px;
    `,
    css`
      bottom: 100px;
      right: -50px;
      width: 200px;
      height: 200px;
    `,
    css`
      bottom: 0px;
      left: 30%;
      width: 150px;
      height: 150px;
    `,
    css`
      bottom: 20%;
      left: -150px;
      width: 300px;
      height: 300px;
    `,
  ]

  return (
    <section
      css={css`
        position: relative;
        overflow: hidden;
        padding-bottom: 300px;
        padding-top: 100px;
      `}
    >
      {testimonials.map(
        (
          {
            id,
            image: {
              fixed: { srcSet },
            },
          },
          idx
        ) => {
          return (
            <Portrait
              srcSet={srcSet}
              key={id}
              active={selected === id}
              onClick={() => setSelected(id)}
              css={css`
                position: absolute;
                z-index: 1;
                ${positions[idx]}
              `}
            />
          )
        }
      )}
      <Container>
        <Heading
          size={2}
          css={css`
            max-width: 80%;
            line-height: 112px;
          `}
        >
          Dozens of Satisfied Clients
        </Heading>
        <Slider {...slider} ref={parent}>
          {Wrapper}
        </Slider>
      </Container>
    </section>
  )
}

export default Testimonials
