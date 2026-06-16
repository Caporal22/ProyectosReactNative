import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '../../../components/feedback/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { classSchema, ClassForm } from '../schemas/class.schemas';
import { classesFirebaseRepo } from '../services/classes.firebase';
import { colors, radius, spacing, typography } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function AddClassModal({ visible, onClose }: Props) {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClassForm>({
    resolver: yupResolver(classSchema),
    defaultValues: { name: '', instructor: '', description: '', durationMin: 60, capacity: 10 },
  });

  async function onSubmit(data: ClassForm) {
    setSaving(true);
    try {
      await classesFirebaseRepo.create({ ...data, date: date.getTime() });
      reset();
      setDate(new Date());
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal visible={visible} onClose={onClose} title="Nueva clase">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Nombre"
            placeholder="Barre Sculpt"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="instructor"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Maestro/a"
            placeholder="Sofía Méndez"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.instructor?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Descripción"
            placeholder="Clase enfocada en..."
            multiline
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.description?.message}
          />
        )}
      />

      {/* DatePicker + TimePicker = 2 Dialogs del requisito */}
      <View style={styles.dateRow}>
        <Pressable style={styles.dateBtn} onPress={() => setShowDate(true)}>
          <Ionicons name="calendar" size={20} color={colors.primary} />
          <Text style={styles.dateText}>
            {date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
          </Text>
        </Pressable>
        <Pressable style={styles.dateBtn} onPress={() => setShowTime(true)}>
          <Ionicons name="time" size={20} color={colors.primary} />
          <Text style={styles.dateText}>
            {date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Pressable>
      </View>

      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'compact' : 'default'}
          minimumDate={new Date()}
          onChange={(_, selected) => {
            setShowDate(Platform.OS === 'ios' ? false : false);
            if (selected) {
              const newDate = new Date(date);
              newDate.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
              setDate(newDate);
            }
          }}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === 'ios' ? 'compact' : 'default'}
          onChange={(_, selected) => {
            setShowTime(false);
            if (selected) {
              const newDate = new Date(date);
              newDate.setHours(selected.getHours(), selected.getMinutes());
              setDate(newDate);
            }
          }}
        />
      )}

      <View style={styles.row}>
        <Controller
          control={control}
          name="durationMin"
          render={({ field: { onChange, value, onBlur } }) => (
            <View style={{ flex: 1 }}>
              <Input
                label="Duración (min)"
                keyboardType="numeric"
                value={String(value)}
                onChangeText={(t) => onChange(Number(t) || 0)}
                onBlur={onBlur}
                error={errors.durationMin?.message}
              />
            </View>
          )}
        />
        <View style={{ width: spacing.sm }} />
        <Controller
          control={control}
          name="capacity"
          render={({ field: { onChange, value, onBlur } }) => (
            <View style={{ flex: 1 }}>
              <Input
                label="Cupo"
                keyboardType="numeric"
                value={String(value)}
                onChangeText={(t) => onChange(Number(t) || 0)}
                onBlur={onBlur}
                error={errors.capacity?.message}
              />
            </View>
          )}
        />
      </View>

      <Button title="Crear clase" onPress={handleSubmit(onSubmit)} loading={saving} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  dateRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  dateBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  dateText: { ...typography.body, color: colors.textPrimary },
  row: { flexDirection: 'row' },
});
