export function setupTicketSlider(element, options = {}) {
  const {
    min = 1000,
    max = 50000,
    step = 1000,
    initialValue = 11000,
    markerValues = [1000, 10000, 20000, 30000, 40000, 50000],
    onValueChange = () => {},
  } = options;

  const slider = element.querySelector(".range-slider");
  const tooltip = element.querySelector(".tooltip");
  const timeDisplay = element.querySelector("#timeDisplay");
  const markersContainer = element.querySelector(".markers");

  markerValues.forEach((value) => {
    const label = document.createElement("div");
    label.className = "marker-label";
    label.textContent = value.toLocaleString();
    label.style.left = `${((value - min) / (max - min)) * 100}%`;
    markersContainer.appendChild(label);
  });

  function calculateTime(tickets) {
    const minutes = tickets * 10;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  function updateSlider() {
    const value = parseInt(slider.value);
    tooltip.textContent = `${value.toLocaleString()} tickets`;
    timeDisplay.textContent = calculateTime(value);

    const percent = (value - min) / (max - min);
    const sliderRect = slider.getBoundingClientRect();
    const tooltipPosition = percent * sliderRect.width;
    tooltip.style.left = `${tooltipPosition}px`;

    slider.style.setProperty("--progress", `${percent * 100}%`);

    onValueChange(value);
  }

  updateSlider();

  slider.addEventListener("input", updateSlider);

  window.addEventListener("resize", updateSlider);

  return {
    getValue: () => parseInt(slider.value),
    setValue: (value) => {
      slider.value = value;
      updateSlider();
    },
    destroy: () => {
      window.removeEventListener("resize", updateSlider);
      element.innerHTML = "";
    },
  };
}
