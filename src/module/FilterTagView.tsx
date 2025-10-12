import React from 'react';
import { useState } from "react";
import {activities} from "../data/activities.ts";
/*import {forEach} from "react-bootstrap/ElementChildren";
import type {Activity} from "../types/activity.ts";
import {Button} from "react-bootstrap";
*/
interface Props {
    onBack: () => void;
}

type ButtonState = 0 | 1 | 2;

const FilterTagView: React.FC<Props> = ({  onBack }) => {

    let tags:string[] = [];
    activities.forEach((activity) => {
        activity.tags.forEach((tag) => {
            if (!tags.some(e => e.toLowerCase() === tag.toLowerCase())) {
                tags.push(tag);
            }
        })
    });

    const [buttonStates, setButtonStates] = useState<Record<string, ButtonState>>({});

    const handleClick = (label: string) => {
        setButtonStates((prev) => {
            const current = prev[label] ?? 0;
            const next = ((current + 1) % 3) as ButtonState;
            return { ...prev, [label]: next };
        });
    };

    // choose a Bootstrap color variant based on the state
    const getBootstrapClass = (state: ButtonState): string => {
        switch (state) {
            case 1:
                return "btn btn-success";   // green
            case 2:
                return "btn btn-danger";    // red
            default:
                return "btn btn-secondary"; // grey
        }
    };

    return (
        <div style={{height:"100%",width:"100%"}}>
            {/*<div style={{minHeight:"50%", maxHeight:"50%"}} onClick={onBack}></div>*/}
            <div style={{minHeight:"50%", maxHeight:"50%",padding:"5px",display:"flex" }} >
                <div className="card-body roundenpd" style={{ background:"rgb(255,255,255)", padding:"10px", minHeight:"100%", display:"flex", justifyContent:"space-between", flexDirection:"column"}}>


                    <div className="d-flex flex-wrap gap-2">
                        {tags.map((label) => {
                            const state = buttonStates[label] ?? 0;
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => handleClick(label)}
                                    className={`${getBootstrapClass(state)}`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>



                    <div>
                        <button
                            type="button"
                            className="btn btn-outline-primary mt-3  mt-auto"
                            onClick={onBack}
                        >
                            ← Zurück
                        </button>
                        {/* TODO: Add Apply Button */}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FilterTagView;