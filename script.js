const dishes = [
  {
    name: "Wild Mushroom",
    cat: "starters",
    price: "1,850",
    desc: "Truffle, thyme & aged parmesan",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=90"
  },
  {
    name: "Seared Scallops",
    cat: "starters",
    price: "2,400",
    desc: "Garden peas, citrus & delicate herbs",
    img: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=90"
  },
  {
    name: "Garden Burrata",
    cat: "starters",
    price: "1,950",
    desc: "Heirloom tomatoes, basil & olive oil",
    img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=1000&q=90"
  },
  {
    name: "Herb Crusted Fillet",
    cat: "mains",
    price: "4,800",
    desc: "Seasonal vegetables, jus & black garlic",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=90"
  },
  {
    name: "Butter Poached Prawn",
    cat: "mains",
    price: "3,950",
    desc: "Saffron, fennel & shellfish reduction",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=90"
  },
  {
    name: "Forest Risotto",
    cat: "mains",
    price: "2,950",
    desc: "Wild mushrooms, parmesan & truffle",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1000&q=90"
  },
  {
    name: "Dark Chocolate",
    cat: "desserts",
    price: "1,450",
    desc: "72% cacao, sea salt & vanilla",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=90"
  },
  {
    name: "Pistachio Garden",
    cat: "desserts",
    price: "1,350",
    desc: "Pistachio, rose & white chocolate",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=90"
  },
  {
    name: "Signature Tonic",
    cat: "drinks",
    price: "850",
    desc: "Citrus, herbs & botanical infusion",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=90"
  }
];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const grid = document.getElementById("dishGrid");

const videoModal = document.getElementById("videoModal");
const restaurantVideo = document.getElementById("restaurantVideo");

const reservationModal = document.getElementById("reservation");

const mobileNav = document.getElementById("mobileNav");

const loader = document.getElementById("loader");

const heroImage = document.getElementById("heroImage");


/* =========================================================
   MENU RENDER
========================================================= */

function render(cat = "all") {

  if (!grid) return;

  const list =
    cat === "all"
      ? dishes
      : dishes.filter((dish) => dish.cat === cat);


  grid.innerHTML = list
    .map(
      (dish) => `
        <article class="dish">

          <div class="dish-img">
            <img
              loading="lazy"
              src="${dish.img}"
              alt="${dish.name}"
            >
          </div>

          <div class="dish-info">

            <div>

              <small>
                ${dish.cat.toUpperCase()}
              </small>

              <h3>
                ${dish.name}
              </h3>

              <p>
                ${dish.desc}
              </p>

            </div>

            <strong class="dish-price">
              Rs. ${dish.price}
            </strong>

          </div>

        </article>
      `
    )
    .join("");
}


/* =========================================================
   MENU FILTER TABS
========================================================= */

const menuButtons =
  document.querySelectorAll(".menu-tabs button");


menuButtons.forEach((button) => {

  button.addEventListener("click", () => {

    menuButtons.forEach((btn) => {
      btn.classList.remove("active");
    });


    button.classList.add("active");


    const category =
      button.dataset.cat || "all";


    render(category);

  });

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMobile() {

  if (!mobileNav) return;

  mobileNav.classList.toggle("open");

}


/*
  Close mobile menu when clicking a navigation link
*/

if (mobileNav) {

  const mobileLinks =
    mobileNav.querySelectorAll("a");


  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("open");

    });

  });

}


/* =========================================================
   RESERVATION MODAL
========================================================= */

function openReservation() {

  if (!reservationModal) {
    console.error("Reservation modal not found.");
    return;
  }


  reservationModal.classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeReservation() {

  if (!reservationModal) return;


  reservationModal.classList.remove("open");

  document.body.style.overflow = "";

}


/* =========================================================
   RESERVATION FORM
========================================================= */

function submitReservation(event) {

  if (event) {
    event.preventDefault();
  }


  alert(
    "Reservation request received in demo mode. Connect your booking backend, WhatsApp or email to make this live."
  );


  closeReservation();

}


/* =========================================================
   RESTAURANT VIDEO
   MOBILE + DESKTOP COMPATIBLE
========================================================= */

function openVideo() {

  /*
    Make sure modal exists
  */

  if (!videoModal) {

    console.error(
      "AURELIA: videoModal element not found."
    );

    return;
  }


  /*
    Open modal
  */

  videoModal.classList.add("open");

  document.body.style.overflow = "hidden";


  /*
    Make sure video exists
  */

  if (!restaurantVideo) {

    console.error(
      "AURELIA: restaurantVideo element not found."
    );

    return;
  }


  /*
    Mobile browser compatibility
  */

  restaurantVideo.muted = true;

  restaurantVideo.defaultMuted = true;

  restaurantVideo.setAttribute(
    "muted",
    ""
  );

  restaurantVideo.setAttribute(
    "playsinline",
    ""
  );

  restaurantVideo.setAttribute(
    "webkit-playsinline",
    "" 
  );


  /*
    Reset video
  */

  try {

    restaurantVideo.pause();

    restaurantVideo.currentTime = 0;

  } catch (error) {

    console.log(
      "Could not reset video:",
      error
    );

  }


  /*
    Reload video source
  */

  try {

    restaurantVideo.load();

  } catch (error) {

    console.log(
      "Could not load video:",
      error
    );

  }


  /*
    Start playback directly from the
    user's click interaction.
  */

  const playVideo = () => {

    const playPromise =
      restaurantVideo.play();


    if (
      playPromise !== undefined
    ) {

      playPromise
        .then(() => {

          console.log(
            "AURELIA restaurant video started."
          );

        })
        .catch((error) => {

          /*
            Mobile browsers can sometimes block
            autoplay. Controls remain available,
            so user can press Play manually.
          */

          console.log(
            "AURELIA video autoplay blocked:",
            error
          );

        });

    }

  };


  /*
    Small delay only for rendering the modal.
  */

  requestAnimationFrame(() => {

    playVideo();

  });

}


/* =========================================================
   CLOSE VIDEO
========================================================= */

function closeVideo() {

  if (restaurantVideo) {

    try {

      restaurantVideo.pause();

      restaurantVideo.currentTime = 0;

    } catch (error) {

      console.log(
        "Could not stop video:",
        error
      );

    }

  }


  if (videoModal) {

    videoModal.classList.remove("open");

  }


  document.body.style.overflow = "";

}


/* =========================================================
   CLOSE VIDEO BY CLICKING BACKDROP
========================================================= */

if (videoModal) {

  videoModal.addEventListener(
    "click",
    (event) => {

      /*
        Only close if user clicked
        the dark background itself.
      */

      if (
        event.target === videoModal
      ) {

        closeVideo();

      }

    }
  );

}


/* =========================================================
   RESERVATION BACKDROP
========================================================= */

if (reservationModal) {

  reservationModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === reservationModal
      ) {

        closeReservation();

      }

    }
  );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }


    /*
      Close video
    */

    if (
      videoModal &&
      videoModal.classList.contains("open")
    ) {

      closeVideo();

    }


    /*
      Close reservation
    */

    if (
      reservationModal &&
      reservationModal.classList.contains("open")
    ) {

      closeReservation();

    }


    /*
      Close mobile navigation
    */

    if (
      mobileNav &&
      mobileNav.classList.contains("open")
    ) {

      mobileNav.classList.remove("open");

    }

  }
);


/* =========================================================
   VIDEO ERROR DETECTION
========================================================= */

if (restaurantVideo) {

  restaurantVideo.addEventListener(
    "error",
    () => {

      console.error(
        "AURELIA video error:",
        restaurantVideo.error
      );

    }
  );


  restaurantVideo.addEventListener(
    "loadedmetadata",
    () => {

      console.log(
        "AURELIA video metadata loaded."
      );

    }
  );


  restaurantVideo.addEventListener(
    "canplay",
    () => {

      console.log(
        "AURELIA video is ready to play."
      );

    }
  );

}


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        if (loader) {

          loader.style.opacity = "0";


          setTimeout(
            () => {

              loader.style.display = "none";

            },
            400
          );

        }

      },
      1500
    );

  }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

            /*
              Stop observing once visible
              for better performance.
            */

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.15
      }
    );


  revealElements.forEach((element) => {

    observer.observe(element);

  });

} else {

  /*
    Fallback for older browsers
  */

  revealElements.forEach((element) => {

    element.classList.add(
      "visible"
    );

  });

}


/* =========================================================
   HERO PARALLAX
========================================================= */

let ticking = false;


function updateHeroParallax() {

  if (!heroImage) {
    ticking = false;
    return;
  }


  /*
    Disable heavy parallax on small screens.
    This prevents unnecessary mobile performance load.
  */

  if (window.innerWidth <= 768) {

    heroImage.style.transform =
      "scale(1.02)";

    ticking = false;

    return;

  }


  const scrollPosition =
    window.scrollY || window.pageYOffset;


  heroImage.style.transform =
    `scale(1.05) translateY(${scrollPosition * 0.035}px)`;


  ticking = false;

}


window.addEventListener(
  "scroll",
  () => {

    if (!ticking) {

      window.requestAnimationFrame(
        updateHeroParallax
      );

      ticking = true;

    }

  },
  {
    passive: true
  }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
  "resize",
  () => {

    /*
      If desktop -> mobile while menu is open,
      keep navigation state clean.
    */

    if (
      window.innerWidth > 900 &&
      mobileNav
    ) {

      mobileNav.classList.remove(
        "open"
      );

    }

  }
);


/* =========================================================
   INITIALIZE MENU
========================================================= */

render();


/* =========================================================
   INITIAL HERO POSITION
========================================================= */

updateHeroParallax();