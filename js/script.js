import { postalData } from "./dataKodePos.js";

// DOM elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const initialMessage = document.getElementById("initialMessage");
const resultCard = document.getElementById("resultCard");
const resultCity = document.getElementById("resultCity");
const resultPostalCode = document.getElementById("resultPostalCode");
const resultProvince = document.getElementById("resultProvince");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const exampleBtns = document.querySelectorAll(".example-btn");

// Fungsi untuk mencari kode pos
function findPostalCode(cityName) {
  const normalizedInput = cityName.trim().toLowerCase();
  return postalData.find((item) => item.kota.toLowerCase() === normalizedInput);
}

// Fungsi untuk menampilkan hasil
function showResult(result) {
  if (result) {
    resultCity.textContent = result.kota;
    resultPostalCode.textContent = result.kodepost;
    resultProvince.textContent = result.provinsi;

    initialMessage.classList.add("hidden");
    errorMessage.classList.add("hidden");
    resultCard.classList.remove("hidden");
    resultCard.classList.add("animate-fade-in");
  } else {
    errorText.textContent = `Maaf, kode pos untuk "${cityInput.value}" tidak ditemukan dalam database kami.`;

    initialMessage.classList.add("hidden");
    resultCard.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.classList.add("animate-fade-in");
  }
}

// Event klik tombol cari
searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() !== "") {
    const result = findPostalCode(cityInput.value);
    showResult(result);
  } else {
    initialMessage.classList.remove("hidden");
    resultCard.classList.add("hidden");
    errorMessage.classList.add("hidden");
  }
});

// Event klik tombol contoh kota
exampleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("data-city");
    cityInput.value = city;
    const result = findPostalCode(city);
    showResult(result);
  });
});

// Event enter pada input
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
