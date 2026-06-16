import { useEffect, useState } from 'react';
import { BarreClass } from '../../../types/class';
import { classesFirebaseRepo } from '../services/classes.firebase';

export function useClasses() {
  const [classes, setClasses] = useState<BarreClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = classesFirebaseRepo.observeAll((data) => {
      setClasses(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { classes, loading };
}
