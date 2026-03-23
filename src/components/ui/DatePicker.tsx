import { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./ui.module.css";

type Props = {
  value: {
    startDate: Date;
    endDate: Date;
  };
  onChange: (range: { startDate: Date; endDate: Date }) => void;
};

const DateRangePicker = ({ value, onChange }: Props) => {
  const [show, setShow] = useState(false);

  const [range, setRange] = useState({
    startDate: value.startDate,
    endDate: value.endDate,
    key: "selection",
  });

  const handleClose = () =>{
   
  const resetValue = {
    startDate: new Date(),
    endDate: new Date(),
  };

  setRange({
    ...resetValue,
    key: "selection",
  });

  onChange(resetValue);
     setShow(false);

  }//Close
  const handleSelect = (ranges: any) => {
    const selection = ranges.selection;

    setRange(selection);

    onChange({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      
      <style>
        {`
          .customDatePicker .rdrCalendarWrapper {
            width: 100% !important;

          }
          .customDatePicker .rdrMonth {
            width: 100% !important;

          }
        `}
      </style>

      <input
        readOnly
        onClick={() => setShow(!show)}
        value={`${format(range.startDate, "dd/MM/yyyy")} - ${format(
          range.endDate,
          "dd/MM/yyyy"
        )}`}
 className={`${styles.input} `}
      />

      {show && (
        <div
          className="customDatePicker" 
          style={{
            position: "absolute",
            zIndex: 10,
            width: "100%",
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <DateRange
            ranges={[range]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
          />
          <div style={{width:'100%',display:'flex'}}>
            <button
              style={{ margin: "10px",padding:'6px 12px',background:'#4f46e5',color:'white',border:'none',borderRadius:'4px',width:'100%' }}
              onClick={() => handleClose()}
            >
              reset
            </button>
                   <button
              style={{ margin: "10px",padding:'6px 12px',background:'#4f46e5',color:'white',border:'none',borderRadius:'4px' ,width:'100%'}}
              onClick={() => setShow(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;