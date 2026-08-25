/* =====================================================
   CHAHAT PORTFOLIO
   FULL JAVASCRIPT
===================================================== */


/* =====================================================
   TYPING EFFECT
===================================================== */

const typing = document.getElementById("typing");

const roles = [
    "Django Developer",
    "Python Developer",
    "Web Developer",
    "IT Student",
    "Creative Coder"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {

    if (!typing) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typing.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex >= currentRole.length) {

            deleting = true;

            setTimeout(typeWriter, 1500);

            return;
        }

    } else {

        typing.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex <= 0) {

            charIndex = 0;
            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(
        typeWriter,
        deleting ? 45 : 90
    );
}

typeWriter();


/* =====================================================
   MOUSE GLOW
===================================================== */

const cursorGlow =
    document.querySelector(".cursor-glow");

if (cursorGlow) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


function closeMobileMenu() {

    if (!nav || !menuBtn) return;

    nav.classList.remove(
        "mobile-active"
    );

    const icon =
        menuBtn.querySelector("i");

    if (!icon) return;

    icon.classList.remove(
        "fa-xmark"
    );

    icon.classList.add(
        "fa-bars"
    );
}


if (menuBtn && nav) {

    menuBtn.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "mobile-active"
            );

            const icon =
                menuBtn.querySelector("i");

            if (!icon) return;

            const isOpen =
                nav.classList.contains(
                    "mobile-active"
                );

            icon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            icon.classList.toggle(
                "fa-xmark",
                isOpen
            );

        }
    );

}


document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNav() {

    if (!sections.length) return;

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (
            window.scrollY >= sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    revealElements.length &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    const stats =
        document.querySelector(
            ".stats"
        );

    if (
        !stats ||
        !counters.length
    ) {
        return;
    }

    const position =
        stats.getBoundingClientRect().top;

    if (
        position <
        window.innerHeight - 100
    ) {

        countersStarted = true;

        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.count
                );

            if (
                Number.isNaN(target)
            ) {
                return;
            }

            let current = 0;

            const increment =
                Math.max(
                    1,
                    Math.ceil(
                        target / 40
                    )
                );

            const interval =
                setInterval(
                    () => {

                        current += increment;

                        if (
                            current >= target
                        ) {

                            current = target;

                            clearInterval(
                                interval
                            );

                        }

                        counter.textContent =
                            `${current}+`;

                    },
                    35
                );

        });

    }

}


window.addEventListener(
    "scroll",
    startCounters,
    { passive: true }
);

startCounters();


/* =====================================================
   PROJECT TILT
===================================================== */

const projectCards =
    document.querySelectorAll(
        ".project"
    );


projectCards.forEach(project => {

    project.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 900
            ) {
                return;
            }

            const rect =
                project.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 70;

            const rotateY =
                (centerX - x) / 70;

            project.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    project.addEventListener(
        "mouseleave",
        () => {

            project.style.transform = "";

        }
    );

});


/* =====================================================
   BUTTON RIPPLE
===================================================== */

document
    .querySelectorAll(
        ".btn, .contact-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement(
                        "span"
                    );

                ripple.className =
                    "ripple";

                const rect =
                    this.getBoundingClientRect();

                ripple.style.left =
                    `${event.clientX - rect.left}px`;

                ripple.style.top =
                    `${event.clientY - rect.top}px`;

                this.appendChild(
                    ripple
                );

                setTimeout(
                    () => {

                        ripple.remove();

                    },
                    600
                );

            }
        );

    });


/* =====================================================
   CERTIFICATE CAROUSEL
===================================================== */

const certificateTrack =
    document.getElementById(
        "certificatesTrack"
    ) ||
    document.querySelector(
        ".certificates-track"
    );


const certificateCards =
    document.querySelectorAll(
        ".certificate-card"
    );


const certificatePrev =
    document.getElementById(
        "certificatePrev"
    );


const certificateNext =
    document.getElementById(
        "certificateNext"
    );


const certificateCounter =
    document.getElementById(
        "certificateCounter"
    );


let certificateIndex = 0;


/* =====================================================
   GET CERTIFICATE STEP
===================================================== */

function getCertificateStep() {

    if (
        !certificateTrack ||
        !certificateCards.length
    ) {
        return 0;
    }

    const card =
        certificateCards[0];

    const cardWidth =
        card.getBoundingClientRect()
            .width;

    const style =
        window.getComputedStyle(
            certificateTrack
        );

    const gap =
        parseFloat(
            style.columnGap ||
            style.gap
        ) || 18;

    return cardWidth + gap;
}


/* =====================================================
   UPDATE CERTIFICATE COUNTER
===================================================== */

function updateCertificateCounter() {

    if (
        !certificateCounter ||
        !certificateCards.length
    ) {
        return;
    }

    certificateCounter.textContent =
        `${String(
            certificateIndex + 1
        ).padStart(2, "0")} — ${String(
            certificateCards.length
        ).padStart(2, "0")}`;

}


/* =====================================================
   MOVE CERTIFICATES
===================================================== */

function moveCertificates(direction) {

    if (
        !certificateTrack ||
        !certificateCards.length
    ) {
        return;
    }

    certificateIndex += direction;


    /* LOOP FORWARD */

    if (
        certificateIndex >=
        certificateCards.length
    ) {

        certificateIndex = 0;

    }


    /* LOOP BACKWARD */

    if (
        certificateIndex < 0
    ) {

        certificateIndex =
            certificateCards.length - 1;

    }


    const step =
        getCertificateStep();


    certificateTrack.scrollTo({

        left:
            certificateIndex *
            step,

        behavior:
            "smooth"

    });


    updateCertificateCounter();

}


/* =====================================================
   NEXT CERTIFICATE BUTTON
===================================================== */

if (certificateNext) {

    certificateNext.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            moveCertificates(1);

        }
    );

}


/* =====================================================
   PREVIOUS CERTIFICATE BUTTON
===================================================== */

if (certificatePrev) {

    certificatePrev.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            moveCertificates(-1);

        }
    );

}


/* =====================================================
   CERTIFICATE RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        if (!certificateTrack) {
            return;
        }

        const step =
            getCertificateStep();

        certificateTrack.scrollTo({

            left:
                certificateIndex *
                step,

            behavior:
                "auto"

        });

        updateCertificateCounter();

    }
);


/* =====================================================
   MOBILE CERTIFICATE SWIPE
===================================================== */

let certificateStartX = 0;
let certificateStartY = 0;

let certificateTouching = false;


if (certificateTrack) {

    certificateTrack.addEventListener(
        "touchstart",
        event => {

            if (
                !event.touches.length
            ) {
                return;
            }

            certificateStartX =
                event.touches[0]
                    .clientX;

            certificateStartY =
                event.touches[0]
                    .clientY;

            certificateTouching = true;

        },
        {
            passive: true
        }
    );


    certificateTrack.addEventListener(
        "touchend",
        event => {

            if (
                !certificateTouching
            ) {
                return;
            }

            const endX =
                event.changedTouches[0]
                    .clientX;

            const endY =
                event.changedTouches[0]
                    .clientY;

            const differenceX =
                certificateStartX -
                endX;

            const differenceY =
                certificateStartY -
                endY;


            /*
               Only treat the gesture as a
               certificate swipe when the
               horizontal movement is greater
               than the vertical movement.
            */

            if (
                Math.abs(differenceX) >
                Math.abs(differenceY) &&
                Math.abs(differenceX) > 40
            ) {

                if (
                    differenceX > 0
                ) {

                    moveCertificates(1);

                } else {

                    moveCertificates(-1);

                }

            }


            certificateTouching = false;

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   DESKTOP CERTIFICATE MOUSE DRAG
===================================================== */

if (certificateTrack) {

    let mouseDown = false;

    let dragStartX = 0;

    let dragStartScroll = 0;


    certificateTrack.addEventListener(
        "mousedown",
        event => {

            /*
               Don't start dragging when
               clicking a certificate button.
            */

            if (
                event.target.closest(
                    ".certificate-image"
                )
            ) {
                return;
            }

            mouseDown = true;

            dragStartX =
                event.clientX;

            dragStartScroll =
                certificateTrack.scrollLeft;

            certificateTrack.classList.add(
                "dragging"
            );

        }
    );


    certificateTrack.addEventListener(
        "mousemove",
        event => {

            if (!mouseDown) {
                return;
            }

            const distance =
                event.clientX -
                dragStartX;

            certificateTrack.scrollLeft =
                dragStartScroll -
                distance;

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            mouseDown = false;

            certificateTrack.classList.remove(
                "dragging"
            );

        }
    );

}


/* =====================================================
   CERTIFICATE MODAL
===================================================== */

const certificateModal =
    document.getElementById(
        "certificateModal"
    );


const certificateModalImage =
    document.getElementById(
        "certificateModalImage"
    );


const certificateModalTitle =
    document.getElementById(
        "certificateModalTitle"
    );


const certificateModalClose =
    document.getElementById(
        "certificateModalClose"
    );


/* =====================================================
   OPEN CERTIFICATE MODAL
===================================================== */

certificateCards.forEach(card => {

    card.addEventListener(
        "click",
        event => {

            /*
               If the click is on a button
               inside the card, don't interfere.
            */

            if (
                event.target.closest(
                    "a"
                )
            ) {
                return;
            }

            if (
                !certificateModal ||
                !certificateModalImage
            ) {
                return;
            }

            const image =
                card.querySelector(
                    "img"
                );


            const title =
                card.dataset.title ||
                card.querySelector(
                    "h3"
                )?.textContent?.trim() ||
                "Certificate";


            if (image) {

                certificateModalImage.src =
                    image.src;

                certificateModalImage.alt =
                    title;

            }


            if (certificateModalTitle) {

                certificateModalTitle.textContent =
                    title;

            }


            certificateModal.classList.add(
                "active"
            );


            certificateModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});


/* =====================================================
   CLOSE CERTIFICATE MODAL
===================================================== */

function closeCertificateModal() {

    if (!certificateModal) {
        return;
    }

    certificateModal.classList.remove(
        "active"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =====================================================
   MODAL CLOSE BUTTON
===================================================== */

if (certificateModalClose) {

    certificateModalClose.addEventListener(
        "click",
        event => {

            event.preventDefault();

            closeCertificateModal();

        }
    );

}


/* =====================================================
   CLICK MODAL BACKDROP
===================================================== */

if (certificateModal) {

    certificateModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                certificateModal
            ) {

                closeCertificateModal();

            }

        }
    );

}


/* =====================================================
   CERTIFICATE MODAL BACKDROP
===================================================== */

const certificateBackdrop =
    document.querySelector(
        ".certificate-modal-backdrop"
    );


if (certificateBackdrop) {

    certificateBackdrop.addEventListener(
        "click",
        closeCertificateModal
    );

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            certificateModal?.classList.contains(
                "active"
            )
        ) {

            closeCertificateModal();

        }

    }
);


/* =====================================================
   CERTIFICATE IMAGE ERROR FALLBACK
===================================================== */

document
    .querySelectorAll(
        ".certificate-card img"
    )
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

                const parent =
                    image.parentElement;

                if (parent) {

                    parent.classList.add(
                        "certificate-placeholder"
                    );

                }

            }
        );

    });


/* =====================================================
   CERTIFICATE INITIALIZATION
===================================================== */

function initializeCertificates() {

    certificateIndex = 0;

    updateCertificateCounter();

    if (certificateTrack) {

        certificateTrack.scrollLeft = 0;

    }

}


setTimeout(
    initializeCertificates,
    100
);


/* =====================================================
   GENERAL CARD HOVER
===================================================== */

document
    .querySelectorAll(
        ".about-card, .mini-card, .enjoy-item, .skill-pill"
    )
    .forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "hovered"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "hovered"
                );

            }
        );

    });


/* =====================================================
   PAGE LOADED
===================================================== */

document.body.classList.add(
    "page-loaded"
);