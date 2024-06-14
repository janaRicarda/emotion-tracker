import styled from "styled-components";
import Circle from "../public/icons/circle.svg";
import { StyledStandardLink } from "@/SharedStyledComponents";

const StyledProfileLink = styled(StyledStandardLink)`
  margin: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--profile);
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledProfile = styled(Circle)`
  width: 2rem;
  border-radius: 50%;
  fill: transparent;
  background: var(--profile);
`;

export default function ProfileLink() {
  return <StyledProfileLink href="/profile-page">NF</StyledProfileLink>;
}
