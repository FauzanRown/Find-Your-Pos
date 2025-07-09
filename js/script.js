// Data kode pos untuk beberapa kota di Indonesia
const postalData = [
  { city: "Jakarta Pusat", postalCode: "10110", province: "DKI Jakarta" },
  {
    city: "Jakarta Selatan",
    postalCode: "12130",
    province: "DKI Jakarta",
  },
  { city: "Jakarta Barat", postalCode: "11110", province: "DKI Jakarta" },
  { city: "Jakarta Timur", postalCode: "13310", province: "DKI Jakarta" },
  { city: "Jakarta Utara", postalCode: "14110", province: "DKI Jakarta" },
  { city: "Bandung", postalCode: "40111", province: "Jawa Barat" },
  { city: "Surabaya", postalCode: "60111", province: "Jawa Timur" },
  { city: "Medan", postalCode: "20111", province: "Sumatera Utara" },
  { city: "Semarang", postalCode: "50111", province: "Jawa Tengah" },
  { city: "Makassar", postalCode: "90111", province: "Sulawesi Selatan" },
  {
    city: "Palembang",
    postalCode: "30111",
    province: "Sumatera Selatan",
  },
  { city: "Denpasar", postalCode: "80221", province: "Bali" },
  { city: "Yogyakarta", postalCode: "55281", province: "DI Yogyakarta" },
  { city: "Malang", postalCode: "65111", province: "Jawa Timur" },
  { city: "Bekasi", postalCode: "17111", province: "Jawa Barat" },
  { city: "Tangerang", postalCode: "15111", province: "Banten" },
  { city: "Bogor", postalCode: "16111", province: "Jawa Barat" },
  { city: "Padang", postalCode: "25111", province: "Sumatera Barat" },
  { city: "Pekanbaru", postalCode: "28111", province: "Riau" },
];

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
const resultSection = document.getElementById("resultSection");

// Fungsi untuk mencari kode pos
function findPostalCode(cityName) {
  // Normalisasi input
  const normalizedInput = cityName.trim().toLowerCase();

  // Mencari data yang cocok
  const result = postalData.find((item) =>
    item.city.toLowerCase().includes(normalizedInput)
  );

  return result;
}

// Fungsi untuk menampilkan hasil
function showResult(result) {
  if (result) {
    resultCity.textContent = result.city;
    resultPostalCode.textContent = result.postalCode;
    resultProvince.textContent = result.province;

    initialMessage.classList.add("hidden");
    errorMessage.classList.add("hidden");
    resultCard.classList.remove("hidden");
    resultCard.classList.add("animate-fade-in");

    // Animasi background
    resultSection.classList.remove("bg-gradient-to-br");
    resultSection.classList.add(
      "bg-gradient-to-br",
      "from-green-50",
      "to-emerald-50"
    );
    setTimeout(() => {
      resultSection.classList.remove("from-green-50", "to-emerald-50");
      resultSection.classList.add("from-indigo-50", "to-purple-50");
    }, 1000);
  } else {
    errorText.textContent = `Maaf, kode pos untuk "${cityInput.value}" tidak ditemukan dalam database kami.`;

    initialMessage.classList.add("hidden");
    resultCard.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.classList.add("animate-fade-in");

    // Animasi background
    resultSection.classList.remove("bg-gradient-to-br");
    resultSection.classList.add(
      "bg-gradient-to-br",
      "from-amber-50",
      "to-orange-50"
    );
    setTimeout(() => {
      resultSection.classList.remove("from-amber-50", "to-orange-50");
      resultSection.classList.add("from-indigo-50", "to-purple-50");
    }, 1000);
  }
}

// Event listener untuk tombol cari
searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() !== "") {
    const result = findPostalCode(cityInput.value);
    showResult(result);
  } else {
    initialMessage.classList.remove("hidden");
    resultCard.classList.add("hidden");
    errorMessage.classList.add("hidden");

    // Animasi input
    cityInput.classList.add("ring-2", "ring-red-500");
    setTimeout(() => {
      cityInput.classList.remove("ring-2", "ring-red-500");
    }, 1000);
  }
});

// Event listener untuk contoh kota
exampleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("data-city");
    cityInput.value = city;
    const result = findPostalCode(city);
    showResult(result);
  });
});

// Event listener untuk input enter
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
