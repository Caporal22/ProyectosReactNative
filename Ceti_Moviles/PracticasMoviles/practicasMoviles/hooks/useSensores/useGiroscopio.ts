import { Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";

export const useGiroscopio = () => {
    const [data, setData] = useState({ x: 0, y: 0, z: 0 });
    const [isRotating, setIsRotating] = useState(false);

    useEffect(() => {
        Gyroscope.setUpdateInterval(100);

        const subscription = Gyroscope.addListener((gyroscopeData) => {
            setData(gyroscopeData);
            const { x, y, z } = gyroscopeData;
            // Magnitud total del movimiento
            const total = Math.sqrt(x * x + y * y + z * z);
            // Si supera 1.5 está siendo agitado
            setIsRotating(total > 0.5);
        });

        // Cleanup - para no tener memory leaks
        return () => subscription.remove();
    }, []);

    return { data, isRotating };
};
