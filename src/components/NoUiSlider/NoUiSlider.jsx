import Nouislider from "nouislider-react";
import { useEffect, useState } from "react";
import "./NoUiSlider.css";

const CustomNouislider = ({
  isYearBtn,
  minValue,
  maxValue,
  defaultMin,
  defaultMax,
}) => {
  const [AlternativeGap, setAlternativeGap] = useState(false);

  const DateFormat = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
  });

  useEffect(() => {
    if (maxValue - minValue > 94694400000) {
      setAlternativeGap(true);
    } else {
      setAlternativeGap(false);
    }
  }, [maxValue, minValue]);

  const formatDateTooltip = (value) => {
    return DateFormat.format(value).replace(/\s*г\./, "");
  };

  const formatPips = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();

    if (AlternativeGap) {
      const shortingMonth = DateFormat.format(value).substring(0, 3);
      return shortingMonth === "янв"
        ? year
        : shortingMonth.replace(/[\d\W]+/g, ".");
    }
    const month = DateFormat.format(value).substring(0, 3);
    return month === "янв" ? year : month;
  };

  const filterYearPips = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = DateFormat.format(value).substring(0, 3);

    if (AlternativeGap && month === "янв") {
      return year % 0 ? -1 : 1;
    }
    return month === "янв" ? 1 : -1;
  };

  return (
    <>
      <Nouislider
        key={[isYearBtn, AlternativeGap]}
        range={{ min: minValue, max: maxValue }}
        step={1000 * 60 * 60 * 24 * 30.75}
        start={[defaultMin, defaultMax]}
        tooltips={[
          {
            to: formatDateTooltip,
          },
          {
            to: formatDateTooltip,
          },
        ]}
        pips={{
          mode: "steps",
          filter: isYearBtn ? filterYearPips : null,
          format: {
            to: formatPips,
          },
        }}
        connect
      />
    </>
  );
};

export default CustomNouislider;
