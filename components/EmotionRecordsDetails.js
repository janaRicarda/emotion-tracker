import styled from "styled-components";

const StyledDetailsSection = styled.section`
  display: grid;
  position: relative;
  transition: grid-template-rows 600ms;
  grid-template-rows: ${({ $showDetails }) => ($showDetails ? "1fr" : "0fr")};
  overflow: hidden;
  padding: 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: ${({ $showDetails }) => ($showDetails ? "100%" : "0")};
    background-color: var(--main-dark);
    transition: all 600ms;
  }
`;

const TableWrapper = styled.div`
  overflow: hidden;

  & > table {
    width: 80vw;
    table-layout: fixed;
    padding-right: 0.3rem;
  }

  & > * span {
    font-size: 0.8rem;
  }

  & > * hr {
    position: relative;
    border: none;
    border-top: 2px double var(--main-dark);
    margin: 1rem 0;
    width: ${({ $showDetails }) => ($showDetails ? "100%" : "0%")};
    transition: width 700ms;
  }

  & > * tr {
    display: flex;
    margin: 0.5rem 0;
    padding: 0 0 0 0.3rem;
  }

  & > * td {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  & > * tr > td:nth-child(1) {
    width: 125px;
  }

  & > * tr > td:nth-child(2) {
    justify-content: flex-start;
    width: 100%;
  }
`;

const ProgressBar = styled.div`
  width: 10rem;
  height: 0.8rem;
  border: 1px solid var(--main-dark);
  position: relative;
  display: inline-block;
  margin: 0 0.4rem 0 0;
  border-radius: 6px;

  &::after {
    content: "";
    position: absolute;
    top: 20%;
    height: 60%;
    width: ${({ $progress, $showDetails }) =>
      $showDetails ? `${$progress}%` : "0"};
    background: var(--button-background);
    border-radius: 6px;
    transition: width 400ms;
    transition-delay: ${({ $showDetails }) => ($showDetails ? "500ms" : "0ms")};
  }
`;

export default function DetailsSection({ listItems, showDetails }) {
  const {
    tensionLevel,
    emotion,
    subemotion,
    intensity,
    category,
    trigger,
    notes,
  } = listItems;

  return (
    <StyledDetailsSection $showDetails={showDetails}>
      <TableWrapper $showDetails={showDetails}>
        <table>
          {tensionLevel && (
            <tr>
              <td>Tension:</td>
              <td>
                <ProgressBar
                  $showDetails={showDetails}
                  $progress={tensionLevel}
                />
                <span>{tensionLevel}%</span>
              </td>
            </tr>
          )}
          {emotion && (
            <tr>
              <td>Emotion:</td>
              <td>
                {emotion}
                {subemotion && `, ${subemotion}`}
              </td>
            </tr>
          )}
          {intensity && (
            <tr>
              <td>Intensity:</td>
              <td>
                <ProgressBar $showDetails={showDetails} $progress={intensity} />
                <span>{intensity} %</span>
              </td>
            </tr>
          )}
          {category && (
            <tr>
              <td>Pleasantn.:</td>
              <td>
                <ProgressBar $showDetails={showDetails} $progress={category} />
                <span>{category}%</span>
              </td>
            </tr>
          )}
          {(trigger || notes) && <hr />}
          {trigger && (
            <>
              <tr>
                <b>Trigger:</b>
              </tr>
              <tr>{trigger}</tr>
            </>
          )}
          {notes && (
            <>
              <tr>
                <b>Notes:</b>
              </tr>
              <tr>{notes}</tr>
            </>
          )}
        </table>
      </TableWrapper>
    </StyledDetailsSection>
  );
}
