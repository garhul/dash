import { useState } from 'react';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

export type rangeControlProps = {
  min: string;
  max: string;
  label: string;
  val: number;
  onChange: (value: number) => void;
}

export default function RangeControl({ min, max, label, val, onChange }: rangeControlProps) {
  const [value, setValue] = useState(val || 0);

  const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(ev.target.value));
    onChange(value);
  }

  return (
    <div>
      <div>{label}</div>
      <input
        type="range"
        min={parseInt(min) || 0}
        max={parseInt(max) || 100}
        value={value}
        className="slider"
        onChange={changeHandler}
      />


      {/* <slider
        value={value}
        min={parseInt(props.min) || 0}
        max={parseInt(props.max) || 100}
        size='lg'
        variant='dark'
        onChange={changeEvent => setValue(parseInt(changeEvent.target.value))}
        onAfterChange={ev => props.update(`${ev.target.value}`)}
      /> */}
    </div >)
}