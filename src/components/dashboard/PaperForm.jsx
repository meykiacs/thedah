import useEditContext from "../../context/useEditContext";
import ResourceForm from "./ResourceForm";


export default function PaperForm({resource}) {
  const {resource: editingResource, setResource: setEditingResource} = useEditContext()
  const inputs = [
    { name: "title", placeholder: "Title", default: editingResource?.title ?? "" },
    {
      name: "author",
      placeholder: "Author",
      default: editingResource?.meta?._thedah_paper?.author ?? "",
    },
    {
      name: "publisher",
      placeholder: "Publisher",
      default: editingResource?.meta?._thedah_paper?.publisher ?? "",
    },
    {
      name: "year",
      placeholder: "Year",
      default: editingResource?.meta?._thedah_paper?.year ?? "",
    },
    {
      name: "edition",
      placeholder: "Edition",
      default: editingResource?.meta?._thedah_paper?.edition ?? "",
    },
    {
      name: "numberOfPages",
      placeholder: "numberOfPages",
      default: editingResource?.meta?._thedah_paper?.numberOfPages ?? "",
    },
    {
      name: "isbn",
      placeholder: "ISBN",
      default: editingResource?.meta?._thedah_paper?.isbn ?? "",
    },
    {
      name: "price",
      placeholder: "Price",
      default: editingResource?.meta?._thedah_paper?.price ?? "",
    },
  ]

  return (
    <ResourceForm resource={resource} inputs={inputs} />
  )
}
