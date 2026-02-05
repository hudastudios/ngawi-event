import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvents, deleteEvent, updateEvent } from '../services/events';
import RecommendationPopup from '../components/RecommendationPopup';

const ApprovedEventsPage = () => {
    // ... (rest of component logic) ...

    // (Skip to header row)
    <tr className="bg-slate-50/50">
        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Event</th>
        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Tanggal</th>
        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Lokasi</th>
        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Unggulan</th>
        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Action</th>
    </tr>
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

    const fetchEvents = async () => {
        try {
            const params = { limit: 100, sortBy: 'newest' };
            if (showFeaturedOnly) {
                params.isFeatured = true;
            }
            const response = await getEvents(params);
            setEvents(response.data || []);
        } catch (err) {
            console.error("Failed to fetch events:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [showFeaturedOnly]);

    const handleDeleteClick = (event) => {
        setSelectedEvent(event);
        setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        if (!selectedEvent) return;
        setActionLoading(true);
        try {
            await deleteEvent(selectedEvent.id);
            await fetchEvents();
            setShowDeletePopup(false);
            setSelectedEvent(null);
        } catch (error) {
            console.error("Failed to delete event:", error);
            alert("Gagal menghapus event");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen font-sans bg-background-light text-slate-900">
            <aside className="w-72 bg-primary text-white flex flex-col h-screen sticky top-0">
                <div className="p-8 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl shadow-lg">
                        <svg className="text-white size-6" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
                        </svg>
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tighter">Ngawi <span className="text-emerald-400">Admin</span></h1>
                </div>
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <Link className="sidebar-link" to="/admin">
                        <span className="material-symbols-outlined">rule</span>
                        <span>Persetujuan Event</span>
                    </Link>
                    <Link className="sidebar-link active" to="/admin/approved-events">
                        <span className="material-symbols-outlined">check_circle</span>
                        <span>Event Disetujui</span>
                    </Link>
                    <Link className="sidebar-link" to="/admin/rejected-events">
                        <span className="material-symbols-outlined">cancel</span>
                        <span>Event Ditolak</span>
                    </Link>
                    <Link className="sidebar-link" to="/admin/home-banner">
                        <span className="material-symbols-outlined">image</span>
                        <span>Home Banner</span>
                    </Link>
                </nav>
                <div className="p-6 border-t border-white/10">
                    <Link to="/" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">logout</span>
                        <span>Keluar</span>
                    </Link>
                </div>
            </aside>
            <main className="flex-1 bg-slate-50 min-h-screen">
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 font-display">Event Disetujui</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </header>
                <div className="p-8">
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-poppins font-semibold text-lg text-slate-800 flex items-center gap-3 font-display">
                                <span className="w-1.5 h-6 bg-emerald-accent rounded-full"></span>
                                Daftar Event Aktif
                            </h3>
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <span className="text-sm font-semibold text-slate-600">Event Unggulan</span>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={showFeaturedOnly}
                                            onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Event</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Tanggal</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Lokasi</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Unggulan</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr><td colSpan="5" className="p-6 text-center text-slate-500">Loading...</td></tr>
                                    ) : events.length === 0 ? (
                                        <tr><td colSpan="5" className="p-6 text-center text-slate-500">Belum ada event yang disetujui.</td></tr>
                                    ) : (
                                        events.map((event) => (
                                            <tr key={event.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-800 text-sm">{event.title}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {new Date(event.startDate).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{event.location}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider rounded-full">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={!!(event.isFeatured || event.is_featured)}
                                                            onChange={async (e) => {
                                                                const checked = e.target.checked;
                                                                try {
                                                                    // Optimistic update
                                                                    setEvents(events.map(ev => ev.id === event.id ? { ...ev, isFeatured: checked } : ev));
                                                                    await updateEvent(event.id, { isFeatured: checked });
                                                                } catch (err) {
                                                                    console.error("Failed to update featured status", err);
                                                                    // Revert on error
                                                                    setEvents(events.map(ev => ev.id === event.id ? { ...ev, isFeatured: !checked } : ev));
                                                                }
                                                            }}
                                                        />
                                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                                    </label>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link to={`/event/${event.slug}`} className="text-primary font-bold hover:underline text-xs" target='_blank'>
                                                            Lihat
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick(event)}
                                                            className="text-red-500 font-bold hover:text-red-700 text-xs flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">delete</span>
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Delete Confirmation Popup */}
            {showDeletePopup && (
                <RecommendationPopup
                    isOpen={showDeletePopup}
                    onClose={() => setShowDeletePopup(false)}
                    onSubmit={confirmDelete}
                    type="reject" // Reusing reject style (red)
                    title="Hapus Event?"
                    message={`Apakah anda yakin akan menghapus event "${selectedEvent?.title}"? Event akan terhapus permanen dari website.`}
                    loading={actionLoading}
                    confirmText="Ya, Hapus"
                />
            )}
        </div>
    );
};

export default ApprovedEventsPage;
