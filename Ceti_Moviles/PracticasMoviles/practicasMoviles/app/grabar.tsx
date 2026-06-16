import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

export default function GrabarScreen() {
    const [cameraPermission] = useCameraPermissions();
    const [mediaPermission] = MediaLibrary.usePermissions();

    const cameraRef = useRef<CameraView>(null);
    const [isRecording, setIsRecording] = useState(false);

    const handleGrabar = async () => {
        if (!cameraRef.current) return;

        if (isRecording) {
            cameraRef.current.stopRecording();
            return;
        }

        setIsRecording(true);
        try {
            const video = await cameraRef.current.recordAsync();
            if (video?.uri) {
                await MediaLibrary.saveToLibraryAsync(video.uri);
                Alert.alert("Listo", "Video guardado en tu galería", [
                    { text: "OK", onPress: () => router.back() },
                ]);
            }
        } catch (e) {
            console.log("Error grabando:", e);
        } finally {
            setIsRecording(false);
        }
    };

    if (!cameraPermission?.granted || !mediaPermission?.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="close" size={32} color="#fff" />
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.fullScreen}>
            <CameraView
                ref={cameraRef}
                style={styles.fullScreen}
                mode="video"
                facing="back"
            />
            <View style={styles.overlay}>
                <Pressable style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="close" size={28} color="#fff" />
                </Pressable>

                <Pressable
                    style={[
                        styles.recordBtn,
                        isRecording && styles.recordBtnActive,
                    ]}
                    onPress={handleGrabar}
                >
                    <View
                        style={
                            isRecording
                                ? styles.recordIconSquare
                                : styles.recordIconCircle
                        }
                    />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: { flex: 1, backgroundColor: "#000" },
    permissionContainer: {
        flex: 1,
        backgroundColor: "#0d1b2a",
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    backBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    recordBtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderWidth: 4,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    recordBtnActive: { borderColor: "#ff4444" },
    recordIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ff4444",
    },
    recordIconSquare: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: "#ff4444",
    },
});
