import { useState } from "react";
import CustomNouislider from "../NoUiSlider/NoUiSlider";
import styles from "./DateSelector.module.css";

const minValue = new Date(2015, 1, 0);
const maxValue = new Date(2017, 0, 1);
const defaultMinValue = new Date(2015, 6, 0);
const defaultMaxValue = new Date(2016, 2, 1);

const DateSelector = () => {
  const [yearBtn, setYearBtn] = useState(true);

  const handleYearsClick = () => {
    setYearBtn(true);
  };

  const handleMonthsClick = () => {
    setYearBtn(false);
  };

  const getDatePoints = (str) => {
    return new Date(str).getTime();
  };

  return (
    <div className={styles.DateSelector}>
      <div className={styles.DateSelectorButtons}>
        <button
          className={`${styles.DateSelectorButton} ${
            yearBtn ? styles.DateSelectorButtonActive : ""
          } `}
          onClick={handleYearsClick}
        >
          Все года
        </button>
        <button
          className={`${styles.DateSelectorButton} ${
            !yearBtn ? styles.DateSelectorButtonActive : ""
          } `}
          onClick={handleMonthsClick}
        >
          Месяца
        </button>
      </div>
      <div className={styles.DateSelectorRangeContainer}>
        <CustomNouislider
          isYearBtn={yearBtn}
          minValue={getDatePoints(minValue)}
          maxValue={getDatePoints(maxValue)}
          defaultMin={getDatePoints(defaultMinValue)}
          defaultMax={getDatePoints(defaultMaxValue)}
        />
      </div>
    </div>
  );
};

export default DateSelector;
