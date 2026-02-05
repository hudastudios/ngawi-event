async function checkEvents() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/events?limit=1&isFeatured=true');
        const json = await response.json();
        const events = json.data;
        if (events && events.length > 0) {
            console.log('Event keys:', Object.keys(events[0]));
            console.log('isFeatured value:', events[0].isFeatured);
            console.log('is_featured value:', events[0].is_featured);
        } else {
            console.log('No events found.');
        }
    } catch (error) {
        console.error('Error fetching events:', error.message);
    }
}

checkEvents();
