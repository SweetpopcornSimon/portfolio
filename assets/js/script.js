
function scrollToElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(`Element with ID "${id}" not found.`);
  }
}

/**
 * Add eventListener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * MOBILE NAV TOGGLE
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () { navbar.classList.toggle("active"); }

navToggler.addEventListener("click", toggleNavbar);



/**
 * HEADER
 * 
 * active header when window scrolled to 50px
 */

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  window.scrollY > 50 ? header.classList.add("active")
    : header.classList.remove("active");
}

window.addEventListener("scroll", activeHeader);


const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
  e.preventDefault()
  preloader.classList.remove("loaded");
  grecaptcha.ready(function() {
    grecaptcha.execute('6LcBBx4qAAAAAPVlCyLq2J9SJWi4GLzoiOgRbQvS', {action: 'submit'}).then(function(token) {
      emailjs.sendForm('service_n4rettp','template_y1l1p3m','#contact-form','TwGb14PNZjf9DqVpC')
          .then(() =>{
            preloader.classList.add("loaded");
            // Show sent message
            contactMessage.textContent = 'Message sent successfully ✅'

            // Remove message after five seconds
            setTimeout(() =>{
              contactMessage.textContent = ''
            }, 5000)

            // Clear input fields
            contactForm.reset()

          }, () =>{
            preloader.classList.add("loaded");
            // Show error message
            contactMessage.textContent = 'Message not sent (service error) ❌'
          })
    });
  });
}

contactForm.addEventListener('submit', sendEmail)
