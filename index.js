// Simple function to handle section switching (SPA feel)
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.remove('active');
    });
    // Remove active class from nav links
    document.querySelectorAll('.nav-link').forEach(nav => {
        nav.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    // Highlight nav link
    document.getElementById('nav-' + sectionId).classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}
