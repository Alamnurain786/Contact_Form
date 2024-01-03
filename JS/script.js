// Listen for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Convert form data to JSON
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    const formJson = JSON.stringify(formObject);


    // Display loading message
    result.classList.add('waiting');
    result.innerHTML = "Please wait...";

    // Send POST request
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: formJson
    })
        .then(async (response) => {
            const { status, message } = await response.json();

            // Remove the waiting class
            result.classList.remove('waiting');

            // Add CSS for the message
            result.style.padding = "10px";
            result.style.marginTop = "10px";
            result.style.borderRadius = "5px";

            // Check response status and display message
            if (status === 200) {
                result.classList.add('success');
                result.innerHTML = message;
            } else {
                console.error(response);
                result.classList.add('error');
                result.innerHTML = message;
            }
        })
        .catch((error) => {
            // Log and display error message
            console.error(error);
            result.classList.add('error');
            result.innerHTML = "Something went wrong!";
        })
        .finally(() => {
            // Reset form and hide result after 3 seconds
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
                result.classList.remove('success', 'error');
            }, 3000);
        });
});