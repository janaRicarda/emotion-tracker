import { useEffect, useState } from "react";
import styled from "styled-components";

const errorMessages = {
  404: "Sorry, the file your are looking for is not available",
};

const StyledBackground = styled.div`
  background: rgba(255, 255, 255, 0);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.42);
  position: fixed;
  inset: 0;
  z-index: 2;
`;
const StyledPopUpMessage = styled.div`
  position: fixed;
  right: calc(50% - 180px);
  top: 13rem;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--main-bright);
  padding: 1rem;
  box-shadow: 0 0 5px 0px;
  border-radius: 10px;
  transform: ${({ $animation }) => ($animation ? "scale(1)" : "scale(0)")};
  transition: transform 0.3s;
  z-index: 3;
`;

const StyledConfirmText = styled.p`
  padding: 1rem 2rem;
  text-align: center;
  color: var(--main-dark);
`;

export default function Loader({ itemText, children }) {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <>
      <StyledBackground />
      <StyledPopUpMessage $animation={animation}>
        <StyledConfirmText>
          <b>{itemText}</b>
        </StyledConfirmText>
      </StyledPopUpMessage>
    </>
  );
}
