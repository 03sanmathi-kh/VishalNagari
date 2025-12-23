/* =========================================================
   Soil + Season Based Crop Recommendation System
   Module: Crop Recommendation & Seasonal Planning
   City: Vishalnagari (Near Nagpur, Maharashtra)

   Purpose:
   - Recommend suitable crops based on soil type and season
   - Reduce wrong crop selection
   - Improve agricultural productivity
   ========================================================= */

/* Crop dataset (derived directly from CSV file) */
const cropData = [
  { soil: "Loamy", season: "Kharif", crop: "Rice", score: 95 },
  { soil: "Loamy", season: "Rabi", crop: "Wheat", score: 90 },
  { soil: "Sandy", season: "Kharif", crop: "Maize", score: 85 },
  { soil: "Sandy", season: "Rabi", crop: "Barley", score: 80 },
  { soil: "Clay", season: "Kharif", crop: "Cotton", score: 88 },
  { soil: "Clay", season: "Rabi", crop: "Pulses", score: 83 },
  { soil: "Loamy", season: "Kharif", crop: "Sugarcane", score: 92 },
  { soil: "Sandy", season: "Kharif", crop: "Sorghum", score: 78 },
  { soil: "Clay", season: "Rabi", crop: "Soybean", score: 81 },
  { soil: "Loamy", season: "Rabi", crop: "Mustard", score: 87 }
];

/* Main function to recommend crops */
function recommendCrop() {
  const selectedSoil = document.getElementById("soilType").value;
  const selectedSeason = document.getElementById("season").value;

  /* Input validation */
  if (selectedSoil === "" || selectedSeason === "") {
    alert("Please select both soil type and season.");
    return;
  }

  /* Filter dataset based on soil and season */
  const matchedCrops = cropData.filter(function (item) {
    return item.soil === selectedSoil && item.season === selectedSeason;
  });

  /* Display results */
  const output = document.getElementById("cropOutput");
  output.innerHTML = "";

  if (matchedCrops.length === 0) {
    output.innerText = "No suitable crops found for selected conditions.";
    return;
  }

  let resultText = "Recommended Crops: ";

  matchedCrops.forEach(function (item, index) {
    resultText += item.crop;
    if (index < matchedCrops.length - 1) {
      resultText += ", ";
    }
  });

  output.innerText = resultText;
}
