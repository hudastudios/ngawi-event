import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { useEffect, useState } from 'react';
import { getEvents } from '../services/events';

const AllEventsPage = () => {
    const [searchParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedMonth, setSelectedMonth] = useState(searchParams.get('month') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Semua');
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState({});

    const fetchEvents = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 8,
                search: searchQuery,
                month: selectedMonth,
                category: selectedCategory === 'Semua' ? undefined : selectedCategory
            };
            const response = await getEvents(params);
            setEvents(response.data);
            setMeta(response.meta);
            setCurrentPage(response.meta.page);
        } catch (err) {
            console.error("Failed to fetch events:", err);
            setError("Gagal memuat event. Silakan coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchEvents();
    }, []);

    const handleApplyFilter = () => {
        fetchEvents(1);
    };

    const handleResetFilter = () => {
        setSearchQuery('');
        setSelectedMonth('');
        setSelectedCategory('Semua');
        // We'll rely on the effect of state change + calling fetch manually or just simple implementation:
        // Ideally should set state and then fetch. 
        // For simplicity:
        setLoading(true);
        getEvents({ page: 1, limit: 8 }).then(res => {
            setEvents(res.data);
            setMeta(res.meta);
            setCurrentPage(res.meta.page);
            setLoading(false);
        });
    };

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        // Trigger fetch directly or useEffect?
        // Let's call fetch directly with the new category to ensure fresh data
        setLoading(true);
        const params = {
            page: 1,
            limit: 8,
            search: searchQuery,
            month: selectedMonth,
            category: cat === 'Semua' ? undefined : cat
        };
        getEvents(params).then(res => {
            setEvents(res.data);
            setMeta(res.meta);
            setCurrentPage(res.meta.page);
            setLoading(false);
        });
    };

    const handlePageChange = (newPage) => {
        fetchEvents(newPage);
        window.scrollTo(0, 0);
    };

    const EventCard = ({ event }) => (
        <Link to={`/event/${event.slug || event.id}`} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-3d-card transition-all duration-500 hover:-translate-y-2 block">
            <div className="relative h-56 overflow-hidden">
                <img
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={event.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBYipOWS0q9MYvU8REti6eqyIWMejx_Js9JAdmOtAHBxfjQs5cY_s1Nnu75ePp_B3O9Fw5AO3A05HQN7Zt60VwzqvrF-saXoyvMLSEDvCXUt_V2dvVLrxxn9Pht2YdxlJfCpN2pVsIbR8-meA2qHj8uO824DlYVYIQRx_jC_Ax5-k7CM8QSGE-C2sslDgLR42w_uixXfAorq5wxODnSX4bJz5IASsVLTuxOrCFusH-Sz6fwrw02QgiH_DniDOrdKVQKNpAuT7lXKd3E"}
                />
                <div className="absolute top-4 left-4 glass-card px-4 py-2 rounded-2xl text-center shadow-lg border border-white/50">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {new Date(event.startDate || Date.now()).toLocaleDateString('id-ID', { month: 'short' })}
                    </span>
                    <span className="block text-2xl font-black text-primary">
                        {new Date(event.startDate || Date.now()).getDate()}
                    </span>
                </div>
                <div className="absolute bottom-4 right-4">
                    <span className="bg-emerald-accent text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg">
                        {event.category || "Umum"}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-extrabold group-hover:text-primary transition-colors leading-tight mb-4 line-clamp-2">
                    {event.title}
                </h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-medium">
                        <span className="material-symbols-outlined text-primary text-base">location_on</span>
                        <span>{event.location || "Lokasi belum ditentukan"}</span>
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <Layout>
            <div className="px-4 lg:px-12 py-8">
                <nav className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-6">
                    <Link className="hover:text-primary transition-colors" to="/">Beranda</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-600 dark:text-slate-300">Semua Event</span>
                </nav>
                <div className="mb-12">
                    <h1 className="text-3xl lg:text-5xl font-black text-slate-800 dark:text-white mb-8">Semua Event di Ngawi</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                        <div className="lg:col-span-5 space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Cari Kata Kunci</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
                                <input
                                    className="w-full bg-white dark:bg-slate-900 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-primary/10 shadow-sm text-sm"
                                    placeholder="Judul event, lokasi, atau artis..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-3 space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Pilih Bulan</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">calendar_month</span>
                                <select
                                    className="w-full bg-white dark:bg-slate-900 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-primary/10 shadow-sm text-sm appearance-none"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    <option value="">Semua Bulan</option>
                                    <option value="0">Januari</option>
                                    <option value="1">Februari</option>
                                    <option value="2">Maret</option>
                                    <option value="3">April</option>
                                    <option value="4">Mei</option>
                                    <option value="5">Juni</option>
                                    <option value="6">Juli</option>
                                    <option value="7">Agustus</option>
                                    <option value="8">September</option>
                                    <option value="9">Oktober</option>
                                    <option value="10">November</option>
                                    <option value="11">Desember</option>
                                </select>
                            </div>
                        </div>
                        <div className="lg:col-span-4 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleApplyFilter}
                                className="flex-1 bg-primary text-white font-bold py-4 px-6 rounded-2xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg"
                            >
                                <span className="material-symbols-outlined">filter_list</span>
                                <span>Terapkan Filter</span>
                            </button>
                            <button
                                onClick={handleResetFilter}
                                className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-4 rounded-2xl hover:bg-slate-200 transition-all"
                            >
                                <span className="material-symbols-outlined">restart_alt</span>
                            </button>
                        </div>
                    </div>
                </div>
                <section className="mb-12">
                    <div className="mb-4">
                        <h2 className="font-poppins font-semibold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="w-1 h-5 bg-emerald-accent rounded-full"></span>
                            Kategori Event
                        </h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto slider-hide-scrollbar py-2">
                        <div
                            className={`category-pill cursor-pointer ${selectedCategory === 'Semua' ? 'active' : ''}`}
                            onClick={() => handleCategoryChange('Semua')}
                        >
                            <div className={`size-10 rounded-xl flex items-center justify-center mb-2 ${selectedCategory === 'Semua' ? 'bg-emerald-accent/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                <span className="material-symbols-outlined !text-2xl">festival</span>
                            </div>
                            <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-tight">Semua</span>
                        </div>
                        {['Olahraga', 'Musik', 'Seni & Budaya', 'Pendidikan', 'Teknologi', 'Kuliner', 'Bisnis'].map((cat) => (
                            <div
                                key={cat}
                                className={`category-pill cursor-pointer ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                <div className={`size-10 rounded-xl flex items-center justify-center mb-2 ${selectedCategory === cat ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                    <span className="material-symbols-outlined !text-2xl">
                                        {cat === 'Olahraga' ? 'sports_soccer' :
                                            cat === 'Musik' ? 'music_note' :
                                                cat === 'Teknologi' ? 'memory' :
                                                    cat === 'Kuliner' ? 'restaurant' : 'category'}
                                    </span>
                                </div>
                                <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-tight">{cat}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-slate-500">
                                <p>Belum ada event yang tersedia.</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-12">
                    <p className="text-sm font-semibold text-slate-500">
                        Menampilkan {events.length} dari {meta.total || 0} Event
                    </p>
                    {/* Pagination - Static for now */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="size-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-primary transition-all border border-slate-200 dark:border-slate-800 shadow-sm disabled:opacity-50 disabled:hover:text-slate-400"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="size-10 rounded-xl bg-primary text-white font-bold text-sm shadow-3d-btn">{currentPage}</button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= (meta.totalPages || 1)}
                            className="size-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-primary transition-all border border-slate-200 dark:border-slate-800 shadow-sm disabled:opacity-50 disabled:hover:text-slate-400"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AllEventsPage;
