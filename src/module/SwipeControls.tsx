import React from 'react';

interface Props {
    onLike: () => void;
    onDislike: () => void;
    onBookmark: () => void;
}

const SwipeControls: React.FC<Props> = ({ onLike, onDislike, onBookmark }) => (
    <div className="d-flex flex-column align-items-center">
        <button type="button" className="btn btn-outline-danger " onClick={onDislike}>
            ❌
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={onBookmark}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
        </button>
        <button type="button" className="btn btn-outline-success" onClick={onLike}>
            ❤️
        </button>
    </div>
);

export default SwipeControls;
