import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Screen } from '../../src/components/ui/Screen';
import { useLogin } from '../../src/features/auth/hooks/useLogin';
import { LoginForm, loginSchema } from '../../src/features/auth/schemas/auth.schemas';
import { colors, spacing, typography } from '../../src/theme';

export default function LoginScreen() {
  const { login, loading, error } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.brand}>Barre Club</Text>
        <Text style={styles.subtitle}>Bienvenida de nuevo</Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              label="Correo electrónico"
              placeholder="tu@correo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
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
          title="Iniciar sesión"
          onPress={handleSubmit(login)}
          loading={loading}
          style={{ marginTop: spacing.md }}
        />

        <Link href="/(auth)/forgot-password" style={styles.link}>
          <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta? </Text>
        <Link href="/(auth)/register">
          <Text style={styles.footerLink}>Regístrate</Text>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  brand: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  form: { flex: 1 },
  serverError: {
    ...typography.caption,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  link: {
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  linkText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  footerText: { ...typography.body, color: colors.textSecondary },
  footerLink: { ...typography.body, color: colors.primary, fontWeight: '700' },
});
