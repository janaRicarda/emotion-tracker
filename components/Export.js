import Icon from "@mdi/react";
import { mdiDownload, mdiClose } from "@mdi/js";
import { ExportAsPdf, ExportAsExcel } from "react-export-table";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Plotly from "plotly.js";

const StyledBackground = styled.div`
  display: ${({ $showModal }) => ($showModal ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  border: 1px solid rgba(255, 255, 255, 0.42);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0);
  inset: 0;
  position: fixed;
  overflow-y: hidden;
  z-index: 3;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const StyledModal = styled.div`
  display: ${({ $showModal }) => ($showModal ? "flex" : "none")};
  background-color: var(--main-bright);
  color: var(--main-dark);
  width: 360px;
  position: fixed;
  right: calc(50% - 180px);
  top: 20%;
  box-shadow: 0 0 5px 0px;
  border-radius: 10px;
  z-index: 4;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;
  overflow-y: hidden;

  & > p {
    margin-top: 1.5rem;
  }
`;

const Note = styled.p`
  font-size: 0.8rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  position: relative;

  &:after {
    content: "Min: 400, Max. 2000";
    font-size: .7rem;
    position: absolute;
    bottom: -.8rem;
  }

  & > span {
    margin: 0.5rem;
  }

  & > span:nth-of-type(2) {
    position: absolute;
    right: -2rem;
  }

  & > input {
    width: 4rem;
  }
`;

const StyledButton = styled.button`
  background-color: var(--button-background);
  border: none;
  border-radius: 6px;
  color: var(--main-dark);
`;

const CloseButton = styled(StyledButton)`
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledDownloadButton = styled(StyledButton)`
  border: none;
  background-color: transparent;
  color: var(--main-dark);
  margin-right: 1rem;
`;

export default function Export({
  exportData,
  buttonState,
  selectedCustomDate,
  chartRefForDownload,
  chartIsShown,
}) {
  const [showModal, setShowModal] = useState(false);
  const [inputValueOne, setInputValueOne] = useState(1000);
  const [inputValueTwo, setInputValueTwo] = useState(1000);

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setShowModal(false);
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
  });

  function getIntlDate(timeData) {
    if (timeData) {
      const date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(timeData);

      return date;
    } else return "";
  }

  const datePickerFrom = new Date(selectedCustomDate?.from.toDateString());

  const datePickerTo =
    selectedCustomDate &&
    selectedCustomDate.to &&
    new Date(selectedCustomDate.to.toDateString());

  const dateLabelStart = selectedCustomDate && getIntlDate(datePickerFrom);

  const dateLabelEnd = selectedCustomDate && getIntlDate(datePickerTo);

  const finalDateLabel =
    dateLabelStart + (dateLabelEnd ? " - " + dateLabelEnd : "");

  function pdfExport(data) {
    const pdfData = data.map(
      ({
        timeStamp,
        tensionLevel,
        emotion,
        subemotion,
        intensity,
        notes,
        trigger,
      }) => {
        const entryTimeStamp = new Date(timeStamp);
        const entryDateString = new Date(entryTimeStamp.toDateString());

        const time =
          (entryTimeStamp.getHours().toString().length === 1 ? "0" : "") +
          entryTimeStamp.getHours() +
          ":" +
          (entryTimeStamp.getMinutes().toString().length === 1 ? "0" : "") +
          entryTimeStamp.getMinutes();

        const date = getIntlDate(entryDateString);

        const objectToExport = {
          date,
          time,
          tensionLevel,
          emotion: emotion || "/",
          subemotion: subemotion || "/",
          intensity: intensity || "/",
          notes: notes || "/",
          trigger: trigger || "/",
        };
        return objectToExport;
      }
    );

    return pdfData;
  }

  function downloadChart(fileFormat) {
    if (chartRefForDownload) {
      Plotly.downloadImage(chartRefForDownload.current.el, {
        format: fileFormat,
        filename: `Your What a Feeling - Chart for ${
          buttonState.label === "Custom" ? finalDateLabel : buttonState.label
        } (downloaded: ${new Date().toDateString()}, items: ${
          exportData.length
        })`,
        height: inputValueOne,
        width: inputValueTwo,
      });
    } else return;
  }

  return (
    <>
      <StyledDownloadButton onClick={() => setShowModal(true)}>
        <Icon path={mdiDownload} size={1}>
          Export as PDF
        </Icon>
      </StyledDownloadButton>
      <StyledBackground
        onClick={() => setShowModal(false)}
        $showModal={showModal}
      />
      <StyledModal $showModal={showModal}>
        <CloseButton onClick={() => setShowModal(false)}>
          <Icon path={mdiClose} size={1} />
        </CloseButton>
        <b>How would you like to download your data?</b>
        <p>Download List as:</p>
        <ButtonContainer>
          <ExportAsPdf
            data={pdfExport(exportData)}
            fileName={`WhataFeeling_PDF_Data_(downloaded_${new Date().toDateString()})`}
            title={`Your Summary of ${
              buttonState.label === "Custom"
                ? finalDateLabel
                : buttonState.label
            } (items: ${exportData.length})`}
            headers={[
              "Date",
              "Time",
              "Tension",
              "Emotion",
              "Subemotion",
              "Intensity",
              "Notes",
              "Trigger",
            ]}
            headerStyles={{
              fontStyle: "bold",
              halign: "center",
              cellWidth: "wrap",
            }}
            styles={{
              halign: "center",
              valign: "middle",
              minCellWidth: "20",
            }}
          >
            {(props) => <StyledButton {...props}>PDF</StyledButton>}
          </ExportAsPdf>
          <ExportAsExcel
            data={pdfExport(exportData)}
            fileName={`WhataFeeling_Excel_Data_(downloaded_${getIntlDate(
              new Date()
            )})`}
            name={`${
              buttonState.label === "Custom"
                ? finalDateLabel
                : buttonState.label
            }`}
            title={`Your Summary of ${
              buttonState.label === "Custom"
                ? finalDateLabel
                : buttonState.label
            } (items: ${exportData.length})`}
            headers={[
              "Date",
              "Time",
              "Tension",
              "Emotion",
              "Subemotion",
              "Intensity",
              "Notes",
              "Trigger",
            ]}
          >
            {(props) => <StyledButton {...props}>Excel</StyledButton>}
          </ExportAsExcel>
        </ButtonContainer>
        {!chartIsShown && (
          <Note>
            Note: You can also download a Chart after toggling the switch above
            the list to &quot;Chart&quot;!
          </Note>
        )}
        {chartIsShown && (
          <>
            <p>Download Chart as:</p>
            <InputContainer>
              <input
                type="number"
                min="400"
                max="2000"
                value={inputValueOne}
                onBlur={() => {
                  if (event.target.value <= 400) {
                    setInputValueOne(400);
                  }
                  if (event.target.value > 2000) {
                    setInputValueOne(2000);
                  }
                }}
                onChange={() => {
                  setInputValueOne(event.target.value);
                }}
              />
              <span>x</span>
              <input
                type="number"
                min="400"
                max="2000"
                value={inputValueTwo}
                onBlur={() => {
                  if (event.target.value <= 400) {
                    setInputValueOne(400);
                  }
                  if (event.target.value > 2000) {
                    setInputValueOne(2000);
                  }
                }}
                onChange={() => {
                  setInputValueTwo(event.target.value);
                }}
              />
              <span>px</span>
            </InputContainer>
            <ButtonContainer>
              <StyledButton
                onClick={() => {
                  downloadChart("png");
                }}
                disabled={chartRefForDownload?.current === null && true}
              >
                PNG
              </StyledButton>
              <StyledButton
                onClick={() => {
                  downloadChart("svg");
                }}
                disabled={chartRefForDownload?.current === null && true}
              >
                SVG
              </StyledButton>
              <StyledButton
                onClick={() => {
                  downloadChart("jpeg");
                }}
                disabled={chartRefForDownload?.current === null && true}
              >
                JPEG
              </StyledButton>
            </ButtonContainer>
          </>
        )}
      </StyledModal>
    </>
  );
}
