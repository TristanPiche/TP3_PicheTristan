import "./style.css";
import "flowbite";

// ========================
// DESTINATIONS
// ========================

const destinations = {
  tokyo: {
    title: "Tokyo",
    japanese: "東京",
    image: "/images/tokyo.jpg",
    description:
      "Découvrez une métropole où temples historiques, quartiers animés et architecture moderne se rencontrent.",
    highlights: "À découvrir — Shibuya • Asakusa • Shinjuku • Akihabara",
  },

  kyoto: {
    title: "Kyoto",
    japanese: "京都",
    image: "/images/kyoto.jpg",
    description:
      "Plongez au cœur du Japon traditionnel entre temples, sanctuaires, jardins et quartiers historiques.",
    highlights:
      "À découvrir — Fushimi Inari • Gion • Arashiyama • Kiyomizu-dera",
  },

  osaka: {
    title: "Osaka",
    japanese: "大阪",
    image: "/images/osaka.webp",
    description:
      "Découvrez une ville vivante réputée pour sa gastronomie, son ambiance chaleureuse et sa vie nocturne.",
    highlights: "À découvrir — Dotonbori • Château d'Osaka • Shinsekai • Umeda",
  },
};

// Éléments du modal destination
const cityModal = document.querySelector("#cityModal");
const closeCityModal = document.querySelector("#closeModal");

const cityModalTitle = document.querySelector("#modalTitle");
const cityModalJapanese = document.querySelector("#modalJapanese");
const cityModalDescription = document.querySelector("#modalDescription");
const cityModalHighlights = document.querySelector("#modalHighlights");
const cityModalImage = document.querySelector("#modalImage");

document.querySelectorAll(".open-modal").forEach((button) => {
  button.addEventListener("click", () => {
    const city = destinations[button.dataset.city];

    cityModalTitle.textContent = city.title;
    cityModalJapanese.textContent = city.japanese;
    cityModalDescription.textContent = city.description;
    cityModalHighlights.textContent = city.highlights;

    cityModalImage.style.backgroundImage = `url('${city.image}')`;

    cityModal.classList.remove("hidden");
    cityModal.classList.add("flex");
  });
});

closeCityModal.addEventListener("click", () => {
  cityModal.classList.add("hidden");
  cityModal.classList.remove("flex");
});

// ========================
// FORFAITS
// ========================

const packages = {
  essentiel: {
    duration: "7 jours",
    title: "L'Essentiel",
    description:
      "Une première découverte du Japon entre modernité, traditions et incontournables.",
    cities: "Tokyo • Kyoto",
    price: "1 899 $",
    map: "/images/tokyo_kyoto.png",
  },

  "deux-mondes": {
    duration: "10 jours",
    title: "Entre deux mondes",
    description:
      "L'équilibre parfait entre l'énergie des grandes villes et le Japon traditionnel.",
    cities: "Tokyo • Kyoto • Osaka",
    price: "2 599 $",
    map: "/images/tokyo_kyoto_osaka.png",
  },

  "grand-voyage": {
    duration: "14 jours",
    title: "Le Grand Voyage",
    description:
      "Une immersion complète pour découvrir plusieurs facettes du Japon.",
    cities: "Tokyo • Kyoto • Osaka • Hakone",
    price: "3 499 $",
    map: "/images/tokyo_kyoto_osaka_hakone.png",
  },
};

// Éléments du modal forfait
const packageModal = document.querySelector("#package-modal");
const closePackageModal = document.querySelector("#close-package-modal");

const packageTitle = document.querySelector("#package-title");
const packageDuration = document.querySelector("#package-duration");
const packageDescription = document.querySelector("#package-description");
const packageCities = document.querySelector("#package-cities");
const packagePrice = document.querySelector("#package-price");
const packageMap = document.querySelector("#package-map");

document.querySelectorAll(".open-package-modal").forEach((button) => {
  button.addEventListener("click", () => {
    const packageId = button.dataset.package;
    const selectedPackage = packages[packageId];

    packageTitle.textContent = selectedPackage.title;
    packageDuration.textContent = selectedPackage.duration;
    packageDescription.textContent = selectedPackage.description;
    packageCities.textContent = selectedPackage.cities;
    packagePrice.textContent = selectedPackage.price;

    // Change la carte selon le forfait
    packageMap.src = selectedPackage.map;

    packageModal.classList.remove("hidden");
    packageModal.classList.add("flex");
  });
});

// Fermer avec X
closePackageModal.addEventListener("click", () => {
  packageModal.classList.add("hidden");
  packageModal.classList.remove("flex");
});

// Fermer en cliquant à l'extérieur
packageModal.addEventListener("click", (event) => {
  if (event.target === packageModal) {
    packageModal.classList.add("hidden");
    packageModal.classList.remove("flex");
  }
});
