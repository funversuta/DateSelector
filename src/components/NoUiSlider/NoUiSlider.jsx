import Nouislider from "nouislider-react";
import { useEffect, useState } from "react";
import "./NoUiSlider.css";

const CustomNouislider = (props) => {
  const { isYearBtn, minValue, maxValue, defaultMin, defaultMax } = props;
  const step = 1000 * 60 * 60 * 24 * 30.75;
  const tooLongScale = 94694400000;
  const [alternativeGap, setAlternativeGap] = useState(false);

  const dateFormat = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
  });

  useEffect(() => {
    maxValue - minValue > tooLongScale
      ? setAlternativeGap(true)
      : setAlternativeGap(false);
  }, [maxValue, minValue, isYearBtn]);

  const formatDateTooltip = (value) => {
    return dateFormat.format(value).replace(/\s*г\./, "");
  };

  const formatPips = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();

    if (alternativeGap && !isYearBtn) {
      const shortingMonth = dateFormat.format(value).substring(0, 3);
      return shortingMonth === "янв"
        ? year
        : shortingMonth.replace(/[\d\W]+/g, ".");
    }

    if (alternativeGap && isYearBtn) {
      return year === new Date(minValue).getFullYear() ||
        year === new Date(maxValue).getFullYear()
        ? year
        : year.toString().replace(/[\d\W]+/g, ".");
    }
    const month = dateFormat.format(value).substring(0, 3);
    return month === "янв" ? year : month;
  };

  const filterYearPips = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = dateFormat.format(value).substring(0, 3);

    if (alternativeGap && month === "янв") {
      return year % 0 ? -1 : 1;
    }
    return month === "янв" ? 1 : -1;
  };

  return (
    <Nouislider
      key={[isYearBtn, alternativeGap]}
      range={{ min: minValue, max: maxValue }}
      step={step}
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
        density: 25,
        filter: isYearBtn ? filterYearPips : null,
        format: {
          to: formatPips,
        },
      }}
      connect
    />
  );
};

export default CustomNouislider;
