import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../src/components/ui/Card';
import { Screen } from '../../../src/components/ui/Screen';
import { useAuthStore } from '../../../src/store/useAuthStore';
import { colors, radius, spacing, typography } from '../../../src/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <Screen scroll>
      {/* Header con saludo */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola,</Text>
          <Text style={styles.name}>{user?.fullName.split(' ')[0] ?? 'Cliente'} 👋</Text>
        </View>
        {user?.role === 'admin' && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>ADMIN</Text>
          </View>
        )}
      </View>

      {/* Hero */}
      <Card style={styles.hero}>
        <Text style={styles.heroTitle}>Barre Club</Text>
        <Text style={styles.heroSubtitle}>
          Tu estudio de barre. Reserva tu clase, conoce a tus maestros y vive la experiencia.
        </Text>
      </Card>

      {/* Accesos rápidos */}
      <Text style={styles.sectionTitle}>Accesos rápidos</Text>
      <View style={styles.grid}>
        <QuickAction
          icon="calendar"
          label="Reservar clase"
          onPress={() => router.push('/(app)/(classes)')}
        />
        <QuickAction
          icon="storefront"
          label="Tienda"
          onPress={() => router.push('/(app)/(shop)')}
        />
        <QuickAction
          icon="walk"
          label="Mis pasos"
          onPress={() => router.push('/(app)/(home)/steps')}
        />
        <QuickAction
          icon="location"
          label="Ubicación"
          onPress={() => router.push('/(app)/(home)/location')}
        />
        <QuickAction
          icon="videocam"
          label="Conócenos"
          onPress={() => router.push('/(app)/(home)/video')}
        />
      </View>

      {/* Próxima clase placeholder */}
      <Text style={styles.sectionTitle}>Próxima clase</Text>
      <Card>
        <View style={styles.classRow}>
          <View style={styles.classIcon}>
            <Ionicons name="fitness" size={28} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.className}>Barre Sculpt</Text>
            <Text style={styles.classMeta}>Mañana · 9:00 AM · Sofía</Text>
          </View>
        </View>
      </Card>
    </Screen>
  );
}

function QuickAction({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.action} onPress={onPress}>
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  greeting: { ...typography.body, color: colors.textSecondary },
  name: { ...typography.h1, color: colors.textPrimary },
  adminBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  adminBadgeText: { ...typography.small, color: colors.textPrimary, fontWeight: '700' },

  hero: { backgroundColor: colors.primaryLight, borderWidth: 0, marginBottom: spacing.lg },
  heroTitle: { ...typography.h2, color: colors.secondary, marginBottom: spacing.xs },
  heroSubtitle: { ...typography.body, color: colors.secondary, opacity: 0.85 },

  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  action: {
    flexBasis: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionLabel: { ...typography.caption, color: colors.textPrimary, fontWeight: '600' },

  classRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  classIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  className: { ...typography.bodyBold, color: colors.textPrimary },
  classMeta: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
});
