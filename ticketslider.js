const HALF_THUMB_WIDTH = 16;
const START_OFFSET = HALF_THUMB_WIDTH / 2;
const MARKER_VALUES = [1000, 10000, 20000, 30000, 40000, 50000];

const createThumb = () => {
  const thumb = document.createElement("div");
  thumb.className = "slider-thumb";
  document.getElementById("ticketSlider")?.parentNode?.appendChild(thumb);
  return thumb;
};

const calculatePosition = (value, slider) => {
  const range = slider.max - slider.min;
  return (
    ((value - slider.min) / range) *
      (100 - (HALF_THUMB_WIDTH * 100) / slider.offsetWidth) +
    (START_OFFSET * 100) / slider.offsetWidth
  );
};

const calculateTime = (tickets) => {
  const minutes = tickets * 10;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

const createMarkers = (markersContainer, slider) => {
  MARKER_VALUES.forEach((value) => {
    const label = document.createElement("div");
    label.className = "marker-label";
    label.textContent = value.toLocaleString();

    const position = calculatePosition(value, slider);
    label.style.left = `${position}%`;

    markersContainer?.appendChild(label);
  });
};

const ticketSlider = () => {
  const elements = {
    slider: document.getElementById("ticketSlider"),
    tooltip: document.getElementById("tooltip"),
    timeDisplay: document.getElementById("timeCalc"),
    markersContainer: document.getElementById("markers"),
    thumb: createThumb(),
  };

  const updateSlider = () => {
    const { slider, tooltip, timeDisplay, thumb } = elements;
    if (!slider || !tooltip || !timeDisplay || !thumb) return;

    const value = parseInt(slider.value);
    tooltip.textContent = `${value.toLocaleString()} tickets`;
    timeDisplay.textContent = calculateTime(value);

    const position = calculatePosition(value, slider);

    tooltip.style.left = `${position}%`;
    thumb.style.left = `${position}%`;
    slider.style.setProperty("--progress", `${position}%`);
  };

  const init = () => {
    const { slider, markersContainer } = elements;
    if (!slider || !markersContainer) return;

    createMarkers(markersContainer, slider);
    updateSlider();

    slider.addEventListener("input", updateSlider);
    window.addEventListener("resize", updateSlider);

    return () => {
      slider.removeEventListener("input", updateSlider);
      window.removeEventListener("resize", updateSlider);
    };
  };

  return init();
};

export default ticketSlider;
