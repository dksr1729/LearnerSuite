// details.js

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const option = urlParams.get('option');
    document.getElementById('optionText').innerText = `Option: ${option}`;

    const imageInput = document.getElementById('imageInput');
    const submitBtn = document.getElementById('submitBtn');
    const canvas = document.getElementById('imageCanvas');
    const context = canvas.getContext('2d');

    submitBtn.addEventListener('click', function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});