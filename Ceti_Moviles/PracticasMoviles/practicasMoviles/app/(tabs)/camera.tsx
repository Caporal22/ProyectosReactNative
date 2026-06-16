import { Ionicons } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] =
        MediaLibrary.usePermissions();

    const [videoUri, setVideoUri] = useState<string | null>(null);

    const player = useVideoPlayer(videoUri, (p) => {
        p.loop = false;
    });

    // Pedir permisos y navegar al modal de grabación
    const handleEntrarGrabar = async () => {
        if (!cameraPermission?.granted) {
            const res = await requestCameraPermission();
            if (!res.granted) {
                Alert.alert(
                    "Permiso requerido",
                    "Necesitas dar acceso a la cámara"
                );
                return;
            }
        }
        if (!mediaPermission?.granted) {
            const res = await requestMediaPermission();
            if (!res.granted) {
                Alert.alert(
                    "Permiso requerido",
                    "Necesitas dar permisos a la galería"
                );
                return;
            }
        }
        router.push("/grabar");
    };

    // Seleccionar video de galería
    const handleSeleccionarVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["videos"],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setVideoUri(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>🎬 Multimedia</Text>
            <Text style={styles.subtitle}>Captura o reproduce un video</Text>

            <Pressable style={styles.bigBtn} onPress={handleEntrarGrabar}>
                <Ionicons name="videocam" size={36} color="#fff" />
                <Text style={styles.bigBtnText}>Grabar Video</Text>
            </Pressable>

            <Pressable
                style={[styles.bigBtn, styles.bigBtnAlt]}
                onPress={handleSeleccionarVideo}
            >
                <Ionicons name="film" size={36} color="#fff" />
                <Text style={styles.bigBtnText}>Seleccionar y Reproducir</Text>
            </Pressable>

            {videoUri && (
                <>
                    <VideoView
                        style={styles.video}
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                    />
                    <View style={styles.controls}>
                        <Pressable
                            style={styles.controlBtn}
                            onPress={() => player.play()}
                        >
                            <Ionicons name="play" size={24} color="#fff" />
                        </Pressable>
                        <Pressable
                            style={styles.controlBtn}
                            onPress={() => player.pause()}
                        >
                            <Ionicons name="pause" size={24} color="#fff" />
                        </Pressable>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d1b2a",
        padding: 20,
        gap: 16,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#fff",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#a8c0ff",
        textAlign: "center",
        marginBottom: 20,
    },
    bigBtn: {
        backgroundColor: "#4a90e2",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        gap: 10,
        shadowColor: "#4a90e2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    bigBtnAlt: {
        backgroundColor: "#1b5d3e",
        shadowColor: "#1b5d3e",
    },
    bigBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    video: {
        width: "100%",
        height: 300,
        borderRadius: 16,
    },
    controls: {
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        marginTop: 16,
    },
    controlBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "rgba(255,255,255,0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
});
