import { handleTheWheelEvent, resetInertiaScrolling } from '../src/card-handlers/trackpad-handler';
describe('handleTheWheelEvent', () => {
    let originalDOMMatrixReadOnly: any;

    beforeEach(() => {
        originalDOMMatrixReadOnly = window.DOMMatrixReadOnly;
    });

    afterEach(() => {
        window.DOMMatrixReadOnly = originalDOMMatrixReadOnly;
        resetInertiaScrolling()
    });

    it('should call doAction("like") when wheel scrolls right', () => {
        // Mock DOMMatrixReadOnly to return specific m41 and m42 values
        (window as any).DOMMatrixReadOnly = class {
            m41 = 30;
            m42 = 0;
            constructor() {}
        };

        const mockDoAction = jest.fn(() => jest.fn());
        const mockDiv = document.createElement('div');
        mockDiv.style.width = '50px';
        mockDiv.style.height = '50px';
        Object.defineProperty(mockDiv, 'offsetWidth', { value: 50 });
        Object.defineProperty(mockDiv, 'offsetHeight', { value: 50 });

        const wheelEvent = {
            event: new WheelEvent('wheel', { deltaX: 30 }),
            delta: [30, 0],
            direction: 1,
            velocity: 1,
            xy: [0, 0],
            previous: [0, 0],
            initial: [0, 0],
            movement: [30, 0],
            memo: undefined,
            first: false,
            last: false,
            active: true,
            timeStamp: Date.now(),
            cancel: jest.fn(),
            canceled: false,
            args: [],
            type: 'wheel',
        } as any;

        handleTheWheelEvent(wheelEvent, mockDiv, mockDoAction);

        expect(mockDoAction).toHaveBeenCalledWith('like');
        // Optionally, check that the returned function is called
        expect(typeof mockDoAction.mock.results[0].value).toBe('function');
    });

    it('should call doAction("dislike") when wheel scrolls right', () => {
        // Mock DOMMatrixReadOnly to return specific m41 and m42 values
        (window as any).DOMMatrixReadOnly = class {
            m41 = -30;
            m42 = 0;
            constructor() {}
        };

        const mockDoAction = jest.fn(() => jest.fn());
        const mockDiv = document.createElement('div');
        mockDiv.style.width = '50px';
        mockDiv.style.height = '50px';
        Object.defineProperty(mockDiv, 'offsetWidth', { value: 50 });
        Object.defineProperty(mockDiv, 'offsetHeight', { value: 50 });

        const wheelEvent = {
            event: new WheelEvent('wheel', { deltaX: -30 }),
            delta: [-30, 0],
            direction: 1,
            velocity: 1,
            xy: [0, 0],
            previous: [0, 0],
            initial: [0, 0],
            movement: [-30, 0],
            memo: undefined,
            first: false,
            last: false,
            active: true,
            timeStamp: Date.now(),
            cancel: jest.fn(),
            canceled: false,
            args: [],
            type: 'wheel',
        } as any;

        handleTheWheelEvent(wheelEvent, mockDiv, mockDoAction);

        expect(mockDoAction).toHaveBeenCalledWith('dislike');
        // Optionally, check that the returned function is called
        expect(typeof mockDoAction.mock.results[0].value).toBe('function');
    });


    it('should call doAction("info") when wheel scrolls up', () => {
        // Mock DOMMatrixReadOnly to return specific m41 and m42 values
        (window as any).DOMMatrixReadOnly = class {
            m41 = 0;
            m42 = -30;
            constructor() {}
        };

        const mockDoAction = jest.fn(() => jest.fn());
        const mockDiv = document.createElement('div');
        mockDiv.style.width = '50px';
        mockDiv.style.height = '50px';
        Object.defineProperty(mockDiv, 'offsetWidth', { value: 50 });
        Object.defineProperty(mockDiv, 'offsetHeight', { value: 50 });

        const wheelEvent = {
            event: new WheelEvent('wheel', { deltaY: -30 }),
            delta: [0, -30],
            direction: 1,
            velocity: 1,
            xy: [0, 0],
            previous: [0, 0],
            initial: [0, 0],
            movement: [0, -30],
            memo: undefined,
            first: false,
            last: false,
            active: true,
            timeStamp: Date.now(),
            cancel: jest.fn(),
            canceled: false,
            args: [],
            type: 'wheel',
        } as any;

        handleTheWheelEvent(wheelEvent, mockDiv, mockDoAction);

        expect(mockDoAction).toHaveBeenCalledWith('info');
        // Optionally, check that the returned function is called
        expect(typeof mockDoAction.mock.results[0].value).toBe('function');
    });

    it('should not call doAction when wheel scrolls down', () => {
        // Mock DOMMatrixReadOnly to return specific m41 and m42 values
        (window as any).DOMMatrixReadOnly = class {
            m41 = 0;
            m42 = 30;
            constructor() {}
        };

        const mockDoAction = jest.fn(() => jest.fn());
        const mockDiv = document.createElement('div');
        mockDiv.style.width = '50px';
        mockDiv.style.height = '50px';
        Object.defineProperty(mockDiv, 'offsetWidth', { value: 50 });
        Object.defineProperty(mockDiv, 'offsetHeight', { value: 50 });

        const wheelEvent = {
            event: new WheelEvent('wheel', { deltaY: 30 }),
            delta: [0, 30],
            direction: 1,
            velocity: 1,
            xy: [0, 0],
            previous: [0, 0],
            initial: [0, 0],
            movement: [0, 30],
            memo: undefined,
            first: false,
            last: false,
            active: true,
            timeStamp: Date.now(),
            cancel: jest.fn(),
            canceled: false,
            args: [],
            type: 'wheel',
        } as any;

        handleTheWheelEvent(wheelEvent, mockDiv, mockDoAction);

        expect(mockDoAction).not.toHaveBeenCalled();
    });

    it('should not call doAction for small wheel movements', () => {
        (window as any).DOMMatrixReadOnly = class {
            m41 = 2;
            m42 = 2;
            constructor() {}
        };

        const mockDoAction = jest.fn(() => jest.fn());
        const mockDiv = document.createElement('div');
        mockDiv.style.width = '50px';
        mockDiv.style.height = '50px';
        Object.defineProperty(mockDiv, 'offsetWidth', { value: 50 });
        Object.defineProperty(mockDiv, 'offsetHeight', { value: 50 });

        const wheelEvent = {
            event: new WheelEvent('wheel', { deltaX: 2, deltaY: 2 }),
            delta: [2, 2],
            direction: 1,
            velocity: 1,
            xy: [0, 0],
            previous: [0, 0],
            initial: [0, 0],
            movement: [2, 2],
            memo: undefined,
            first: false,
            last: false,
            active: true,
            timeStamp: Date.now(),
            cancel: jest.fn(),
            canceled: false,
            args: [],
            type: 'wheel',
        } as any;

        handleTheWheelEvent(wheelEvent, mockDiv, mockDoAction);

        expect(mockDoAction).not.toHaveBeenCalled();
    });
});
