import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getEvents } from '../services/events';

const EventGridList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNearest = async () => {
            try {
                // Fetch nearest events
                const response = await getEvents({ sortBy: 'nearest', limit: 8 });
                setEvents(response.data);
            } catch (err) {
                console.error("Failed to fetch nearest events:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNearest();
    }, []);

    return (
        <div className="px-4 lg:px-12 pb-24">
            <div className="mb-24">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-4">
                        <span className="size-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined">schedule</span>
                        </span>
                        Event Terdekat
                    </h2>
                    <div className="flex items-center gap-6">
                        <Link to="/events" className="text-primary font-bold text-sm">Lihat Semua</Link>
                    </div>
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {events.length > 0 ? events.map((event) => (
                            <Link to={`/event/${event.slug || event.id}`} key={event.id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-3d-card transition-all duration-500 hover:-translate-y-2 block">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        src={event.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBYipOWS0q9MYvU8REti6eqyIWMejx_Js9JAdmOtAHBxfjQs5cY_s1Nnu75ePp_B3O9Fw5AO3A05HQN7Zt60VwzqvrF-saXoyvMLSEDvCXUt_V2dvVLrxxn9Pht2YdxlJfCpN2pVsIbR8-meA2qHj8uO824DlYVYIQRx_jC_Ax5-k7CM8QSGE-C2sslDgLR42w_uixXfAorq5wxODnSX4bJz5IASsVLTuxOrCFusH-Sz6fwrw02QgiH_DniDOrdKVQKNpAuT7lXKd3E"}
                                    />
                                    <div className="absolute top-4 left-4 glass-card px-4 py-2 rounded-2xl text-center shadow-lg border border-white/50">
                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(event.startDate).toLocaleDateString('id-ID', { month: 'short' })}</span>
                                        <span className="block text-2xl font-black text-primary">{new Date(event.startDate).getDate()}</span>
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <span className={`bg-emerald-accent text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg`}>
                                            {event.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-extrabold group-hover:text-primary transition-colors leading-tight mb-4 line-clamp-2">{event.title}</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-medium">
                                            <span className="material-symbols-outlined text-primary text-base">location_on</span>
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-full text-center py-20 text-slate-500">
                                <p>Belum ada event terdekat.</p>
                            </div>
                        )}
                    </div>
                )}
                <div className="mt-12 flex justify-center">
                    <Link to="/events" className="btn-3d bg-white dark:bg-slate-800 text-primary dark:text-white font-black py-4 px-10 rounded-2xl flex items-center gap-3 hover:bg-slate-50 transition-all border border-slate-200 dark:border-slate-700">
                        <span>Lihat Semua Event</span>
                        <span className="material-symbols-outlined">expand_more</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventGridList;
