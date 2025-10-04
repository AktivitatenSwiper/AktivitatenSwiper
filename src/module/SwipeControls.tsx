import React from 'react';

interface Props {
    onLike: () => void;
    onDislike: () => void;
}

const SwipeControls: React.FC<Props> = ({ onLike, onDislike }) => (
    <div className="d-flex justify-content-center gap-3 position-fixed bottom-0 start-50 translate-middle-x mb-3" style={{zIndex:"1010"}}>
        <button type="button" className="btn btn-outline-danger" onClick={onDislike} >
            ❌
        </button>
        <button type="button" className="btn btn-outline-success" onClick={onLike}>
            ❤️
        </button>
    </div>
);

export default SwipeControls;
