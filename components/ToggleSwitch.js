import styled from "styled-components";

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  padding: 4px;
  width: 60px;
  height: 32px;
  background-color: #b3b3b3;
  border-radius: 32px;
  transition: all 300ms;

  &::before {
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
    transition: all 300ms;
  }
`;

const Input = styled.input`
  /* opacity: 0;
  position: absolute; */
  display: none;

  &:checked + ${Switch} {
    background: green;
    &::before {
      transform: translate(24px, -50%);
    }
  }
`;

export default function ToggleSwitch({ text, handleSwitch, isChecked }) {
  return (
    <Label>
      <span>{text}</span>
      <Input onChange={handleSwitch} checked={isChecked} type="checkbox" />
      <Switch />
    </Label>
  );
}
