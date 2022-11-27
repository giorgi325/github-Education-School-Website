window.addEventListener("scroll", () => {
  document
    .querySelector("nav")
    .classList.toggle("window-scroll", window.scrollY > 0);
});

// show/hide faqs

const faqs = document.querySelectorAll(".faq");

faqs.forEach((elemen) => {
  elemen.addEventListener("click", () => {
    elemen.classList.toggle("open");

    // change icon

    const icon = elemen.querySelector(".faq-icon i");
    if (icon.className == "fa-solid fa-plus") {
      icon.className = "fa-solid fa-minus";
    } else icon.classList = "fa-solid fa-plus";
  });
});

const navMenu = document.querySelector(".navMenu");
const navbtn = document.querySelector("#opneMenyBtn");
const closeBtn = document.querySelector("#closeMenyBtn");

navbtn.addEventListener("click", () => {
  navMenu.style.display = "flex";
  closeBtn.style.display = "inline-block";
  navbtn.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  navMenu.style.display = "none";
  navbtn.style.display = "inline-block";
  closeBtn.style.display = "none";
});
