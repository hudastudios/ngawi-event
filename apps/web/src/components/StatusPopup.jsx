import { motion, AnimatePresence } from 'framer-motion';

const StatusPopup = ({ status, onClose, message }) => {
    const isSuccess = status === 'success';

    return (
        <AnimatePresence>
            {status && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Popup Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl text-center overflow-hidden"
                    >
                        {/* Decorative background blob */}
                        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${isSuccess ? 'from-emerald-400 to-emerald-600' : 'from-red-400 to-red-600'}`} />

                        <div className={`mx-auto size-20 rounded-full flex items-center justify-center mb-6 ${isSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            <span className="material-symbols-outlined !text-5xl">
                                {isSuccess ? 'check_circle' : 'error'}
                            </span>
                        </div>

                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                            {isSuccess ? 'Berhasil Terkirim!' : 'Gagal Mengirim'}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {status === 'success'
                                ? (message || "Event Anda berhasil diajukan! Admin kami akan segera meninjau submission Anda.")
                                : (message || "Terjadi kesalahan sistem. Silakan coba lagi nanti atau hubungi admin.")
                            }
                        </p>      <button
                            onClick={onClose}
                            className={`btn-3d w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 ${isSuccess
                                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200 dark:shadow-none'
                                : 'bg-red-500 hover:bg-red-600 shadow-red-200 dark:shadow-none'
                                }`}
                        >
                            Tutup
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StatusPopup;
