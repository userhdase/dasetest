const dscc = require("@google/dscc");
const d3 = require("d3");

// Callback funkcia pre vizualizáciu
const drawViz = (data) => {
  // Vymaž existujúci obsah
  const container = document.getElementById("viz-container");
  container.innerHTML = "";

  // Získaj metriky
  const metrics = data.tables.DEFAULT;

  // Pridaj slider
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0;
  slider.max = metrics.length - 1;
  slider.value = 0;

  const label = document.createElement("div");
  label.textContent = metrics[0].dimension;

  slider.addEventListener("input", () => {
    const selectedIndex = parseInt(slider.value, 10);
    label.textContent = metrics[selectedIndex].dimension;

    // Odoslať vybranú hodnotu ako filter
    dscc.sendEventToDscc({
      filter: metrics[selectedIndex].dimension
    });
  });

  container.appendChild(label);
  container.appendChild(slider);
};

// Inicializuj vizualizáciu
dscc.subscribeToData(drawViz, { transform: dscc.transformData });