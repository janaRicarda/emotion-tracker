export default function Tooltip({ onToggleTooltip, children }) {
  return (
    <>
      <button onClick={onToggleTooltip}>?</button>
      {children}
    </>
  );
}
