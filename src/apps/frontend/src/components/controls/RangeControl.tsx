export type rangeControlProps = {
  min: number;
  max: number;
  label: string;
  val: number;
  onChange: (value: number) => void;
}

export default function RangeControl({ min, max, label, val, onChange }: rangeControlProps) {
  const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    onChange(parseInt(ev.target.value));
  }

  return (
    <div>
      <div>{label}</div>
      <input
        type="range"
        min={min || 0}
        max={max || 100}
        value={val}
        className="slider"
        onChange={changeHandler}
      />
    </div >)
}