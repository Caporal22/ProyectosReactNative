import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

export interface Empleado {
    numemp: number;
    nombre: string;
    apellidos: string;
    sueldo: number;
}

export const useEmpleados = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const db = SQLite.useSQLiteContext();

    useEffect(() => {
        setup();
    }, []);

    const setup = async () => {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS empleado (
                numemp INTEGER PRIMARY KEY,
                nombre TEXT,
                apellidos TEXT,
                sueldo REAL
            );
        `);
        await consultar();
    };

    const agregar = async (e: Empleado) => {
        await db.runAsync("INSERT INTO empleado VALUES (?, ?, ?, ?)", [
            e.numemp,
            e.nombre,
            e.apellidos,
            e.sueldo,
        ]);
        await consultar();
    };

    const buscar = async (numemp: number): Promise<Empleado | null> => {
        const result = await db.getFirstAsync<Empleado>(
            "SELECT * FROM empleado WHERE numemp = ?",
            [numemp]
        );
        return result ?? null;
    };

    const actualizar = async (e: Empleado) => {
        await db.runAsync(
            "UPDATE empleado SET nombre=?, apellidos=?, sueldo=? WHERE numemp=?",
            [e.nombre, e.apellidos, e.sueldo, e.numemp]
        );
        await consultar();
    };

    const borrar = async (numemp: number) => {
        await db.runAsync("DELETE FROM empleado WHERE numemp=?", [numemp]);
        await consultar();
    };

    const consultar = async () => {
        const result = await db.getAllAsync<Empleado>(
            "SELECT * FROM empleado ORDER BY numemp"
        );
        setEmpleados(result);
    };

    return { empleados, agregar, buscar, actualizar, borrar };
};
