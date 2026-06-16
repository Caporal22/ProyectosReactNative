import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";

export const usePodometro = () => {
    const [steps, setSteps] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        let subscription: any;

        (async () => {
            const { granted } = await Pedometer.requestPermissionsAsync();
            if (!granted) return;

            const available = await Pedometer.isAvailableAsync();
            setIsAvailable(available);

            if (available) {
                subscription = Pedometer.watchStepCount((result) => {
                    console.log("Pasos:", result.steps);
                    setSteps(result.steps);
                });
            }
        })();

        return () => subscription?.remove();
    }, []);

    return { steps, isAvailable };
};
