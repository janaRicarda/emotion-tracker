import styled from "styled-components";
import { StyledStandardLink } from "@/SharedStyledComponents";
import { useSession } from "next-auth/react";

const StyledProfileLink = styled(StyledStandardLink)`
  margin: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: var(--emotion-border);
  border-radius: 50%;
  background: var(--profile);
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProfileLink() {
  const { data: session } = useSession();

  const username = session.user.name;

  function getInitials(string) {
    const userName = string.split(" ");
    if (userName.length > 1) {
      const firstName = userName[0];
      const lastName = userName[userName.length - 1];
      const initials = firstName[0] + lastName[0];
      return initials.toUpperCase();
    }
    if (userName.length < 2) {
      const name = userName[0];
      const initial = name[0];
      return initial.toUpperCase();
    }
  }

  const userNameInitials = getInitials(username);

  return (
    <StyledProfileLink href="/profile-page">
      {userNameInitials}
    </StyledProfileLink>
  );
}
