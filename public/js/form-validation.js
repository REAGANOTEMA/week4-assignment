// Author: Reagan Otema
document.addEventListener('DOMContentLoaded', () => {
    const addClassificationForm = document.getElementById('addClassificationForm');
    if (addClassificationForm) {
        addClassificationForm.addEventListener('submit', (e) => {
            const name = document.getElementById('classificationName').value;
            if (!/^[A-Za-z0-9]+$/.test(name)) {
                alert('Classification name must not contain spaces or special characters.');
                e.preventDefault();
            }
        });
    }

    const addVehicleForm = document.getElementById('addVehicleForm');
    if (addVehicleForm) {
        addVehicleForm.addEventListener('submit', (e) => {
            const requiredFields = ['invMake','invModel','invDescription','invPrice','invStock','invColor'];
            for (let field of requiredFields) {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    alert(`${field.replace('inv','')} is required`);
                    e.preventDefault();
                    return;
                }
            }
        });
    }
});
