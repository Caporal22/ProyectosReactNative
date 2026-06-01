import { Barometer } from "expo-sensors";
import { useEffect, useState } from "react";

export const useBarometro = () => {
    const [pressure, setPressure] = useState(0);
    const [relativeAltitude, setRelativeAltitude] = useState(0);

    useEffect(() => {
        Barometer.setUpdateInterval(1000);

        const subscription = Barometer.addListener((data) => {
            setPressure(data.pressure);
            console.log(
                "Presión:",
                data.pressure,
                "Altitud:",
                data.relativeAltitude
            );
            if (data.relativeAltitude) {
                setRelativeAltitude(data.relativeAltitude);
            }
        });

        return () => subscription.remove();
    }, []);

    return { pressure, relativeAltitude };
};
