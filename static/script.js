$(document).ready(() => {
    $("#startAtInput").timeDropper({
        format:"HH:mm",
        setCurrentTime : false
    });
});

function saveConfig() {
    const hourAndMinute = $('#startAtInput').val().split(":");
    const fadeInMinutes = $('#fadeInMinutesInput').val();
    const resultSpan = $('#saveConfigResultSpan');
    const hour = parseInt(hourAndMinute[0], 10);
    const minute = parseInt(hourAndMinute[1], 10);
    const fade = parseInt(fadeInMinutes, 10);
    const body = {
        startAtHour: hour,
        startAtMinute: minute,
        fadeInMinutes: fade
    };
    resultSpan.text("Saving...");
    $.ajax("/set-up", {
        data: JSON.stringify(body),
        contentType: 'application/json',
        type: 'POST'
    }).done(() => {
        resultSpan.text("Done!");
        resultSpan.addClass('label-success');
    }).fail((xhr) => {
        resultSpan.text("Fail! " + xhr.responseText);
        resultSpan.addClass('label-danger');
    })
}