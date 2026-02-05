import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSubmissionById } from '../services/submissions';

const SubmissionReviewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const data = await getSubmissionById(id);
                console.log("Submission Data:", data);
                setSubmission(data);
            } catch (err) {
                console.error("Failed to fetch submission:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSubmission();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Submission not found.</p>
            </div>
        );
    }

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
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            <span className="text-sm font-bold">Kembali</span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <h2 className="text-xl font-black text-slate-800">Detail Review Event</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
                            <span className="material-symbols-outlined text-lg">edit</span>
                            Edit Data
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors">
                            <span className="material-symbols-outlined text-lg">close</span>
                            Tolak Event
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-emerald-accent text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-accent/20">
                            <span className="material-symbols-outlined text-lg">check</span>
                            Setujui Event
                        </button>
                    </div>
                </header>
                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="aspect-video w-full bg-slate-100 relative">
                                    <img alt="Event Poster" className="w-full h-full object-cover" src={submission.posterUrl || "https://via.placeholder.com/800x450"} />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-2 bg-primary/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest rounded-full">
                                            {submission.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                                        Deskripsi Acara
                                    </h3>
                                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
                                        {submission.description}
                                    </div>
                                </div>
                            </div>


                            {/* Gallery Section */}
                            {submission.galleryUrls && submission.galleryUrls.length > 0 && (
                                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-8">
                                    <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-8 bg-emerald-500 rounded-full"></span>
                                        Galeri Foto
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {submission.galleryUrls.map((url, index) => (
                                            <div key={index} className="aspect-square rounded-xl overflow-hidden border border-slate-100 relative group">
                                                <img
                                                    src={url}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                                >
                                                    <span className="material-symbols-outlined text-3xl">visibility</span>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="space-y-6">
                            <div className="detail-card">
                                <h3 className="font-poppins font-semibold text-lg text-slate-800 mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">info</span>
                                    Informasi Detail
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <span className="info-label">Nama Pengirim</span>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {submission.organizerName ? submission.organizerName.charAt(0).toUpperCase() : "U"}
                                            </div>
                                            <div>
                                                <p className="info-value">{submission.organizerName}</p>
                                                <p className="text-[11px] text-slate-400 font-medium">{submission.email || "No Email"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="info-label">Kontak WhatsApp</span>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-lg">call</span>
                                            </div>
                                            <span className="info-value">{submission.whatsapp}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="info-label">Waktu Pelaksanaan</span>
                                        <div className="flex items-start gap-2 mt-2">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
                                                <span className="material-symbols-outlined text-lg">calendar_month</span>
                                            </div>
                                            <div className="flex-1">
                                                {(() => {
                                                    const formatDate = (dateStr) => {
                                                        if (!dateStr) return '-';
                                                        return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                                                    };

                                                    let ranges = [];
                                                    const processItem = (item) => {
                                                        if (!item) return [];
                                                        if (typeof item === 'object') return [item];
                                                        if (typeof item === 'string') {
                                                            if (item.includes('[object Object]')) return [];
                                                            try {
                                                                const parsed = JSON.parse(item);
                                                                if (Array.isArray(parsed)) return parsed;
                                                                if (typeof parsed === 'object') return [parsed];
                                                            } catch (e) { }
                                                        }
                                                        return [];
                                                    };

                                                    if (submission.dateRanges) {
                                                        if (Array.isArray(submission.dateRanges)) {
                                                            submission.dateRanges.forEach(item => ranges = [...ranges, ...processItem(item)]);
                                                        } else {
                                                            ranges = processItem(submission.dateRanges);
                                                        }
                                                    }

                                                    ranges = ranges.filter(r => r && (r.startDate || r.start_date) && (r.endDate || r.end_date));

                                                    if (ranges.length > 0) {
                                                        return (
                                                            <div className="flex flex-wrap gap-2">
                                                                {ranges.map((r, i) => (
                                                                    <div key={i} className="text-sm font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                                                                        {formatDate(r.startDate || r.start_date)} - {formatDate(r.endDate || r.end_date)}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <p className="info-value">
                                                            {formatDate(submission.startDate)} - {formatDate(submission.endDate)}
                                                        </p>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="info-label">Lokasi</span>
                                        <div className="flex items-center gap-2 mt-2 mb-3">
                                            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-lg">location_on</span>
                                            </div>
                                            <span className="info-value">{submission.location}</span>
                                        </div>
                                        <div className="w-full h-40 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <span className="material-symbols-outlined text-3xl text-slate-300">map</span>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">Mini Map Preview</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="info-label">Kategori</span>
                                        <div className="mt-2">
                                            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-full">
                                                {submission.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-card bg-amber-50/50 border-amber-100">
                                <h4 className="text-xs font-black uppercase text-amber-700 tracking-widest mb-2">Catatan Verifikasi</h4>
                                <p className="text-xs text-amber-600 leading-relaxed font-medium">
                                    Pastikan untuk memeriksa kelengkapan izin keramaian dan keaslian foto poster sebelum menyetujui event ini.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="p-8 text-center mt-auto">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        © 2024 Dinas Komunikasi dan Informatika Kabupaten Ngawi. Admin Control Panel.
                    </p>
                </footer>
            </main >
        </div >
    );
};

export default SubmissionReviewPage;
