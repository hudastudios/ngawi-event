import ekrafLogo from '../assets/ekraf-logo.png';
import disporaLogo from '../assets/disporalogo.png'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const Hero = () => {
    const navigate = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState('');
    const [bannerUrl, setBannerUrl] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuAMUqg772v_n2N4QTK9Lo7ouE11c-ZTbO47V-I49ehm0ET9VVhK6hoct4a-aDezdwAdw_BVRlPxM-MAV2q-mPBLhf_-2PZax1pVD2pe9WVdYuAowY6kPF4fGWvTSAMlxyqw6lIB0caB9SyDCh50VXDVDbGQpoFkhmHAi0q9PnA0OjCHDgh1HLkKaj4gFIPfSOFQtCpBbbiaW0qsGckLDrWnwNOtpNemH6zGzU8j6uzU2KWy0ygMr0n96VC79CK55phy-iG4s9Isud05");

    const handleSearch = () => {
        if (selectedMonth !== "") {
            navigate(`/events?month=${selectedMonth}`);
        } else {
            navigate('/events');
        }
    };

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await api.get('/settings/home-banner');
                if (response.data.bannerUrl) {
                    setBannerUrl(response.data.bannerUrl);
                }
            } catch (error) {
                console.error("Failed to fetch home banner:", error);
            }
        };
        fetchBanner();
    }, []);

    return (
        <section className="relative p-4 lg:p-12 overflow-visible">
            <div className="relative overflow-hidden rounded-4xl min-h-[540px] flex items-center bg-gradient-to-br from-blue-900 to-indigo-900">
                <div className="absolute -right-20 -top-20 opacity-20 pointer-events-none">
                    <span className="material-symbols-outlined !text-[320px] text-white blur-sm">event</span>
                </div>
                <div className="absolute -left-10 bottom-0 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined !text-[240px] text-emerald-300">music_note</span>
                </div>
                <div className="relative z-10 w-full grid lg:grid-cols-2 gap-8 lg:gap-12 px-6 lg:px-16 py-8 lg:py-0 items-center">
                    <div className="flex flex-col gap-4 text-left">
                        <div className='flex gap-4 scale-60'>
                            <img src={disporaLogo} alt="Ekraf Logo" className="h-12 w-auto opacity-90" />
                            <img src={ekrafLogo} alt="Ekraf Logo" className="h-12 w-auto opacity-90" />
                        </div>
                        <h1 className="text-white text-3xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                            Waktunya <br />
                            <span className="text-emerald-400">Eksplorasi Event</span> Ngawi.
                        </h1>
                        <p className="text-white/70 text-sm md:text-lg lg:text-xl max-w-lg leading-relaxed">
                            Nikmati kemudahan menemukan jadwal kebudayaan, konser, dan festival paling trendy di Kabupaten Ngawi dalam satu platform modern.
                        </p>
                        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl">
                            <div className="flex-1 flex items-center px-4 py-3 sm:py-0">
                                <span className="material-symbols-outlined text-white/50 mr-3">calendar_month</span>
                                <div className="flex flex-col w-full">
                                    <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Cari Event</span>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        className="w-full border-none focus:ring-0 text-sm bg-transparent text-white placeholder:text-white/40 p-0 appearance-none cursor-pointer [&>option]:text-slate-900"
                                    >
                                        <option className="bg-indigo-900 text-white" value="">Pilih Bulan...</option>
                                        <option className="bg-indigo-900 text-white" value="0">Januari</option>
                                        <option className="bg-indigo-900 text-white" value="1">Februari</option>
                                        <option className="bg-indigo-900 text-white" value="2">Maret</option>
                                        <option className="bg-indigo-900 text-white" value="3">April</option>
                                        <option className="bg-indigo-900 text-white" value="4">Mei</option>
                                        <option className="bg-indigo-900 text-white" value="5">Juni</option>
                                        <option className="bg-indigo-900 text-white" value="6">Juli</option>
                                        <option className="bg-indigo-900 text-white" value="7">Agustus</option>
                                        <option className="bg-indigo-900 text-white" value="8">September</option>
                                        <option className="bg-indigo-900 text-white" value="9">Oktober</option>
                                        <option className="bg-indigo-900 text-white" value="10">November</option>
                                        <option className="bg-indigo-900 text-white" value="11">Desember</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={handleSearch} className="bg-emerald-accent hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                                <span>Jelajahi</span>
                                <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-center relative">
                        <div className="relative w-full aspect-square max-w-[480px]">
                            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl"></div>
                            <img
                                alt="Benteng Van Den Bosch Ngawi"
                                className="relative z-10 w-full h-full object-cover drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-700 rounded-3xl"
                                src={bannerUrl}
                            />

                            {/* Floating Elements with inline styles for animations as in reference */}
                            <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl floating-element animate-[bounce_3s_infinite]">
                                <span className="material-symbols-outlined text-primary text-4xl">calendar_month</span>
                            </div>
                            <div className="absolute bottom-12 -left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl floating-element animate-[pulse_4s_infinite]">
                                <span className="material-symbols-outlined text-emerald-400 text-4xl">confirmation_number</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
