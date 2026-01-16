import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Station } from '../../types'

const MOCK_DATA: Station[] = [
    {
        id: "ST-001",
        name: "Station Plateau",
        status: "active",
        available_batteries: 12,
        total_swaps_today: 34
    },
    {
        id: "ST-002",
        name: "Station Cocody",
        status: "maintenance",
        available_batteries: 0,
        total_swaps_today: 0
    },
    {
        id: "ST-003",
        name: "Station Yopougon",
        status: "active",
        available_batteries: 5,
        total_swaps_today: 21
    }
];

interface StationsState {
    stations: Station[];
}

const initialState: StationsState = {
    stations: MOCK_DATA,
};

export const stationsSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {
        toggleStatus: (state, action: PayloadAction<string>) => {
            const station = state.stations.find(s => s.id === action.payload);
            if (station) {
                station.status = station.status === 'active' ? 'maintenance' : 'active';
            }
        },
        // Mock action to simulation receiving real-time updates (optional for now)
        updateStation: (state, action: PayloadAction<Station>) => {
            const index = state.stations.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                state.stations[index] = action.payload;
            }
        }
    },
})

export const { toggleStatus, updateStation } = stationsSlice.actions

export default stationsSlice.reducer
