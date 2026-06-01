import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";

export const useAcelerometro = () => {
    const [data, setData] = useState({ x: 0, y: 0, z: 0 });
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        Accelerometer.setUpdateInterval(100);

        const subscription = Accelerometer.addListener((accelerometerData) => {
            setData(accelerometerData);
            const { x, y, z } = accelerometerData;
            // Magnitud total del movimiento
            const total = Math.sqrt(x * x + y * y + z * z);
            // Si supera 1.5 está siendo agitado
            setIsShaking(total > 1.5);
        });

        // Cleanup - para no tener memory leaks
        return () => subscription.remove();
    }, []);

    return { data, isShaking };
};
