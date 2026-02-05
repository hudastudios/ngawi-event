import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getEvents } from '../services/events';

const FeaturedEvents = () => {
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // Fetch events with isFeatured=true
                const response = await getEvents({ isFeatured: true, limit: 10 });
                setFeaturedEvents(response.data);
            } catch (err) {
                console.error("Failed to fetch featured events:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="px-6 lg:px-12 py-16 overflow-hidden">
            <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                    <span className="text-emerald-500 font-bold text-sm uppercase tracking-widest">Top Pick</span>
                    <div className="flex items-center gap-6">
                        <h2 className="text-4xl font-black text-slate-800 dark:text-white">Event Unggulan</h2>
                        <Link to="/events" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-1 transition-transform">
                            Lihat Semua <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => scroll('left')} className="size-12 rounded-2xl glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-200 dark:border-slate-700 shadow-3d-btn group cursor-pointer">
                        <span className="material-symbols-outlined">west</span>
                    </button>
                    <button onClick={() => scroll('right')} className="size-12 rounded-2xl glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-200 dark:border-slate-700 shadow-3d-btn group cursor-pointer">
                        <span className="material-symbols-outlined">east</span>
                    </button>
                </div>
            </div>
            <div className="relative">
                {loading ? (
                    <div className="flex gap-8 overflow-hidden pb-12">
                        {[1, 2].map((i) => (
                            <div key={i} className="min-h-[520px] min-w-full md:min-w-[45%] lg:min-w-[48%] rounded-4xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div ref={scrollRef} className="flex gap-8 overflow-x-auto slider-hide-scrollbar pb-12 snap-x snap-mandatory">
                        {featuredEvents.length > 0 ? featuredEvents.map((event) => (
                            <Link to={`/event/${event.slug || event.id}`} key={event.id} className="min-h-[520px] min-w-full md:min-w-[45%] lg:min-w-[48%] snap-center group relative h-[520px] rounded-4xl overflow-hidden cursor-pointer shadow-3d-card transition-all block">
                                <img
                                    alt={event.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    src={event.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBYipOWS0q9MYvU8REti6eqyIWMejx_Js9JAdmOtAHBxfjQs5cY_s1Nnu75ePp_B3O9Fw5AO3A05HQN7Zt60VwzqvrF-saXoyvMLSEDvCXUt_V2dvVLrxxn9Pht2YdxlJfCpN2pVsIbR8-meA2qHj8uO824DlYVYIQRx_jC_Ax5-k7CM8QSGE-C2sslDgLR42w_uixXfAorq5wxODnSX4bJz5IASsVLTuxOrCFusH-Sz6fwrw02QgiH_DniDOrdKVQKNpAuT7lXKd3E"}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                                <div className="absolute top-8 left-8 flex gap-3">
                                    <span className={`bg-emerald-accent/90 backdrop-blur-md text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg`}>
                                        {event.category}
                                    </span>
                                </div>
                                <div className="absolute bottom-10 left-10 right-10 text-white">
                                    <div className={`flex items-center gap-3 mb-4 text-emerald-400 font-extrabold uppercase text-xs tracking-[0.2em]`}>
                                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                                        <span>{new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <h3 className={`text-4xl font-black mb-4 leading-tight group-hover:text-emerald-400 transition-colors`}>{event.title}</h3>
                                    <div className="flex items-center gap-6 text-sm text-slate-300 font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className={`material-symbols-outlined text-lg text-emerald-400`}>location_on</span>
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <div className="w-full text-center py-20 text-slate-500">
                                <span className="material-symbols-outlined text-4xl mb-2">event_busy</span>
                                <p>Belum ada event unggulan.</p>
                            </div>
                        )}
                    </div>
                )}
                <div className="flex justify-center gap-3 mt-4">
                    <span className="w-12 h-1.5 rounded-full bg-primary"></span>
                    <span className="w-3 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span className="w-3 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvents;
