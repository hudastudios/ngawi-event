const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-16">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="text-primary size-7">
                                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Kalender Event Ngawi</h2>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">Pusat informasi resmi Event di Kabupaten Ngawi, Jawa Timur.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm mb-8 uppercase tracking-widest text-gray-400">Navigasi</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a className="hover:text-primary transition-colors" href="/">Beranda</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/events">Semua Event</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/jadwal">Jadwal</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/#ajukan-event">Ajukan Event</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm mb-8 uppercase tracking-widest text-gray-400">Kontak Kami</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <span className="material-symbols-outlined !text-lg text-primary">location_on</span>
                                Dinas Pariwisata Pemuda dan Olahraga Kab. Ngawi Jl. Yos Sudarso No. 63 Ngawi
                            </li>
                            <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <span className="material-symbols-outlined !text-lg text-primary">call</span>
                                (0351) 746208
                            </li>
                            <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <span className="material-symbols-outlined !text-lg text-primary">language</span>
                                disparpora.ngawikab.go.id
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm mb-8 uppercase tracking-widest text-gray-400">Ikuti Kami</h4>
                        <div className="flex gap-4">
                            <a className="size-11 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all group" href="http://disparpora.ngawikab.go.id" target="_blank" rel="noopener noreferrer">
                                <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 group-hover:text-white">public</span>
                            </a>
                            <a className="size-11 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all group" href="https://www.instagram.com/ngawi_creative/" target="_blank" rel="noopener noreferrer">
                                <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 group-hover:text-white text-xl">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </span>
                            </a>
                            <a className="size-11 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all group" href="https://www.instagram.com/pariwisatangawi/" target="_blank" rel="noopener noreferrer">
                                <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 group-hover:text-white text-xl">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
