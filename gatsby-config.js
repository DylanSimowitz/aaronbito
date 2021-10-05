require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `AJB Mixing`,
    description: `description`,
    author: `@author`,
    siteUrl: `https://ajbmixing.com/`,
    socialLinks: [
      {
        name: 'Soundcloud',
        link: 'https://soundcloud.com/'
      },
      {
        name: 'Instagram',
        link: 'https://instagram.com/'
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/'
      },
    ],
    menuLinks: [
      {
        name: 'About',
        link: '#about'
      },
      {
        name: 'Services',
        link: '#services'
      },
      {
        name: 'Testimonials',
        link: '#testimonials'
      },
      {
        name: 'Samples',
        link: '#samples'
      },
      {
        name: 'Contact',
        link: '#contact'
      },
    ]
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `q8ym3w2kldd5`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-graphql-codegen`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /images\/svg/,
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/svg/icon.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
