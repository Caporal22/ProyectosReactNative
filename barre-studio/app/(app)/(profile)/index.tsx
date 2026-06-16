import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../src/components/ui/Button';
import { Card } from '../../../src/components/ui/Card';
import { Screen } from '../../../src/components/ui/Screen';
import { useLogout } from '../../../src/features/auth/hooks/useLogout';
import { useAuthStore } from '../../../src/store/useAuthStore';
import { colors, radius, spacing, typography } from '../../../src/theme';
import { useNotifications } from '../../../src/features/notifications/hooks/useNotifications';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const { logout } = useLogout();
  const { sendTestNotification } = useNotifications();

  if (!user) return null;

  const initials = user.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Screen scroll>
      <Text style={styles.title}>Mi perfil</Text>

      {/* Avatar + nombre */}
      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.role}>{user.role === 'admin' ? 'Administrador' : 'Cliente'}</Text>
        </View>
      </View>

      {/* Info */}
      <Card style={{ marginBottom: spacing.md }}>
        <InfoRow icon="mail" label="Correo" value={user.email} />
        <Divider />
        <InfoRow icon="call" label="Teléfono" value={user.phone} />
        <Divider />
        <InfoRow
          icon="calendar"
          label="Miembro desde"
          value={new Date(user.createdAt).toLocaleDateString('es-MX')}
        />
      </Card>
      <Button
        title="Probar notificación"
        variant="secondary"
        onPress={sendTestNotification}
        style={{ marginBottom: spacing.sm }}
      />
      <Button title="Cerrar sesión" variant="secondary" onPress={logout} />
    </Screen>
  );
}

function InfoRow({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { ...typography.h2, color: colors.textOnPrimary },
  name: { ...typography.h3, color: colors.textPrimary },
  role: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },

  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLabel: { ...typography.caption, color: colors.textSecondary },
  rowValue: { ...typography.body, color: colors.textPrimary, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
});
