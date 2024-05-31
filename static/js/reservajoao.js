document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [
            // Example of already occupied dates
            { title: 'Ocupado', start: '2024-06-01', end: '2024-06-03' },
            { title: 'Ocupado', start: '2024-06-07' },
            { title: 'Ocupado', start: '2024-06-10' }
        ],
        select: function(info) {
            // Handle the date selection
            if (confirm('Deseja reservar esses dias?')) {
                calendar.addEvent({
                    title: 'Reservado',
                    start: info.startStr,
                    end: info.endStr
                });
                alert('Reserva confirmada!');
            }
        }
    });
    calendar.render();
});

document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const commentsSection = document.getElementById('comments-section');

    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `
        <p><strong>${name}</strong> <span class="text-muted">- Agora</span></p>
        <p>${comment}</p>
    `;

    commentsSection.appendChild(newComment);

    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
});