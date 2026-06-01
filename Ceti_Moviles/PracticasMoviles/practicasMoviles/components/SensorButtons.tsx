import { Pressable, StyleSheet, Text, View } from "react-native";

type SensorType = "acelerometro" | "giroscopio" | "barometro" | "podometro";

interface Props {
    current: SensorType;
    onSelect: (type: SensorType) => void;
}

const ROW1: { label: string; type: SensorType }[] = [
    { label: "⚡ Acelerómetro", type: "acelerometro" },
    { label: "🌀 Giroscopio", type: "giroscopio" },
];

const ROW2: { label: string; type: SensorType }[] = [
    { label: "🌡️ Barómetro", type: "barometro" },
    { label: "🚶 Podómetro", type: "podometro" },
];

export function SensorButtons({ current, onSelect }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {ROW1.map((btn) => (
                    <Pressable
                        key={btn.type}
                        onPress={() => onSelect(btn.type)}
                        style={[
                            styles.button,
                            current === btn.type && styles.active,
                        ]}
                    >
                        <Text style={styles.text}>{btn.label}</Text>
                    </Pressable>
                ))}
            </View>
            <View style={styles.row}>
                {ROW2.map((btn) => (
                    <Pressable
                        key={btn.type}
                        onPress={() => onSelect(btn.type)}
                        style={[
                            styles.button,
                            current === btn.type && styles.active,
                        ]}
                    >
                        <Text style={styles.text}>{btn.label}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 8,
        marginBottom: 16,
        gap: 8,
    },
    row: {
        flexDirection: "row",
        gap: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
    },
    active: {
        backgroundColor: "rgba(74,144,226,0.5)",
        borderWidth: 1,
        borderColor: "#4a90e2",
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },
});
