import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3"
import React from "react"
import CAB from "./CAB"

const CaptchaButton: React.FC<{ onVerifyCaptcha: (token: string) => any }> = ({
  onVerifyCaptcha,
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const clickHandler = async () => {
    if (!executeRecaptcha) {
      return
    }

    const token = await executeRecaptcha("contact")

    onVerifyCaptcha(token)
  }

  return (
    <CAB type="submit" onClick={clickHandler}>
      Send It
    </CAB>
  )
}

export const ReCaptcha: React.FC<{ onVerifyCaptcha: (token: string) => any }> =
  ({ onVerifyCaptcha }) => (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
      <CaptchaButton onVerifyCaptcha={onVerifyCaptcha} />
    </GoogleReCaptchaProvider>
  )

export default ReCaptcha
