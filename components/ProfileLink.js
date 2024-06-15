import styled from "styled-components";
import { StyledStandardLink } from "@/SharedStyledComponents";
import { useSession } from "next-auth/react";

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

export default function ProfileLink() {
  const { data: session } = useSession();

  const username = session.user.name;

  function getInitials(string) {
    const names = string.split(" ");
    const firstName = names[0];
    const lastName = names[names.length - 1];
    let initials = firstName[0] + lastName[0];
    return initials.toUpperCase();
  }

  const userNameInitials = getInitials(username);

  return (
    <StyledProfileLink href="/profile-page">
      {userNameInitials}
    </StyledProfileLink>
  );
}
