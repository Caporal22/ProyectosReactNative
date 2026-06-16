import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/ui/Screen';
import { Card } from '../../../src/components/ui/Card';
import { useProducts } from '../../../src/features/shop/hooks/useProducts';
import { productsFirebaseRepo } from '../../../src/features/shop/services/products.firebase';
import { useAuthStore } from '../../../src/store/useAuthStore';
import { useCartStore } from '../../../src/store/useCartStore';
import { Product } from '../../../src/types/product';
import { colors, radius, spacing, typography } from '../../../src/theme';
import { AddProductModal } from '../../../src/features/shop/components/AddProductModal';

export default function ShopScreen() {
  const { products, loading } = useProducts();
  const user = useAuthStore((s) => s.user);
  const addToCart = useCartStore((s) => s.addItem);
  const cartCount = useCartStore((s) => s.count());
  const [modalOpen, setModalOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  function confirmDelete(item: Product) {
    Alert.alert('Eliminar producto', `¿Eliminar "${item.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => productsFirebaseRepo.remove(item.id),
      },
    ]);
  }

  function handleAddToCart(item: Product) {
    if (item.stock <= 0) {
      Alert.alert('Sin stock', 'Este producto no está disponible');
      return;
    }
    addToCart(item);
    Alert.alert('✓', 'Agregado al carrito');
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Tienda</Text>
        <View style={styles.headerActions}>
          {!isAdmin && (
            <Pressable style={styles.cartBtn} onPress={() => router.push('/(app)/(shop)/cart')}>
              <Ionicons name="cart" size={24} color={colors.primary} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </Pressable>
          )}
          {isAdmin && (
            <Pressable style={styles.addBtn} onPress={() => setModalOpen(true)}>
              <Ionicons name="add" size={24} color={colors.textOnPrimary} />
            </Pressable>
          )}
        </View>
      </View>

      {loading ? (
        <Text style={styles.empty}>Cargando...</Text>
      ) : products.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="storefront-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.empty}>No hay productos todavía</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: spacing.sm }}
          contentContainerStyle={{ paddingBottom: spacing.xl, gap: spacing.sm }}
          renderItem={({ item }) => (
            <Pressable
              style={{ flex: 1 }}
              onLongPress={isAdmin ? () => confirmDelete(item) : undefined}
            >
              <Card style={styles.productCard}>
                <View style={styles.productImage}>
                  <Ionicons
                    name={
                      item.category === 'bebida'
                        ? 'wine'
                        : item.category === 'termo'
                          ? 'flask'
                          : item.category === 'calceta'
                            ? 'shirt'
                            : 'cube'
                    }
                    size={36}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>${item.price} MXN</Text>
                <Text style={styles.productStock}>
                  {item.stock > 0 ? `${item.stock} disponibles` : 'Agotado'}
                </Text>
                {!isAdmin && item.stock > 0 && (
                  <Pressable style={styles.addCartBtn} onPress={() => handleAddToCart(item)}>
                    <Ionicons name="add" size={16} color={colors.textOnPrimary} />
                    <Text style={styles.addCartText}>Agregar</Text>
                  </Pressable>
                )}
              </Card>
            </Pressable>
          )}
        />
      )}

      <AddProductModal visible={modalOpen} onClose={() => setModalOpen(false)} />
    </Screen>
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
  headerActions: { flexDirection: 'row', gap: spacing.sm },
  title: { ...typography.h1, color: colors.textPrimary },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: { ...typography.small, color: colors.textOnPrimary, fontWeight: '700' },

  empty: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  emptyBox: { alignItems: 'center', marginTop: spacing.xxl, gap: spacing.md },

  productCard: { padding: spacing.sm },
  productImage: {
    height: 100,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  productName: { ...typography.bodyBold, color: colors.textPrimary },
  productPrice: { ...typography.body, color: colors.primary, fontWeight: '700', marginTop: 2 },
  productStock: { ...typography.small, color: colors.textSecondary, marginTop: 2 },
  addCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
  },
  addCartText: { ...typography.small, color: colors.textOnPrimary, fontWeight: '700' },
});
