/* =========================
   BIRTHDAY WEBSITE SCRIPT
========================= */


/* =========================
   OPEN BIRTHDAY
========================= */

function openBirthday() {

    const opening = document.getElementById("opening");
    const mainContent = document.getElementById("mainContent");

    createConfetti();

    opening.style.opacity = "0";
    opening.style.transform = "scale(1.05)";

    opening.style.transition =
        "opacity .7s ease, transform .7s ease";

    setTimeout(() => {

        opening.style.display = "none";

        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 700);

}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const container =
        document.getElementById("confettiContainer");

    const symbols = [
        "✦",
        "✧",
        "●",
        "◆",
        "♥"
    ];

    for (let i = 0; i < 90; i++) {

        const confetti =
            document.createElement("div");

        confetti.classList.add("confetti");

        confetti.innerHTML =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        confetti.style.left =
            Math.random() * 100 + "%";

        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";

        confetti.style.animationDuration =
            2 + Math.random() * 2 + "s";

        confetti.style.fontSize =
            8 + Math.random() * 12 + "px";

        container.appendChild(confetti);

        setTimeout(() => {

            confetti.remove();

        }, 4500);

    }

}


/* =========================
   GIFT
========================= */

function openGift() {

    const giftMessage =
        document.getElementById("giftMessage");

    const giftButton =
        document.querySelector(".gift-button");

    giftMessage.classList.toggle("show");

    if (giftMessage.classList.contains("show")) {

        giftButton.innerHTML = "✨";

        createConfetti();

    } else {

        giftButton.innerHTML = "🎁";

    }

}


/* =========================
   MUSIC
========================= */

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

let musicPlaying = false;


function toggleMusic() {

    if (!music) return;

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.classList.remove("playing");

        musicButton.innerHTML = "♫";

    } else {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.classList.add("playing");

                musicButton.innerHTML = "🔊";

            })
            .catch(() => {

                alert(
                    "Tambahkan file birthday.mp3 ke folder assets/music terlebih dahulu."
                );

            });

    }

}


/* =========================
   SCROLL ANIMATION
========================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(
        ".wish-card, .timeline-item, .photo, .letter"
    )
    .forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

        observer.observe(element);

    });


/* =========================
   FLOATING HEARTS
========================= */

function createFloatingHeart() {

    const heart =
        document.createElement("div");

    heart.innerHTML =
        Math.random() > .5 ? "♡" : "✦";

    heart.style.position = "fixed";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom = "-30px";

    heart.style.fontSize =
        12 + Math.random() * 15 + "px";

    heart.style.color =
        Math.random() > .5
            ? "#7187e8"
            : "#d88fbd";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "1";

    heart.style.opacity = ".5";

    document.body.appendChild(heart);


    const animation =
        heart.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 0
                },
                {
                    transform:
                        "translateY(-40vh) rotate(90deg)",
                    opacity: .6
                },
                {
                    transform:
                        "translateY(-100vh) rotate(180deg)",
                    opacity: 0
                }
            ],
            {
                duration:
                    6000 + Math.random() * 3000,

                easing: "ease-out"
            }
        );


    animation.onfinish = () => {

        heart.remove();

    };

}


/* Create occasional floating decoration */

setInterval(() => {

    if (
        document.visibilityState === "visible" &&
        !document
            .getElementById("mainContent")
            .classList.contains("hidden")
    ) {

        createFloatingHeart();

    }

}, 1800);


/* =========================
   PREVENT MUSIC ERROR
========================= */

if (music) {

    music.addEventListener(
        "error",
        () => {

            console.log(
                "Music belum ditemukan. Tambahkan assets/birthday.mp3"
            );

        }
    );

}