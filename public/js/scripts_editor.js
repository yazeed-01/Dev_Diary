function saveSize() {
    localStorage.setItem("editorWidth", codeEditor.offsetWidth);
    localStorage.setItem("editorHeight", codeEditor.offsetHeight);
}

// Function to load the saved textarea size when the page loads
function loadSize() {
    var savedWidth = localStorage.getItem("editorWidth");
    var savedHeight = localStorage.getItem("editorHeight");
    if (savedWidth && savedHeight) {
        codeEditor.style.width = savedWidth + "px";
        codeEditor.style.height = savedHeight + "px";
    }
}

// Get the textarea element
var codeEditor = document.getElementById("code-editor");

// Attach event listeners for resizing and loading size
codeEditor.addEventListener("mouseup", saveSize);
window.addEventListener("DOMContentLoaded", loadSize);
window.addEventListener("resize", loadSize);
