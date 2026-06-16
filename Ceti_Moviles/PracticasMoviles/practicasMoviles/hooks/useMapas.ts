import { MapType, MarkerData } from "@/viewController/types/maps.types";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export const POLYLINE_COORDS = [
    { latitude: 20.682, longitude: -103.4626 }, // Estadio Akron
    { latitude: 20.7068, longitude: -103.3273 }, // Estadio Jalisco
    { latitude: 20.6308, longitude: -103.2508 }, // CETI Tonalá
    { latitude: 20.7407, longitude: -103.3121 }, // CUAAD
];

export const useMapas = () => {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [mapType, setMapType] = useState<MapType>("standard");
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;
            const loc = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
        })();
    }, []);

    const addMarker = (coordinate: MarkerData["coordinate"]) => {
        setMarkers((prev) => [...prev, { coordinate, title: "Mi marker" }]);
    };

    return {
        markers,
        mapType,
        setMapType,
        addMarker,
        userLocation,
    };
};
