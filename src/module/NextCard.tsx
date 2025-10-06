import React from 'react';
import type { Activity } from '../types/activity.ts';

const NextCard: React.FC<{ activity: Activity }> = ({ activity }) => {
    return (
        <div
            className="card h-100"
            style={{
                inset: 0,
                opacity: 0.8,
            }}
        >
            {activity.image && (
                <img
                    src={activity.image}
                    alt={activity.name}
                    className="card-img-top object-fit-cover h-100"
                />
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
        </div>
    );
};

export default NextCard;
