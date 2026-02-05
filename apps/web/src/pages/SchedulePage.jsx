import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/events';

const SchedulePage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [calendarDays, setCalendarDays] = useState([]);

    // Get month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Fetch events when month changes
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                // Fetch events for specific month (backend expects 0-11 for month usually, or we can filter client side if needed)
                // Assuming getEvents accepts month/year filters
                const params = {
                    month: currentMonth,
                    year: currentYear,
                    limit: 100 // Get enough events for the calendar
                };
                const response = await getEvents(params);
                setEvents(response.data || []);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [currentMonth, currentYear]);

    // Generate calendar grid
    useEffect(() => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

        const days = [];

        // Previous month padding
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push({ type: 'empty', id: `empty-${i}` });
        }

        // Days of current month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);
            days.push({
                type: 'day',
                day: i,
                date: date,
                isToday: new Date().toDateString() === date.toDateString(),
                isSelected: selectedDate.toDateString() === date.toDateString()
            });
        }

        setCalendarDays(days);
    }, [currentMonth, currentYear, selectedDate]);

    // Navigation handlers
    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    // Filter events for selected date
    const selectedDateEvents = events.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate.toDateString() === selectedDate.toDateString();
    });

    // Helper to check if a day has events
    const getEventsForDay = (day) => {
        return events.filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate.getDate() === day && eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        });
    };

    // Formatters
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    return (
        <Layout>
            <main className="max-w-[1440px] mx-auto px-4 lg:px-10 space-y-8 py-10">
                <div className="w-full">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">

                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-black text-gray-800 dark:text-white">
                                    {monthNames[currentMonth]} {currentYear}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Menampilkan semua agenda di Kabupaten Ngawi</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <button
                                        onClick={prevMonth}
                                        className="size-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>
                                    <button
                                        onClick={nextMonth}
                                        className="size-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Days Header */}
                        <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800">
                            {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((day) => (
                                <div key={day} className="py-3 text-center text-xs font-black text-gray-400 uppercase tracking-widest border-r border-gray-100 dark:border-gray-800 last:border-r-0">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 bg-gray-50/50 dark:bg-gray-900">
                            {calendarDays.map((item, index) => {
                                if (item.type === 'empty') {
                                    return (
                                        <div key={index} className="calendar-day min-h-[100px] p-2 border-r border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20"></div>
                                    );
                                }

                                const dayEvents = getEventsForDay(item.day);
                                const isSelected = item.isSelected;
                                const isToday = item.isToday;

                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleDateClick(item.date)}
                                        className={`
                                            calendar-day min-h-[100px] p-2 border-r border-b border-gray-100 dark:border-gray-800 
                                            cursor-pointer transition-all relative group
                                            ${isSelected ? 'bg-primary/5 shadow-inner' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}
                                        `}
                                    >
                                        <div className={`
                                            w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold mb-2
                                            ${isToday ? 'bg-emerald-500 text-white shadow-lg' : isSelected ? 'bg-primary text-white shadow-md' : 'text-gray-700 dark:text-gray-300'}
                                        `}>
                                            {item.day}
                                        </div>

                                        <div className="flex flex-wrap gap-1 content-start">
                                            {dayEvents.map((event, i) => (
                                                <div
                                                    key={event.id || i}
                                                    className={`
                                                        h-1.5 w-1.5 rounded-full 
                                                        ${event.category === 'Budaya' ? 'bg-emerald-500' :
                                                            event.category === 'Olahraga' ? 'bg-amber-500' :
                                                                'bg-primary'}
                                                    `}
                                                    title={event.title}
                                                ></div>
                                            ))}
                                            {dayEvents.length > 5 && (
                                                <span className="text-[9px] text-gray-400 leading-none self-center">+</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Selected Date Details */}
                <div className="w-full animate-in fade-in duration-500">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-2xl font-black text-gray-800 dark:text-white">
                            Event Tanggal {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
                        </h3>
                        <div className="bg-primary/10 text-primary text-xs font-black px-4 py-1.5 rounded-full uppercase">
                            {selectedDateEvents.length} Event Tersedia
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedDateEvents.length > 0 ? (
                            selectedDateEvents.map((event) => (
                                <Link
                                    key={event.id}
                                    to={`/event/${event.slug || event.id}`}
                                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer block"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="size-14 rounded-xl bg-primary/10 text-primary flex flex-col items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold uppercase leading-none">
                                                {monthNames[new Date(event.startDate).getMonth()].substring(0, 3)}
                                            </span>
                                            <span className="text-2xl font-black leading-none mt-1">
                                                {new Date(event.startDate).getDate()}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                    {event.category || 'Event'}
                                                </span>
                                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                                    {new Date(event.startDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-primary transition-colors leading-snug mb-3 line-clamp-2">
                                                {event.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                                <span className="material-symbols-outlined !text-base">location_on</span>
                                                <span className="line-clamp-1">{event.location || 'Lokasi belum ditentukan'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full p-8 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 min-h-[200px]">
                                <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 !text-4xl mb-3">event_busy</span>
                                <h4 className="font-bold text-gray-600 dark:text-gray-300">Tidak ada event</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Belum ada agenda kegiatan untuk tanggal ini.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Promotion Banner */}
                <div className="w-full">
                    <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="relative z-10 max-w-xl text-center md:text-left">
                            <h4 className="font-bold text-2xl mb-2">Punya Event Sendiri?</h4>
                            <p className="text-sm text-white/80 leading-relaxed">Promosikan acara Anda secara gratis di portal resmi Kalender Event Ngawi untuk menjangkau audiens lebih luas.</p>
                        </div>
                        <div className="relative z-10">
                            <a className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1" href="/#ajukan-event">
                                <span>Hubungi Admin</span>
                                <span className="material-symbols-outlined">campaign</span>
                            </a>
                        </div>
                        <div className="absolute -right-10 -bottom-10 opacity-10">
                            <span className="material-symbols-outlined !text-[200px]">event_available</span>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default SchedulePage;
