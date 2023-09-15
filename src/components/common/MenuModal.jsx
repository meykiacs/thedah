import { Portal, Close, Content, Overlay } from "@radix-ui/react-dialog"
// import SiteLogo from "./SiteLogo"
import styled from "@emotion/styled"
import Icon from "./Icon"
import UnstyledButton from "./UnstyledButton"
import { useTranslation } from "react-i18next"
import VisuallyHidden from "./VisuallyHidden"

export default function MenuModal() {
  const { t } = useTranslation()
  return (
    <Portal>
      <Overlay />
      <SearchContent>
        <Close asChild>
          <SearchButton>
            <Icon id="close" color="#fff" size="48px" strokeWidth="1" />
          </SearchButton>
        </Close>
        <Form>
          <Title>{t("SearchInTheSite")}</Title>
          <label htmlFor="search">
            <VisuallyHidden>{t("Search")}</VisuallyHidden>
            <Input id="search" placeholder={t("SearchFor")} />
          </label>
        </Form>
      </SearchContent>
    </Portal>
  )
}

const SearchContent = styled(Content)`
  background-color: ${(p) => p.theme.colors.backdrop};
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 90vh%;
  min-height: 80vh;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  /* overflow: scroll; */

  &::-webkit-scrollbar: {
    display: none;
  }

  &:focus {
    outline: none;
  }
`

const SearchButton = styled(UnstyledButton)`
  padding-top: 3px;
  padding-left: 7px;
`

const Form = styled.form`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: clamp(300px, 90%, 775px);
`

const Title = styled.h2`
  color: #fff;
  font-size: 2.3rem;
  font-weight: 400;
`

const Input = styled.input`
  border: none;
  background: transparent;
  border-bottom: 1px solid ${(p) => p.theme.colors.gray};
  padding-left: 10px;
  max-width: 775px;
  font-size: 2.3rem;
  color: ${(p) => p.theme.colors.gray};
  outline-offset: 4px;
  width: clamp(300px, 90%, 775px);
  margin-top: 40px;

  &::placeholder {
    color: ${(p) => p.theme.colors.gray};
  }
`
