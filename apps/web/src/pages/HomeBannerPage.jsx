import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

const HomeBannerPage = () => {
    const [currentBanner, setCurrentBanner] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }

    useEffect(() => {
        fetchBanner();
    }, []);

    const fetchBanner = async () => {
        try {
            const response = await api.get('/settings/home-banner');
            if (response.data.bannerUrl) {
                setCurrentBanner(response.data.bannerUrl);
            }
        } catch (error) {
            console.error("Failed to fetch banner:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('banner', selectedFile);

            const response = await api.post('/settings/home-banner', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setCurrentBanner(response.data.bannerUrl);
            setMessage({ type: 'success', text: 'Banner updated successfully!' });
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error("Failed to upload banner:", error);
            setMessage({ type: 'error', text: 'Failed to upload banner.' });
        } finally {
            setUploading(false);
        }
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
                    <Link className="sidebar-link active" to="/admin/home-banner">
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
                        <h2 className="text-2xl font-black text-slate-800 font-display">Home Banner</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </header>
                <div className="p-8 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Current Banner</h3>
                            <div className="aspect-[4/3] w-full max-w-md bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative">
                                {loading ? (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">Loading...</div>
                                ) : currentBanner ? (
                                    <img src={currentBanner} alt="Current Banner" className="w-full h-full object-contain bg-slate-800" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">No banner set</div>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-8">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Upload New Banner</h3>

                            {message && (
                                <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="flex flex-col gap-6">
                                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">cloud_upload</span>
                                    <p className="text-slate-500 font-medium">Click or drag image to upload</p>
                                    <p className="text-xs text-slate-400 mt-1">Recommended size: Square or Portrait (PNG, JPG)</p>
                                </div>

                                {previewUrl && (
                                    <div className="space-y-4">
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Preview</p>
                                        <div className="aspect-[4/3] w-full max-w-md bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain bg-slate-800" />
                                        </div>
                                        <button
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {uploading ? (
                                                <>
                                                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-lg">save</span>
                                                    Save Banner
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomeBannerPage;
