// popup.js

document.getElementById('pdfToWord').addEventListener('click', function () {
  openDetailsPage1('pdfToWord');
});

document.getElementById('wordToPdf').addEventListener('click', function () {
  openDetailsPage2('wordToPdf');
});

document.getElementById('editPdf').addEventListener('click', function () {
  openDetailsPage3('editPdf');
});

document.getElementById('editImage').addEventListener('click', function () {
  openDetailsPage4('editImage');
});

document.getElementById('editVideo').addEventListener('click', function () {
  openDetailsPage5('editVideo');
});

function openDetailsPage1(option) {
  const url = chrome.extension.getURL('pdftoword.html');
  chrome.tabs.create({ url: `${url}?option=${option}` });
}

function openDetailsPage2(option) {
  const url = chrome.extension.getURL('wordtopdf.html');
  chrome.tabs.create({ url: `${url}?option=${option}` });
}

function openDetailsPage3(option) {
  const url = chrome.extension.getURL('editpdf.html');
  chrome.tabs.create({ url: `${url}?option=${option}` });
}

function openDetailsPage4(option) {
  const url = chrome.extension.getURL('editimage.html');
  chrome.tabs.create({ url: `${url}?option=${option}` });
}

function openDetailsPage5(option) {
  const url = chrome.extension.getURL('editvideo.html');
  chrome.tabs.create({ url: `${url}?option=${option}` });
}