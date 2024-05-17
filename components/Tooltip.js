import styled from "styled-components";
import TooltipQuestionmark from "../public/images/help.svg";

const StyledTooltipQuestionmark = styled(TooltipQuestionmark)`
  width: 1.5rem;
  height: 1.5rem;
  fill: var(--main-dark);
  position: absolute;
  top: calc(6% - 0.7rem);
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
  color: var(--main-dark);
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