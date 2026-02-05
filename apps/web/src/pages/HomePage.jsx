import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import FeaturedEvents from '../components/FeaturedEvents';
import EventGridList from '../components/EventGridList';
import SubmissionForm from '../components/SubmissionForm';
import Layout from '../layouts/Layout';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <Layout>
            <Hero />
            <CategoryFilter />
            <FeaturedEvents />
            <EventGridList />
            <SubmissionForm />
        </Layout>
    );
};

export default HomePage;
