document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('conferenceForm');
    const requiredFields = form.querySelectorAll('[required]');
    
    // Real-time validation for required fields
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', validateField);
    });
    
    // Checkbox group validation (at least one checked)
    const conferenceDays = form.querySelectorAll('input[name="conferenceDays"]');
    const daysError = document.getElementById('daysError');
    
    conferenceDays.forEach(checkbox => {
        checkbox.addEventListener('change', validateCheckboxGroup);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all required fields
        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        // Validate checkbox group
        if (!validateCheckboxGroup()) {
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would submit the form data here
            alert('Registration successful! Thank you for signing up for TechForward 2023.');
            form.reset();
            // Reset validation states
            requiredFields.forEach(field => {
                field.classList.remove('valid', 'invalid');
                const errorElement = document.getElementById(field.id + 'Error');
                if (errorElement) errorElement.style.display = 'none';
            });
        } else {
            alert('Please complete all required fields correctly before submitting.');
        }
    });
    
    // Reset form button
    form.querySelector('button[type="reset"]').addEventListener('click', function() {
        // Clear validation states
        requiredFields.forEach(field => {
            field.classList.remove('valid', 'invalid');
            const errorElement = document.getElementById(field.id + 'Error');
            if (errorElement) errorElement.style.display = 'none';
        });
        
        // Clear checkbox group error
        daysError.style.display = 'none';
        
        // Reset checkbox group styling
        conferenceDays.forEach(checkbox => {
            const parentDiv = checkbox.closest('.checkbox-option');
            if (parentDiv) {
                parentDiv.style.color = '';
            }
        });
    });
    
    // Field validation function
    function validateField(e) {
        const field = e.target;
        const errorElement = document.getElementById(field.id + 'Error');
        let isValid = true;
        
        // Reset field styling
        field.classList.remove('valid', 'invalid');
        if (errorElement) errorElement.style.display = 'none';
        
        // Check if field is empty
        if (field.value.trim() === '') {
            isValid = false;
        } 
        // Check pattern validation if applicable
        else if (field.pattern && !new RegExp(field.pattern).test(field.value)) {
            isValid = false;
        }
        // Special validation for email
        else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
            }
        }
        // Special validation for expiry date (month input)
        else if (field.type === 'month') {
            const selectedDate = new Date(field.value + '-01');
            const currentDate = new Date();
            if (selectedDate < currentDate) {
                isValid = false;
            }
        }
        
        // Apply styling and show error if invalid
        if (!isValid && field.hasAttribute('required')) {
            field.classList.add('invalid');
            if (errorElement) errorElement.style.display = 'block';
        } else if (isValid && field.hasAttribute('required')) {
            field.classList.add('valid');
        }
        
        return isValid;
    }
    
    // Checkbox group validation function
    function validateCheckboxGroup() {
        let atLeastOneChecked = false;
        
        conferenceDays.forEach(checkbox => {
            if (checkbox.checked) {
                atLeastOneChecked = true;
            }
        });
        
        // Apply styling to all checkboxes in the group
        conferenceDays.forEach(checkbox => {
            const parentDiv = checkbox.closest('.checkbox-option');
            if (parentDiv) {
                if (!atLeastOneChecked) {
                    parentDiv.style.color = '#e74c3c';
                } else {
                    parentDiv.style.color = '';
                }
            }
        });
        
        // Show/hide error message
        if (!atLeastOneChecked) {
            daysError.style.display = 'block';
            return false;
        } else {
            daysError.style.display = 'none';
            return true;
        }
    }
});