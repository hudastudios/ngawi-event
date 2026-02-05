import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSubmissions, approveSubmission, rejectSubmission } from '../services/submissions';
import StatusPopup from '../components/StatusPopup';
import RecommendationPopup from '../components/RecommendationPopup';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusPopup, setStatusPopup] = useState(null); // success, error
    const [confirmPopup, setConfirmPopup] = useState(null); // { type: 'approve' | 'reject', id: number }
    const location = useLocation();

    // Re-fetch when location changes (in case we come back from details)
    useEffect(() => {
        fetchSubmissions();
    }, [location]);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const data = await getSubmissions();
            // Filter only pending for the dashboard
            setSubmissions(data?.filter(s => s.status === 'PENDING' || s.status === 'pending') || []);
        } catch (err) {
            console.error("Failed to fetch submissions:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = (type, id) => {
        setConfirmPopup({ type, id });
    };

    const processAction = async () => {
        if (!confirmPopup) return;

        try {
            if (confirmPopup.type === 'approve') {
                await approveSubmission(confirmPopup.id);
            } else {
                await rejectSubmission(confirmPopup.id);
            }

            setStatusPopup('success');
            fetchSubmissions(); // Refresh list
        } catch (error) {
            console.error(error);
            setStatusPopup('error');
        } finally {
            setConfirmPopup(null);
        }
    };

    const totalSubmissions = submissions.length;
    const pendingSubmissions = submissions.filter(s => s.status === 'pending').length;
    const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const renderEventDates = (sub) => {
        let ranges = [];

        // Helper to safely parse and accumulate ranges
        const processItem = (item) => {
            if (!item) return [];
            if (typeof item === 'object') {
                return [item];
            }
            if (typeof item === 'string') {
                // Ignore the "[object Object]" garbage
                if (item.includes('[object Object]')) return [];
                try {
                    const parsed = JSON.parse(item);
                    if (Array.isArray(parsed)) {
                        return parsed;
                    } else if (typeof parsed === 'object') {
                        return [parsed];
                    }
                } catch (e) {
                    // Ignore parse errors
                }
            }
            return [];
        };

        if (sub.dateRanges) {
            if (Array.isArray(sub.dateRanges)) {
                // It's an array, could be array of objects or array of strings
                sub.dateRanges.forEach(item => {
                    ranges = [...ranges, ...processItem(item)];
                });
            } else {
                // It's a single item (string or object)
                ranges = processItem(sub.dateRanges);
            }
        }

        // Filter out invalid ranges
        ranges = ranges.filter(r => r && (r.startDate || r.start_date) && (r.endDate || r.end_date));

        if (ranges.length > 0) {
            return (
                <div className="space-y-1">
                    {ranges.map((r, i) => (
                        <div key={i} className="text-sm font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md inline-block whitespace-nowrap mr-1 mb-1">
                            {formatDate(r.startDate || r.start_date)} - {formatDate(r.endDate || r.end_date)}
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <span className="text-sm font-bold text-slate-700">
                {formatDate(sub.startDate)} - {formatDate(sub.endDate)}
            </span>
        );
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
                    <Link className="sidebar-link active" to="/admin">
                        <span className="material-symbols-outlined">rule</span>
                        <span>Persetujuan Event</span>
                    </Link>
                    <Link className="sidebar-link" to="/admin/approved-events">
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
                        <h2 className="text-2xl font-black text-slate-800 font-display">Persetujuan Event</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">notifications</span>
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-800">Administrator</p>
                            <p className="text-xs font-medium text-slate-400">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </header>
                <div className="p-8">

                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="font-poppins font-semibold text-lg text-slate-800 flex items-center gap-3 font-display">
                                <span className="w-1.5 h-6 bg-emerald-accent rounded-full"></span>
                                Recent Submissions
                            </h3>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                                    <input className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 w-64" placeholder="Cari event..." type="text" />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
                                    <span className="material-symbols-outlined text-sm">filter_list</span>
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Event Name</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Event Dates</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Category</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                                Loading submissions...
                                            </td>
                                        </tr>
                                    ) : submissions.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                                No submissions found.
                                            </td>
                                        </tr>
                                    ) : (
                                        submissions.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800 text-sm">{sub.eventName}</div>
                                                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                                        <span className="material-symbols-outlined text-xs">location_on</span>
                                                        {sub.location || "N/A"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {renderEventDates(sub)}
                                                    <div className="text-[10px] text-slate-400 mt-1">
                                                        Submitted: {new Date(sub.createdAt || Date.now()).toLocaleDateString('id-ID')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider rounded-full">
                                                        {sub.category || "Umum"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${sub.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                                                        sub.status === 'rejected' ? 'bg-red-50 text-red-600' :
                                                            'bg-amber-50 text-amber-600'
                                                        }`}>
                                                        {sub.status || "Pending"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => handleAction('approve', sub.id)} className="btn-action bg-emerald-accent/10 text-emerald-600 hover:bg-emerald-accent hover:text-white" title="Approve">
                                                            <span className="material-symbols-outlined text-xl">check</span>
                                                        </button>
                                                        <button onClick={() => handleAction('reject', sub.id)} className="btn-action bg-red-50 text-red-600 hover:bg-red-600 hover:text-white" title="Reject">
                                                            <span className="material-symbols-outlined text-xl">close</span>
                                                        </button>
                                                        <Link to={`/admin/submission/${sub.id}`} className="btn-action bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center" title="View Detail">
                                                            <span className="material-symbols-outlined text-xl">visibility</span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Showing {submissions.length} Submissions
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="size-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50" disabled>
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <button className="size-9 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-primary/20">1</button>
                                <button className="size-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50" disabled>
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="p-8 text-center">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        © 2024 Dinas Komunikasi dan Informatika Kabupaten Ngawi. Admin Control Panel.
                    </p>
                </footer>
            </main>

            <StatusPopup status={statusPopup} onClose={() => setStatusPopup(null)} />

            {/* Confirmation Popup */}
            <RecommendationPopup
                isOpen={!!confirmPopup}
                onClose={() => setConfirmPopup(null)}
                onSubmit={processAction}
                type={confirmPopup?.type}
                title={confirmPopup?.type === 'approve' ? 'Setujui Event?' : 'Tolak Event?'}
                message={confirmPopup?.type === 'approve'
                    ? 'Apakah Anda yakin ingin menyetujui event ini? Event akan ditampilkan di website.'
                    : 'Apakah Anda yakin ingin menolak event ini?'}
                confirmText={`Ya, ${confirmPopup?.type === 'approve' ? 'Setujui' : 'Tolak'}`}
            />
        </div>
    );
};

export default AdminDashboard;
