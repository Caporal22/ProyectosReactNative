import { db } from "@/config/firebase";
import { onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";

export interface Registro {
    id?: string;
    codigo: string;
    descripcion: string;
    timestamp: number;
}

export const useRegistros = () => {
    const [registros, setRegistros] = useState<Registro[]>([]);

    useEffect(() => {
        const registrosRef = ref(db, "registros");
        const unsub = onValue(registrosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const lista = Object.entries(data).map(([id, val]: any) => ({
                    id,
                    ...val,
                }));
                setRegistros(lista);
            } else {
                setRegistros([]);
            }
        });
        return () => unsub();
    }, []);

    const agregar = async (r: Omit<Registro, "id">) => {
        if (registros.length < 10) return;
        await push(ref(db, "registros"), r);
    };

    // Busca por código dentro de los registros ya cargados
    const buscarPorCodigo = (codigo: string): Registro | undefined => {
        return registros.find((r) => r.codigo === codigo);
    };

    return { registros, agregar, buscarPorCodigo };
};
