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
   MENU
========================================================= */

const grid = document.getElementById("dishGrid");

function render(cat = "all") {
  if (!grid) return;

  const list =
    cat === "all"
      ? dishes
      : dishes.filter((x) => x.cat === cat);

  grid.innerHTML = list
    .map(
      (d) => `
        <article class="dish">
          <div class="dish-img">
            <img
              loading="lazy"
              src="${d.img}"
              alt="${d.name}"
            >
          </div>

          <div class="dish-info">
            <div>
              <small>${d.cat.toUpperCase()}</small>
              <h3>${d.name}</h3>
              <p>${d.desc}</p>
            </div>

            <strong class="dish-price">
              Rs. ${d.price}
            </strong>
          </div>
        </article>
      `
    )
    .join("");
}


/* =========================================================
   MENU TABS
========================================================= */

document.querySelectorAll(".menu-tabs button").forEach((btn) => {
  btn.addEventListener("click", () => {

    document
      .querySelectorAll(".menu-tabs button")
      .forEach((x) => x.classList.remove("active"));

    btn.classList.add("active");

    render(btn.dataset.cat);
  });
});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMobile() {
  const mobileNav = document.getElementById("mobileNav");

  if (!mobileNav) return;

  mobileNav.classList.toggle("open");
}


/* =========================================================
   RESERVATION MODAL
========================================================= */

function openReservation() {
  const reservation = document.getElementById("reservation");

  if (!reservation) return;

  reservation.classList.add("open");
  document.body.style.overflow = "hidden";
}


function closeReservation() {
  const reservation = document.getElementById("reservation");

  if (!reservation) return;

  reservation.classList.remove("open");
  document.body.style.overflow = "";
}


function submitReservation(e) {
  e.preventDefault();

  alert(
    "Reservation request received in demo mode. Connect your booking backend/WhatsApp/email to make this live."
  );

  closeReservation();
}


/* =========================================================
   RESTAURANT VIDEO MODAL
========================================================= */

const videoModal = document.getElementById("videoModal");
const restaurantVideo = document.getElementById("restaurantVideo");


function openVideo() {

  if (!videoModal) {
    console.error("Video modal not found.");
    return;
  }

  videoModal.classList.add("open");

  document.body.style.overflow = "hidden";


  if (restaurantVideo) {

    /*
      Important for mobile browsers.
      Muted + playsinline allows playback without
      requiring normal autoplay permission.
    */

    restaurantVideo.muted = true;
    restaurantVideo.setAttribute("muted", "");
    restaurantVideo.setAttribute("playsinline", "");
    restaurantVideo.setAttribute("webkit-playsinline", "");

    /*
      Start from beginning every time modal opens.
    */

    try {
      restaurantVideo.currentTime = 0;
    } catch (error) {
      console.log("Could not reset video:", error);
    }


    /*
      Give the browser a moment to render the modal,
      then start playback.
    */

    setTimeout(() => {

      const playPromise = restaurantVideo.play();

      if (playPromise !== undefined) {

        playPromise
          .then(() => {
            console.log("AURELIA video started successfully.");
          })
          .catch((error) => {

            /*
              Some mobile browsers may still block
              automatic playback. The controls remain
              available so the user can tap Play.
            */

            console.log(
              "Mobile autoplay was blocked:",
              error
            );
          });
      }

    }, 100);
  }
}


function closeVideo() {

  if (restaurantVideo) {

    restaurantVideo.pause();

    try {
      restaurantVideo.currentTime = 0;
    } catch (error) {
      console.log("Could not reset video:", error);
    }
  }


  if (videoModal) {
    videoModal.classList.remove("open");
  }

  document.body.style.overflow = "";
}


/* =========================================================
   CLOSE VIDEO WHEN CLICKING OUTSIDE
========================================================= */

if (videoModal) {

  videoModal.addEventListener("click", (e) => {

    if (e.target === videoModal) {
      closeVideo();
    }

  });
}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {

    if (
      videoModal &&
      videoModal.classList.contains("open")
    ) {
      closeVideo();
    }

    const reservation =
      document.getElementById("reservation");

    if (
      reservation &&
      reservation.classList.contains("open")
    ) {
      closeReservation();
    }
  }

});


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader = document.getElementById("loader");

    if (loader) {
      loader.style.display = "none";
    }

  }, 1500);

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((e) => {

      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }

    });

  },
  {
    threshold: 0.15
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));


/* =========================================================
   HERO PARALLAX
========================================================= */

window.addEventListener("scroll", () => {

  const heroImage = document.getElementById("heroImage");

  if (!heroImage) return;

  const y = window.scrollY;

  heroImage.style.transform =
    `scale(1.05) translateY(${y * 0.035}px)`;

});


/* =========================================================
   INITIAL MENU
========================================================= */

render();