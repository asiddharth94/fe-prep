const TESTIMONIALS = document.querySelector(".testimonials");
const TESTIMONIAL = document.querySelector(".testimonial");

const createAndAppendTestimonial = (testimonial) => {
  const container = document.createElement("div");
  container.classList.add("testimonial");
  container.innerHTML = `
    <p>${testimonial}</p>
    `;
  TESTIMONIALS.appendChild(container);
};

const fetchTestimonials = () => {
  fetch("./testimonials.json")
    .then((response) => response.json())
    .then((data) => {
      data["testimonials"].forEach((element) => {
        createAndAppendTestimonial(element.message);
      });
    })
    .catch((error) => console.warn(error));
};

fetchTestimonials();

document.addEventListener("scroll", () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 100) {
    fetchTestimonials();
  }
});
