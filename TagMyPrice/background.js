chrome.alarms.create("checkPrices", { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkPrices") {
    checkPrices();
  }
});

function checkPrices() {
  chrome.storage.local.get({ items: [] }, (data) => {
    data.items.forEach((item) => {
      // Open a new tab for the URL of the tracked item
      chrome.tabs.create({ url: item.url, active: false }, (tab) => {
        // Once the tab is loaded, ask the content script to get the price
        chrome.tabs.executeScript(tab.id, { file: "content.js" }, () => {
          chrome.tabs.sendMessage(tab.id, { action: "getPrice" }, (response) => {
            if (response && response.price) {
              const currentPrice = response.price;
              if (currentPrice <= item.targetPrice) {
                chrome.notifications.create({
                  type: "basic",
                  iconUrl: "icon.png",
                  title: "Price Drop Alert",
                  message: `The price for ${item.url} is now $${currentPrice.toFixed(2)}!`
                });
              }
            }
            chrome.tabs.remove(tab.id); // Close the tab after checking
          });
        });
      });
    });
  });
}
