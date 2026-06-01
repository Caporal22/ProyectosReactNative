import { MapType } from "@/viewController/types/maps.types";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    onChangeType: (type: MapType) => void;
    currentType: MapType;
}

const BUTTONS: { label: string; type: MapType }[] = [
    { label: "Normal", type: "standard" },
    { label: "Satélite", type: "satellite" },
    { label: "Híbrido", type: "hybrid" },
];

export function MapTypeButtons({ onChangeType, currentType }: Props) {
    const glassAvailable = isLiquidGlassAvailable();

    const Wrapper = glassAvailable ? GlassView : View;

    return (
        <Wrapper style={styles.container}>
            {BUTTONS.map((btn) => (
                <Pressable
                    key={btn.type}
                    onPress={() => onChangeType(btn.type)}
                    style={[
                        styles.button,
                        currentType === btn.type && styles.active,
                    ]}
                >
                    <Text style={styles.text}>{btn.label}</Text>
                </Pressable>
            ))}
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        borderRadius: 16,
        margin: 10,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    active: {
        backgroundColor: "rgba(255,255,255,0.3)",
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
});
