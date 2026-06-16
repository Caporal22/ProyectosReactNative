import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useNotifications() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    })();
  }, []);

  async function scheduleClassReminder(className: string, classDate: Date) {
    // Programa notificación 1 hora antes de la clase..........
    const triggerDate = new Date(classDate.getTime() - 60 * 60 * 1000);
    if (triggerDate.getTime() < Date.now()) return; // ya pasó

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tu clase está cerca',
        body: `${className} comienza en 1 hora`,
        sound: true,
      },
      trigger: { type: 'date', date: triggerDate } as any,
    });
  }

  async function sendTestNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Notificaciones activas',
        body: 'Te avisaremos antes de tus clases',
      },
      trigger: { type: 'timeInterval', seconds: 2, repeats: false } as any,
    });
  }

  return { scheduleClassReminder, sendTestNotification };
}
