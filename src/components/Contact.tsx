import { css } from "@emotion/react"
import React, { forwardRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import Heading from "./Heading"
import ReCaptcha from "./CaptchaButton"
import { ContentfulSectionContact } from "../../graphql-types"

function encode(data: any) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const Input: React.FC<{ as?: string }> = forwardRef(
  ({ as: Component = "input", children, ...props }, ref) => {
    return (
      <div
        css={css`
          position: relative;
          > input,
          > textarea {
            border: 2px solid var(--color-accent);
            background: none;
            color: var(--color-accent);
          }
          [type="text"] {
            margin: auto 4px auto 14px;
            padding: 8px;
            border-radius: 8px;
            display: inline-block;
            max-width: 200px;
            font-size: 1em;
            height: 36px;
            &::placeholder {
              color: var(--color-accent);
              opacity: 1;
              font-size: inherit;
              font-weight: 400;
              text-transform: lowercase;
            }
            @media (min-width: 768px) {
              max-width: 210px;
              font-size: 1.15rem;
              height: 40px;
            }
          }
          textarea {
            border-radius: 16px;
            padding: 8px;
            width: 100%;
          }
          [type="checkbox"] {
            line-height: 2.1ex;
            position: absolute;
            left: -999em;
            &:checked + label::after {
              content: "";
              position: absolute;
              width: 0.8ex;
              height: 0.2ex;
              background: rgba(0, 0, 0, 0);
              left: 0.5ex;
              border: 3px solid var(--color-accent);
              border-top: none;
              border-right: none;
              transform: rotate(-45deg);
            }

            & + label {
              position: relative;
              overflow: hidden;
              cursor: pointer;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              text-transform: lowercase;
              font-size: 1.2rem;
            }

            & + label::before {
              content: "";
              display: inline-block;
              vertical-align: -25%;
              height: 1.4ex;
              width: 1.4ex;
              background-color: none;
              border: 2px solid var(--color-accent);
              border-radius: 4px;
              box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.25);
              margin-right: 0.5em;
            }
          }
        `}
      >
        <Component ref={ref} {...props} />
        {children}
      </div>
    )
  }
)

const Form: React.FC<{}> = ({ ...props }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onVerifyCaptcha = (token: string) => {
    setValue("captchaToken", token)
  }

  useEffect(() => {
    register("captchaToken", { required: true })
  })
  const onSubmit = data => {
    console.log(data)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(data),
    })
  }

  return (
    <form
      data-netlify="true"
      name="contact"
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        max-width: 800px;
        margin: 0 auto;
        background: linear-gradient(black, black) padding-box,
          var(--gradient-container);
        border-radius: 36px;
        border: 4px solid transparent;
        box-shadow: -1.51472px 13.6325px 31.8091px 3.02944px
          rgba(255, 255, 255, 0.11);
        padding: 48px 40px;
        @media (min-width: 1024px) {
          padding: 64px 88px;
        }
        p {
          font-family: Poppins;
          font-style: normal;
          font-weight: 500;
          line-height: 54px;
          letter-spacing: 0em;
          text-align: left;
          display: inline-block;
          white-space: nowrap;
          margin: 0;
          font-size: 1.6em;
          @media (min-width: 768px) {
            font-size: 2rem;
          }
        }
        .row {
          display: flex;
          text-align: center;
          align-items: center;
          flex-wrap: wrap;
        }
      `}
    >
      <div
        css={css`
          margin-bottom: 48px;
        `}
      >
        <p>Hi Aaron,</p>
      </div>
      <div className="row">
        <p>To introduce myself, I'm</p>
        <Input
          type="text"
          placeholder="Name"
          {...register("name", { required: true, maxLength: 80 })}
        />
      </div>
      <div
        className="row"
        css={css`
          margin-bottom: 48px;
        `}
      >
        <p>and my email is</p>
        <Input
          type="text"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <p>.</p>
      </div>
      <div
        css={css`
          margin-bottom: 48px;
        `}
      >
        <p
          css={css`
            margin-bottom: 16px !important;
          `}
        >
          I could really use your help with
        </p>
        <div
          css={css`
            flex-direction: column;
            width: 100%;
          `}
        >
          {["mixing", "mastering", "other"].map(service => (
            <Input
              id={service}
              key={service}
              type="checkbox"
              value={service}
              {...register("service")}
            >
              <label htmlFor={service}>{service}</label>
            </Input>
          ))}
        </div>
      </div>
      <p>Some additional things to know</p>
      <Input {...register("other", {})} as="textarea" rows="12" />
      <div
        css={css`
          font-size: 12px;
          margin-top: 8px;
          a {
            color: var(--color-primary);
            text-decoration: none;
            display: inline-block;
            padding: 0 4px;
          }
        `}
      >
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </div>
      <div
        className="row"
        css={css`
          justify-content: center;
          margin-top: 96px;
        `}
      >
        <ReCaptcha onVerifyCaptcha={onVerifyCaptcha} />
      </div>
    </form>
  )
}

const Contact: React.FC<ContentfulSectionContact> = ({ heading }) => {
  return (
    <section
      css={css`
        margin: 0 10%;
        margin-top: 64px;
        font-size: 80%;
      `}
    >
      <Heading
        size={1}
        css={css`
          display: block;
          text-align: center;
          margin-bottom: 64px;
        `}
      >
        {heading}
      </Heading>
      <Form />
    </section>
  )
}

export default Contact
