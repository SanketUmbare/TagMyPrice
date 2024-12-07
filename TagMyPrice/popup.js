document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const priceInput = document.getElementById('price-input');
    const saveBtn = document.getElementById('save-btn');
    const clearBtn = document.getElementById('clear-btn');
    const trackingUrl = document.getElementById('tracking-url');
    const targetPrice = document.getElementById('target-price');
    const statusMessage = document.getElementById('status-message');

    // Load saved URL and price
    chrome.storage.local.get(['url', 'targetPrice'], (data) => {
        trackingUrl.textContent = data.url || 'None';
        targetPrice.textContent = data.targetPrice ? `₹${data.targetPrice}` : 'Not Set';
    });

    // Save URL and target price
    saveBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        const price = parseFloat(priceInput.value);

        if (!url || isNaN(price)) {
            statusMessage.textContent = 'Please enter a valid URL and price.';
            return;
        }

        chrome.storage.local.set({ url, targetPrice: price }, () => {
            trackingUrl.textContent = url;
            targetPrice.textContent = `₹${price}`;
            statusMessage.textContent = 'Tracking details saved!';
        });
    });

    // Clear saved URL and price
    clearBtn.addEventListener('click', () => {
        chrome.storage.local.remove(['url', 'targetPrice'], () => {
            trackingUrl.textContent = 'None';
            targetPrice.textContent = 'Not Set';
            statusMessage.textContent = 'Tracking details cleared!';
        });
    });
});
