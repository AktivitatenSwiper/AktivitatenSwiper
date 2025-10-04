import React from 'react';
import type {Activity} from "../types/activity.ts";

interface Props {
    activity: Activity;
    onBack: () => void;
}

const DetailView: React.FC<Props> = ({  activity, onBack }) => {
    return (
        <div style={{height:"100%",width:"100%"}}>
            <div style={{minHeight:"50%", maxHeight:"50%"}} onClick={onBack}></div>
            <div style={{minHeight:"50%", maxHeight:"50%",padding:"5px",display:"flex" }} >
                <div className="card-body rounded" style={{ background:"rgb(255,255,255)", padding:"10px", minHeight:"100%", display:"flex", justifyContent:"space-between", flexDirection:"column"}}>


                    <div>
                        <h3>{activity.name}</h3>
                        <p>
                            {activity.tags.map((t) => (
                                <span key={t} className="badge bg-secondary me-1">{t}</span>
                            ))}
                        </p>
                        <h5>{activity.price}</h5>

                        <hr />
                        <p>{activity.description}</p>
                    </div>



                    <div>
                        <button
                            type="button"
                            className="btn btn-outline-primary mt-3  mt-auto"
                            onClick={onBack}
                        >
                            ← Zurück
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailView;
