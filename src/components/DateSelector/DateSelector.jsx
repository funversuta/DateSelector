import { useState, useEffect } from "react";
import CustomNouislider from "../NoUiSlider/NoUiSlider";
import styles from "./DateSelector.module.scss";

let minValue = "2014";
let maxValue = "2021";
const defaultMinValue = "2015, 5";
const defaultMaxValue = "2016, 2";

const DateSelector = () => {
  const [YearBtn, setYearBtn] = useState(true);
  const [MonthBtn, setMonthBtn] = useState(false);

  const handleYearsClick = () => {
    setYearBtn(true);
    setMonthBtn(false);
  };

  const handleMonthsClick = () => {
    setMonthBtn(true);
    setYearBtn(false);
  };

  const getDatepoints = (str) => {
    return new Date(str).getTime();
  };

  useEffect(() => {
    if (YearBtn) {
      minValue = "2015";
      maxValue = "2017";
    } else {
      minValue = "2014";
      maxValue = "2021";
    }
  }, [YearBtn]);

  return (
    <div className={styles.DateSelector}>
      <div className={styles.DateSelectorButtons}>
        <button
          className={`${styles.DateSelectorButton} ${
            YearBtn ? styles.DateSelectorButtonActive : ""
          } `}
          onClick={handleYearsClick}
        >
          Все года
        </button>
        <button
          className={`${styles.DateSelectorButton} ${
            MonthBtn ? styles.DateSelectorButtonActive : ""
          } `}
          onClick={handleMonthsClick}
        >
          Месяца
        </button>
      </div>
      <div className={styles.DateSelectorRangeContainer}>
        <CustomNouislider
          isYearBtn={YearBtn}
          minValue={getDatepoints(minValue)}
          maxValue={getDatepoints(maxValue)}
          defaultMin={getDatepoints(defaultMinValue)}
          defaultMax={getDatepoints(defaultMaxValue)}
        />
      </div>
    </div>
  );
};

export default DateSelector;
