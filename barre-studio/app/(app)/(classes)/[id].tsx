import { Alert, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Screen } from '../../../src/components/ui/Screen';
import { Card } from '../../../src/components/ui/Card';
import { Button } from '../../../src/components/ui/Button';
import { useClasses } from '../../../src/features/classes/hooks/useClasses';
import { classesFirebaseRepo } from '../../../src/features/classes/services/classes.firebase';
import { useAuthStore } from '../../../src/store/useAuthStore';
import { colors, spacing, typography } from '../../../src/theme';
import { useNotifications } from '../../../src/features/notifications/hooks/useNotifications';
import { Ionicons } from '@expo/vector-icons';

export default function ClassDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { classes } = useClasses();
  const user = useAuthStore((s) => s.user);
  const { scheduleClassReminder } = useNotifications();

  if (!user) return null;

  const item = classes.find((c) => c.id === id);
  if (!item) {
    return (
      <Screen>
        <Text style={styles.title}>Clase no encontrada</Text>
      </Screen>
    );
  }

  // Capturamos en constantes locales para que TypeScript no pierda el narrowing en closures
  const userId = user.uid;
  const classItem = item;

  const isBooked = classItem.bookedBy.includes(userId);
  const full = classItem.bookedBy.length >= classItem.capacity;
  const date = new Date(classItem.date);

  async function handleBook() {
    try {
      await classesFirebaseRepo.bookSlot(classItem.id, userId);
      await scheduleClassReminder(classItem.name, new Date(classItem.date));
      Alert.alert('Reservado', 'Tu lugar está confirmado. Te recordaremos 1h antes.');
    } catch {
      Alert.alert('Error', 'No se pudo reservar');
    }
  }

  async function handleCancel() {
    Alert.alert('Cancelar reserva', '¿Seguro?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Sí, cancelar',
        style: 'destructive',
        onPress: () => classesFirebaseRepo.cancelSlot(classItem.id, userId),
      },
    ]);
  }

  return (
    <Screen scroll>
      <View style={styles.backRow}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.textPrimary}
          onPress={() => router.back()}
        />
      </View>

      <Text style={styles.title}>{classItem.name}</Text>
      <Text style={styles.instructor}>Con {classItem.instructor}</Text>

      <Card style={{ marginVertical: spacing.lg }}>
        <Row
          icon="calendar"
          text={date.toLocaleDateString('es-MX', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        />
        <Row
          icon="time"
          text={`${date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })} · ${classItem.durationMin} min`}
        />
        <Row icon="people" text={`${classItem.bookedBy.length}/${classItem.capacity} cupos`} />
      </Card>

      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>{classItem.description}</Text>

      <View style={{ marginTop: spacing.lg }}>
        {isBooked ? (
          <Button title="Cancelar reserva" variant="secondary" onPress={handleCancel} />
        ) : full ? (
          <Button title="Clase llena" onPress={() => {}} disabled />
        ) : (
          <Button title="Reservar lugar" onPress={handleBook} />
        )}
      </View>
    </Screen>
  );
}

function Row({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.rowText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backRow: { marginTop: spacing.md, marginBottom: spacing.md },
  title: { ...typography.h1, color: colors.textPrimary },
  instructor: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xs },
  rowText: { ...typography.body, color: colors.textPrimary },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.sm },
  description: { ...typography.body, color: colors.textSecondary, lineHeight: 24 },
});
