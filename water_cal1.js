/* =========================================================
   Water Demand Calculator
   Module: Smart Irrigation & Water Distribution Network
   City: Vishalnagari (Near Nagpur, Maharashtra)

   Purpose:
   - Calculate water requirement per agricultural field
   - Help optimize pipeline water flow
   - Reduce wastage and uneven distribution
   ========================================================= */

/* Water requirement per crop (litres per hectare per day)
   Values are approximate and realistic for Maharashtra region */
const cropWaterRequirement = {
  wheat: 4500,
  rice: 7000,
  cotton: 5500,
  soybean: 4200,
  pulses: 3000
};

/* Function to calculate water demand */
function calculateWaterDemand() {
  const cropType = document.getElementById("cropType").value;
  const fieldSize = parseFloat(document.getElementById("fieldSize").value);

  /* Input validation */
  if (cropType === "" || isNaN(fieldSize) || fieldSize <= 0) {
    alert("Please select a crop type and enter a valid field size.");
    return;
  }

  /* Get base water requirement */
  const waterPerHectare = cropWaterRequirement[cropType];

  /* Total water required */
  const totalWater = waterPerHectare * fieldSize;

  /* Display result */
  document.getElementById("waterOutput").innerText =
    "Required Water: " + totalWater.toFixed(2) + " litres/day";

  /* Adjust pipeline efficiency based on demand */
  updatePipelineEfficiency(totalWater);
}

/* Function to simulate pipeline flow adjustment */
function updatePipelineEfficiency(waterDemand) {
  let efficiency;

  if (waterDemand <= 20000) {
    efficiency = 85;
  } else if (waterDemand <= 40000) {
    efficiency = 70;
  } else {
    efficiency = 55;
  }

  /* Update progress bar if present */
  const progressBar = document.getElementById("pipelineEfficiency");
  if (progressBar) {
    progressBar.value = efficiency;
  }

  const efficiencyText = document.getElementById("efficiencyText");
  if (efficiencyText) {
    efficiencyText.innerText =
      "Pipeline Efficiency: " + efficiency + "%";
  }
}
