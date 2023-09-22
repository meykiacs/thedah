import styled from "@emotion/styled"
import useLanguageContext from "../../context/useLanguageContext"
import { toPersianNum } from "../../utils/toPersianNum"

export const OrderedList = ({ list, ...delegated }) => {
  const { lang } = useLanguageContext()

  return list?.length > 0 ? (
    <Ol {...delegated}>
      {list.map((item, index) => (
        <Li key={item}>
          {lang === "en" ? `${index + 1}) ` : `${toPersianNum(index + 1)}) `}
          {item}
        </Li>
      ))}
    </Ol>
  ) : null
}

const Ol = styled.ol`
  width: 100%;
  padding: 17px 0;
  line-height: 2;
`

const Li = styled.li`
  font-size: 1.7rem;
`
