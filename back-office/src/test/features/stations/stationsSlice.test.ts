import { describe, it, expect } from 'vitest';
import stationsReducer, { toggleStatus } from '../../../features/stations/stationsSlice';
import type { Station } from '../../../types';

describe('stations reducer', () => {
    const initialState = {
        stations: [
            {
                id: "TEST-1",
                name: "Test Station",
                status: "active",
                available_batteries: 10,
                total_swaps_today: 5
            } as Station
        ]
    };

    it('should handle toggleStatus', () => {
        const actual = stationsReducer(initialState, toggleStatus("TEST-1"));
        expect(actual.stations[0].status).toEqual("maintenance");

        const toggledBack = stationsReducer(actual, toggleStatus("TEST-1"));
        expect(toggledBack.stations[0].status).toEqual("active");
    });
});
