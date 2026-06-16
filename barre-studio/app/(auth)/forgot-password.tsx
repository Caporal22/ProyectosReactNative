import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Screen } from '../../src/components/ui/Screen';
import { useResetPassword } from '../../src/features/auth/hooks/useResetPassword';
import { ForgotForm, forgotPasswordSchema } from '../../src/features/auth/schemas/auth.schemas';
import { colors, spacing, typography } from '../../src/theme';

export default function ForgotPasswordScreen() {
  const { resetPassword, loading, error, success } = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.brand}>Recuperar contraseña</Text>
        <Text style={styles.subtitle}>Te enviaremos un correo con instrucciones</Text>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Correo"
            placeholder="tu@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      />

      {error && <Text style={styles.serverError}>{error}</Text>}
      {success && <Text style={styles.success}>✓ Correo enviado. Revisa tu bandeja</Text>}

      <Button
        title="Enviar correo"
        onPress={handleSubmit((d) => resetPassword(d.email))}
        loading={loading}
        style={{ marginTop: spacing.md }}
      />

      <View style={styles.footer}>
        <Link href="/(auth)/login">
          <Text style={styles.footerLink}>Volver a iniciar sesión</Text>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginTop: spacing.xxl, marginBottom: spacing.xl },
  brand: { ...typography.h2, color: colors.primary, marginBottom: spacing.xs, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  serverError: {
    ...typography.caption,
    color: colors.error,
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
  success: {
    ...typography.body,
    color: colors.success,
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
  footer: { alignItems: 'center', paddingVertical: spacing.lg },
  footerLink: { ...typography.body, color: colors.primary, fontWeight: '700' },
});
