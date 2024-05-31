function applyFilters() {
    const cityFilters = Array.from(document.querySelectorAll('input[name="city"]:checked')).map(cb => cb.value);
    const genderFilter = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
    const experienceFilter = document.querySelector('input[name="experience"]:checked') ? parseFloat(document.querySelector('input[name="experience"]:checked').value) : null;
    const ratingFilter = document.querySelector('input[name="rating"]:checked') ? parseFloat(document.querySelector('input[name="rating"]:checked').value) : null;

    document.querySelectorAll('.sitter-item').forEach(item => {
        const itemCity = item.getAttribute('data-city');
        const itemGender = item.getAttribute('data-gender');
        const itemExperience = parseFloat(item.getAttribute('data-experience'));
        const itemRating = parseFloat(item.getAttribute('data-rating'));

        const cityMatch = cityFilters.length ? cityFilters.includes(itemCity) : true;
        const genderMatch = genderFilter ? itemGender === genderFilter : true;
        const experienceMatch = experienceFilter ? itemExperience >= experienceFilter : true;
        const ratingMatch = ratingFilter ? itemRating >= ratingFilter : true;

        if (cityMatch && genderMatch && experienceMatch && ratingMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

