import Icon from "@mdi/react";
import { mdiDownload, mdiClose } from "@mdi/js";
import { ExportAsPdf, ExportAsExcel } from "react-export-table";
import { useState } from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  display: ${({ $showModal }) => ($showModal ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: transparent;
  position: fixed;
  inset: 0;
  z-index: 3;
  overflow-y: hidden;

  & > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--main-dark);
    width: 80%;
    max-width: 500px;
    min-width: 300px;
    background-color: var(--section-background);
    border: 2px solid var(--main-dark);
    border-radius: 6px;
    padding: 3rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem;
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
}) {
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <StyledDownloadButton onClick={() => setShowModal(true)}>
        <Icon path={mdiDownload} size={1}>
          Export as PDF
        </Icon>
      </StyledDownloadButton>
      <StyledModal onClick={() => setShowModal(false)} $showModal={showModal}>
        <div>
          <CloseButton onClick={() => setShowModal(false)}>
            <Icon path={mdiClose} size={1} />
          </CloseButton>
          <b>How would you like to download your data?</b>
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
        </div>
      </StyledModal>
    </>
  );
}
