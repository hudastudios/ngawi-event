import { motion, AnimatePresence } from 'framer-motion';

const RecommendationPopup = ({ isOpen, onClose, onSubmit, type = 'approve', title, message, confirmText, loading = false }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl text-center overflow-hidden"
                    >
                        <div className={`mx-auto size-20 rounded-full flex items-center justify-center mb-6 ${type === 'approve' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            <span className="material-symbols-outlined !text-5xl">
                                {type === 'approve' ? 'verified' : 'cancel'}
                            </span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">
                            {title}
                        </h3>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            {message}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="flex-1 py-3 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={onSubmit}
                                disabled={loading}
                                className={`flex-1 py-3 rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2 ${type === 'approve' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'} disabled:opacity-50`}
                            >
                                {loading ? (
                                    <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RecommendationPopup;
