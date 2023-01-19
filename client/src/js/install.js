const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Primes the prompt to display an install confirmation. Also unhides the install button.
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Triggers the prompt when the button is clicked. 
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// If the app's already installed, clear the prompt.
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
