import React from 'react';
import type {Activity} from "../types/activity.ts";
import { useSpring, animated as a } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

interface Props {
    activity: Activity;
    onBack: () => void; // Zurück zum Swiper
}

const THRESHOLD = 120;

const DetailView: React.FC<Props> = ({ activity, onBack }) => {
    const [{ x }, api] = useSpring(() => ({
        x: 0,
        config: { tension: 300, friction: 30 },
    }));

    // Swipe zurück zum Swiper
    const bind = useGesture(
        {
            onDrag: ({ down, movement: [mx], direction: [dx], velocity }) => {
                const trigger = Math.abs(mx) > THRESHOLD;
                if (!down && trigger) {
                    api.start({ x: dx < 0 ? window.innerWidth : -window.innerWidth });
                    setTimeout(onBack, 300);
                } else {
                    api.start({
                        x: down ? mx : 0,
                        immediate: down,
                    });
                }
            },
        },
        { drag: { filterTaps: true, threshold: 10 } }
    );

    return (
        <a.div
            {...bind()}
            style={{
                x,
                touchAction: 'pan-y',
                maxWidth: '600px',
                margin: '0 auto',
            }}
            className="card"
        >
            {activity.image && (
                <img src={activity.image} className="card-img-top" alt={activity.name} />
            )}
            <div className="card-body">
                <h3>{activity.name}</h3>
                <p>
                    {activity.tags.map((t) => (
                        <span key={t} className="badge bg-secondary me-1">
              {t}
            </span>
                    ))}
                </p>
                <h5>{activity.price}</h5>

                <hr />

                <p>{activity.description}</p>

                {/* Back‑Button */}
                <button
                    type="button"
                    className="btn btn-outline-primary mt-3"
                    onClick={onBack}
                >
                    ← Zurück
                </button>
            </div>
        </a.div>
    );
};

export default DetailView;
