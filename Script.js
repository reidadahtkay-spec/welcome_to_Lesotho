document.addEventListener("DOMContentLoaded", function () {

    console.log("Explore Lesotho website is running!");


    var currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    var navigationLinks =
        document.querySelectorAll(".nav-link");

    navigationLinks.forEach(function (link) {

        var linkPage = link.getAttribute("href");

        if (
            linkPage &&
            linkPage.toLowerCase() === currentPage
        ) {
            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );
        }

    });


    function showPopup(title, message, imageSource) {

        var oldPopup = document.getElementById(
            "explorePopup"
        );

        if (oldPopup) {
            oldPopup.remove();
        }

        var popup = document.createElement("div");

        popup.id = "explorePopup";

        popup.style.position = "fixed";
        popup.style.top = "0";
        popup.style.left = "0";
        popup.style.width = "100%";
        popup.style.height = "100%";
        popup.style.background = "rgba(0,0,0,0.85)";
        popup.style.display = "flex";
        popup.style.justifyContent = "center";
        popup.style.alignItems = "center";
        popup.style.zIndex = "10000";
        popup.style.padding = "20px";
        popup.style.boxSizing = "border-box";
        popup.style.overflowY = "auto";

        var box = document.createElement("div");

        box.style.background = "#ffffff";
        box.style.color = "#222222";
        box.style.padding = "25px";
        box.style.borderRadius = "12px";
        box.style.maxWidth = "650px";
        box.style.width = "100%";
        box.style.maxHeight = "90vh";
        box.style.overflowY = "auto";
        box.style.position = "relative";

        var closeButton =
            document.createElement("button");

        closeButton.textContent = "×";
        closeButton.setAttribute(
            "aria-label",
            "Close popup"
        );

        closeButton.style.position = "absolute";
        closeButton.style.top = "8px";
        closeButton.style.right = "12px";
        closeButton.style.fontSize = "30px";
        closeButton.style.border = "none";
        closeButton.style.background = "transparent";
        closeButton.style.cursor = "pointer";

        var heading = document.createElement("h2");

        heading.textContent = title;

        heading.style.marginTop = "10px";

        var paragraph = document.createElement("p");

        paragraph.textContent = message;

        paragraph.style.lineHeight = "1.7";

        if (imageSource) {

            var image = document.createElement("img");

            image.src = imageSource;
            image.alt = title;

            image.style.width = "100%";
            image.style.maxHeight = "60vh";
            image.style.objectFit = "contain";
            image.style.borderRadius = "8px";
            image.style.marginTop = "15px";

            box.appendChild(closeButton);
            box.appendChild(heading);
            box.appendChild(image);
            box.appendChild(paragraph);

        } else {

            box.appendChild(closeButton);
            box.appendChild(heading);
            box.appendChild(paragraph);

        }

        popup.appendChild(box);

        document.body.appendChild(popup);

        closeButton.addEventListener("click", function () {
            popup.remove();
        });

        popup.addEventListener("click", function (event) {

            if (event.target === popup) {
                popup.remove();
            }

        });

        function closeWithEscape(event) {

            if (event.key === "Escape") {

                popup.remove();

                document.removeEventListener(
                    "keydown",
                    closeWithEscape
                );

            }

        }

        document.addEventListener(
            "keydown",
            closeWithEscape
        );

    }


    var filterButtons =
        document.querySelectorAll("[data-filter]");

    var destinationItems =
        document.querySelectorAll(".destination-item");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            var selectedCategory =
                button.getAttribute("data-filter");

            filterButtons.forEach(function (item) {

                item.classList.remove("active");

            });

            button.classList.add("active");

            destinationItems.forEach(function (item) {

                var categories =
                    item.getAttribute("data-category") || "";

                if (
                    selectedCategory === "all" ||
                    categories.split(" ").includes(
                        selectedCategory
                    )
                ) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });


    var travelNoteButtons =
        document.querySelectorAll(".details-btn");

    travelNoteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            var placeName =
                button.getAttribute("data-place");

            var placeDescription =
                button.getAttribute("data-description");

            showPopup(
                placeName || "Travel note",
                placeDescription ||
                    "Plan your visit carefully and enjoy exploring Lesotho."
            );

        });

    });


    var galleryTiles =
        document.querySelectorAll(".gallery-tile");

    var galleryImages = [];

    galleryTiles.forEach(function (tile) {

        var image = tile.querySelector("img");

        if (image) {

            galleryImages.push({
                tile: tile,
                image: image,
                source:
                    tile.getAttribute("data-full") ||
                    image.getAttribute("src"),
                caption:
                    tile.getAttribute("data-caption") ||
                    image.getAttribute("alt") ||
                    "Explore Lesotho"
            });

        }

    });

    var currentGalleryIndex = 0;


    function openGalleryImage(index) {

        if (galleryImages.length === 0) {
            return;
        }

        if (index < 0) {

            index = galleryImages.length - 1;

        }

        if (index >= galleryImages.length) {

            index = 0;

        }

        currentGalleryIndex = index;

        var selectedImage =
            galleryImages[currentGalleryIndex];

        showPopup(
            selectedImage.caption,
            "Explore the beauty of Lesotho.",
            selectedImage.source
        );

        var popup = document.getElementById(
            "explorePopup"
        );

        if (popup) {

            var box = popup.firstElementChild;

            var controls =
                document.createElement("div");

            controls.style.display = "flex";
            controls.style.justifyContent = "center";
            controls.style.gap = "10px";
            controls.style.marginTop = "15px";

            var previousButton =
                document.createElement("button");

            previousButton.textContent = "Previous";

            previousButton.className = "btn btn-dark";

            var nextButton =
                document.createElement("button");

            nextButton.textContent = "Next";

            nextButton.className = "btn btn-dark";

            var counter = document.createElement("span");

            counter.textContent =
                (currentGalleryIndex + 1) +
                " / " +
                galleryImages.length;

            counter.style.alignSelf = "center";

            previousButton.addEventListener(
                "click",
                function () {

                    openGalleryImage(
                        currentGalleryIndex - 1
                    );

                }
            );

            nextButton.addEventListener(
                "click",
                function () {

                    openGalleryImage(
                        currentGalleryIndex + 1
                    );

                }
            );

            controls.appendChild(previousButton);
            controls.appendChild(counter);
            controls.appendChild(nextButton);

            box.appendChild(controls);

        }

    }


    galleryTiles.forEach(function (tile, index) {

        tile.addEventListener("click", function () {

            openGalleryImage(index);

        });

    });


    var galleryPrevious =
        document.getElementById("galleryPrevious");

    var galleryNext =
        document.getElementById("galleryNext");

    var galleryCounter =
        document.getElementById("galleryCounter");


    function updateGalleryCounter() {

        if (galleryCounter) {

            galleryCounter.textContent =
                (currentGalleryIndex + 1) +
                " / " +
                galleryImages.length;

        }

    }


    if (galleryPrevious) {

        galleryPrevious.addEventListener(
            "click",
            function () {

                if (galleryImages.length === 0) {
                    return;
                }

                currentGalleryIndex--;

                if (currentGalleryIndex < 0) {

                    currentGalleryIndex =
                        galleryImages.length - 1;

                }

                updateGalleryCounter();

                openGalleryImage(currentGalleryIndex);

            }
        );

    }


    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            function () {

                if (galleryImages.length === 0) {
                    return;
                }

                currentGalleryIndex++;

                if (
                    currentGalleryIndex >=
                    galleryImages.length
                ) {

                    currentGalleryIndex = 0;

                }

                updateGalleryCounter();

                openGalleryImage(currentGalleryIndex);

            }
        );

    }


    var contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                var name =
                    document.getElementById("name");

                var email =
                    document.getElementById("email");

                var message =
                    document.getElementById("message");

                if (!contactForm.checkValidity()) {

                    event.preventDefault();

                    contactForm.reportValidity();

                    return;

                }

                if (
                    !name.value.trim() ||
                    !email.value.trim() ||
                    !message.value.trim()
                ) {

                    event.preventDefault();

                    alert(
                        "Please complete all fields before continuing."
                    );

                    return;

                }

                event.preventDefault();

                alert(
                    "Thank you, " +
                    name.value.trim() +
                    "! Your form is complete. " +
                    "However, this website does not yet have " +
                    "an email service connected, so your message " +
                    "has not been sent."
                );

            }
        );

    }

    var yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });

    var backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    console.log(
        "All available Explore Lesotho features are ready!"
    );

});