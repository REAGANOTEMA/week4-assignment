// Example: Highlight vehicle info on click
console.log("Vehicle Detail Page JS loaded");

document.addEventListener('DOMContentLoaded', () => {
    // Use the correct class from vehicleDetail.ejs
    const vehicleContainer = document.querySelector('.vehicle-detail-container');

    if (vehicleContainer) {
        vehicleContainer.addEventListener('click', () => {
            // Add a highlight effect
            vehicleContainer.style.backgroundColor = '#f9f9f9';
            vehicleContainer.style.transition = 'background-color 0.3s';

            // Optional: remove highlight after 0.5 seconds
            setTimeout(() => {
                vehicleContainer.style.backgroundColor = '';
            }, 500);
        });
    }
});
