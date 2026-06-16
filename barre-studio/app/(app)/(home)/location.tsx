import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/ui/Screen';
import { Card } from '../../../src/components/ui/Card';
import { colors, radius, spacing, typography } from '../../../src/theme';

const STUDIO = {
  latitude: 19.4326,
  longitude: -99.1332,
  title: 'Barre Club',
  address: 'Av. Reforma 123, CDMX',
};

export default function LocationScreen() {
  return (
    <Screen>
      <View style={styles.backRow}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Ubicación</Text>
      </View>

      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: STUDIO.latitude,
            longitude: STUDIO.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: STUDIO.latitude, longitude: STUDIO.longitude }}
            title={STUDIO.title}
            description={STUDIO.address}
            pinColor={colors.primary}
          />
        </MapView>
      </View>

      <Card>
        <View style={styles.row}>
          <Ionicons name="location" size={24} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.studioName}>{STUDIO.title}</Text>
            <Text style={styles.studioAddr}>{STUDIO.address}</Text>
          </View>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  title: { ...typography.h2, color: colors.textPrimary },
  mapWrapper: {
    height: 350,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  map: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  studioName: { ...typography.h3, color: colors.textPrimary },
  studioAddr: { ...typography.body, color: colors.textSecondary, marginTop: 2 },
});
