function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    
    // Update the theme icon
    const themeIcon = document.querySelector('.theme-toggle-icon');
    if (newTheme === 'light') {
        themeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(67, 71, 78)" viewBox="0 0 20 20" height="20" width="20">
                <g>
                    <path d="M10 2.857142857142857a0.7142857142857143 0.7142857142857143 0 0 0 0.7142857142857143 -0.7142857142857143V0.7142857142857143a0.7142857142857143 0.7142857142857143 0 0 0 -1.4285714285714286 0v1.4285714285714286A0.7142857142857143 0.7142857142857143 0 0 0 10 2.857142857142857zm5.714285714285714 2.4285714285714284a0.7142857142857143 0.7142857142857143 0 0 0 0.5028571428571429 -0.20714285714285716l1.0142857142857142 -1.0142857142857142a0.7142857142857143 0.7142857142857143 0 0 0 -1.0100000000000001 -1.0100000000000002l-1.0142857142857142 1.0142857142857142a0.7142857142857143 0.7142857142857143 0 0 0 0.5071428571428571 1.2214285714285715zM19.285714285714285 9.285714285714286h-1.4285714285714286a0.7142857142857143 0.7142857142857143 0 0 0 0 1.4285714285714286h1.4285714285714286a0.7142857142857143 0.7142857142857143 0 0 0 0 -1.4285714285714286zm-2.0571428571428574 5.491428571428571a0.7142857142857143 0.7142857142857143 0 0 0 -1.0100000000000002 1.0100000000000002l1.0142857142857142 1.0142857142857142a0.7142857142857143 0.7142857142857143 0 0 0 1.0100000000000002 -1.0100000000000002zM10 17.142857142857142a0.7142857142857143 0.7142857142857143 0 0 0 -0.7142857142857143 0.7142857142857143v1.4285714285714286a0.7142857142857143 0.7142857142857143 0 0 0 1.4285714285714286 0v-1.4285714285714286A0.7142857142857143 0.7142857142857143 0 0 0 10 17.142857142857142zm-5.714285714285714 -2.4285714285714284a0.7142857142857143 0.7142857142857143 0 0 0 -0.5028571428571429 0.20714285714285716l-1.0142857142857142 1.0142857142857142a0.7142857142857143 0.7142857142857143 0 0 0 1.0100000000000002 1.0100000000000002l1.0142857142857142 -1.0142857142857142a0.7142857142857143 0.7142857142857143 0 0 0 -0.5071428571428571 -1.2214285714285715zM2.142857142857143 9.285714285714286H0.7142857142857143a0.7142857142857143 0.7142857142857143 0 0 0 0 1.4285714285714286h1.4285714285714286a0.7142857142857143 0.7142857142857143 0 0 0 0 -1.4285714285714286zm2.0571428571428574 -5.491428571428571a0.7142857142857143 0.7142857142857143 0 0 0 1.0100000000000002 -1.0100000000000002L4.2 1.7700000000000014a0.7142857142857143 0.7142857142857143 0 0 0 -1.0100000000000002 1.0100000000000002zM10 5.714285714285714a4.285714285714286 4.285714285714286 0 1 0 4.285714285714286 4.285714285714286A4.285714285714286 4.285714285714286 0 0 0 10 5.714285714285714z"></path>
                </g>
            </svg>`;
    } else {
        themeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="var(--text-color)" viewBox="0 0 20 20" height="20" width="20">
                <g>
                    <path d="M12.857142857142858 0a10 10 0 0 0 0 20l0.005714285714285714 0a10.112857142857143 10.112857142857143 0 0 0 3.795714285714286 -0.7685714285714287 0.7142857142857143 0 0 0 0.08714285714285715 -1.2771428571428571A9.285714285714286 9.285714285714286 0 0 1 12.142857142857142 10a9.285714285714286 9.285714285714286 0 0 1 4.562857142857143 -7.954285714285714 0.7142857142857143 0 0 0 -0.09 -1.2757142857142858A10.114285714285714 10.114285714285714 0 0 0 12.865714285714287 0H12.857142857142858Z"></path>
                </g>
            </svg>`;
    }
}

// Chat functionality
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = message;
    
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.appendChild(messageDiv);
    
    // Scroll to the new message
    messageDiv.scrollIntoView({ behavior: 'smooth' });
}

// Add loading indicator to message
function addLoadingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = '<div class="loading">Thinking...</div>';
    
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.appendChild(messageDiv);
    messageDiv.scrollIntoView({ behavior: 'smooth' });
    return messageDiv;
}

async function handleSend() {
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const message = chatInput.value.trim();
    
    if (message) {
        // Disable send button while processing
        sendButton.disabled = true;
        
        try {
            // Add user message
            addMessage(message, true);
            chatInput.value = '';
            
            // Add loading message
            const loadingMessage = addLoadingMessage();
            
            // TODO: Add integration with Python backend here
            // For now, just remove the loading message after a short delay
            setTimeout(() => {
                loadingMessage.remove();
                addMessage("Backend integration pending. Your message was: " + message);
            }, 500);
            
        } catch (error) {
            console.error('Error:', error);
            addMessage("Sorry, I encountered an error. Please try again.");
        } finally {
            // Re-enable send button
            sendButton.disabled = false;
        }
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.send-button');
    const chatInput = document.querySelector('.chat-input');

    sendButton.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new line on Enter without Shift
            handleSend();
        }
    });

    // Header blur effect on scroll
    function handleHeaderBlur() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 0) {
                    header.classList.add('scrolled');
                } else if (scrollTop === 0) {
                    header.classList.remove('scrolled');
                }
                
                lastScrollTop = scrollTop;
            }
        });
    }

    // Initialize header blur effect
    handleHeaderBlur();

    // Update the JavaScript auto-resize functionality
    function handleInputResize() {
        // Reset height to auto to get the correct scrollHeight
        this.style.height = 'auto';
        
        // Calculate new height
        const newHeight = Math.min(this.scrollHeight, parseInt(getComputedStyle(this).maxHeight));
        this.style.height = newHeight + 'px';
        
        // Add or remove scrollable class based on content height
        if (this.scrollHeight > newHeight) {
            this.classList.add('scrollable');
        } else {
            this.classList.remove('scrollable');
        }
    }

    chatInput.addEventListener('input', handleInputResize);

    // Initialize height on page load
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, parseInt(getComputedStyle(chatInput).maxHeight)) + 'px';

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });

        // Close sidebar when window is resized to desktop view
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1025) {
                sidebar.classList.remove('active');
            }
        });
    }
}); 
