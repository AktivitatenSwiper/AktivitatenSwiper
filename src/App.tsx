import React, { useState, useEffect } from 'react';
import type {Activity} from "./types/activity.ts";
import { activities } from './data/activities';
import ActivityCard from './module/ActivityCard';
import DetailView from './module/DetailView';
import SwipeControls from "./module/SwipeControls.tsx";

const App: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [liked, setLiked] = useState<Activity[]>([]);
    const [disliked, setDisliked] = useState<Activity[]>([]);
    const [view, setView] = useState<'swiper' | 'detail'>('swiper');
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    // --- Tastatur‑Pfeiltasten
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (view !== 'swiper') return;          // Nur im Swiper-Modus

            if (e.key === 'ArrowRight') handleLike();
            else if (e.key === 'ArrowLeft') handleDislike();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [view, index]);

    const current = activities[index];

    const handleLike = () => {
        setLiked([...liked, current]);
        nextCard();
    };

    const handleDislike = () => {
        setDisliked([...disliked, current]);
        nextCard();
    };

    const nextCard = () => {
        if (index + 1 < activities.length) setIndex(index + 1);
        else alert('Alle Karten wurden durchgeswiped!'); // Ende‑Message
    };

    const openDetail = () => {
        setSelectedActivity(current);
        setView('detail');
    };

    const backToSwiper = () => {
        setView('swiper');
        setSelectedActivity(null);
    };

    return (
        <div className="container py-4">
            {view === 'swiper' && current && (
                <ActivityCard
                    activity={current}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    onClick={openDetail}
                />
            )}

            {view === 'detail' && selectedActivity && (
                <DetailView activity={selectedActivity} onBack={backToSwiper} />
            )}
            <SwipeControls onLike={handleLike} onDislike={handleDislike} />

        </div>
    );
};

export default App;
