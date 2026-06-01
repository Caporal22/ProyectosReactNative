export interface MarkerData {
    coordinate: {
        latitude: number;
        longitude: number;
    };
    title: string;
    description?: string;
    pinColor?: string;
}

export type MapType = "standard" | "satellite" | "hybrid" | "terrain";
