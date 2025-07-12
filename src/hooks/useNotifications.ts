import { useState, useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

interface NotificationService {
  requestPermissions: () => Promise<void>;
  scheduleLocalNotification: (title: string, body: string, id?: number) => Promise<void>;
  scheduleBidAlert: (itemName: string, currentBid: number, timeLeft: string) => Promise<void>;
  scheduleMessageAlert: (senderName: string, message: string) => Promise<void>;
  isSupported: boolean;
}

export const useNotifications = (): NotificationService => {
  const [isSupported] = useState(Capacitor.isNativePlatform());

  useEffect(() => {
    if (isSupported) {
      initializeNotifications();
    }
  }, [isSupported]);

  const initializeNotifications = async () => {
    try {
      // Request permissions
      await PushNotifications.requestPermissions();
      await LocalNotifications.requestPermissions();

      // Register listeners
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      });

      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push notification received: ', notification);
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });

      // Register for push notifications
      await PushNotifications.register();
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  };

  const requestPermissions = async () => {
    if (!isSupported) return;
    
    try {
      await PushNotifications.requestPermissions();
      await LocalNotifications.requestPermissions();
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const scheduleLocalNotification = async (title: string, body: string, id = 1) => {
    if (!isSupported) return;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id,
            schedule: { at: new Date(Date.now() + 1000) },
            sound: 'beep.wav',
            attachments: [],
            actionTypeId: '',
            extra: null
          }
        ]
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const scheduleBidAlert = async (itemName: string, currentBid: number, timeLeft: string) => {
    await scheduleLocalNotification(
      'New Bid Alert! 🔥',
      `${itemName} - Current bid: $${currentBid.toLocaleString()} (${timeLeft} left)`,
      Math.floor(Math.random() * 1000)
    );
  };

  const scheduleMessageAlert = async (senderName: string, message: string) => {
    await scheduleLocalNotification(
      `New message from ${senderName}`,
      message.substring(0, 100) + (message.length > 100 ? '...' : ''),
      Math.floor(Math.random() * 1000)
    );
  };

  return {
    requestPermissions,
    scheduleLocalNotification,
    scheduleBidAlert,
    scheduleMessageAlert,
    isSupported
  };
};