document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to the explore button
    const exploreBtn = document.querySelector('.btn-explore');
    if(exploreBtn) {
        exploreBtn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        exploreBtn.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if(searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const noteCards = document.querySelectorAll('.note-card');
            
            noteCards.forEach(card => {
                const title = card.querySelector('.note-title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.note-description')?.textContent.toLowerCase() || '';
                const subject = card.querySelector('.subject')?.textContent.toLowerCase() || '';
                
                if(title.includes(searchTerm) || 
                   description.includes(searchTerm) || 
                   subject.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Add search suggestions
        const suggestions = [
            'Marketing Notes',
            'Finance Notes',
            'Economics Notes',
            'Design Thinking Notes',
            'Prof A N Singh',
            'Prof V.S GajaVelli',
            'Prof Venna',
            'IMT G',
            'IMT H',
            'IMT N'
        ];

        const suggestionBox = document.createElement('div');
        suggestionBox.className = 'search-suggestions';
        searchInput.parentElement.appendChild(suggestionBox);

        searchInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            if(value.length > 0) {
                const matchedSuggestions = suggestions.filter(s => 
                    s.toLowerCase().includes(value)
                );
                
                suggestionBox.innerHTML = matchedSuggestions
                    .map(s => `<div class="suggestion-item">${s}</div>`)
                    .join('');
                    
                suggestionBox.style.display = 'block';
            } else {
                suggestionBox.style.display = 'none';
            }
        });

        // Handle suggestion clicks
        suggestionBox.addEventListener('click', function(e) {
            if(e.target.classList.contains('suggestion-item')) {
                searchInput.value = e.target.textContent;
                suggestionBox.style.display = 'none';
                // Trigger search
                searchInput.dispatchEvent(new Event('keyup'));
            }
        });
    }

    // Initialize the carousel with options
    const mainSlider = new bootstrap.Carousel(document.getElementById('mainSlider'), {
        interval: 2000, // Time between slides in milliseconds (2 seconds)
        wrap: true,     // Continuous loop
        keyboard: true  // Keyboard controls
    });
}); 

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    showSuccessMessage('Form submitted successfully!');
    setTimeout(() => {
        window.location.href = 'submission-success.html';
    }, 2000);
}

// Handle add to cart
function addToCart() {
    const bagCount = document.querySelector('.bag-count');
    if(bagCount) {
        bagCount.textContent = parseInt(bagCount.textContent) + 1;
    }
    showSuccessMessage('Added to cart successfully!');
}

// Show success message
function showSuccessMessage(message) {
    // Create and show message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Remove after 2 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
} 