// using native fetch

const BASE_URL = 'http://127.0.0.1:5000/api';

async function run() {
    // 1. Create Submission
    console.log('1. Creating Submission with Date Ranges...');
    const dateRanges = [
        { startDate: '2026-05-01', endDate: '2026-05-03' },
        { startDate: '2026-06-10', endDate: '2026-06-12' }
    ];

    // Mimic FormData behavior where dateRanges is a JSON string
    const body = {
        eventName: 'Multi Period Fest ' + Date.now(),
        category: 'Musik',
        organizerName: 'Test Org',
        whatsapp: '08123456789',
        description: 'Testing multi period',
        location: 'Test Loc',
        startDate: '2026-05-01', // Fallback/First
        endDate: '2026-06-12',   // Fallback/Last
        dateRanges: JSON.stringify(dateRanges)
    };

    // Note: We are sending JSON here. If the controller strictly requires multipart, this might fail or require tweaking.
    // Ideally we use proper FormData, but trying JSON first as often multer tolerates it for body fields if file is missing.
    // However, the controller expects 'req.files'. If missing, it handles it gracefully? Yes.

    const createRes = await fetch(`${BASE_URL}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!createRes.ok) {
        console.error('Create Failed:', await createRes.text());
        return;
    }

    const submission = await createRes.json();
    console.log('Submission Created ID:', submission.id);

    // 2. Approve Submission
    console.log('2. Approving Submission...');
    const approveRes = await fetch(`${BASE_URL}/submissions/${submission.id}/approve`, {
        method: 'POST'
    });

    if (!approveRes.ok) {
        console.error('Approve Failed:', await approveRes.text());
        return;
    }
    console.log('Submission Approved.');

    // 3. Verify Events Created
    console.log('3. Verifying Events...');
    const eventsRes = await fetch(`${BASE_URL}/events?limit=10&sortBy=newest`);
    const events = await eventsRes.json();

    // Filter events by title
    const createdEvents = events.data.filter(e => e.title === body.eventName);

    console.log(`Found ${createdEvents.length} events with title "${body.eventName}"`);
    createdEvents.forEach(e => {
        console.log(`- Event ID ${e.id}: ${e.startDate} to ${e.endDate}`);
    });

    if (createdEvents.length === 2) {
        console.log('SUCCESS: 2 Events created for 2 date ranges.');
    } else {
        console.log('FAILURE: Expected 2 events.');
    }
}

run();
