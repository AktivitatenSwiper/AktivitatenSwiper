import React, {type ChangeEvent, useEffect} from 'react';
import {activities} from "../data/activities.ts";
import { useState } from 'react';
import FilterTagView from "../module/FilterTagView.tsx";
import {Button} from "react-bootstrap";

interface Props {
    onBack: () => void;
}




const FilterView: React.FC<Props> = ({  onBack }) => {

    let tags:string[] = [];
    activities.forEach((activity) => {
        activity.tags.forEach((tag) => {
            if (!tags.some(e => e.toLowerCase() === tag.toLowerCase())) {
                tags.push(tag);
            }
        })
    });


    const categories = ["Any", "Kultur", "Sport", "Essen & Trinken", "Outdoor", "Indoor", "Entspannung", "Abenteuer", "Soziales", "Sonstige"];

    // Typed state
    const [inputValue, setInputValue] = useState<string>("Any"); // default value
    const [filteredOptions, setFilteredOptions] = useState<string[]>(categories);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Filter options when input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setFilteredOptions(
            categories.filter((category) =>
                category.toLowerCase().includes(value.toLowerCase())
            )
        );
        setIsOpen(true);
    };

    // Handle clicking an option
    const handleOptionClick = (option: string) => {
        setInputValue(option);
        setIsOpen(false);
    };

    // Handle blur (when user leaves input)
    const handleBlur = (e: FocusEvent ) => {
        // Small delay so the click on a list item still registers
        setTimeout(() => {
            // Prevent user from typing invalid text
            if (!categories.includes(inputValue)) {
                setInputValue(categories[0]); // fallback to default
            }
            setIsOpen(false);
        }, 100);
    };


    // location type
    const locationTypes = ["Any", "Indoor", "Outdoor", "Both"];

    // Typed state
    const [inputValueLocation, setInputValueLocation] = useState<string>("Any"); // default value
    const [filteredOptionsLocation, setFilteredOptionsLocation] = useState<string[]>(categories);
    const [isOpenLocation, setIsOpenLocation] = useState<boolean>(false);

    // Filter options when input changes
    const handleInputChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValueLocation(value);
        setFilteredOptionsLocation(
            locationTypes.filter((locationType) =>
                locationType.toLowerCase().includes(value.toLowerCase())
            )
        );
        setIsOpen(true);
    };

    // Handle clicking an option
    const handleOptionClickLocation = (option: string) => {
        setInputValueLocation(option);
        setIsOpenLocation(false);
    };

    // Handle blur (when user leaves input)
    const handleBlurLocation = (e: FocusEvent ) => {
        // Small delay so the click on a list item still registers
        setTimeout(() => {
            // Prevent user from typing invalid text
            if (!locationTypes.includes(inputValueLocation)) {
                setInputValueLocation(categories[0]); // fallback to default
            }
            setIsOpenLocation(false);
        }, 100);
    };

    // Optional: reset filtered list when value changes
    useEffect(() => {
        setFilteredOptionsLocation(locationTypes);
    }, [locationTypes]);

    //Tag View components
    const [view, setView] = useState<'filter' | 'filterTag'>('filter');

    const backFilter = () => {
        setView('filter');
    }

    const openFilterTag = () => {
        setView('filterTag');
    }

    const [minReqTime, setMinReqTime] = useState<number | null>(null);
    const [maxReqTime, setMaxReqTime] = useState<number | null>(null);

    const [minParticipants, setMinParticipants] = useState<number | null>(null);
    const [maxParticipants, setMaxParticipants] = useState<number | null>(null);

    const [minCost, setMinCost] = useState<number | null>(null);
    const [maxCost, setMaxCost] = useState<number | null>(null);

    const handleChange =
        (setter: React.Dispatch<React.SetStateAction<number | null>>) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setter(value === "" ? null : Number(value));
            };

    //TODO: seasonal suitability

    return (
        <div style={{height:"100%",width:"100%"}}>
            {/*<div style={{minHeight:"50%", maxHeight:"50%"}} onClick={onBack}></div>*/}
            <div style={{minHeight:"50%", maxHeight:"50%",padding:"5px",display:"flex" }} >
                <div className="card-body roundenpd" style={{ background:"rgb(255,255,255)", padding:"10px", minHeight:"100%", display:"flex", justifyContent:"space-between", flexDirection:"column"}}>


                    <div className="d-flex flex-wrap gap-2">
                        {view === 'filter' && (
                            <div>
                                {/*Combo Boxes*/}
                                <div>
                                <div
                                    style={{
                                        position: "relative",
                                        display: "inline-block",
                                    }}
                                >
                                    <label htmlFor="categories-combobox" style={{display: "block", marginBottom: 4}}>
                                        Filter categories:
                                    </label>
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onFocus={() => setIsOpen(true)}
                                        placeholder="Select or type..."
                                        onBlur={handleBlur}

                                        style={{
                                            width: 200,
                                            boxSizing: "border-box",
                                        }}/>

                                    {isOpen && filteredOptions.length > 0 && (
                                        <ul
                                            style={{
                                                listStyle: "none",
                                                margin: 0,
                                                padding: "4px 0",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px",
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                background: "white",
                                                zIndex: 10,
                                                maxHeight: "150px",
                                                overflowY: "auto",
                                                width: "100%",
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            {filteredOptions.map((option) => (
                                                <li
                                                    key={option}
                                                    onMouseDown={() => handleOptionClick(option)}
                                                    style={{
                                                        padding: "4px 8px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div
                                    style={{
                                        position: "relative",
                                        display: "inline-block",
                                    }}
                                >
                                    <label htmlFor="location-type-combobox" style={{display: "block", marginBottom: 4}}>
                                        Filter Location Types:
                                    </label>
                                    <input
                                        type="text"
                                        value={inputValueLocation}
                                        onChange={handleInputChangeLocation}
                                        onFocus={() => setIsOpenLocation(true)}
                                        placeholder="Select or type..."
                                        onBlur={handleBlurLocation}

                                        style={{
                                            width: 200,
                                            boxSizing: "border-box",
                                        }}/>

                                    {isOpenLocation && filteredOptionsLocation.length > 0 && (
                                        <ul
                                            style={{
                                                listStyle: "none",
                                                margin: 0,
                                                padding: "4px 0",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px",
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                background: "white",
                                                zIndex: 10,
                                                maxHeight: "150px",
                                                overflowY: "auto",
                                                width: "100%",
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            {filteredOptionsLocation.map((option) => (
                                                <li
                                                    key={option}
                                                    onMouseDown={() => handleOptionClickLocation(option)}
                                                    style={{
                                                        padding: "4px 8px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "400px" }}>
                                    {/* Time */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span>Min Required Time:</span>
                                            <input
                                                type="number"
                                                value={minReqTime ?? ""}
                                                onChange={handleChange(setMinReqTime)}
                                                placeholder="minimum"
                                                style={{ width: "120px", marginLeft: "8px" }}
                                            />
                                        </label>
                                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span>Max Required Time:</span>
                                            <input
                                                type="number"
                                                value={maxReqTime ?? ""}
                                                onChange={handleChange(setMaxReqTime)}
                                                placeholder="maximum"
                                                style={{ width: "120px", marginLeft: "8px" }}
                                            />
                                        </label>
                                    </div>

                                    {/* Participants */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span>Min Participants:</span>
                                            <input
                                                type="number"
                                                value={minParticipants ?? ""}
                                                onChange={handleChange(setMinParticipants)}
                                                placeholder="minimum"
                                                style={{ width: "120px", marginLeft: "8px" }}
                                            />
                                        </label>
                                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span>Max Participants:</span>
                                            <input
                                                type="number"
                                                value={maxParticipants ?? ""}
                                                onChange={handleChange(setMaxParticipants)}
                                                placeholder="maximum"
                                                style={{ width: "120px", marginLeft: "8px" }}
                                            />
                                        </label>
                                    </div>

                                    {/* Cost */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span>Min Cost:</span>
                                            <input
                                                type="number"
                                                value={minCost ?? ""}
                                                onChange={handleChange(setMinCost)}
                                                placeholder="minimum"
                                                style={{ width: "120px", marginLeft: "8px" }}
                                            />
                                        </label>
                                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span>Max Cost:</span>
                                            <input
                                                type="number"
                                                value={maxCost ?? ""}
                                                onChange={handleChange(setMaxCost)}
                                                placeholder="maximum"
                                                style={{ width: "120px", marginLeft: "8px" }}
                                            />
                                        </label>
                                    </div>
                                </div>
                                    {/* Open Tag Filter */}
                                    <div>
                                        <Button onClick={openFilterTag}>FilterTag</Button>
                                    </div>


                            </div>
                        )}
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                        {view === 'filterTag' && (
                            <div style={{gridArea: " 1 / 1 / 17 / 10",zIndex:"1001" }}>
                                <FilterTagView onBack={backFilter}  />
                            </div>
                        )}
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

export default FilterView;