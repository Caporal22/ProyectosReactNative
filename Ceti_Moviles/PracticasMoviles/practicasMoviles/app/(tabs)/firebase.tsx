import { useFirebase } from "@/hooks/useFirebase/useFirebase";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FirebaseScreen() {
    const { empleados, agregar, actualizar, borrar, buscar } = useFirebase();

    const [numemp, setNumemp] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [sueldo, setSueldo] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const limpiar = () => {
        setNumemp("");
        setNombre("");
        setApellidos("");
        setSueldo("");
        setSelectedId(null);
    };

    const handleAgregar = async () => {
        if (!numemp || !nombre || !apellidos || !sueldo) {
            Alert.alert("Error", "Completa todos los campos");
            return;
        }
        await agregar({
            numemp: parseInt(numemp),
            nombre,
            apellidos,
            sueldo: parseFloat(sueldo),
        });
        Alert.alert("Éxito", "Empleado registrado en Firebase");
        limpiar();
    };

    const handleBuscar = () => {
        if (!numemp) {
            Alert.alert("Error", "Ingresa número de empleado");
            return;
        }
        const emp = buscar(parseInt(numemp));
        if (emp) {
            setNombre(emp.nombre);
            setApellidos(emp.apellidos);
            setSueldo(emp.sueldo.toString());
            setSelectedId(emp.id!);
        } else {
            Alert.alert("No encontrado", "Empleado no existe");
        }
    };

    const handleActualizar = async () => {
        if (!selectedId) {
            Alert.alert("Error", "Busca primero el empleado");
            return;
        }
        await actualizar(selectedId, {
            numemp: parseInt(numemp),
            nombre,
            apellidos,
            sueldo: parseFloat(sueldo),
        });
        Alert.alert("Éxito", "Empleado actualizado");
        limpiar();
    };

    const handleBorrar = async () => {
        if (!selectedId) {
            Alert.alert("Error", "Busca primero el empleado");
            return;
        }
        await borrar(selectedId);
        Alert.alert("Éxito", "Empleado eliminado");
        limpiar();
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Text style={styles.title}>Firebase — Empleados</Text>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de empleado"
                            placeholderTextColor="#7a8cae"
                            keyboardType="numeric"
                            value={numemp}
                            onChangeText={setNumemp}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#7a8cae"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Apellidos"
                            placeholderTextColor="#7a8cae"
                            value={apellidos}
                            onChangeText={setApellidos}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Sueldo"
                            placeholderTextColor="#7a8cae"
                            keyboardType="decimal-pad"
                            value={sueldo}
                            onChangeText={setSueldo}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <Pressable
                            style={[styles.btn, styles.btnAdd]}
                            onPress={handleAgregar}
                        >
                            <Ionicons
                                name="add-circle"
                                size={22}
                                color="#fff"
                            />
                            <Text style={styles.btnText}>Agregar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, styles.btnSearch]}
                            onPress={handleBuscar}
                        >
                            <Ionicons name="search" size={22} color="#fff" />
                            <Text style={styles.btnText}>Buscar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, styles.btnUpdate]}
                            onPress={handleActualizar}
                        >
                            <Ionicons name="refresh" size={22} color="#fff" />
                            <Text style={styles.btnText}>Actualizar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, styles.btnDelete]}
                            onPress={handleBorrar}
                        >
                            <Ionicons name="trash" size={22} color="#fff" />
                            <Text style={styles.btnText}>Borrar</Text>
                        </Pressable>
                    </View>

                    <Text style={styles.subtitle}>
                        Empleados en tiempo real
                    </Text>
                    <FlatList
                        data={empleados}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id!}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.card}
                                onPress={() => {
                                    setNumemp(item.numemp.toString());
                                    setNombre(item.nombre);
                                    setApellidos(item.apellidos);
                                    setSueldo(item.sueldo.toString());
                                    setSelectedId(item.id!);
                                }}
                            >
                                <Text style={styles.cardTitle}>
                                    #{item.numemp} — {item.nombre}{" "}
                                    {item.apellidos}
                                </Text>
                                <Text style={styles.cardSub}>
                                    Sueldo: ${item.sueldo.toFixed(2)}
                                </Text>
                            </Pressable>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.empty}>
                                Sin empleados registrados
                            </Text>
                        }
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0d1b2a" },
    scroll: { padding: 20 },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#a8c0ff",
        marginTop: 20,
        marginBottom: 10,
    },
    form: { gap: 10 },
    input: {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: 12,
        color: "#fff",
        fontSize: 15,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    buttons: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 16 },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        padding: 12,
        borderRadius: 12,
        flex: 1,
        justifyContent: "center",
    },
    btnAdd: { backgroundColor: "#1b5d3e" },
    btnSearch: { backgroundColor: "#1b3d5d" },
    btnUpdate: { backgroundColor: "#5d4a1b" },
    btnDelete: { backgroundColor: "#5d1b1b" },
    btnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
    card: {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
    },
    cardTitle: { color: "#fff", fontWeight: "600", fontSize: 15 },
    cardSub: { color: "#a8c0ff", fontSize: 13, marginTop: 4 },
    empty: { color: "#7a8cae", textAlign: "center", marginTop: 20 },
});
