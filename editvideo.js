// details.js

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const option = urlParams.get('option');
    document.getElementById('optionText').innerText = `Option: ${option}`;
  });
  