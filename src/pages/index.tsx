import * as React from "react"

import Seo from "../components/seo"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import About from "../components/About"
import Services from "../components/Services"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Testimonials from "../components/Testimonials"
import Samples from "../components/Samples"
import { graphql, useStaticQuery } from "gatsby"
import { ContentfulPage } from "../../graphql-types"

const IndexPage = () => {
  const {
    //@ts-ignore
    contentfulPage: { sections },
  } = useStaticQuery<ContentfulPage>(graphql`
    query {
      contentfulPage(internalName: { eq: "Home Page" }) {
        sections {
          ... on ContentfulSectionHero {
            heading
            subheading
          }
          ... on ContentfulSectionAbout {
            heading
            subheading
            description {
              raw
            }
            photo {
              file {
                url
              }
            }
          }
          ... on ContentfulSectionContact {
            heading
          }
          ... on ContentfulSectionServices {
            id
            heading
            service {
              name
              feature
            }
          }
          ... on ContentfulSectionTestimonials {
            heading
            testimonials {
              quote {
                quote
              }
              id
              name
              image {
                fixed {
                  srcSet
                }
              }
            }
          }
          ... on ContentfulSectionSamples {
            heading
            songs {
              artist
              title
              id
              track {
                file {
                  url
                }
              }
              artwork {
                fixed(width: 200) {
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Seo title="Home" />
      <Hero {...sections![0]} />
      <About {...sections![1]} />
      <Services {...sections![2]} />
      <Testimonials {...sections![3]} />
      <Samples {...sections![4]} />
      <Contact {...sections![5]} />
      <Footer />
    </Layout>
  )
}

export default IndexPage
