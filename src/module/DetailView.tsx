import React from 'react';
import type {Activity} from "../types/activity.ts";

interface Props {
    height: number;
    activity: Activity;
    onBack: () => void;
}

const DetailView: React.FC<Props> = ({ height, activity, onBack }) => {
    return (
        <div >
            <div style={{height:height/2 +"px"}} onClick={onBack}></div>
                <div className="card-body rounded" style={{height:height/2 +"px", background:"rgb(255,255,255)", width:"95%", margin: "auto",}}>
                    <div style={{margin:"10px"}}>


                    <h3>{activity.name}</h3>
                        <p>
                            {activity.tags.map((t) => (
                                <span key={t} className="badge bg-secondary me-1">{t}</span>
                            ))}
                        </p>
                        <h5>{activity.price}</h5>

                        <hr />

                        <p>{activity.description}</p>

                        <button
                            type="button"
                            className="btn btn-outline-primary mt-3"
                            onClick={onBack}
                        >
                            ← Zurück
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default DetailView;
