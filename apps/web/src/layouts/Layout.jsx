import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            <Navbar />
            <main className="max-w-[1440px] mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
