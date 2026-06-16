import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Screen } from '../../../src/components/ui/Screen';
import { Card } from '../../../src/components/ui/Card';
import { useClasses } from '../../../src/features/classes/hooks/useClasses';
import { classesFirebaseRepo } from '../../../src/features/classes/services/classes.firebase';
import { useAuthStore } from '../../../src/store/useAuthStore';
import { BarreClass } from '../../../src/types/class';
import { colors, radius, spacing, typography } from '../../../src/theme';
import { AddClassModal } from '../../../src/features/classes/components/AddClassModal';

export default function ClassesScreen() {
  const { classes, loading } = useClasses();
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  const [modalOpen, setModalOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  function confirmDelete(item: BarreClass) {
    // Dialog #1: AlertDialog nativo
    Alert.alert('Eliminar clase', `¿Seguro que quieres eliminar "${item.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => classesFirebaseRepo.remove(item.id),
      },
    ]);
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Clases</Text>
        {isAdmin && (
          <Pressable style={styles.addBtn} onPress={() => setModalOpen(true)}>
            <Ionicons name="add" size={24} color={colors.textOnPrimary} />
          </Pressable>
        )}
      </View>

      {loading ? (
        <Text style={styles.empty}>Cargando...</Text>
      ) : classes.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="calendar-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.empty}>No hay clases todavía</Text>
        </View>
      ) : (
        <FlatList
          data={classes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
          renderItem={({ item }) => (
            <ClassListItem
              item={item}
              userId={user.uid}
              isAdmin={isAdmin}
              onPress={() => router.push(`/(app)/(classes)/${item.id}`)}
              onLongPress={isAdmin ? () => confirmDelete(item) : undefined}
            />
          )}
        />
      )}

      <AddClassModal visible={modalOpen} onClose={() => setModalOpen(false)} />
    </Screen>
  );
}

function ClassListItem({
  item,
  userId,
  isAdmin,
  onPress,
  onLongPress,
}: {
  item: BarreClass;
  userId: string;
  isAdmin: boolean;
  onPress: () => void;
  onLongPress?: () => void;
}) {
  const date = new Date(item.date);
  const isBooked = item.bookedBy.includes(userId);
  const full = item.bookedBy.length >= item.capacity;

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <Card style={{ marginBottom: spacing.sm }}>
        <View style={styles.itemRow}>
          <View style={styles.itemIcon}>
            <Ionicons name="fitness" size={26} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemMeta}>
              {date.toLocaleDateString('es-MX', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
              {' · '}
              {date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              {' · '}
              {item.instructor}
            </Text>
            <Text style={styles.itemCapacity}>
              {item.bookedBy.length}/{item.capacity} reservados
            </Text>
          </View>
          {isBooked && (
            <View style={styles.badgeBooked}>
              <Text style={styles.badgeText}>Reservado</Text>
            </View>
          )}
          {!isBooked && full && !isAdmin && (
            <View style={styles.badgeFull}>
              <Text style={styles.badgeText}>Lleno</Text>
            </View>
          )}
        </View>
      </Card>
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
  title: { ...typography.h1, color: colors.textPrimary },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  emptyBox: { alignItems: 'center', marginTop: spacing.xxl, gap: spacing.md },

  itemRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  itemIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: { ...typography.bodyBold, color: colors.textPrimary },
  itemMeta: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  itemCapacity: { ...typography.small, color: colors.primary, marginTop: 2, fontWeight: '600' },
  badgeBooked: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  badgeFull: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  badgeText: { ...typography.small, color: '#fff', fontWeight: '700' },
});
