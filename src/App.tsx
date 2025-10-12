import React, {useState, useEffect} from 'react';
import type {Activity} from "./types/activity.ts";
import { activities } from './data/activities';
import ActivityCard from './module/ActivityCard';
import DetailView from './module/DetailView';
import SwipeControls from "./module/SwipeControls.tsx";
import {Button} from "react-bootstrap";
import FilterTagView from "./module/FilterTagView.tsx";

const App: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [liked, setLiked] = useState<Activity[]>([]);
    const [disliked, setDisliked] = useState<Activity[]>([]);
    const [view, setView] = useState<'swiper' | 'detail' | 'filterTag'>('swiper');
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

    const openFilterTag = () => {
        setSelectedActivity(current);
        setView('filterTag');
    }
    const backToSwiper = () => {
        setView('swiper');
        setSelectedActivity(null);
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" >
            <div style={{ aspectRatio: "9 / 16", maxHeight: "100vh",  width: "auto"}} >
                <div style={{
                    display:"grid",
                    gridTemplateColumns: "repeat(9, 1fr)",
                    gridTemplateRows:"repeat(16, 1fr)",
                    columnGap:"0px",
                    rowGap:"0px",
                    width:"100%",
                    height:"95%"}}>
                    { current && (
                        <div style={{gridArea: " 1 / 1 / 17 / 10" ,zIndex:"1000"}}>
                            <ActivityCard
                                activity={current}
                                onLike={handleLike}
                                onDislike={handleDislike}
                                onClick={openDetail}

                            />
                        </div>


                    )}
                    {view === 'detail' && selectedActivity && (
                        <div style={{gridArea: " 1 / 1 / 17 / 10",zIndex:"1001" }}>
                            <DetailView activity={selectedActivity} onBack={backToSwiper}  />
                        </div>
                    )}

                    {view === 'filterTag' && (
                        <div style={{gridArea: " 1 / 1 / 17 / 10",zIndex:"1001" }}>
                            <FilterTagView onBack={backToSwiper}  />
                        </div>
                    )}
                </div>
            </div>
            <SwipeControls onLike={handleLike} onDislike={handleDislike}  />
            <Button onClick={openFilterTag}>FilterTag</Button>

        </div>
    );
};

export default App;
