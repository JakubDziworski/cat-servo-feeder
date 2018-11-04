$(document).ready(() => {
  const bowlsSelect = $('#bowlsSelect');
  $.ajax('/bowls').done(data => {
    data.bowls.forEach(bowl => {
      const catName = bowl.catName;
      const bowlId = bowl.id;
      const option = `<option data-bowl-id="${bowlId}">${catName}</option>`;
      bowlsSelect.append(option);
      $("#buttonPanel").show();
    });
  }).fail((xhr) => {
    console.log("Couldn't fetch bowl state " + xhr.responseText);
  });
});

function closeBowl() {
  performRequest(100);
}

function openBowl() {
  performRequest(0);
}

function performRequest(openPercentage) {
  const resultSpan = $('#requestResultSpan');
  const bowlId = $('#bowlsSelect').find(":selected").data("bowl-id");
  const body = JSON.stringify({
    openPercentage: openPercentage
  });
  $.ajax(`/bowls/${bowlId}/state`,
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