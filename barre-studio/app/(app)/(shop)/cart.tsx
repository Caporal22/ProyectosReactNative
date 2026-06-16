import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/ui/Screen';
import { Card } from '../../../src/components/ui/Card';
import { Button } from '../../../src/components/ui/Button';
import { useCartStore } from '../../../src/store/useCartStore';
import { colors, radius, spacing, typography } from '../../../src/theme';

export default function CartScreen() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const total = useCartStore((s) => s.total());
  const clear = useCartStore((s) => s.clear);

  const [accepted, setAccepted] = useState(false); // CheckBox
  const [payment, setPayment] = useState<'cash' | 'card' | 'transfer'>('cash'); // RadioButton

  function handleCheckout() {
    if (!accepted) {
      Alert.alert('Términos', 'Debes aceptar los términos');
      return;
    }
    Alert.alert('Confirmar pedido', `Total: $${total} MXN\nMétodo: ${payment}`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Confirmar',
        onPress: () => {
          clear();
          Alert.alert('✓ Pedido realizado', 'Pasa por tu pedido al estudio');
          router.back();
        },
      },
    ]);
  }

  if (items.length === 0) {
    return (
      <Screen>
        <View style={styles.backRow}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
        </View>
        <View style={styles.emptyBox}>
          <Ionicons name="cart-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.empty}>Tu carrito está vacío</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.backRow}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Mi carrito</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.product.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: spacing.sm }}>
            <View style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemPrice}>${item.product.price} c/u</Text>
              </View>
              <View style={styles.qtyControls}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => updateQty(item.product.id, item.quantity - 1)}
                >
                  <Ionicons name="remove" size={18} color={colors.primary} />
                </Pressable>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => updateQty(item.product.id, item.quantity + 1)}
                >
                  <Ionicons name="add" size={18} color={colors.primary} />
                </Pressable>
              </View>
            </View>
          </Card>
        )}
        ListFooterComponent={
          <View>
            {/* RadioButton group: método de pago */}
            <Text style={styles.sectionTitle}>Método de pago</Text>
            {(['cash', 'card', 'transfer'] as const).map((opt) => (
              <Pressable key={opt} style={styles.radioRow} onPress={() => setPayment(opt)}>
                <View style={[styles.radio, payment === opt && styles.radioActive]}>
                  {payment === opt && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.radioLabel}>
                  {opt === 'cash' ? 'Efectivo' : opt === 'card' ? 'Tarjeta' : 'Transferencia'}
                </Text>
              </Pressable>
            ))}

            {/* CheckBox: aceptar términos */}
            <Pressable style={styles.checkRow} onPress={() => setAccepted(!accepted)}>
              <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
                {accepted && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkLabel}>Acepto los términos y condiciones</Text>
            </Pressable>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total} MXN</Text>
            </View>

            <Button title="Confirmar pedido" onPress={handleCheckout} />
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  title: { ...typography.h2, color: colors.textPrimary },
  empty: { ...typography.body, color: colors.textSecondary, marginTop: spacing.md },
  emptyBox: { alignItems: 'center', marginTop: spacing.xxl },

  itemRow: { flexDirection: 'row', alignItems: 'center' },
  itemName: { ...typography.bodyBold, color: colors.textPrimary },
  itemPrice: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: { ...typography.bodyBold, color: colors.textPrimary, minWidth: 24, textAlign: 'center' },

  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  radioLabel: { ...typography.body, color: colors.textPrimary },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkLabel: { ...typography.body, color: colors.textPrimary, flex: 1 },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  totalLabel: { ...typography.h3, color: colors.textPrimary },
  totalValue: { ...typography.h2, color: colors.primary },
});
