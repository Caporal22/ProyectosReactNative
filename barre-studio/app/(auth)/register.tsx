import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Screen } from '../../src/components/ui/Screen';
import { useRegister } from '../../src/features/auth/hooks/useRegister';
import { RegisterForm, registerSchema } from '../../src/features/auth/schemas/auth.schemas';
import { colors, spacing, typography } from '../../src/theme';

export default function RegisterScreen() {
  const { register, loading, error } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: { fullName: '', phone: '', email: '', password: '' },
  });

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.brand}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Únete a Barre Club</Text>
      </View>

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Nombre completo"
            placeholder="María Pérez"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.fullName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Teléfono"
            placeholder="5512345678"
            keyboardType="phone-pad"
            maxLength={10}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.phone?.message}
          />
        )}
      />

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

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Contraseña"
            placeholder="••••••••"
            isPassword
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />

      {error && <Text style={styles.serverError}>{error}</Text>}

      <Button
        title="Crear cuenta"
        onPress={handleSubmit(register)}
        loading={loading}
        style={{ marginTop: spacing.md }}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
        <Link href="/(auth)/login">
          <Text style={styles.footerLink}>Inicia sesión</Text>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.lg },
  brand: { ...typography.h1, color: colors.primary, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textSecondary },
  serverError: {
    ...typography.caption,
    color: colors.error,
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
  footer: { flexDirection: 'row', justifyContent: 'center', paddingVertical: spacing.lg },
  footerText: { ...typography.body, color: colors.textSecondary },
  footerLink: { ...typography.body, color: colors.primary, fontWeight: '700' },
});
