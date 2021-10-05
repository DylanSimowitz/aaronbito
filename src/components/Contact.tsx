import { css } from "@emotion/react"
import React, { forwardRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import Heading from "./Heading"
import ReCaptcha from "./CaptchaButton"

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
            font-size: 1.15rem;
            &::placeholder {
              color: var(--color-accent);
              font-size: 1.15rem;
              font-weight: 400;
              text-transform: lowercase;
            }
          }
          textarea {
            border-radius: 16px;
            padding: 8px;
            flex: 1;
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
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        max-width: 800px;
        margin: 0 auto;
        padding: 64px 88px;
        background: linear-gradient(black, black) padding-box,
          var(--gradient-container);
        border-radius: 36px;
        border: 4px solid transparent;
        box-shadow: -1.51472px 13.6325px 31.8091px 3.02944px
          rgba(255, 255, 255, 0.11);
        p {
          font-family: Poppins;
          font-size: 32px;
          font-style: normal;
          font-weight: 500;
          line-height: 54px;
          letter-spacing: 0em;
          text-align: left;
          display: inline-block;
          margin: 0;
        }
        div {
          display: flex;
          flex-wrap: wrap;
          text-align: center;
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
      <div>
        <p>To introduce myself, I'm</p>
        <Input
          type="text"
          placeholder="Name"
          {...register("Name", { required: true, maxLength: 80 })}
        />
      </div>
      <div
        css={css`
          margin-bottom: 48px;
        `}
      >
        <p>and my email is</p>
        <Input
          type="text"
          placeholder="Email"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
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
          <Input {...register} type="checkbox" value="mixing" id="mixing">
            <label htmlFor="mixing">Mixing</label>
          </Input>
          <Input {...register} type="checkbox" value="mastering" id="mastering">
            <label htmlFor="mastering">Mastering</label>
          </Input>
          <Input {...register} type="checkbox" value="other" id="other">
            <label htmlFor="other">Other</label>
          </Input>
        </div>
      </div>
      <p>Some additional things to know</p>
      <Input {...register("Other", {})} as="textarea" rows="12" />
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

const Contact: React.FC<{}> = ({ ...props }) => {
  return (
    <section
      css={css`
        margin-top: 64px;
      `}
    >
      <Heading
        size={2}
        css={css`
          display: block;
          text-align: center;
          margin-bottom: 64px;
        `}
      >
        Let's Work Together
      </Heading>
      <Form />
    </section>
  )
}

export default Contact