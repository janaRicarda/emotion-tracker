import Link from "next/link";
import styled from "styled-components";

export default function EmotionForm() {
  return (
    <>
      <h1>Record your Emotion</h1>
      <form>
        <label htmlFor="date">
          Date and time:
          <input type="date" id="date" name="date"></input>
        </label>
        <label htmlFor="subemotion">
          Select Subemotion:{" "}
          <select id="subemotion" name="subemotion" required>
            <option value="joy">Joy</option>
            <option value="surprise">Surprise</option>
            <option value="fear">Fear</option>
            <option value="sadness">Sadness</option>
            <option value="contempt">Contempt</option>
            <option value="disgust">Disgust</option>
            <option value="anger">Anger</option>
          </select>
        </label>
        <label htmlFor="intensity">
          {" "}
          Emotion Intensity:
          <input type="range" id="intensity" name="intensity" required></input>
        </label>
        <label htmlFor="category">
          {" "}
          Association Category:
          <input type="range" id="category" name="category" required></input>
        </label>
        <label htmlFor="trigger">
          Trigger:
          <textarea id="trigger" name="trigger"></textarea>
        </label>
        <label htmlFor="notes">
          Notes:
          <textarea id="notes" name="notes"></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Link href="/">← Back to Tension Entry</Link>
    </>
  );
}
