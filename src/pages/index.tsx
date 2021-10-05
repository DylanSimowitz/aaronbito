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

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Hero />
    <About />
    <Services />
    <Testimonials />
    <Samples />
    <Contact />
    <Footer />
  </Layout>
)

export default IndexPage
