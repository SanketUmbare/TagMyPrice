// Find the price on the page based on class name or other selectors
const priceElement = document.querySelector('.price, .priceblock, .a-price, a-price .a-offscreen, .x-price-approx__price, .price .visuallyhidden');

let currentPrice = null;

if (priceElement) {
  // Extract the price from the page (this could vary by site)
  currentPrice = parseFloat(priceElement.textContent.replace(/[^\d.]/g, ''));
}

// Send the price back to the background script for processing
if (currentPrice !== null) {
  chrome.storage.local.get('url', (data) => {
    const productUrl = data.url;
    if (productUrl) {
        // Logic to scrape and track the product price for the given URL
        console.log(`Tracking price for: ${productUrl}`);
    }
  });
}
 
