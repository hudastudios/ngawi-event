async function checkUpdate() {
    try {
        // 1. Get an event
        const listResponse = await fetch('http://127.0.0.1:5000/api/events?limit=1');
        const listJson = await listResponse.json();
        const event = listJson.data[0];

        if (!event) {
            console.log('No events to test.');
            return;
        }

        console.log(`Testing event ID: ${event.id}, Current isFeatured: ${event.isFeatured}`);
        const newStatus = !event.isFeatured;

        // 2. Update to toggle
        console.log(`Attempting to set isFeatured to ${newStatus}...`);
        const updateResponse = await fetch(`http://127.0.0.1:5000/api/events/${event.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isFeatured: newStatus })
        });

        const updateJson = await updateResponse.json();
        console.log('Update response:', updateJson);

        // 3. Verify persistence
        console.log('Verifying persistence...');
        const verifyResponse = await fetch(`http://127.0.0.1:5000/api/events/${event.slug}`);
        const updatedEvent = await verifyResponse.json();

        if (updatedEvent) {
            console.log(`Verification: Event isFeatured is now: ${updatedEvent.isFeatured}`);
            if (updatedEvent.isFeatured === newStatus) {
                console.log('SUCCESS: Persistence verified.');
            } else {
                console.log('FAILURE: Persistence failed.');
            }
        } else {
            console.log('Could not find event to verify.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkUpdate();
