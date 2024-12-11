document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the loader and response message elements
    const loader = document.getElementById('loader');
    const responseMessage = document.getElementById('responseMessage');

    // Show the loader and hide any previous response message
    loader.style.display = "block";
    responseMessage.textContent = ""; // Clear any previous message

    // Get form data
    let formData = new FormData(this);

    // Send the form data via AJAX
    fetch('https://script.google.com/macros/s/AKfycbzljz867-rzL3cfubIb9zwiELXBL1zyj5U6t2aDQ-ZjfSuV9OHuU1Mi48sDuGSuv7Ui/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Hide the loader
        loader.style.display = "none";

        // Display success message in the form itself
        responseMessage.textContent = "Thank you for your message!";
        responseMessage.style.color = "green";

        // Clear the form fields after successful submission
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        // Hide the loader
        loader.style.display = "none";

        // Display error message in case of failure
        responseMessage.textContent = "There was an error, please try again.";
        responseMessage.style.color = "red";
    });
});
