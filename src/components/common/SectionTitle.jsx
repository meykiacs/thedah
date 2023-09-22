import styled from "@emotion/styled"

export const SectionTitle = ({ title }) => {
  return <H2>{title}</H2>
}

const H2 = styled.h2`
  font-weight: 700;
  font-size: clamp(1.2rem, calc(1vw + 1rem), 2.4rem);

  &::after {
    content: "";
    display: block;
    height: 4px;
    margin-left: -50%;
    margin-right: -50%;
    background: linear-gradient(
      90deg,
      rgba(231, 227, 207, 0) 2.49%,
      ${(p) => p.theme.colors.primary} 47.44%,
      rgba(231, 227, 207, 0) 95.77%
    );
    transform: translateY(25px);
  }
`
