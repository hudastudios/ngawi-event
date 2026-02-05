import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login logic for now
        navigate('/admin');
    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-primary">
                <img
                    alt="Benteng Van Den Bosch"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMUqg772v_n2N4QTK9Lo7ouE11c-ZTbO47V-I49ehm0ET9VVhK6hoct4a-aDezdwAdw_BVRlPxM-MAV2q-mPBLhf_-2PZax1pVD2pe9WVdYuAowY6kPF4fGWvTSAMlxyqw6lIB0caB9SyDCh50VXDVDbGQpoFkhmHAi0q9PnA0OjCHDgh1HLkKaj4gFIPfSOFQtCpBbbiaW0qsGckLDrWnwNOtpNemH6zGzU8j6uzU2KWy0ygMr0n96VC79CK55phy-iG4s9Isud05"
                />
                <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                            <svg className="size-10" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white font-poppins">Kalender Event Ngawi</h1>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-5xl font-black text-white leading-tight font-poppins">Sistem Manajemen Event Terpadu</h2>
                        <p className="text-blue-100 text-lg max-w-lg leading-relaxed font-sans">
                            Selamat datang di Dashboard Admin. Kelola jadwal, kurasi konten budaya, dan publikasikan event terbaru untuk masyarakat Kabupaten Ngawi dengan mudah dan aman.
                        </p>
                    </div>
                    <div className="flex items-center gap-6 text-white/60 text-sm">
                        <p>© 2024 Dinas Komunikasi dan Informatika Ngawi</p>
                    </div>
                </div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-accent/20 rounded-full blur-3xl"></div>
            </div>
            <div className="w-full lg:w-1/2 bg-white dark:bg-background-dark flex items-center justify-center p-6 md:p-16 lg:p-24 relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-8 right-8 lg:top-12 lg:right-12 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors group"
                >
                    <span>Kembali</span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>

                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-3 mb-12">
                        <div className="text-primary size-8">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
                            </svg>
                        </div>
                        <h1 className="text-lg font-bold tracking-tight text-primary dark:text-white font-poppins">Kalender Event Ngawi</h1>
                    </div>
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 font-display">Login Admin</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-sans">Silakan masukkan akun Anda untuk mengakses dashboard manajemen.</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Email atau Username</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="Masukkan email/username" required="" type="text" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Password</label>
                                <a className="text-xs font-bold text-primary hover:underline transition-all" href="#">Lupa Password?</a>
                            </div>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="••••••••" required="" type="password" />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 hover:text-slate-600 transition-colors" type="button">visibility</button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 py-2">
                            <input className="rounded text-primary focus:ring-primary border-slate-300 dark:bg-slate-800 dark:border-slate-700" id="remember" type="checkbox" />
                            <label className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer" htmlFor="remember">Ingat saya di perangkat ini</label>
                        </div>
                        <div className="pt-4">
                            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 text-base" type="submit">
                                <span>Masuk ke Dashboard</span>
                                <span className="material-symbols-outlined">login</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
