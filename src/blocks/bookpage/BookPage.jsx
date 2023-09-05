import { WPProvider } from "../../context/WPContext"
import '../../globals.css'
export default function BookPage({ providedValues }) {
    
  return (
    <WPProvider providedValues={providedValues}>
      <div className="text-3xl">bookpage</div>
    </WPProvider>
  )
}
