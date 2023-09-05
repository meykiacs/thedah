import { createContext } from "@wordpress/element"

const WPContext = createContext()

export const WPProvider = ({ children, providedValues }) => {
  return (
    <WPContext.Provider
      value={{
        ...providedValues,
      }}
    >
      {children}
    </WPContext.Provider>
  )
}

export default WPContext
