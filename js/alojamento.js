document.getElementById('searchBox').addEventListener('input', function() {
    var searchQuery = this.value.toLowerCase();
    var hotelItems = document.querySelectorAll('.hotel-item');

    hotelItems.forEach(function(item) {
        var hotelName = item.getAttribute('data-name').toLowerCase();
        var hotelLocation = item.getAttribute('data-location').toLowerCase();

        if (hotelName.includes(searchQuery) || hotelLocation.includes(searchQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});