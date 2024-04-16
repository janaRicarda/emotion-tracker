import EmotionRecordsList from "@/components/EmotionRecordsList";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  &:hover {
    background-color: lightskyblue;
  }
`;

export default function EmotionRecords({ tensionEntry }) {
  return (
    <>
      <h1>Recorded Emotions</h1>
      <EmotionRecordsList tensionEntry={tensionEntry} />
      <StyledLink href="/">← back to list</StyledLink>
    </>
  );
}
