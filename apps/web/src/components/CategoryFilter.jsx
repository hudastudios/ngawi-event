import { useNavigate } from 'react-router-dom';

const categories = [
    {
        id: 'all',
        name: 'Semua',
        icon: 'festival',
        colorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    },
    {
        id: 'sports',
        name: 'Olahraga',
        icon: 'sports_soccer',
        colorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    {
        id: 'arts_culture',
        name: 'Seni & Budaya',
        icon: 'theater_comedy',
        colorClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
    },
    {
        id: 'music',
        name: 'Musik',
        icon: 'music_note',
        colorClass: 'bg-pink-500/10 text-pink-600 dark:text-pink-400'
    },
    {
        id: 'education',
        name: 'Pendidikan',
        icon: 'school',
        colorClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
    },
    {
        id: 'technology',
        name: 'Teknologi',
        icon: 'memory',
        colorClass: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
    },
    {
        id: 'culinary',
        name: 'Kuliner',
        icon: 'restaurant',
        colorClass: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
    },
    {
        id: 'business',
        name: 'Bisnis',
        icon: 'work',
        colorClass: 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
    },
];

const CategoryFilter = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId) => {
        if (categoryId === 'all') {
            navigate('/events');
        } else {
            const selectedCategory = categories.find(c => c.id === categoryId);
            if (selectedCategory) {
                navigate(`/events?category=${encodeURIComponent(selectedCategory.name)}`);
            }
        }
    };

    return (
        <section className="px-4 lg:px-12 py-8 overflow-hidden">
            <div className="mb-6">
                <h2 className="font-poppins font-semibold text-[26px] text-slate-800 dark:text-white flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-emerald-accent rounded-full"></span>
                    Kategori Event
                </h2>
            </div>
            <div className="flex justify-center gap-6 overflow-x-auto slider-hide-scrollbar py-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`category-pill cursor-pointer group`}
                    >
                        <div
                            className={`size-14 rounded-2xl flex items-center justify-center mb-3 transition-colors ${category.colorClass} group-hover:scale-110 duration-300`}
                        >
                            <span className="material-symbols-outlined !text-4xl">{category.icon}</span>
                        </div>
                        <span className="text-sm font-black text-slate-800 dark:text-white">{category.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryFilter;
