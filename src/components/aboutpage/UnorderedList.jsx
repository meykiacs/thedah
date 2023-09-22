import styled from "@emotion/styled"

export const UnorderedList = ({ list, ...delegated }) => {

  return list?.length > 0 ? (
    <Ol {...delegated}>
      {list.map((item) => (
        <Li key={item}>
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
