import { css } from "@emotion/react"
import React from "react"

const Subheading: React.FC<{ light?: boolean; center?: boolean }> = ({
  light,
  center,
  children,
}) => {
  const baseStyles = css`
    font-family: Poppins;
    font-size: 2.5em;
    font-style: normal;
    font-weight: 600;
    line-height: 42px;
    letter-spacing: -0.055em;
    text-align: ${center ? "center" : "left"};
    color: #dadada;
    text-transform: lowercase;
    margin: 0;
  `
  const lightStyles = css`
    font-weight: 300;
    letter-spacing: -0.03em;
  `
  const styles = [baseStyles]

  if (light) {
    styles.push(lightStyles)
  }

  return <h2 css={styles}>{children}</h2>
}

export default Subheading
