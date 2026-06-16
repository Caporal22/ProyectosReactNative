import { useRef } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/ui/Screen';
import { Card } from '../../../src/components/ui/Card';
import { colors, radius, spacing, typography } from '../../../src/theme';

export default function VideoScreen() {
  const videoRef = useRef<Video>(null);

  return (
    <Screen scroll>
      <View style={styles.backRow}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Conoce Barre Club</Text>
      </View>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{
            uri: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          isLooping
          onError={(e) => console.log('Video error:', e)}
        />
      </Card>
      <Text style={styles.hint}>
        Toca el video para reproducir. Si no carga, revisa tu conexión.
      </Text>

      <Text style={styles.description}>
        Barre es un entrenamiento de bajo impacto que combina ballet, pilates y yoga. Tonifica,
        alarga y fortalece tu cuerpo en clases de 50 minutos.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  title: { ...typography.h2, color: colors.textPrimary },
  video: { width: '100%', height: 220, backgroundColor: '#000' },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    lineHeight: 24,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
