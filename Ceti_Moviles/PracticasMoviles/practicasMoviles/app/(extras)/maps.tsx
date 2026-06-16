import { MapTypeButtons } from "@/components/MapTypeButtons";
import { POLYLINE_COORDS, useMapas } from "@/hooks/useMapas";
import React from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Mapas() {
    const { markers, mapType, setMapType, addMarker, userLocation } =
        useMapas();

    return (
        <SafeAreaView style={styles.container}>
            <MapTypeButtons onChangeType={setMapType} currentType={mapType} />
            <MapView
                style={styles.map}
                mapType={mapType}
                initialRegion={{
                    latitude: 20.6597,
                    longitude: -103.3496,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onPress={(e) => addMarker(e.nativeEvent.coordinate)}
            >
                <Marker
                    coordinate={{ latitude: 20.6769, longitude: -103.346 }}
                    title="Hospicio Cabañas"
                    description="Patrimonio de la Humanidad"
                >
                    <Callout>
                        <Text style={styles.callout}>Hospicio Cabañas</Text>
                    </Callout>
                </Marker>
                <Marker
                    coordinate={{ latitude: 20.676, longitude: -103.3472 }}
                    title="Teatro Degollado"
                    description="Joya arquitectónica de Guadalajara"
                    pinColor="blue"
                >
                    <Callout>
                        <Text style={styles.callout}>Teatro Degollado</Text>
                    </Callout>
                </Marker>
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        title="Mi ubicación"
                        pinColor="green"
                    />
                )}
                <Polyline
                    coordinates={POLYLINE_COORDS}
                    strokeColor="#4a90e2"
                    strokeWidth={3}
                />
                {markers.map((m, i) => (
                    <Marker key={i} coordinate={m.coordinate} title={m.title} />
                ))}
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    callout: {
        fontSize: 13,
        fontWeight: "600",
        padding: 4,
    },
});
