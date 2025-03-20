

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
  
  let lastScrollTop = 0; // Store the last scroll position
let currentTransformY = 0; // Track the current translation value

window.addEventListener('scroll', function() {
  const image = document.querySelector('.carousel img');
  const imagePosition = image.getBoundingClientRect();
  const scrollTop = window.scrollY; // Get the current scroll position

  // Calculate the scroll delta (how much the user has scrolled)
  const scrollDelta = scrollTop - lastScrollTop;
  lastScrollTop = scrollTop; // Update the last scroll position

  // Smoothly update the image's position
  currentTransformY += scrollDelta * 0.2; // Adjust the multiplier to control speed
  currentTransformY = Math.max(0, currentTransformY); // Prevent the image from scrolling too far upwards

  // Apply the transformation based on the calculated speed
  image.style.transform = `translateY(${currentTransformY}px)`;

  // Stop the image when it's out of view
  if (imagePosition.top >= window.innerHeight || imagePosition.bottom <= 0) {
    currentTransformY = 0;  // Reset the image position when it's no longer visible
  }
});


// Detect when the user scrolls
window.addEventListener('scroll', function() {
    let box = document.querySelector('.expect-box');
    let rect = box.getBoundingClientRect();
  
    // Add 'in-view' class when the element comes into view
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      box.classList.add('in-view');
    }
  });
  
  const expandedCard = document.getElementById('expandedCard');
const expandedContent = document.getElementById('expandedContent');
const backButton = document.getElementById('backButton');

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        expandedContent.innerHTML = `<h2>${card.querySelector('h2').innerText}</h2>`;
        expandedCard.classList.add('active');
    });
});

backButton.addEventListener('click', () => {
    expandedCard.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const expandedCard = document.getElementById('expandedCard');
    const expandedContent = document.getElementById('expandedContent');
    const backButton = document.getElementById('backButton');

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.getAttribute('id');
            let contentHtml = '';
            

            if (cardId === 'card1') {
                contentHtml = `
           <h1><strong>Quarter 1 Lifelabs IPBA</strong></h1>
<br>
<br>
<h3><strong>Instructions:</strong></h3>

<p>

<br>
For this IPBA, you are tasked to produce streaming content. Research the topic you would like to talk about as your subject and identify what type of streaming content is best to use for your topic by doing the steps in the next table below.
<br>
<img src="Screenshot 2025-01-09 130144.png">
<br>
<br>
As you can see in this table, The Lifelabs Quarter 1 IPBA takes part at the 4th and 5th part which we will emphasize on. 
<br>
<br>
- Part 4:
Identify the final streaming content category/type that is appropriate to the topic. Determine the demographics of content viewers.
<br>- Part 5:
Define the need for a streaming category.
Identify the streaming platform to be used.

<br> 
<br>
<section>
  <h3 style="color:#F9D94A"><strong>3 Content Types</strong></h3>
  <p>Using Basic Research, we determined three content types that are appropriate for our topic.</p>
  <img src="image (8).png" alt="Content Image">
</section>



<section>
 <h3 style="color:#F9D94A"><strong>Demographic Information</strong></h3>
 <p>Using google forms, we gained the demographic information of our target audience (Gender, Age, Marital status, nationality, education, employment, household income). Using this information, we were able to determine which students in APEC Marikina commute using Public Transportation.</p>
  <img src="unnamed.png" alt="Unnamed Image">
</section>

<section>
<p></p>
 <h3 style="color:#F9D94A"><strong>Beliefs and Opinions on the Topic</strong></h3>
 <p>Based on the results from our survey, APEC Marikina students find the following qualities make a commute ideal: Affordable Prices, Reliability / Accessibility, Efficiency / Travel time, and Comfortability. Based on the opinion of APEC Marikina students, they are often subjected into uncomfortable, stressful commute that causes fatigue and fear. </p>
  <img src="bo topic.png" alt="BO Topic Image">
</section>

<section>

 <h3 style="color:#F9D94A"><strong>Attitudes on the topic</strong></h3>
<p></p>
 
   <br>
   <img src="aot3 topic.png">
  <img src="aot topic.png" alt="AOT Topic Image">
  



</section>
<section>
 <h3 style="color:#F9D94A"><strong>Audience Analysis</strong></h3>
 <p></p>
 <img src="aot 2 topic.png">
</section>

<section>
 <h3 style="color:#F9D94A"><strong>Chosen Streaming Platform</strong></h3>
 <p>The streaming platform that we selected is Facebook due to its particular advantages, this includes greater engagement because of its popularity, majority of the businesses are active on this platform, and the opportunity to reach large audience especially most of teenagers are using this platforms which fits to our audience target.</p>
  <img src="csp topic.png" alt="CSP Topic Image">
</section>



                    
                `;
               
            }
            

            
            else if (cardId === 'card2') {
                contentHtml = `
                <h1><strong>Quarter 2 Lifelabs IPBA</strong></h1>
                    <br>
                    <br>

                <h3><strong>Instructions:</strong></h3>
               
               
                <p>Your group is assigned to create a website containing the outline of your stream and promotional plan.<br>
Step 1: Refer to the Web Design you created.<br>
Step 2: Create a website to encode your outline and promotional plan.<br>
Step 3: Upload your webpage on a hosting site. Refer to this How- To:<a href="https://docs.google.com/document/d/1Rx6Ue_ReS3zDV6NcwJcQpvfOztSvpZA4_NNzWC8wC9U/edit?tab=t.0"> Uploading a Website for instructions</a>
Please note: You can also use other web hosting sites to upload your website.<br>
For learners attending face-to-face classes: You can present and share your created website directly using your devices. There is no need to use web hosting, as your LF can directly check your work.
<br>
For online learners: If the suggested link in the How To does not work, you can also upload your website using other web hosting sites. <br>

Step 4: Provide the link to the website in the GCR. <br>
Product: Functional website containing the outline and promotional plan.<br>

</p>

<br>
                    <section>
                    <h3 class="limp3" style="color:#F9D94A"><strong>Stream outline</strong></h3>
                    <p class="all2">Our stream outline shows the time and the allotment inside that time period, the topic, the activities, what's show inside the stream, and the audio. It is basically our plan for the actual stream and how we will execute it.</p><br>
         <!-- Applying inline style directly to image -->
    
 <img src="462562039_929182235425930_4181727609303494833_n.png">
      <br>
<br>
</section>
<br>
<br>
<section>
                    <h3 class="limp" style="color:#F9D94A"><strong>Promotion Plan</strong></h3>
                    <p class="all">Our chosen way of promoting our stream is by making a poster and promoting it via our Facebook page online, and by sharing it with our friends and families. The poster consists of Jeeps and Taxis since our stream is about transportation.</p>
                    
                      <img src="Screenshot 2024-12-09 133826.png">
                      <br>
                      </section>
                      <br>
                      <br>
                         
                    
                      <section> 
                      <h3 style="color:#F9D94A"><strong>Stream Design</strong></h3>
                      <p> Our stream outline consists of our main colors such as, yellow,black, gray, and white. we added orange as contrast as a symbol also for safety and to make our designs pop. and it also consists of modes of transportation such as the jeepney
    </p><br>
                      <img src="Untitled design.png">
                      </section>
                      <br>
                      <br>
                      <section> 
                      <h3 style="color:#F9D94A"><strong>Website:</strong></h3>
                       
    <p>This Website is made in order to compile everything related in lifelabs
    
    for Group 1 (Formerly group 2), and as a 2nd quarter IPBA for lifelabs. 
    this website contains everything from the lifelabs subject that is by 10-1 Passion's group 1 from Quarter 1 - Quarter 4 in APEC Schools Marikina Heights sy. 2024-2025. 
    </p>
                      <p>This is the link to our <a href=>website</a></p>
                      </section>

                   
                `;
                
            }

            expandedContent.innerHTML = contentHtml;
            expandedCard.classList.add('active');
        });
    });

    backButton.addEventListener('click', () => {
        expandedCard.classList.remove('active');
        expandedContent.innerHTML = ''; // Clear expanded content
    });
});

 // Back button functionality
 backButton.addEventListener('click', () => {
    // Remove the active class to trigger the closing animation
    expandedCard.classList.remove('active');
    setTimeout(() => {
        expandedContent.innerHTML = ''; // Clear content after animation
    }, 500); // Match this timeout to the CSS transition duration
});


