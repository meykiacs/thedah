import { Global } from "@emotion/react"
import useWPContext from "../context/useWPContext"

const Fonts = () => {
  const { assetsFontsUrl } = useWPContext()
  return (
    <Global
      styles={`
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 200;
        src: url('${assetsFontsUrl}/Vazirmatn-ExtraLight.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 400;
        src: url('${assetsFontsUrl}/Vazirmatn-Regular.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 700;
        src: url('${assetsFontsUrl}/Vazirmatn-Bold.woff2') format('woff2');
      }
      `}
    />
  )
}
export default Fonts
