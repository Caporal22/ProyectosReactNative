import { SensorButtons } from "@/components/SensorButtons";
import { useAcelerometro } from "@/hooks/useSensores/useAcelerometro";
import { useBarometro } from "@/hooks/useSensores/useBarometro";
import { useGiroscopio } from "@/hooks/useSensores/useGiroscopio";
import { usePodometro } from "@/hooks/useSensores/usePodometro";
import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SensorType = "acelerometro" | "giroscopio" | "barometro" | "podometro";

const IMAGES = {
    calm: require("@/assets/images/monet1.webp"),
    shaking: require("@/assets/images/monet2.webp"),
    rotating: require("@/assets/images/monet3.webp"),
};

export default function Sensores() {
    const [activeSensor, setActiveSensor] =
        useState<SensorType>("acelerometro");
    const { data, isShaking } = useAcelerometro();
    const { data: gyroData, isRotating } = useGiroscopio();
    const { pressure, relativeAltitude } = useBarometro();
    const { steps, isAvailable } = usePodometro();

    const isAcel = activeSensor === "acelerometro";
    const isGyro = activeSensor === "giroscopio";
    const isBaro = activeSensor === "barometro";

    const currentImage = isAcel
        ? isShaking
            ? IMAGES.shaking
            : IMAGES.calm
        : isGyro
          ? isRotating
              ? IMAGES.rotating
              : IMAGES.calm
          : IMAGES.calm;

    const renderData = () => {
        if (isAcel)
            return (
                <>
                    <Text style={styles.status}>
                        {isShaking ? "🔴 Agitando" : "🟢 En reposo"}
                    </Text>
                    <Text style={styles.data}>X: {data.x.toFixed(3)}</Text>
                    <Text style={styles.data}>Y: {data.y.toFixed(3)}</Text>
                    <Text style={styles.data}>Z: {data.z.toFixed(3)}</Text>
                </>
            );
        if (isGyro)
            return (
                <>
                    <Text style={styles.status}>
                        {isRotating ? "🔴 Rotando" : "🟢 Estático"}
                    </Text>
                    <Text style={styles.data}>X: {gyroData.x.toFixed(3)}</Text>
                    <Text style={styles.data}>Y: {gyroData.y.toFixed(3)}</Text>
                    <Text style={styles.data}>Z: {gyroData.z.toFixed(3)}</Text>
                </>
            );
        if (isBaro)
            return (
                <>
                    <Text style={styles.status}>🌡️ Presión atmosférica</Text>
                    <Text style={styles.data}>
                        Presión: {pressure.toFixed(2)} hPa
                    </Text>
                    <Text style={styles.data}>
                        Altitud: {relativeAltitude.toFixed(2)} m
                    </Text>
                </>
            );
        return (
            <>
                <Text style={styles.status}>
                    {isAvailable ? "🚶 Contando pasos" : "❌ No disponible"}
                </Text>
                <Text style={styles.data}>Pasos: {steps}</Text>
            </>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.title}>Sensores</Text>
                <SensorButtons
                    current={activeSensor}
                    onSelect={setActiveSensor}
                />
                <Image
                    source={currentImage}
                    style={styles.image}
                    transition={300}
                />
                <View style={styles.card}>{renderData()}</View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0d1b2a" },
    scroll: { alignItems: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "700", color: "#fff", marginBottom: 20 },
    image: { width: 300, height: 300, borderRadius: 16, marginBottom: 20 },
    card: {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 20,
        width: "100%",
        gap: 8,
    },
    status: { fontSize: 18, fontWeight: "600", color: "#fff", marginBottom: 8 },
    data: { fontSize: 14, color: "#a8c0ff", fontFamily: "monospace" },
});
