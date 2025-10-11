import React from 'react';
import type {Activity} from "../types/activity.ts";
import { useSpring, animated as a } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

// for unit test
export const handleWheelFactory = (
    api: { start: (params: { x: number; rot: number; scale: number }) => void },
    onLike: () => void,
    onDislike: () => void
) => (e: React.WheelEvent) => {
    if (!e.shiftKey) return;
    e.preventDefault();
    const dir = e.deltaX > 0 ? -1 : 1;
    api.start({ x: dir * window.innerWidth, rot: dir * 20, scale: 1 });
    setTimeout(() => (dir === 1 ? onLike() : onDislike()), 100);
};

interface Props {
    activity: Activity;
    onLike: () => void;
    onDislike: () => void;
    onClick: () => void;
}

const THRESHOLD = 120; // Pixel Like/Dislike gilt

const ActivityCard: React.FC<Props> = ({ activity, onLike, onDislike, onClick }) => {
    const [{ x, y, rot, scale }, api] = useSpring(() => ({
        x: 0,
        y: 0,
        rot: 0,
        scale: 1,
        config: { tension: 300, friction: 30 },
    }));

    // Swipe
    // @ts-ignore
    const bind = useGesture(
        {
            onDrag: ({ down, movement: [mx], direction: [dx],  }) => {
                const trigger = Math.abs(mx) > THRESHOLD;


                if (!down && trigger) {
                    // Swipe abgeschlossen
                    const dir = dx < 0 ? -1 : 1; // linke/ rechte Richtung
                    api.start({ x: dir * window.innerWidth, rot: dir * 20, scale: 1 });
                    setTimeout(() => (dir === 1 ? onLike() : onDislike()), 100);
                } else {
                    api.start({
                        x: down ? mx : 0,
                        y: down ? 0 : 0,
                        rot: down ? mx / 20 : 0,
                        scale: down ? 0.95 : 1,
                        immediate: down,
                    });
                }

            },
        },
        {
            drag: { filterTaps: true, threshold: 10 },
        }
    );

    // Touchpad (zwei finger seidlich links rechts)
    const handleWheel = handleWheelFactory(api, onLike, onDislike)

    return (
        <a.div
            {...bind()}
            onWheel={handleWheel}
            style={{
                x,
                y,
                rotate: rot,
                scale,
                touchAction: 'pan-y',
                maxWidth: '100%',
                width: '100%',
            }}
            className="card h-100"
            role="button"
            aria-pressed="false"
        >
            {activity.image && (
                <img src={activity.image} className="card-img-top object-fit-cover h-100" alt={activity.name}   />
            )}
            <div className="card-body">
                <h5 className="card-title">{activity.name}</h5>
                <p className="card-text">
                    {activity.tags.map((t) => (
                        <span key={t} className="badge bg-secondary me-1">
            {t}
          </span>
                    ))}
                </p>
                <p className="card-text">{activity.price}</p>
            </div>

            <a
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                role="button"
                aria-label="Mehr Infos anzeigen"
                style={{
                    position: 'absolute',
                    inset: 0,
                    cursor: 'pointer',
                }}
            />
        </a.div>
    );
};

export default ActivityCard;
