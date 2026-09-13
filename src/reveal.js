import "./style.css";
import "flowbite";

const sections = document.querySelectorAll(".section-reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
      }
    });
  },
  {
    threshold: 0.25,
  },
);

sections.forEach((section) => {
  observer.observe(section);
});
