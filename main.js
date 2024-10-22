import "./style.css";

function ticketSlider() {
  const slider = document.getElementById("ticketSlider");
  const tooltip = document.getElementById("tooltip");
  const timeDisplay = document.getElementById("timeCalc");
  const markersContainer = document.getElementById("markers");
  const THUMB_WIDTH = 16;
  const START_OFFSET = THUMB_WIDTH / 2; // Add offset for starting position

  // Create thumb element
  const thumb = document.createElement("div");
  thumb.className = "slider-thumb";
  slider.parentNode.appendChild(thumb);

  const markerValues = [1000, 10000, 20000, 30000, 40000, 50000];

  markerValues.forEach((value) => {
    const label = document.createElement("div");
    label.className = "marker-label";
    label.textContent = value.toLocaleString();

    const range = slider.max - slider.min;
    const position =
      ((value - slider.min) / range) *
        (100 - (THUMB_WIDTH * 100) / slider.offsetWidth) +
      (START_OFFSET * 100) / slider.offsetWidth; // Add offset
    label.style.left = `${position}%`;

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

    const range = slider.max - slider.min;
    const position =
      ((value - slider.min) / range) *
        (100 - (THUMB_WIDTH * 100) / slider.offsetWidth) +
      (START_OFFSET * 100) / slider.offsetWidth; // Add offset

    // Update tooltip and thumb positions
    tooltip.style.left = `${position}%`;
    thumb.style.left = `${position}%`;

    // Update progress bar color
    slider.style.setProperty("--progress", `${position}%`);
  }

  // Initial update
  updateSlider();

  // Update on slide
  slider.addEventListener("input", updateSlider);

  // Update on window resize
  window.addEventListener("resize", updateSlider);
}

document.addEventListener("DOMContentLoaded", ticketSlider);
