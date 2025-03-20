

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // Handle the back-to-top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.onscroll = function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.classList.add('fade-in');
            backToTopBtn.classList.remove('fade-out');
        } else {
            backToTopBtn.classList.add('fade-out');
            backToTopBtn.classList.remove('fade-in');
        }
    };

    // Smooth scroll to top when the button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add other functionality here (e.g., navigation, dropdowns, etc.)

});


// Highlight the active navigation link
const currentPage = window.location.pathname.split('/').pop();
const navigationLinks = document.querySelectorAll('.navigation-links a, .right-side-element a');

navigationLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Smooth scroll for anchor links inside the dropdown that start with a hash (#)
document.querySelectorAll('.dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Check if the href starts with "#" (for hash links)
        if (href.startsWith('#')) {
            e.preventDefault(); // Prevent the default action

            const targetId = href.substring(1); // Get the target id (remove the "#")
            const targetElement = document.getElementById(targetId); // Find the element with this id

            // Check if the target element exists before scrolling
            if (targetElement) {
                const headerOffset = document.querySelector('.fixed-header').offsetHeight; // Get the header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY; // Get the target position
                const offsetPosition = elementPosition - headerOffset; // Adjust scroll position to account for header

                // Smooth scroll to the adjusted position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Hide the dropdown menu after click
                const dropdownMenu = this.closest('.dropdown-content');
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'none'; // Hide the dropdown after click
                }
            } else {
                console.warn(`Element with id ${targetId} not found.`);
            }
        }
    });
});

// Search functionality for Quarter 1-4
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

if (searchButton) {
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        const validQuarters = ['quarter 1', 'quarter 2', 'quarter 3', 'quarter 4'];

        if (validQuarters.includes(query)) {
            // Redirect to a search results page with the query as a URL parameter
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
        } else {
            alert('Please search for Quarter 1, Quarter 2, Quarter 3, or Quarter 4.');
        }
    });
}

// Add fade-out class before navigating
function fadeOutAndNavigate(url) {
    body.classList.add('fade-out');

    // Wait for the transition to finish before navigating
    setTimeout(() => {
        window.location.href = url;
    }, 500); // Match the timeout to your CSS transition duration
}

// Attach fade-out to links with the class "page-link"
const pageLinks = document.querySelectorAll('a.page-link');

pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default navigation
        const url = link.getAttribute('href'); // Get the URL to navigate to
        fadeOutAndNavigate(url);
    });
});

// Dropdown menu hover functionality
const dropdownItems = document.querySelectorAll('.dropdown-content li');
dropdownItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        const childDropdown = this.querySelector('.child-dropdown');
        if (childDropdown) {
            childDropdown.style.display = 'block'; // Show it
            setTimeout(() => {
                childDropdown.style.opacity = '1'; // Fade in
                childDropdown.style.visibility = 'visible'; // Ensure it’s visible
            }, 0); // Make sure display is set before fading in
        }
    });

    item.addEventListener('mouseleave', function () {
        const childDropdown = this.querySelector('.child-dropdown');
        if (childDropdown) {
            childDropdown.style.opacity = '0'; // Fade out
            setTimeout(() => {
                childDropdown.style.display = 'none'; // Hide it after fade
                childDropdown.style.visibility = 'hidden'; // Hide immediately after fade
            }, 300); // Match the transition duration
        }
    });
});

// Set child dropdown positions based on index
document.querySelectorAll('.parent-item').forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        const childDropdown = item.querySelector('.child-dropdown');
        if (childDropdown) {
            const offset = 10; // 10 pixels for each child dropdown
            childDropdown.style.top = `${10 + index * offset}px`; // Adjust top position based on index
            childDropdown.style.display = 'block'; // Show it
            setTimeout(() => {
                childDropdown.style.opacity = '1'; // Fade in
                childDropdown.style.visibility = 'visible'; // Ensure it’s visible
            }, 0); // Make sure display is set before fading in
        }
    });

    item.addEventListener('mouseleave', () => {
        const childDropdown = item.querySelector('.child-dropdown');
        if (childDropdown) {
            childDropdown.style.opacity = '0'; // Fade out
            setTimeout(() => {
                childDropdown.style.display = 'none'; // Hide it after fade
                childDropdown.style.visibility = 'hidden'; // Hide immediately after fade
            }, 300); // Match the transition duration
        }
    });
});




// Function to handle dropdown hover behavior with a delay
function triggerDropdowns() {
const dropdowns = document.querySelectorAll(".dropdown"); // Select all parent dropdowns

dropdowns.forEach(dropdown => {
    dropdown.addEventListener("mouseenter", function () {
        const dropdownContent = this.querySelector(".dropdown-content");
        // Trigger the dropdown with a 2-second delay
        setTimeout(() => {
            dropdownContent.style.display = "block"; // Show the dropdown after 2 seconds
            dropdownContent.classList.add("show"); // Add class for animation (CSS)
        }, 0); // 2-second delay
    });

    dropdown.addEventListener("mouseleave", function () {
        const dropdownContent = this.querySelector(".dropdown-content");
        if (dropdownContent) {
            dropdownContent.classList.remove("show"); // Remove class for animation
            setTimeout(() => {
                dropdownContent.style.display = "none"; // Hide the dropdown after animation
            }, 500); // Wait for the animation to finish
        }
    });

    // Handle child dropdowns
    const childDropdowns = dropdown.querySelectorAll(".child-dropdown");
    childDropdowns.forEach(childDropdown => {
        childDropdown.addEventListener("mouseenter", function () {
            const childDropdownContent = this.querySelector(".child-dropdown-content");
            // Trigger the child dropdown with a 2-second delay
            setTimeout(() => {
                childDropdownContent.style.display = "block"; // Show the child dropdown after 2 seconds
                childDropdownContent.classList.add("show"); // Add class for animation
            }, 2000); // 2-second delay
        });

        childDropdown.addEventListener("mouseleave", function () {
            const childDropdownContent = this.querySelector(".child-dropdown-content");
            if (childDropdownContent) {
                childDropdownContent.classList.remove("show"); // Remove class for animation
                setTimeout(() => {
                    childDropdownContent.style.display = "none"; // Hide the child dropdown
                }, 500); // Wait for the animation to finish
            }
        });
    });
});
}



// Call the function to apply dropdown triggers
triggerDropdowns();

(function () {
"use strict";

// define variables
var items = document.querySelectorAll(".timeline li");

// check if an element is in viewport
// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      items[i].classList.add("in-view");
    }
  }
}

// listen for events
window.addEventListener("load", callbackFunc);
window.addEventListener("resize", callbackFunc);
window.addEventListener("scroll", callbackFunc);
})();

window.addEventListener("scroll", function() {
const header = document.querySelector(".fixed-header");
if (window.scrollY > 200) { // Adjust scroll threshold as needed
  header.classList.add("show");
} else {
  header.classList.remove("show");
}
});
    

