import styled from "styled-components";
import { StyledTitle } from "@/SharedStyledComponents";

const StyledWelcome = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const StyledText = styled.p`
  margin-bottom: 1rem;
`;

const StyledSummary = styled.summary`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StyledOl = styled.ol`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default function Manual() {
  return (
    <>
      <StyledWelcome>Welcome to the What a feeling app!</StyledWelcome>
      <StyledText>
        This tool is designed to help you track and understand your emotions
        better. Below are some guidelines to help you navigate the app
        effectively:
      </StyledText>

      {/* <details>
        <summary>Purpose of the app</summary>
      </details> */}
      <details>
        <StyledSummary>How can I make a new entry?</StyledSummary>
        <StyledOl>
          <li>
            Upon launching the app, you'll be prompted to make a new entry.
          </li>
          <li>
            Start by assessing your level of tension on a scale from 0 to 100.
          </li>
          <li>
            Choose whether you'd like to conclude your entry there or delve
            deeper into your emotions.
          </li>
          <li>
            If you opt to continue, you'll be asked to select the basic emotion
            closest to what you're feeling from the following options: joy,
            surprise, fear, sadness, contempt, disgust or anger.
          </li>
          <li>
            Once you've made your selection, you'll proceed to a questionnaire
            where you can assign a sub-emotion to your feeling.
          </li>
          <li>
            Classify whether your feeling is perceived as negative, neutral, or
            positive.
          </li>
          <li>
            Optionally, you can provide details about triggers or additional
            notes.
          </li>
          <li>After completing the questionnaire, save your entry.</li>
        </StyledOl>
      </details>
      <details>
        <StyledSummary>What if my entry was wrong?</StyledSummary>
        <p>
          If you feel that your entry was incorrect or want to make changes, you
          can edit or delete it.
        </p>
        <StyledOl>
          <li>
            You can navigate through the app by clicking on the burger menu in
            the top right corner.
          </li>
          <li>
            Click on „emotion records“ to go to your Emotion Records List.
          </li>
          <li>
            Simply locate the entry in your Emotion Records List, tap on the
            pencil Icon to edit, or tap the trashcan Icon to delete it.
          </li>
          <li>
            For safety-reasons you will be asked to confirm your decision before
            changing your data.
          </li>
          <li>
            Please note that there is no option to restore your entries once
            they’re deleted.
          </li>
        </StyledOl>
      </details>
      <details>
        <StyledSummary>How to answer the question?</StyledSummary>
        <StyledOl>
          <li>
            When answering the question about which basic emotion your feeling
            resembles the most, choose the one that closely aligns with your
            current emotional state.
          </li>
          <li>
            Be honest and select the emotion that best describes your feelings
            at the moment.
          </li>
          <li>
            If you're unsure, take a moment to reflect on your emotions before
            making your choice.
          </li>
          <li>
            If needed you can get more information about the 7 basic emotions.
            Therefor simply go to the 7 basic emotions via the burger menu.
          </li>
          <li>
            The 7 basic emotions show up as a list and you can click on any of
            the emotions to get more details.
          </li>
          <li>
            Through the next and previous buttons on the side, you can click
            yourself through all of the emotions without returning to the
            emotions list all the time.
          </li>
        </StyledOl>
      </details>
      <p>
        Remember, the What a feeling app is here to assist you in understanding
        and managing your emotions. Feel free to explore its features, utilize
        the graphs, highlight and filter specific entries, and gain insights
        into the basic emotions. Happy feeling!
      </p>
    </>
  );
}
