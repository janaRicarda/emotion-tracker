import styled from "styled-components";

const StyledWrapper = styled.div`
  overflow: hidden;

  & > * span {
    font-size: 0.8rem;
  }

  & > * hr {
    position: relative;
    border: none;
    border-top: 2px double white;
    margin: 1rem 0;
    width: ${({ $showDetails }) => ($showDetails ? "100%" : "0%")};
    transition: width 700ms;
  }

  & > * tr {
    display: flex;
    margin: 0.5rem 0;
    padding: 0 0.3rem;
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
  margin: 0 0.5rem 0 0;
  border-radius: 6px;

  &::after {
    content: "";
    position: absolute;
    left: 1%;
    top: 20%;
    height: 60%;
    width: ${({ $progress, $showDetails }) =>
      $showDetails ? `${$progress}%` : "0px"};
    background: var(--button-background);
    border-radius: 6px;
    transition: width 400ms 600ms;
  }
`;

export default function DetailsList({ listItems, showDetails }) {
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
    <StyledWrapper $showDetails={showDetails}>
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
    </StyledWrapper>
  );
}
