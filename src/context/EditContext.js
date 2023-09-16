import { createContext, useState } from "@wordpress/element"

const EditContext = createContext()

export const EditContextProvider = ({ children }) => {
  const [resource, setResource] = useState(null)

  return (
    <EditContext.Provider value={{ resource, setResource }}>
      {children}
    </EditContext.Provider>
  )
}

export default EditContext
