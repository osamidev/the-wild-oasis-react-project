import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 3.2rem 1.6rem;
  border-bottom: 1px solid var(--color-grey-50);
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
