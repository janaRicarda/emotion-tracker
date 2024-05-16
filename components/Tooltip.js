import styled from "styled-components";
import TooltipQuestionmark from "../public/images/chat-question.svg";

const StyledTooltipQuestionmark = styled(TooltipQuestionmark)`
  width: 2rem;
  height: 2rem;
  fill: var(--main-dark);
  position: absolute;
  top: calc(6% - 0.8rem);
  right: 8rem;
  z-index: 2;
`;

const StyledTooltipWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  left: 0.5rem;
  border-radius: 6px;
  background-color: var(--section-background);
  z-index: 1;
  display: ${({ $show }) => ($show ? "block" : "none")};
`;

const StyledTooltipInfo = styled.p`
  padding: 1rem;
`;

export default function Tooltip({ onToggleTooltip, children, show }) {
  return (
    <>
      <StyledTooltipQuestionmark onClick={onToggleTooltip}>
        ?
      </StyledTooltipQuestionmark>
      <StyledTooltipWrapper $show={show}>
        <StyledTooltipInfo>{children}</StyledTooltipInfo>
      </StyledTooltipWrapper>
    </>
  );
}
