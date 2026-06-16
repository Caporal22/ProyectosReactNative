import { useRegistros } from "@/hooks/useScanner/useRegistros";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScannerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false);
    const [scanned, setScanned] = useState(false);

    const [codigo, setCodigo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const { registros, agregar, buscarPorCodigo } = useRegistros();

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.permissionContainer}>
                <Ionicons name="camera-outline" size={64} color="#4a90e2" />
                <Text style={styles.title}>Necesitamos acceso a la cámara</Text>
                <Pressable
                    style={styles.btnPrimary}
                    onPress={requestPermission}
                >
                    <Text style={styles.btnText}>Conceder permiso</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        if (scanned) return;
        setScanned(true);
        setCodigo(data);
        setShowCamera(false);
    };

    const handleCapturar = async () => {
        if (!codigo || !descripcion) {
            Alert.alert("Error", "Completa código y descripción");
            return;
        }
        if (registros.length >= 10) {
            Alert.alert("Límite alcanzado", "Ya tienes 10 registros");
            return;
        }
        await agregar({ codigo, descripcion, timestamp: Date.now() });
        setCodigo("");
        setDescripcion("");
        Alert.alert("Éxito", "Captura agregada correctamente");
    };

    const handleBuscar = () => {
        const encontrado = buscarPorCodigo(codigo);
        if (encontrado) {
            setDescripcion(encontrado.descripcion);
        } else {
            Alert.alert("No encontrado", "Ese código no está registrado");
        }
    };

    const handleLimpiar = () => {
        setCodigo("");
        setDescripcion("");
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={registros}
                keyExtractor={(item) => item.id!}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.title}>Lector de Código</Text>

                        {showCamera ? (
                            <View>
                                <CameraView
                                    style={styles.camera}
                                    barcodeScannerSettings={{
                                        barcodeTypes: [
                                            "qr",
                                            "ean13",
                                            "ean8",
                                            "code39",
                                            "code93",
                                            "code128",
                                            "upc_a",
                                            "upc_e",
                                            "pdf417",
                                            "aztec",
                                            "datamatrix",
                                        ],
                                    }}
                                    onBarcodeScanned={handleBarcodeScanned}
                                />
                                <Pressable
                                    style={[
                                        styles.btnPrimary,
                                        styles.btnCancel,
                                    ]}
                                    onPress={() => setShowCamera(false)}
                                >
                                    <Text style={styles.btnText}>
                                        ✕ Cancelar
                                    </Text>
                                </Pressable>
                            </View>
                        ) : (
                            <Pressable
                                style={styles.btnPrimary}
                                onPress={() => {
                                    setScanned(false);
                                    setShowCamera(true);
                                }}
                            >
                                <Text style={styles.btnText}>
                                    📷 Escanear código
                                </Text>
                            </Pressable>
                        )}

                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Código"
                                placeholderTextColor="#9aa5b1"
                                value={codigo}
                                onChangeText={setCodigo}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Descripción"
                                placeholderTextColor="#9aa5b1"
                                value={descripcion}
                                onChangeText={setDescripcion}
                            />
                        </View>

                        <View style={styles.row}>
                            <Pressable
                                style={[styles.btn, styles.btnAdd]}
                                onPress={handleCapturar}
                            >
                                <Text style={styles.btnText}>Capturar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.btn, styles.btnSearch]}
                                onPress={handleBuscar}
                            >
                                <Text style={styles.btnText}>Buscar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.btn, styles.btnClear]}
                                onPress={handleLimpiar}
                            >
                                <Text style={styles.btnText}>Limpiar</Text>
                            </Pressable>
                        </View>

                        <Text style={styles.subtitle}>
                            Registros ({registros.length}/10)
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardAccent} />
                        <View style={styles.cardBody}>
                            <Text style={styles.cardCodigo}>{item.codigo}</Text>
                            <Text style={styles.cardDesc}>
                                {item.descripcion}
                            </Text>
                            <Text style={styles.cardFecha}>
                                {new Date(item.timestamp).toLocaleString()}
                            </Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>Sin registros aún</Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0d1b2a" },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        backgroundColor: "#0d1b2a",
    },
    listContent: { padding: 20, paddingBottom: 40 },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 16,
    },
    btnCancel: {
        backgroundColor: "#5d1b1b",
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#a8c0ff",
        marginTop: 24,
        marginBottom: 12,
    },
    camera: {
        width: "100%",
        height: 280,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
    },
    form: { gap: 10, marginBottom: 12 },
    input: {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: 14,
        color: "#fff",
        fontSize: 15,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    row: { flexDirection: "row", gap: 10 },
    btn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    btnPrimary: {
        backgroundColor: "#4a90e2",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#4a90e2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    btnAdd: { backgroundColor: "#1b5d3e" },
    btnSearch: { backgroundColor: "#1b3d5d" },
    btnClear: { backgroundColor: "#5d1b1b" },
    btnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
    card: {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 14,
        marginBottom: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 4,
    },
    cardAccent: {
        width: 6,
        backgroundColor: "#4a90e2",
    },
    cardBody: {
        flex: 1,
        padding: 14,
        gap: 4,
    },
    cardCodigo: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "monospace",
    },
    cardDesc: {
        color: "#cdd9ff",
        fontSize: 14,
    },
    cardFecha: {
        color: "#7a8cae",
        fontSize: 12,
        marginTop: 2,
    },
    empty: {
        color: "#7a8cae",
        textAlign: "center",
        marginTop: 20,
    },
});
