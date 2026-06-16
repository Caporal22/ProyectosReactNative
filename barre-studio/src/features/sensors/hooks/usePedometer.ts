
import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';

export function usePedometer() {
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    (async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);
      if (!available) return;

      
      subscription = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
      });
    })();

    return () => subscription?.remove(); 
  }, []);

  return { steps, isAvailable };
}
