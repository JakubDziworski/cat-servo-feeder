$(document).ready(() => {
  const bowlStateHeader = $('#bowlState');
  setInterval(() => {
    $.ajax('/bowl/state').done(data => {
      const text = data.catName + "'s bowl is " + data.openPercentage + '% open';
      bowlStateHeader.text(text);
    }).fail((xhr) => {
      bowlStateHeader.text("Unknown bowl state " + xhr.responseText);
    });
  }, 1000);
});

function closeBowl() {
  performRequest(0);
}

function openBowl() {
  performRequest(100);
}

function performRequest(openPercentage) {
  const resultSpan = $('#requestResultSpan');
  const body = JSON.stringify({
    openPercentage: openPercentage
  });
  $.ajax('/bowl/state',
    {
      data: body,
      contentType: 'application/json',
      type: 'PUT'
    }
  ).done(() => {
    resultSpan.text("Done!");
    resultSpan.addClass('label-success');
  }).fail((xhr) => {
    resultSpan.text("Fail! " + xhr.responseText);
    resultSpan.addClass('label-danger');
  });
}