import React, {useState, useEffect} from 'react';
import type {Activity} from "./types/activity.ts";
import { activities } from './data/activities';
import ActivityCard from './module/ActivityCard';
import DetailView from './module/DetailView';
import SwipeControls from "./module/SwipeControls.tsx";
import NextCard from "./module/NextCard.tsx";
import Navbar from "./module/Navbar.tsx"

const App: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [liked, setLiked] = useState<Activity[]>([]);
    const [disliked, setDisliked] = useState<Activity[]>([]);
    const [bookmark, setBookmark] = useState<Activity[]>([]);
    const [view, setView] = useState<'swiper' | 'detail'>('swiper');
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    //als schnittstelle für click kommunikatio zwischen navbar und hier
    // @ts-ignore
    const [clicked, setClicked] = useState<{ [key: string]: boolean }>({});


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
    const next    = activities[index + 1];

    const handleLike = () => {
        setLiked([...liked, current]);
        nextCard();
    };

    const handleDislike = () => {
        setDisliked([...disliked, current]);
        nextCard();
    };

    const handleBookmark = () => {
        setBookmark([...bookmark, current]);
        //soll die nächte karte kommen wenn man bookmarkt?
        //nextCard();
    };

    const nextCard = () => {
        if (index + 2 < activities.length) setIndex(index + 1);
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

    const handleNavItemClick = (label: string) => {
        setClicked(prev => ({ ...prev, [label]: true }));
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ overflow: 'hidden', height: '100vh', width: '100vw' }}>

            <div style={{ aspectRatio: "9 / 16", maxHeight: "100vh",  width: "auto"}} >
                <div style={{
                    display:"grid",
                    gridTemplateColumns: "repeat(9, 1fr)",
                    gridTemplateRows:"repeat(16, 1fr)",
                    columnGap:"0px",
                    rowGap:"0px",
                    width:"100%",
                    height:"100%"
                }}>
                    {
                        <div style={{gridArea: " 1 / 1 / 17 / 10" ,zIndex:"0"}}>
                            <NextCard activity={next} />
                        </div>
                    }

                    {
                        <div style={{gridArea: " 1 / 1 / 1 / 10" ,zIndex:"1100"}}>
                            <Navbar onNavItemClick={handleNavItemClick} />
                        </div>
                    }

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
                        <div style={{gridArea: " 1 / 1 / 17 / 10",zIndex:"1020" }}>
                            <DetailView activity={selectedActivity} onBack={backToSwiper}  />
                        </div>
                    )}
                    {
                        <div style={{ gridArea:"  12 / 8 / 16 / 10",zIndex:"1011"}}>
                            <SwipeControls onLike={handleLike} onDislike={handleDislike} onBookmark={handleBookmark}  />
                        </div>
                    }
                </div>
            </div>



        </div>
    );
};

export default App;
