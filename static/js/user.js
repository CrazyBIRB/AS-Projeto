$(document).ready(function () {
    $("#profile-toggle").click(function () {
        $("#profile-settings").slideToggle();
    });
});

function showAlert() {
    alert('No active reserves!');
}

$(document).ready(function() {
    $('.cancel-btn').click(function() {
        var purchaseId = $(this).data('purchase-id');
        cancelPurchase(purchaseId);
    });
});


