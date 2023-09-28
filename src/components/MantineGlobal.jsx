import { Global } from "@emotion/react"
import useWPContext from "../context/useWPContext"
import { useMantineTheme } from "@mantine/core"
// import useWPContext from '../context/useWPContext'
// const MantineFonts = () => {
//   const { assetsFontsUrl } = useWPContext()

//   return (
//     <Global
//       styles={[
//         {
//         },
//         {
//           "@font-face": {
//             fontFamily: "Vazirmatn",
//             src: `url('${assetsFontsUrl}/Vazirmatn-ExtraLight.woff2') format('woff2')`,
//             fontWeight: 200,
//             fontStyle: "normal",
//           },
//         },
//         {
//           "@font-face": {
//             fontFamily: "Vazirmatn",
//             src: `url('${assetsFontsUrl}/Vazirmatn-Regular.woff2') format('woff2')`,
//             fontWeight: 400,
//             fontStyle: "normal",
//           },
//         },
//         {
//           "@font-face": {
//             fontFamily: "Vazirmatn",
//             src: `url('${assetsFontsUrl}/Vazirmatn-Bold.woff2') format('woff2')`,
//             fontWeight: 700,
//             fontStyle: "normal",
//           },
//         },
//       ]}
//     />
//   )
// }
// export default MantineFonts



export const MantineGlobal = () => {
  const { assetsFontsUrl } = useWPContext()
  const theme = useMantineTheme()
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
