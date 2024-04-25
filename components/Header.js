import styled from "styled-components";
import Image from "next/image";

const StyledHeader = styled.header`
  width: 100%;
  height: 150px;
  background: var(--main-bright);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Logo = styled(Image)`
  height: 150px;
  width: 200px;
  position: absolute;
  left: 0;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo
        src="/../public/images/logo.jpeg"
        width={400}
        height={200}
        alt="logo"
      />
    </StyledHeader>
  );
}
