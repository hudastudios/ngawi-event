
const fs = require('fs');

async function test() {
    try {
        const blob = new Blob(['fake image'], { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('eventName', 'Test Event');
        formData.append('category', 'Budaya');
        formData.append('organizerName', 'Tester');
        formData.append('whatsapp', '08123');
        formData.append('description', 'Test Description');
        formData.append('location', 'Test Loc');
        // Node's FormData might need a third argument for filename if using Blob, or cast to File
        // But native FormData in Node 20+ supports File
        const file = new File(['fake content'], 'test.jpg', { type: 'image/jpeg' });
        formData.append('poster', file);

        const response = await fetch('http://localhost:5000/api/submissions', {
            method: 'POST',
            body: formData
        });

        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Body:', text);
    } catch (e) {
        console.error(e);
    }
}

test();
