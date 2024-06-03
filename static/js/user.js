$(document).ready(function () {
    $("#profile-toggle").click(function () {
        $("#profile-settings").slideToggle();
    });
});

function showAlert() {
    alert('No active reserves!');
}