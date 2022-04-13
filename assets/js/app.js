// Typed Js
var typed = new Typed("#type", {
  strings: ["Subender Nath", "a Software Engineer", "into Web Development.."],
  typeSpeed: 80,
  startDelay: 0,
  backSpeed: 40,
  loop: true,
});

const projectsContainer = document.querySelector(".projects-container");

let project = "";

fetch("/assets/js/projects.json")
  .then((resp) => resp.json())
  .then((projects) => {
    projects.forEach((proj, i) => {
      renderCards(proj);
    });
  });

const renderCards = (proj) => {
  project += `<div class="card">
    <div class="img-box">
    <img src="${proj.image}" alt="">
  </div>
  <div class="content-box">
    <h2>${proj.name}</h2>
    <div class="tech-box"><span>HTML</span> <span>CSS</span> ${
      proj.javascript ? "<span>JS</span>" : ""
    } </div>
    <p> ${proj.description} </p>
    <div class="link-box">
      <a class="github" href="${proj.github}" target="_blank" > <svg>
        <use xlink:href="assets/img/sprite.svg#icon-github"></use>
      </svg><span>Code</span></a>
      <a class="live" href="${proj.live}" target="_blank" > <svg>
        <use xlink:href="assets/img/sprite.svg#icon-eye"></use>
      </svg> <span>Live</span></a>
    </div>
  </div>
  </div>
`;
  projectsContainer.innerHTML = project;
};

// Active Section Logic

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-items");

// window.addEventListener("scroll", () => {
//   let currentSectoin = "";

//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop;

//     if (pageYOffset + 1 >= sectionTop) {
//       currentSectoin = section.getAttribute("id");
//     }
//   });

//   navItems.forEach((item) => {
//     item.classList.remove("active");

//     if (item.classList.contains(currentSectoin)) {
//       item.classList.add("active");
//     }
//   });
// });

//Smooth Scrolling

const navContainer = document.querySelector(".navbar ul");

navContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const linkElem = e.target;

  if (!linkElem.classList.contains("nav-items")) {
    return;
  }

  const sectionId = linkElem.getAttribute("href");

  document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
});
// -------------------------------------------------------------------------------
// Intersection observer menu update on Scroll
// -------------------------------------------------------------------------------

const updateNav = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
      document.querySelector(".active").classList.remove("active");
      const id = entry.target.getAttribute("id");
      document.querySelector(`[href="#${id}"]`).classList.add("active");
    }
  });
};

const opts = {
  threshold: 0.1,
};

const observer = new IntersectionObserver(updateNav, opts);

sections.forEach((section) => observer.observe(section));

// -----------------------------------------------------------------
// Slide In Effect --------------------------->>>>

const sliders = document.querySelectorAll(".slide-in");

const options = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px",
};

const moveIn = (entries, _) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    appearOnScroll.unobserve(entry.target);
  });
};

const appearOnScroll = new IntersectionObserver(moveIn, opts);
sliders.forEach((slider) => {
  appearOnScroll.observe(slider);
});

// -------------------------------------------------------------------------
// --------------------------Menu Toggler-----------------------------------
// -------------------------------------------------------------------------

const menu = document.querySelector("#menu");
const navBar = document.querySelector(".navbar");

menu.addEventListener("click", () => {
  navBar.classList.toggle("nav-toggle");
});
