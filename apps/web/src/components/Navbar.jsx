import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSubmission = (e) => {
        e.preventDefault();
        setIsMenuOpen(false); // Close menu on click
        if (location.pathname === '/') {
            const element = document.getElementById('ajukan-event');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/#ajukan-event');
        }
    };

    const handleNavigation = (path) => {
        setIsMenuOpen(false);
        navigate(path);
    }

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        const baseClass = "text-sm font-bold transition-all relative";
        const activeClass = "text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary";
        const inactiveClass = "text-slate-500 dark:text-slate-400 hover:text-primary font-semibold";

        return isActive ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
    };

    const getMobileLinkClass = (path) => {
        const isActive = location.pathname === path;
        return isActive
            ? "text-left text-base font-bold text-primary py-2 border-b border-primary/20 bg-primary/5 px-3 rounded-lg"
            : "text-left text-base font-semibold text-slate-600 dark:text-slate-400 hover:text-primary py-2 border-b border-slate-50 dark:border-slate-800 px-3";
    };

    return (
        <header className="sticky top-0 z-50 w-full glass-card border-b border-white/20">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="bg-gradient-to-br from-primary to-emerald-accent p-2 rounded-xl shadow-lg">
                        <svg className="text-white size-6" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
                        </svg>
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
                        Ngawi <span className="text-primary">Event</span>
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <nav className="flex items-center gap-8">
                        <Link to="/" className={getLinkClass('/')}>
                            Beranda
                        </Link>
                        <Link to="/events" className={getLinkClass('/events')}>
                            Semua Event
                        </Link>
                        <Link to="/jadwal" className={getLinkClass('/jadwal')}>
                            Jadwal
                        </Link>
                        <a href="#ajukan-event" onClick={scrollToSubmission} className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer">
                            Ajukan Event
                        </a>
                    </nav>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-primary text-white text-sm font-bold px-8 py-2.5 rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30"
                    >
                        Masuk
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="material-symbols-outlined text-2xl">
                        {isMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 duration-200">
                    <nav className="flex flex-col gap-4">
                        <button
                            onClick={() => handleNavigation('/')}
                            className={getMobileLinkClass('/')}
                        >
                            Beranda
                        </button>
                        <button
                            onClick={() => handleNavigation('/events')}
                            className={getMobileLinkClass('/events')}
                        >
                            Semua Event
                        </button>
                        <button
                            onClick={() => handleNavigation('/jadwal')}
                            className={getMobileLinkClass('/jadwal')}
                        >
                            Jadwal
                        </button>
                        <button
                            onClick={scrollToSubmission}
                            className="text-left text-base font-semibold text-slate-600 dark:text-slate-400 hover:text-primary py-2 border-b border-slate-50 dark:border-slate-800 px-3"
                        >
                            Ajukan Event
                        </button>
                    </nav>
                    <button
                        onClick={() => handleNavigation('/login')}
                        className="w-full bg-primary text-white text-sm font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-lg"
                    >
                        Masuk
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
