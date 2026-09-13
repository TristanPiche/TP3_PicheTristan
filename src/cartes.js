import "./style.css";
import "flowbite";

// ======================================================
// DESTINATIONS
// ======================================================

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

// Boutons pour ouvrir les destinations

document.querySelectorAll(".open-modal").forEach((button) => {
  button.addEventListener("click", () => {
    const cityId = button.dataset.city;
    const city = destinations[cityId];

    if (
      !city ||
      !cityModal ||
      !cityModalTitle ||
      !cityModalJapanese ||
      !cityModalDescription ||
      !cityModalHighlights ||
      !cityModalImage
    ) {
      return;
    }

    cityModalTitle.textContent = city.title;
    cityModalJapanese.textContent = city.japanese;
    cityModalDescription.textContent = city.description;
    cityModalHighlights.textContent = city.highlights;

    cityModalImage.style.backgroundImage = `url('${city.image}')`;

    cityModal.classList.remove("hidden");
    cityModal.classList.add("flex");
  });
});

// Fermer le modal destination

if (closeCityModal && cityModal) {
  closeCityModal.addEventListener("click", () => {
    cityModal.classList.add("hidden");
    cityModal.classList.remove("flex");
  });
}

// Fermer en cliquant à l'extérieur

if (cityModal) {
  cityModal.addEventListener("click", (event) => {
    if (event.target === cityModal) {
      cityModal.classList.add("hidden");
      cityModal.classList.remove("flex");
    }
  });
}

// ======================================================
// FORFAITS
// ======================================================

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

    if (
      !selectedPackage ||
      !packageModal ||
      !packageTitle ||
      !packageDuration ||
      !packageDescription ||
      !packageCities ||
      !packagePrice ||
      !packageMap
    ) {
      return;
    }

    packageTitle.textContent = selectedPackage.title;
    packageDuration.textContent = selectedPackage.duration;
    packageDescription.textContent = selectedPackage.description;
    packageCities.textContent = selectedPackage.cities;
    packagePrice.textContent = selectedPackage.price;

    packageMap.src = selectedPackage.map;

    packageModal.classList.remove("hidden");
    packageModal.classList.add("flex");
  });
});

if (closePackageModal && packageModal) {
  closePackageModal.addEventListener("click", () => {
    packageModal.classList.add("hidden");
    packageModal.classList.remove("flex");
  });
}

if (packageModal) {
  packageModal.addEventListener("click", (event) => {
    if (event.target === packageModal) {
      packageModal.classList.add("hidden");
      packageModal.classList.remove("flex");
    }
  });
}

// ======================================================
// FORMULAIRE DE RÉSERVATION
// ======================================================

const reservationForm = document.querySelector("#reservation-form");

if (reservationForm) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    clearErrors();

    let formIsValid = true;

    // ==================================================
    // 01 — FORFAIT
    // ==================================================

    const selectedPackage = reservationForm.querySelector(
      'input[name="forfait"]:checked',
    );

    if (!selectedPackage) {
      formIsValid = false;

      const firstPackage = reservationForm.querySelector(
        'input[name="forfait"]',
      );

      showError(firstPackage, "Veuillez sélectionner un forfait.");
    }

    // ==================================================
    // 02 — INFORMATIONS DU VOYAGE
    // ==================================================

    const departureDate = reservationForm.querySelector("#date-depart");
    const travelers = reservationForm.querySelector("#voyageurs");
    const travelType = reservationForm.querySelector("#type-voyage");
    const budget = reservationForm.querySelector("#budget");

    // NOUVEAUX CHAMPS
    const accommodation = reservationForm.querySelector("#hebergement");
    const pace = reservationForm.querySelector("#rythme");

    const preferences = reservationForm.querySelector("#preferences");

    // DATE DE DÉPART

    if (!departureDate.value) {
      formIsValid = false;

      showError(departureDate, "Veuillez choisir une date de départ.");
    } else {
      const selectedDate = new Date(`${departureDate.value}T00:00:00`);

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        formIsValid = false;

        showError(departureDate, "La date de départ doit être dans le futur.");
      }
    }

    // NOMBRE DE VOYAGEURS

    if (!travelers.value) {
      formIsValid = false;

      showError(travelers, "Veuillez sélectionner le nombre de voyageurs.");
    }

    // TYPE DE VOYAGE

    if (!travelType.value) {
      formIsValid = false;

      showError(travelType, "Veuillez sélectionner un type de voyage.");
    }

    // BUDGET

    if (!budget.value) {
      formIsValid = false;

      showError(budget, "Veuillez sélectionner votre budget.");
    }

    // ==================================================
    // NOUVEAU — HÉBERGEMENT
    // ==================================================

    if (!accommodation.value) {
      formIsValid = false;

      showError(accommodation, "Veuillez sélectionner un type d'hébergement.");
    }

    // ==================================================
    // NOUVEAU — RYTHME DU VOYAGE
    // ==================================================

    if (!pace.value) {
      formIsValid = false;

      showError(pace, "Veuillez sélectionner le rythme de votre voyage.");
    }

    // ==================================================
    // 03 — INFORMATIONS PERSONNELLES
    // ==================================================

    const firstName = reservationForm.querySelector("#prenom");
    const lastName = reservationForm.querySelector("#nom");
    const email = reservationForm.querySelector("#email");
    const phone = reservationForm.querySelector("#telephone");
    const message = reservationForm.querySelector("#message");

    // PRÉNOM

    if (firstName.value.trim() === "") {
      formIsValid = false;

      showError(firstName, "Veuillez entrer votre prénom.");
    } else if (firstName.value.trim().length < 2) {
      formIsValid = false;

      showError(firstName, "Le prénom doit contenir au moins 2 caractères.");
    }

    // NOM

    if (lastName.value.trim() === "") {
      formIsValid = false;

      showError(lastName, "Veuillez entrer votre nom.");
    } else if (lastName.value.trim().length < 2) {
      formIsValid = false;

      showError(lastName, "Le nom doit contenir au moins 2 caractères.");
    }

    // COURRIEL

    if (email.value.trim() === "") {
      formIsValid = false;

      showError(email, "Veuillez entrer votre adresse courriel.");
    } else if (!validateEmail(email.value)) {
      formIsValid = false;

      showError(email, "Veuillez entrer une adresse courriel valide.");
    }

    // TÉLÉPHONE

    if (phone.value.trim() === "") {
      formIsValid = false;

      showError(phone, "Veuillez entrer votre numéro de téléphone.");
    } else if (!validatePhone(phone.value)) {
      formIsValid = false;

      showError(phone, "Veuillez entrer un numéro de téléphone valide.");
    }

    // ==================================================
    // SI LE FORMULAIRE CONTIENT UNE ERREUR
    // ==================================================

    if (!formIsValid) {
      const firstError = reservationForm.querySelector(".form-error");

      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    // ==================================================
    // FORMULAIRE VALIDE
    // ==================================================

    const interests = [
      ...reservationForm.querySelectorAll('input[name="interets"]:checked'),
    ].map((interest) => interest.value);

    const reservation = {
      package: selectedPackage.value,

      trip: {
        departureDate: departureDate.value,
        travelers: travelers.value,
        travelType: travelType.value,
        budget: budget.value,

        // NOUVEAUX CHAMPS
        accommodation: accommodation.value,
        pace: pace.value,

        interests: interests,
        preferences: preferences.value.trim(),
      },

      customer: {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        message: message.value.trim(),
      },
    };

    console.log("Réservation :", reservation);

    showSuccess();

    reservationForm.reset();
  });
}

// ======================================================
// VALIDATION DU COURRIEL
// ======================================================

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email.trim());
}

// ======================================================
// VALIDATION DU TÉLÉPHONE
// ======================================================

function validatePhone(phone) {
  const numbersOnly = phone.replace(/\D/g, "");

  return numbersOnly.length >= 10 && numbersOnly.length <= 15;
}

// ======================================================
// AFFICHER UNE ERREUR
// ======================================================

function showError(element, message) {
  if (!element) {
    return;
  }

  // CAS SPÉCIAL : RADIO

  if (element.type === "radio") {
    const section = element.closest("section");

    if (!section) {
      return;
    }

    const grid = section.querySelector(".grid");

    if (!grid) {
      return;
    }

    const error = document.createElement("p");

    error.className = "form-error col-span-12 text-[#E4464C] text-sm mt-2";

    error.textContent = message;

    grid.appendChild(error);

    return;
  }

  // INPUT / SELECT / TEXTAREA

  const container = element.parentElement;

  if (!container) {
    return;
  }

  const error = document.createElement("p");

  error.className = "form-error text-[#E4464C] text-xs mt-2";

  error.textContent = message;

  container.appendChild(error);

  element.classList.remove("border-white/20");

  element.classList.add("border-[#E4464C]");
}

// ======================================================
// SUPPRIMER LES ERREURS
// ======================================================

function clearErrors() {
  document.querySelectorAll(".form-error").forEach((error) => {
    error.remove();
  });

  document
    .querySelectorAll(
      "#reservation-form input, " +
        "#reservation-form select, " +
        "#reservation-form textarea",
    )
    .forEach((element) => {
      element.classList.remove("border-[#E4464C]");

      if (element.type !== "radio" && element.type !== "checkbox") {
        element.classList.add("border-white/20");
      }
    });
}

// ======================================================
// MESSAGE DE CONFIRMATION
// ======================================================

function showSuccess() {
  const successMessage = document.createElement("div");

  successMessage.className = `
    fixed
    inset-0
    z-100
    flex
    items-center
    justify-center
    bg-[#101d38]/80
    backdrop-blur-sm
  `;

  successMessage.innerHTML = `
    <div
      class="
        max-w-lg
        mx-6
        bg-[#18233f]
        border
        border-white/10
        rounded-3xl
        p-6
        sm:p-8
        lg:p-10
        text-center
        shadow-2xl
      "
    >
      <p
        class="
          text-[#E4464C]
          text-xs
          sm:text-sm
          tracking-[0.3em]
          mb-5
        "
      >
        ありがとうございます
      </p>

      <h2
        class="
          text-sky-100
          text-2xl
          sm:text-3xl
          mb-4
        "
      >
        Votre voyage commence ici.
      </h2>

      <p
        class="
          text-sky-100/50
          text-sm
          sm:text-base
          leading-relaxed
          mb-8
        "
      >
        Votre demande a bien été enregistrée.
        Notre équipe communiquera avec vous afin
        de préparer votre séjour au Japon.
      </p>

      <button
        type="button"
        id="close-success"
        class="
          border
          border-[#E4464C]
          rounded-full
          px-5
          sm:px-7
          py-3
          text-sm
          sm:text-base
          text-sky-100
          hover:bg-[#E4464C]
          transition
          duration-300
        "
      >
        Continuer
      </button>
    </div>
  `;

  document.body.appendChild(successMessage);

  const closeSuccess = document.querySelector("#close-success");

  if (closeSuccess) {
    closeSuccess.addEventListener("click", () => {
      successMessage.remove();
    });
  }
}
