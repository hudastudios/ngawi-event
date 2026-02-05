
// Helper script to run verification
const fs = require('fs');

async function test() {
    try {
        console.log('Starting upload test...');
        const formData = new FormData();
        formData.append('eventName', 'Test Event Log Check');
        formData.append('category', 'Budaya');
        formData.append('organizerName', 'Tester Log');
        formData.append('whatsapp', '08123');
        formData.append('description', 'Test Description Log');
        formData.append('location', 'Test Loc Log');

        // Use a dummy file buffer
        const fileContent = Buffer.from('fake image content');
        const file = new File([fileContent], 'test_log.jpg', { type: 'image/jpeg' });
        formData.append('poster', file);

        console.log('Sending request to http://localhost:5000/api/submissions...');
        const response = await fetch('http://localhost:5000/api/submissions', {
            method: 'POST',
            body: formData
        });

        const text = await response.text();
        console.log('Response Status:', response.status);
        console.log('Response Body:', text);
    } catch (e) {
        console.error('Test Failed:', e);
    }
}

test();
