import { Global } from "@emotion/react"
import useWPContext from "../context/useWPContext"

export const MantineGlobal = () => {
  const { assetsFontsUrl } = useWPContext()
  return (
    <Global
      styles={`
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 400;
        src: url('${assetsFontsUrl}/Vazirmatn-Regular.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 500;
        src: url('${assetsFontsUrl}/Vazirmatn-Medium.woff2') format('woff2');
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
