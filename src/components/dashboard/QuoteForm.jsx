import { useTranslation } from "react-i18next"
import useResourceList from "../../hooks/useResourceList"
import useResourceContext from "../../context/useResourceContext"
import { createPostObjectFromData } from "../../utils/wp"
import { useEffect, useState } from "@wordpress/element"
import { Button, Container, Grid, Loader, Paper, Stack, TextInput, Textarea } from "@mantine/core"

export function QuoteForm() {
  const { t } = useTranslation()
  const { restNonce, resources } = useResourceContext()
  const { restUrl, setR } = resources.quote
  const [isLoading, setIsLoading] = useState(false)

  let quoteList = useResourceList("quote") // this could be an empty array if no post of type slider exists
  let pquote = quoteList[0]
  const [quote, setQuote] = useState(pquote)

  const getQuoteMetaFromQuote = (quote) => {
    return (
      quote?.meta?._thedah_quote ?? {
        coursePageQuote: {
          mainQuote: "",
          from: "",
          description: "",
        },
        paperPageQuote: {
          mainQuote: "",
          from: "",
          description: "",
        },
        bookPageQuote: {
          mainQuote: "",
          from: "",
          description: "",
        },
      }
    )
  }

  const [quoteMeta, setQuoteMeta] = useState(getQuoteMetaFromQuote(pquote))

  useEffect(() => {
    setQuote(pquote)
    setQuoteMeta(getQuoteMetaFromQuote(pquote))
  }, [pquote])

  // Update the state when the input changes
  const handleInputChange = (e, page) => {
    const { name, value } = e.target
    setQuoteMeta((prevState) => ({
      ...prevState,
      [page]: {
        ...prevState[page],
        [name]: value,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      let newQuote = quote
      // Check if a post exists
      if (!quote) {
        // Create a new post
        const createResponse = await fetch(restUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": restNonce,
          },
          body: JSON.stringify({
            title: "New Quote Post",
            status: "publish",
            type: "quote",
          }),
        })

        if (!createResponse.ok) {
          setIsLoading(false)
          throw new Error("Creation of new quote post failed")
        }

        const createData = await createResponse.json()
        newQuote = createPostObjectFromData(createData)

        setQuote(newQuote)

        setR((prev) => [quote, ...prev])
      }

      const updateResponse = await fetch(`${restUrl}/${newQuote.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": restNonce,
        },
        body: JSON.stringify({
          meta: {
            _thedah_quote: quoteMeta,
          },
        }),
      })

      if (!updateResponse.ok) {
        setIsLoading(false)
        throw new Error("Update failed")
      }

      const updateData = await updateResponse.json()

      setQuote(createPostObjectFromData(updateData))
      console.log("Update successful")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  console.log(quote)

  return (
    
    <form onSubmit={handleSubmit}>
      <Container size='xs'>
        <Stack>
          <div style={{ marginBottom: "20px" }}>
            <h3>Course Page Quote</h3>
            <Textarea
              label="Main Quote:"
              id="mainQuote"
              name="mainQuote"
              value={quoteMeta.coursePageQuote.mainQuote}
              onChange={(e) => handleInputChange(e, "coursePageQuote")}
            />
            <TextInput
              label="From:"
              id="from"
              name="from"
              value={quoteMeta.coursePageQuote.from}
              onChange={(e) => handleInputChange(e, "coursePageQuote")}
            />
            <Textarea
              label="Description:"
              id="description"
              name="description"
              value={quoteMeta.coursePageQuote.description}
              onChange={(e) => handleInputChange(e, "coursePageQuote")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3>Paper Page Quote</h3>
            <Textarea
              label="Main Quote:"
              id="mainQuote"
              name="mainQuote"
              value={quoteMeta.paperPageQuote.mainQuote}
              onChange={(e) => handleInputChange(e, "paperPageQuote")}
            />
            <TextInput
              label="From:"
              id="from"
              name="from"
              value={quoteMeta.paperPageQuote.from}
              onChange={(e) => handleInputChange(e, "paperPageQuote")}
            />
            <Textarea
              label="Description:"
              id="description"
              name="description"
              value={quoteMeta.paperPageQuote.description}
              onChange={(e) => handleInputChange(e, "paperPageQuote")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3>Book Page Quote</h3>
            <Textarea
              label="Main Quote:"
              id="mainQuote"
              name="mainQuote"
              value={quoteMeta.bookPageQuote.mainQuote}
              onChange={(e) => handleInputChange(e, "bookPageQuote")}
            />
            <TextInput
              label="From:"
              id="from"
              name="from"
              value={quoteMeta.bookPageQuote.from}
              onChange={(e) => handleInputChange(e, "bookPageQuote")}
            />
            <Textarea
              label="Description:"
              id="description"
              name="description"
              value={quoteMeta.bookPageQuote.description}
              onChange={(e) => handleInputChange(e, "bookPageQuote")}
            />
          </div>
        </Stack>

        <Button
          type="submit"
          disabled={isLoading}
          style={{ marginTop: "20px" }}
        >
          {isLoading ? <Loader /> : "Submit"}
        </Button>
      </Container>
    </form>
  )
}
