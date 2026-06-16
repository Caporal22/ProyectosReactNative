import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/ui/Screen';
import { Card } from '../../../src/components/ui/Card';
import { usePedometer } from '../../../src/features/sensors/hooks/usePedometer';
import { colors, radius, spacing, typography } from '../../../src/theme';

export default function StepsScreen() {
  const { steps, isAvailable } = usePedometer();
  const goal = 6000;
  const progress = Math.min((steps / goal) * 100, 100);

  return (
    <Screen>
      <View style={styles.backRow}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Mis pasos</Text>
      </View>

      {isAvailable === false ? (
        <Card>
          <Text style={styles.warning}>
            Tu dispositivo no tiene podómetro disponible o no diste permiso.
          </Text>
        </Card>
      ) : (
        <>
          <Card style={styles.heroCard}>
            <Ionicons name="walk" size={64} color={colors.primary} />
            <Text style={styles.stepsNum}>{steps}</Text>
            <Text style={styles.stepsLabel}>pasos en esta sesión</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.goal}>Meta: {goal} pasos</Text>
          </Card>

          <Text style={styles.tip}>
            💡 Camina antes de tu clase de barre para activar el cuerpo
          </Text>
        </>
      )}
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
  heroCard: { alignItems: 'center', paddingVertical: spacing.xl },
  stepsNum: { ...typography.h1, fontSize: 56, color: colors.primary, marginTop: spacing.md },
  stepsLabel: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.lg },
  progressBar: {
    width: '100%',
    height: 12,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.primary },
  goal: { ...typography.caption, color: colors.textSecondary, marginTop: spacing.sm },
  warning: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  tip: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
