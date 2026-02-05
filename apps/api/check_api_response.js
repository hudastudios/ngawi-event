const axios = require('axios');

async function checkEvents() {
    try {
        const response = await axios.get('http://localhost:3000/api/events?limit=1');
        const events = response.data.data;
        if (events.length > 0) {
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
