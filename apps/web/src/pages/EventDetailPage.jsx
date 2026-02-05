import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { getEvent } from '../services/events';

const EventDetailPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ensure we scroll to top when opening the details
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEvent(id);
                setEvent(data);
            } catch (err) {
                console.error("Failed to fetch event:", err);
                setError("Gagal memuat detail event.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchEvent();
        }
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    if (error || !event) {
        return (
            <Layout>
                <div className="flex flex-col justify-center items-center h-[60vh] text-center px-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Event Tidak Ditemukan</h2>
                    <p className="text-slate-500 mb-8">{error || "Event yang Anda cari mungkin telah dihapus atau URL salah."}</p>
                    <Link to="/events" className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-dark transition-all">
                        Kembali ke Semua Event
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto pb-24 font-sans">
                <section className="p-4 lg:p-12 relative overflow-visible">
                    <div className="relative h-[300px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
                        <img
                            alt={event.title}
                            className="w-full h-full object-cover"
                            src={event.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBYipOWS0q9MYvU8REti6eqyIWMejx_Js9JAdmOtAHBxfjQs5cY_s1Nnu75ePp_B3O9Fw5AO3A05HQN7Zt60VwzqvrF-saXoyvMLSEDvCXUt_V2dvVLrxxn9Pht2YdxlJfCpN2pVsIbR8-meA2qHj8uO824DlYVYIQRx_jC_Ax5-k7CM8QSGE-C2sslDgLR42w_uixXfAorq5wxODnSX4bJz5IASsVLTuxOrCFusH-Sz6fwrw02QgiH_DniDOrdKVQKNpAuT7lXKd3E"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute top-12 right-12 animate-float hidden lg:block">
                            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-2xl flex flex-col items-center">
                                <span className="material-symbols-outlined !text-6xl text-emerald-400 mb-2">stars</span>
                                <span className="text-white text-[10px] font-black uppercase tracking-widest">Trending No. 1</span>
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-4 right-4 lg:bottom-12 lg:left-12 lg:right-auto lg:max-w-2xl">
                            <div className="glass-card p-6 lg:p-12 rounded-[2rem] border border-white/30 shadow-2xl relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="bg-emerald-accent text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        {event.category || "Umum"}
                                    </span>
                                    <span className="bg-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                        {event.price > 0 ? `Rp ${event.price.toLocaleString()}` : "Gratis"}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 lg:mb-6 leading-tight">
                                    {event.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-8 mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                            <span className="material-symbols-outlined">calendar_today</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tanggal Pelaksanaan</p>
                                            <p className="font-bold text-slate-800 dark:text-white">
                                                {new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-emerald-accent/10 text-emerald-accent flex items-center justify-center">
                                            <span className="material-symbols-outlined">group</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Estimasi Pengunjung</p>
                                            <p className="font-bold text-slate-800 dark:text-white">{event.capacity || "5,000+"} Orang</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn-3d bg-primary text-white font-black py-4 px-10 rounded-2xl flex items-center gap-3 hover:bg-primary-dark transition-all w-full lg:w-fit justify-center">
                                    <span className="material-symbols-outlined">event_available</span>
                                    <span>Add to Calendar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-4 lg:px-12 grid lg:grid-cols-3 gap-8 lg:gap-12 mt-4 lg:mt-8">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 lg:p-12 border border-slate-100 dark:border-slate-800 shadow-soft-xl">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-4">
                                <span className="size-12 rounded-2xl bg-emerald-accent/10 text-emerald-accent flex items-center justify-center">
                                    <span className="material-symbols-outlined">description</span>
                                </span>
                                Deskripsi Acara
                            </h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
                                <p>{event.description}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-4">
                                <span className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined">photo_library</span>
                                </span>
                                Media Gallery
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {event.galleryUrls && event.galleryUrls.length > 0 ? (
                                    event.galleryUrls.map((url, index) => (
                                        <div key={index} className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-lg">
                                            <img alt={`Gallery ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={url} />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white !text-4xl">zoom_in</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700">
                                        <span className="material-symbols-outlined !text-4xl mb-2">no_photography</span>
                                        <p className="font-bold">Belum ada foto galeri.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-3d-card group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800 dark:text-white">Lokasi</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 font-medium mb-6">{event.location}</p>
                                <div className="relative w-full h-48 rounded-3xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-800 mb-6 group">
                                    <img alt="Map Placeholder" className="w-full h-full object-cover blur-sm opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLERTA7N5wzpZNUGBHXDM5kMtWdFnEeW_8Zpj_cF7xSoQsI54aGoQiP7eNkVhHXVi2pUVQbfnpPzYs73NpVrGTpDH97tkg58OExmO4oJRSdlXCuinrlXP0lZa_fveFYPcrpHMQfxp0VtdGD-GC30A7bMWj4OnPbnIuB5aFEzQLV4tXlv4Vqc3KrIKj5MlW4y4Sd6jDYebFlPj2iN7s9PUVJRTljF-YPvtklMku5K7-jkul1ggmQUfkbCsIUBRQvEJzLDeOps2ncPQs" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/5">
                                        <span className="material-symbols-outlined text-primary !text-4xl mb-2">map</span>
                                        <span className="text-xs font-black text-primary uppercase tracking-widest">Buka di Google Maps</span>
                                    </div>
                                </div>
                                <a className="flex items-center justify-center gap-2 text-primary font-bold hover:gap-3 transition-all" href="#">
                                    Petunjuk Arah <span className="material-symbols-outlined text-sm">open_in_new</span>
                                </a>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-3d-card">
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined">schedule</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-1">Waktu Acara</h4>
                                            <p className="font-bold text-slate-800 dark:text-white">08:00 - 22:00 WIB</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="size-12 rounded-2xl bg-emerald-accent/10 text-emerald-accent flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined">person_pin</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-1">Penyelenggara</h4>
                                            <p className="font-bold text-slate-800 dark:text-white">{event.organizer || "Pokdarwis Selondo Ngawi"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                    <span className="material-symbols-outlined !text-[120px]">chat</span>
                                </div>
                                <h3 className="font-black text-xl mb-4 relative z-10">Ada Pertanyaan?</h3>
                                <p className="text-emerald-50 text-sm mb-6 relative z-10">Hubungi panitia penyelenggara melalui WhatsApp untuk informasi lebih lanjut.</p>
                                <a className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all py-4 px-6 rounded-2xl border border-white/20 font-extrabold shadow-lg relative z-10" href="#">
                                    <span className="material-symbols-outlined">chat</span>
                                    WhatsApp Panitia
                                </a>
                            </div>
                            <div className="flex items-center justify-center gap-4 pt-4">
                                <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Bagikan:</span>
                                <a className="size-12 rounded-2xl glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-200 dark:border-slate-700 shadow-3d-btn group" href="#">
                                    <span className="material-symbols-outlined text-slate-500 group-hover:text-white">share</span>
                                </a>
                                <a className="size-12 rounded-2xl glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-200 dark:border-slate-700 shadow-3d-btn group" href="#">
                                    <span className="material-symbols-outlined">link</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default EventDetailPage;
