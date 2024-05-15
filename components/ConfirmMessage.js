import styled from "styled-components";
import { useEffect, useState } from "react";
import { StyledButton, StyledWrapper } from "@/SharedStyledComponents";

const StyledBackground = styled.div`
  background-color: black;
  opacity: 0.5;
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

const StyledConfirmButtonWrapper = styled(StyledWrapper)`
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const StyledConfirmOrCancelButton = styled(StyledButton)`
  //color: var(--contrast-text);
  color: var(--text-on-dark);
  border-color: var(--text-on-dark);
  background-color: ${({ $color }) => $color};
  width: 14rem;
  height: 4rem;
  padding: 0.5rem;
  margin: 0;
`;

export default function ConfirmMessage({
  toggleMessage,
  itemId,
  itemText,
  confirmFunction,
  children,
  cancelButtonText,
  confirmButtonText,
  cancelButtonColor,
  confirmButtonColor,
}) {
  // for animation-state, useEffect and timeeOuts: animation needs to be triggered after on-mount and before dis-mount of component in order to work with conditional rendering
  //
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

  function handleCancel(cancelledItemID) {
    setAnimation(false);
    setTimeout(() => toggleMessage(cancelledItemID), 300);
  }
  function handleConfirm(confirmedItemId) {
    setAnimation(false);
    setTimeout(() => toggleMessage(confirmedItemId), 300);
    setTimeout(() => {
      confirmFunction(confirmedItemId);
    }, 600);
  }

  return (
    <>
      <StyledBackground onClick={() => handleCancel(itemId)} />
      <StyledPopUpMessage $animation={animation}>
        <StyledConfirmText>{children}</StyledConfirmText>
        <StyledConfirmText>
          <b>{itemText}</b>
        </StyledConfirmText>
        <StyledConfirmButtonWrapper>
          <StyledConfirmOrCancelButton
            aria-label="cancel"
            $color={cancelButtonColor}
            onClick={() => handleCancel(itemId)}
          >
            {cancelButtonText}
          </StyledConfirmOrCancelButton>
          <StyledConfirmOrCancelButton
            aria-label="confirm"
            $color={confirmButtonColor}
            onClick={() => {
              handleConfirm(itemId);
            }}
          >
            {confirmButtonText}
          </StyledConfirmOrCancelButton>
        </StyledConfirmButtonWrapper>
      </StyledPopUpMessage>
    </>
  );
}
