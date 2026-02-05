
import { db } from '../src/db';
import { events } from '../src/db/schema';
// Faker removed to avoid dependency issues


const EVENT_CATEGORIES = ['Olahraga', 'Seni & Budaya', 'Musik', 'Pendidikan', 'Teknologi', 'Kuliner', 'Bisnis'];


const LOCATIONS = [
    'Alun-Alun Merdeka Ngawi',
    'Benteng Van Den Bosch',
    'Taman Candi',
    'GOR Bung Hatta',
    'Museum Trinil',
    'Air Terjun Srambang',
    'Kebun Teh Jamus',
    'Waduk Pondok',
    'Pasar Besar Ngawi',
    'Stadion Ketonggo'
];

const ORGANIZERS = [
    'Disparpora Ngawi',
    'Komunitas Seni Ngawi',
    'Ngawi Runners',
    'Tech Community Ngawi',
    'Kadin Ngawi',
    'Pemkab Ngawi',
    'Karang Taruna Ngawi'
];

const SAMPLE_TITLES = [
    'Festival Kuliner Ngawi 2026',
    'Lomba Lari Marathon Ngawi',
    'Pameran Seni Rupa Modern',
    'Workshop Digital Marketing',
    'Konser Musik Indie Ngawi',
    'Pagelaran Wayang Kulit Semalam Suntuk',
    'Kompetisi E-Sports Mobile Legends',
    'Bazar UMKM Kreatif',
    'Seminar Kewirausahaan Pemuda',
    'Festival Tari Tradisional',
    'Pameran Fotografi Alam Ngawi',
    'Lomba Burung Berkicau',
    'Festival Jajanan Pasar',
    'Ngawi Fashion Week',
    'Turnamen Futsal Antar Pelajar'
];

function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
}

async function seed() {
    console.log('🌱 Starting seed...');

    const allEvents = [];
    const year = 2026;

    // Feb to Dec is month index 1 to 11
    for (let month = 1; month <= 11; month++) {
        console.log(`Generating events for month ${month + 1}/${year}...`);

        for (let i = 0; i < 5; i++) {
            const day = Math.floor(Math.random() * 28) + 1; // 1-28 to be safe for all months
            const startDate = new Date(year, month, day, 9, 0, 0);
            const endDate = new Date(year, month, day, 17, 0, 0); // Same day event, 9am-5pm

            // Randomly select data
            const title = SAMPLE_TITLES[Math.floor(Math.random() * SAMPLE_TITLES.length)] + ` (${month + 1}/${i + 1})`;
            const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
            const organizer = ORGANIZERS[Math.floor(Math.random() * ORGANIZERS.length)];
            const category = EVENT_CATEGORIES[Math.floor(Math.random() * EVENT_CATEGORIES.length)];

            allEvents.push({
                title: title,
                slug: generateSlug(title),
                description: `Nikmati keseruan ${title}. Acara ini akan dimeriahkan oleh berbagai pengisi acara menarik dan doorprize jutaan rupiah. Jangan sampai ketinggalan! Hubungi kami untuk informasi lebih lanjut.`,
                category: category,
                location: location,
                locationDetails: `Bertempat di area utama ${location}`,
                startDate: startDate,
                endDate: endDate,
                timeString: '09:00 - 17:00 WIB',
                organizer: organizer,
                status: 'PUBLISHED' as const,
                imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000', // Placeholder image
                galleryUrls: [
                    'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=1000',
                    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000'
                ]
            });
        }
    }

    console.log(`Prepared ${allEvents.length} events.`);

    try {
        await db.insert(events).values(allEvents);
        console.log('✅ Seed completed successfully!');
    } catch (error) {
        console.error('❌ Seed failed:', error);
    }

    process.exit(0);
}

seed();
