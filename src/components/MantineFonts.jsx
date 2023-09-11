import { Global } from "@mantine/core"
import useWPContext from '../context/useWPContext'

const MantineFonts = () => {
  const { assetsFontsUrl } = useWPContext()

  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Vazirmatn",
            src: `url('${assetsFontsUrl}/Vazirmatn-ExtraLight.woff2') format('woff2')`,
            fontWeight: 200,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Vazirmatn",
            src: `url('${assetsFontsUrl}/Vazirmatn-Regular.woff2') format('woff2')`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Vazirmatn",
            src: `url('${assetsFontsUrl}/Vazirmatn-Bold.woff2') format('woff2')`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
      ]}
    />
  )
}
export default MantineFonts
