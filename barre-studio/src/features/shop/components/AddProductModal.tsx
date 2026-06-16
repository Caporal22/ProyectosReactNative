import { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '../../../components/feedback/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { productSchema, ProductForm } from '../schemas/product.schemas';
import { productsFirebaseRepo } from '../services/products.firebase';
import { colors, radius, spacing, typography } from '../../../theme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function AddProductModal({ visible, onClose }: Props) {
  const [saving, setSaving] = useState(false);
  const [available, setAvailable] = useState(true); // Switch / ToggleButton

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductForm>({
    resolver: yupResolver(productSchema),
    defaultValues: { name: '', description: '', price: 0, category: 'bebida', stock: 10 },
  });

  async function onSubmit(data: ProductForm) {
    setSaving(true);
    try {
      await productsFirebaseRepo.create({
        ...data,
        stock: available ? data.stock : 0,
      });
      reset();
      setAvailable(true);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal visible={visible} onClose={onClose} title="Nuevo producto">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Nombre"
            placeholder="Termo barre"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Descripción"
            placeholder="Material..."
            multiline
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.description?.message}
          />
        )}
      />

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Precio (MXN)"
                keyboardType="numeric"
                value={String(value)}
                onChangeText={(t) => onChange(Number(t) || 0)}
                onBlur={onBlur}
                error={errors.price?.message}
              />
            )}
          />
        </View>
        <View style={{ width: spacing.sm }} />
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="stock"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Stock"
                keyboardType="numeric"
                value={String(value)}
                onChangeText={(t) => onChange(Number(t) || 0)}
                onBlur={onBlur}
                error={errors.stock?.message}
              />
            )}
          />
        </View>
      </View>

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerWrapper}>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{ color: colors.textPrimary }}
              itemStyle={{ color: colors.textPrimary, fontSize: 16, height: 120 }}
            >
              <Picker.Item label="Bebida" value="bebida" color={colors.textPrimary} />
              <Picker.Item label="Termo" value="termo" color={colors.textPrimary} />
              <Picker.Item label="Calceta" value="calceta" color={colors.textPrimary} />
              <Picker.Item label="Otro" value="otro" color={colors.textPrimary} />
            </Picker>
          )}
        />
      </View>

      <View style={styles.toggleRow}>
        <Text style={styles.label}>Disponible para venta</Text>
        <Switch
          value={available}
          onValueChange={setAvailable}
          trackColor={{ false: colors.border, true: colors.primaryLight }}
          thumbColor={available ? colors.primary : '#f4f3f4'}
        />
      </View>

      <Button title="Crear producto" onPress={handleSubmit(onSubmit)} loading={saving} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  label: {
    ...typography.caption,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
});
