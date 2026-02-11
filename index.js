
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Render
    showSection('home');
    
    // Load Examples
    loadExamples();
    
    // Load Prompts
    loadPrompts();

    // Load BNF
    const bnfDisplay = document.getElementById('bnf-display');
    if (bnfDisplay && typeof SENTENCES !== 'undefined' && SENTENCES.BNF_source) {
        bnfDisplay.textContent = SENTENCES.BNF_source;
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([bnfDisplay]).catch((err) => console.log('MathJax error:', err));
        }
    }
});

// Function to handle tab switching
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Update navbar active state
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.getElementById('nav-' + sectionId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function loadExamples() {
    // Check if CODES is defined
    if (typeof CODES === 'undefined') {
        console.error('Examples data not found!');
        document.querySelectorAll('[data-example-key]').forEach(el => {
            el.textContent = 'Error: Examples data could not be loaded.';
        });
        return;
    }

    // Populate elements with data-example-key
    document.querySelectorAll('[data-example-key]').forEach(el => {
        const key = el.getAttribute('data-example-key');
        if (CODES[key]) {
            el.innerHTML = CODES[key];
            // If it's a prompt box or pre, ensure formatting
            if (el.classList.contains('prompt-box')) {
                // Remove pre-wrap if we are using Prism inside, or keep it if it's text.
                // But for mixed content, let's keep it but rely on innerHTML.
                // If content is wrapped in <pre>, the prompt-box styles might conflict.
                // However, our prompt-box has `white-space: pre-wrap` which is good for text,
                // but Prism <pre> usually needs `pre`.
                // Let's reset whiteSpace if it contains <pre> tag.
                if (CODES[key].includes('<pre')) {
                    el.style.whiteSpace = 'normal';
                    el.style.padding = '0'; // Let Prism handle padding
                    el.style.backgroundColor = 'transparent'; // Let Prism handle bg
                    el.style.border = 'none';
                } else {
                    el.style.whiteSpace = 'pre-wrap';
                    el.style.fontFamily = 'monospace';
                }
            }
        } else {
            el.textContent = 'Example content not available.';
        }
    });

    // Trigger Prism highlight
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

function loadPrompts() {
    if (typeof ARC_PROMPTS === 'undefined') {
        console.error('Prompts data not found!');
        return;
    }

    document.querySelectorAll('.prompt-box').forEach(box => {
        // Skip if it is an example box (handled by loadExamples)
        if (box.hasAttribute('data-example-key')) return;

        const key = box.getAttribute('data-key');
        // If no data-key, skip
        if (!key) return;

        if (ARC_PROMPTS[key]) {
            box.textContent = ARC_PROMPTS[key];
            // Simple formatting: preserve whitespace
            box.style.whiteSpace = 'pre-wrap';
            box.style.fontFamily = 'monospace';
        } else {
            box.textContent = 'Prompt content not available.';
        }
    });
}

/**
 * Jump to a specific section, element, and optionally open a tab.
 * @param {string} sectionId - The ID of the page section (e.g., 'home', 'benchmark')
 * @param {string|null} elementId - The ID of the element to scroll to (optional)
 * @param {string|null} tabId - The ID of the tab to activate (optional)
 */
function jumpTo(sectionId, elementId, tabId) {
    // 1. Show the section
    showSection(sectionId);

    // 2. Activate tab if needed
    if (tabId) {
        // Find the tab button
        const tabButton = document.querySelector(`button[data-bs-target="#${tabId}"]`);
        if (tabButton) {
            // Use Bootstrap API to switch tab
            const tab = bootstrap.Tab.getOrCreateInstance(tabButton);
            tab.show();
        }
    }

    // 3. Scroll to element
    if (elementId) {
        // Small delay to allow section/tab transition/rendering
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                // Calculate position with offset for fixed header
                const headerOffset = 80; 
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 150); 
    } else if (tabId) {
        // If jumping to a tab but no specific element, scroll to the tabs container
        setTimeout(() => {
            const tabContainer = document.getElementById('pills-tab');
            if (tabContainer) {
                 // Calculate position with offset for fixed header
                 const headerOffset = 80; 
                 const elementPosition = tabContainer.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
 
                 window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                 });
            }
        }, 150);
    } else {
         // If no specific element, scroll to top of section
         window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
