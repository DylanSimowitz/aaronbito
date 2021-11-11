import { css } from "@emotion/react"
import { graphql, useStaticQuery } from "gatsby"
import React, { forwardRef } from "react"
import Container from "./Container"
import Slider from "./Slider"
import Heading from "./Heading"
import {
  ContentfulSectionTestimonials,
  ContentfulTestimonial,
} from "../../graphql-types"
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

const Testimonials: React.FC<ContentfulSectionTestimonials> = ({
  heading,
  testimonials,
}) => {
  if (!testimonials) return <div>Testimonials not set up properly</div>

  const slides = (testimonials as ContentfulTestimonial[]).map(
    ({ name, quote, id }) => {
      return (
        <Testimonial name={name!} quote={quote?.quote!} key={id} data-id={id} />
      )
    }
  )

  const slider = useSlider(slides)
  const { selected, setSelected, Wrapper, parent } = slider

  const positions = [
    css`
      top: 10px;
      right: -50px;
      width: 160px;
      height: 160px;
      @media (min-width: 768px) {
        top: -100px;
        right: -50px;
        width: 300px;
        height: 300px;
      }
      @media (min-width: 1360px) {
        width: 400px;
        height: 400px;
      }
    `,
    css`
      bottom: 100px;
      right: -20px;
      width: 80px;
      height: 80px;
      @media (min-width: 768px) {
        bottom: 100px;
        right: -100px;
        width: 200px;
        height: 200px;
      }
      @media (min-width: 1024px) {
        right: -50px;
      }
    `,
    css`
      bottom: -5%;
      left: 10%;
      width: 130px;
      height: 130px;
      @media (min-width: 768px) {
        left: 20%;
        width: 150px;
        height: 150px;
      }
      @media (min-width: 1024px) {
        bottom: 0px;
      }
    `,
    css`
      bottom: 15%;
      left: -20px;
      width: 80px;
      height: 80px;
      @media (min-width: 768px) {
        bottom: 20%;
        left: -150px;
        width: 300px;
        height: 300px;
      }
    `,
  ]

  return (
    <section
      id="testimonials"
      css={css`
        position: relative;
        max-width: 1600px;
        margin: 0 auto;
        overflow: visible;
        padding: 120px 0;
      `}
    >
      {(testimonials as ContentfulTestimonial[]).map(({ id, image }, idx) => {
        return (
          <Portrait
            srcSet={image?.fixed?.srcSet}
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
      })}
      <Container
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        <Heading
          size={1}
          css={css`
            flex-basis: 100%;
            z-index: 10;
            @media (min-width: 768px) {
              max-width: 80%;
            }
          `}
        >
          {heading}
        </Heading>
        <Slider {...slider} ref={parent}>
          {Wrapper}
        </Slider>
      </Container>
    </section>
  )
}

export default Testimonials
