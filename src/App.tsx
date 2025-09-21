import React, {useState, useEffect, useRef} from 'react';
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

    // Tastatur‑Pfeiltasten
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
        else alert('Alle Karten wurden durchgeswiped!');
    };

    const openDetail = () => {
        setSelectedActivity(current);
        setView('detail');
    };

    const backToSwiper = () => {
        setView('swiper');
        setSelectedActivity(null);
    };

    const CardRef = useRef<HTMLDivElement>(null);
    const [CardHeight, setCardHeight] = useState(0);

    useEffect(() => {
        if (CardRef.current) {
            const rect = CardRef.current.getBoundingClientRect();
            setCardHeight(rect.height); // px anhängen, wenn du es als CSS-Wert benutzen willst
            //console.log( rect.height);
        }
    }, [selectedActivity]);


    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" >
            <div  ref={CardRef} style={{ aspectRatio: "9 / 16", maxHeight: "100vh",  width: "auto"}} >
                { current && (

                    <ActivityCard
                        activity={current}
                        onLike={handleLike}
                        onDislike={handleDislike}
                        onClick={openDetail}

                    />
                )}
                {view === 'detail' && selectedActivity && (

                    <div style={{
                        position: "relative",
                        top: "-" +CardHeight +"px"

                    }}>
                        <DetailView height={CardHeight} activity={selectedActivity} onBack={backToSwiper}  />
                    </div>
                )}
            </div>
            <SwipeControls onLike={handleLike} onDislike={handleDislike}  />


        </div>
    );
};

export default App;
