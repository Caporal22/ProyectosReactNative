import { db } from "@/config/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";

export interface Empleado {
    id?: string;
    numemp: number;
    nombre: string;
    apellidos: string;
    sueldo: number;
}

export const useFirebase = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);

    useEffect(() => {
        const empleadosRef = ref(db, "empleados");
        const unsub = onValue(empleadosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const lista = Object.entries(data).map(([id, val]: any) => ({
                    id,
                    ...val,
                }));
                setEmpleados(lista);
            } else {
                setEmpleados([]);
            }
        });
        return () => unsub();
    }, []);

    const agregar = async (e: Omit<Empleado, "id">) => {
        await push(ref(db, "empleados"), e);
    };

    const actualizar = async (id: string, e: Omit<Empleado, "id">) => {
        await update(ref(db, `empleados/${id}`), e);
    };

    const borrar = async (id: string) => {
        await remove(ref(db, `empleados/${id}`));
    };

    const buscar = (numemp: number): Empleado | undefined => {
        return empleados.find((e) => e.numemp === numemp);
    };

    return { empleados, agregar, actualizar, borrar, buscar };
};
