import { useState } from 'react';
import { createSubmission } from '../services/submissions';
import StatusPopup from './StatusPopup';
import LocationPicker from './LocationPicker';

const SubmissionForm = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        category: 'Budaya',
        organizerName: '',
        whatsapp: '',
        location: '',
        locationDetails: '',
        websiteUrl: '',
        description: '',
        description: '',
        dateRanges: [{ startDate: '', endDate: '' }]
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);

    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [showMap, setShowMap] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const removePoster = () => {
        setFile(null);
        setPreview(null);
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setGalleryFiles(prev => [...prev, ...files]);

            // Create previews
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setGalleryPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeGalleryImage = (index) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index));
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        setErrorMessage('');

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (file) {
            data.append('poster', file);
        }
        galleryFiles.forEach(subFile => {
            data.append('gallery', subFile);
        });

        // Pack dateRanges into JSON
        if (formData.dateRanges.length > 0) {
            data.append('startDate', formData.dateRanges[0].startDate);
            data.append('endDate', formData.dateRanges[0].endDate);
            data.append('dateRanges', JSON.stringify(formData.dateRanges));
        } else {
            // Fallback (though UI forces at least one)
            data.append('startDate', formData.startDate || '');
            data.append('endDate', formData.endDate || '');
        }

        try {
            await createSubmission(data);
            setStatus('success');
            setFormData({
                eventName: '',
                category: 'Budaya',
                organizerName: '',
                whatsapp: '',
                whatsapp: '',
                location: '',
                locationDetails: '',
                websiteUrl: '',
                description: '',
                startDate: '',
                endDate: '',
                dateRanges: [{ startDate: '', endDate: '' }]
            });
            setFile(null);
            setPreview(null);
            setGalleryFiles([]);
            setGalleryPreviews([]);
            // Optional: Scroll to success message
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.details || err.response?.data?.error || err.message || "Gagal mengirim data.";
            setErrorMessage(msg);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="ajukan-event" className="px-6 lg:px-12 pb-24">
            <section className="relative bg-gradient-to-br from-primary to-blue-900 rounded-4xl p-1 lg:p-1.5 shadow-2xl group transition-all duration-500 overflow-hidden mb-24">
                <div className="bg-white dark:bg-slate-900 rounded-[calc(2rem-2px)] p-8 lg:p-16 relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 opacity-[0.03] dark:opacity-[0.1] group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                        <span className="material-symbols-outlined !text-[480px]">add_circle</span>
                    </div>
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16">
                            <div className="bg-primary/10 text-primary p-6 rounded-3xl shadow-inner">
                                <span className="material-symbols-outlined !text-5xl">rocket_launch</span>
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Ajukan Event Baru</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Miliki agenda seru? Mari berkolaborasi memajukan ekosistem kreatif Kabupaten Ngawi.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Nama Acara</label>
                                <input
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4 placeholder:text-slate-400"
                                    placeholder="Contoh: Ngawi Art Fest 2024"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Kategori</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4"
                                >
                                    <option>Budaya</option>
                                    <option>Hiburan</option>
                                    <option>Musik</option>
                                    <option>Seni Rupa</option>
                                    <option>Edukasi</option>
                                    <option>Olahraga</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Nama Penyelenggara</label>
                                <input
                                    name="organizerName"
                                    value={formData.organizerName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4 placeholder:text-slate-400"
                                    placeholder="Nama Organisasi/Komunitas"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Kontak WhatsApp</label>
                                <input
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4 placeholder:text-slate-400"
                                    placeholder="0812xxxxxxx"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-4 lg:col-span-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Periode Tanggal</label>
                                {formData.dateRanges.map((range, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="w-full space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Mulai</label>
                                            <input
                                                value={range.startDate}
                                                onChange={(e) => {
                                                    const newRanges = [...formData.dateRanges];
                                                    newRanges[index].startDate = e.target.value;
                                                    setFormData(prev => ({ ...prev, dateRanges: newRanges }));
                                                }}
                                                required
                                                className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4"
                                                type="date"
                                            />
                                        </div>
                                        <div className="w-full space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Selesai</label>
                                            <input
                                                value={range.endDate}
                                                onChange={(e) => {
                                                    const newRanges = [...formData.dateRanges];
                                                    newRanges[index].endDate = e.target.value;
                                                    setFormData(prev => ({ ...prev, dateRanges: newRanges }));
                                                }}
                                                required
                                                className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4"
                                                type="date"
                                            />
                                        </div>
                                        {formData.dateRanges.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newRanges = formData.dateRanges.filter((_, i) => i !== index);
                                                    setFormData(prev => ({ ...prev, dateRanges: newRanges }));
                                                }}
                                                className="mt-6 p-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, dateRanges: [...prev.dateRanges, { startDate: '', endDate: '' }] }))}
                                    className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-2 px-1"
                                >
                                    <span className="material-symbols-outlined text-lg">add_circle</span>
                                    Tambah Periode Tanggal
                                </button>
                            </div>
                            <div className="space-y-2 lg:col-span-1">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Nama Lokasi</label>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300">location_on</span>
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4 pl-12 placeholder:text-slate-400"
                                            placeholder="Contoh: Alun-alun Ngawi"
                                            type="text"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowMap(!showMap)}
                                        className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-sm">map</span>
                                        {showMap ? 'Tutup Peta' : 'Pilih dari Peta'}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2 lg:col-span-1">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Lokasi Detail</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300">map</span>
                                    <input
                                        name="locationDetails"
                                        value={formData.locationDetails}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4 pl-12 placeholder:text-slate-400"
                                        placeholder="Jalan, Nomor, RT/RW..."
                                        type="text"
                                    />
                                </div>
                            </div>

                            {/* Map Container */}
                            {showMap && (
                                <div className="lg:col-span-3 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Pilih Lokasi</label>
                                    <LocationPicker
                                        onLocationSelect={(data) => {
                                            if (data.error) {
                                                alert(data.error);
                                                return;
                                            }
                                            setFormData(prev => ({
                                                ...prev,
                                                location: data.name || prev.location,
                                                locationDetails: data.address || prev.locationDetails
                                            }));
                                        }}
                                    />
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Link Website/Sosial Media</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300">link</span>
                                    <input
                                        name="websiteUrl"
                                        value={formData.websiteUrl}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4 pl-12 placeholder:text-slate-400"
                                        placeholder="https://instagram.com/acara"
                                        type="url"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 lg:col-span-3">
                                <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Deskripsi Acara</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 text-sm p-4 placeholder:text-slate-400 resize-none"
                                    placeholder="Ceritakan detail keseruan acaramu..."
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="space-y-2 lg:col-span-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Poster Upload */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Upload Foto Poster/Banner</label>
                                        <div className="relative group cursor-pointer h-full">
                                            <div className="w-full h-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors min-h-[200px]">
                                                {preview ? (
                                                    <div className="relative w-full h-full rounded-xl overflow-hidden group/preview">
                                                        <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity text-white font-bold pointer-events-none">
                                                            Ganti Foto
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation(); // Prevent opening file dialog
                                                                removePoster();
                                                            }}
                                                            className="absolute top-2 right-2 z-20 size-8 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
                                                        >
                                                            <span className="material-symbols-outlined !text-lg">close</span>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="size-16 rounded-2xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-primary">
                                                            <span className="material-symbols-outlined !text-3xl">upload_file</span>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Foto Utama (Poster)</p>
                                                            <p className="text-xs text-slate-500 mt-1">Maks. 5MB</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <input
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Gallery Upload */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">Galeri Foto (Opsional)</label>
                                        <div className="relative group cursor-pointer h-full">
                                            <div className="w-full h-full min-h-[200px] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-6 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                {galleryPreviews.length > 0 ? (
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {galleryPreviews.map((url, index) => (
                                                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 group/image">
                                                                <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeGalleryImage(index)}
                                                                    className="absolute top-2 right-2 z-10 size-8 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
                                                                >
                                                                    <span className="material-symbols-outlined !text-lg">close</span>
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {galleryPreviews.length < 5 && (
                                                            <div className="aspect-square rounded-xl flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-400">
                                                                <span className="material-symbols-outlined">add</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-full gap-4">
                                                        <div className="size-16 rounded-2xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-emerald-500">
                                                            <span className="material-symbols-outlined !text-3xl">collections</span>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Upload Foto Galeri</p>
                                                            <p className="text-xs text-slate-500 mt-1">Maks. 5 Foto</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleGalleryChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-3 pt-6 flex justify-center">
                                <button disabled={loading} className="btn-3d w-full md:w-auto bg-primary text-white font-extrabold py-5 px-16 rounded-2xl hover:bg-primary-dark flex items-center justify-center gap-3 text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
                                    <span>{loading ? 'Mengirim...' : 'Kirim Pengajuan Event'}</span>
                                    {!loading && <span className="material-symbols-outlined !text-2xl">send</span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <StatusPopup status={status} onClose={() => setStatus(null)} message={errorMessage} />

            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-4xl p-10 text-white relative overflow-hidden shadow-2xl group w-full mb-12">
                <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:scale-125 transition-transform duration-700">
                    <span className="material-symbols-outlined !text-[300px]">support_agent</span>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <h3 className="font-black text-4xl mb-4">Butuh Bantuan?</h3>
                        <p className="text-emerald-50 font-medium text-lg leading-relaxed">Hubungi tim admin kami untuk update jadwal, perubahan lokasi, atau pembatalan event. Kami siap membantu kelancaran acara Anda.</p>
                    </div>
                    <div className="flex-shrink-0">
                        <a href="https://wa.me/6282342808907" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all py-5 px-10 rounded-2xl border border-white/20 font-extrabold text-lg shadow-lg">
                            <span className="material-symbols-outlined !text-2xl">chat</span>
                            WhatsApp Admin
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionForm;
