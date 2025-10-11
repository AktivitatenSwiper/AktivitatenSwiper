import React from 'react';
import { handleWheelFactory } from '../src/module/ActivityCard';

describe('handleWheelFactory', () => {
    let api: { start: jest.Mock };
    let onLike: jest.Mock;
    let onDislike: jest.Mock;

    beforeEach(() => {
        api = { start: jest.fn() };
        onLike = jest.fn();
        onDislike = jest.fn();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('ignores scroll when shift is not pressed', () => {
        const handler = handleWheelFactory(api, onLike, onDislike);
        const preventDefault = jest.fn();

        handler({
            shiftKey: false,
            deltaX: 50,
            preventDefault,
        } as unknown as React.WheelEvent);

        expect(preventDefault).not.toHaveBeenCalled();
        expect(api.start).not.toHaveBeenCalled();
    });

    it('calls api.start and onLike() for left swipe (deltaX < 0)', () => {
        const handler = handleWheelFactory(api, onLike, onDislike);
        const preventDefault = jest.fn();

        handler({
            shiftKey: true,
            deltaX: -50,
            preventDefault,
        } as unknown as React.WheelEvent);

        expect(preventDefault).toHaveBeenCalled();
        expect(api.start).toHaveBeenCalledWith(
            expect.objectContaining({
                x: expect.any(Number),
                rot: expect.any(Number),
                scale: 1,
            })
        );

        jest.advanceTimersByTime(100);
        expect(onLike).toHaveBeenCalled();
        expect(onDislike).not.toHaveBeenCalled();
    });

    it('calls api.start and onDislike() for right swipe (deltaX > 0)', () => {
        const handler = handleWheelFactory(api, onLike, onDislike);
        const preventDefault = jest.fn();

        handler({
            shiftKey: true,
            deltaX: 50,
            preventDefault,
        } as unknown as React.WheelEvent);

        expect(api.start).toHaveBeenCalled();
        jest.advanceTimersByTime(100);
        expect(onDislike).toHaveBeenCalled();
    });
});
