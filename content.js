// This script will be injected into every webpage

// Create a new button element
var button = document.createElement("button");
button.innerHTML = "打开浮窗";

// Style the button
button.style.position = "fixed";
button.style.top = "20px";
button.style.right = "20px";
button.style.backgroundColor = "lightblue"; // 背景颜色
button.style.border = "1px solid black"; // 边框
button.style.zIndex = "1000";

// Append the button to the body of the webpage
document.body.appendChild(button);

var popup;
var domainMessages = []; // 用于存储接收到的域名
var isPopupOpen = false;

function updatePopupContent() {
    popup.innerHTML = domainMessages.map(domain => `<p>${domain}</p>`).join('');
}

function togglePopup() {
    if (!isPopupOpen) {
        if (!popup) {
            popup = document.createElement("div");
            popup.style.position = "fixed";
            popup.style.top = "60px";
            popup.style.right = "20px";
            popup.style.backgroundColor = "white";
            popup.style.border = "1px solid black";
            popup.style.width = "300px";
            popup.style.height = "auto";
            popup.style.padding = "10px";
            popup.style.zIndex = "1001";
            popup.style.overflowY = "auto";
            popup.style.maxHeight = "200px"; // Adjust the height as needed
            document.body.appendChild(popup);
        }
        updatePopupContent();
        popup.style.display = "block";
        button.innerHTML = "关闭浮窗";
        isPopupOpen = true;
    } else {
        popup.style.display = "none";
        button.innerHTML = "打开浮窗";
        isPopupOpen = false;
    }
}

// 为按钮添加点击事件监听器
button.addEventListener("click", togglePopup);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    domainMessages.push(request.domain);
    if (isPopupOpen) {
        updatePopupContent();
    }
});
