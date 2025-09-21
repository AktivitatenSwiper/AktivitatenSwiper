import React from 'react';

interface Props {
    onLike: () => void;
    onDislike: () => void;
}

const SwipeControls: React.FC<Props> = ({ onLike, onDislike }) => (
    <div className="d-flex justify-content-center mt-3 gap-3">
        <button type="button" className="btn btn-outline-danger" onClick={onDislike}>
            ❌
        </button>
        <button type="button" className="btn btn-outline-success" onClick={onLike}>
            ❤️
        </button>
    </div>
);

export default SwipeControls;
