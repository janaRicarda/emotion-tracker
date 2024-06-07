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
  height: 30px;
  background-color: var(--contrast-bright);
  border: 1px solid var(--main-dark);
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
    background: var(--text-on-bright);
    transform: translate(0, -50%);
    transition: all 300ms;
  }
`;

const Input = styled.input`
  display: none;

  &:checked + ${Switch} {
    background: var(--toggle-active);
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
