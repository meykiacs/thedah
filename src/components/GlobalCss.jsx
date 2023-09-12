import { Global } from "@emotion/react"
import useWPContext from "../context/useWPContext"
import { useTheme } from "@emotion/react"

const GlobalCss = () => {
  const theme = useTheme()
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

      /* http://meyerweb.com/eric/tools/css/reset/ 
       v2.0 | 20110126
      License: none (public domain)
      */

      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed, 
      figure, figcaption, footer, header, hgroup, 
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure, 
      footer, header, hgroup, menu, nav, section {
        display: block;
      }
      body {
        line-height: 1;
      }
      ol, ul {
        list-style: none;
      }
      blockquote, q {
        quotes: none;
      }
      blockquote:before, blockquote:after,
      q:before, q:after {
        content: '';
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

     
      /* GLOBAL STYLES */
      
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        line-height: 1.45;	
      }
      
      html {
        font-size: 62.5%;
      }
      
      body {
        color: ${theme.colors.text};
        background-color: ${theme.colors.background};
      }
      
      a:focus {
        outline: 5px auto ${theme.colors.primary};
      }
      
      
      body, input, button, select, option {
        font-family: ${theme.fontFamily};
      }
      
      
      h1, h2, h3, h4, h5, h6, p {
        text-rendering: optimizeLegibility;
      }
      
      ::selection {
        background-color: ${theme.colors.primary};
        color: #FFF;
      }
      
      @media (orientation: landscape) {
        ::-webkit-scrollbar {
          width: 9px;
          height: 11px;
          background-color: transparent;
        }
      
        ::-webkit-scrollbar-track {
          border-radius: 3px;
          background-color: transparent;
        }
      
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: ${theme.colors.gray};
          background-color: 2px solid ${theme.colors.background};
        }
      }
      `}
    />
  )
}
export default GlobalCss
