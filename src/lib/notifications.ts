/**
 * Real-Time Official Device Notification Service
 * Triggers native OS/Browser notifications (Windows Toast / Mobile / Mac)
 * whenever a job application is completed (manually or automatically).
 */

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    console.warn('Browser does not support desktop notifications.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export function sendRealtimeDeviceNotification(
  jobTitle: string,
  company: string,
  platform: string,
  originalUrl: string
) {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return;
  }

  if (Notification.permission === 'granted') {
    const title = `🎉 Applied to ${jobTitle}!`;
    const options: NotificationOptions = {
      body: `Company: ${company} • Platform: ${platform}\nClick to open official job page and verify.`,
      icon: '/favicon.ico',
      tag: `app-notify-${Date.now()}`,
    };

    const notification = new Notification(title, options);

    notification.onclick = function (event) {
      event.preventDefault();
      window.open(originalUrl, '_blank');
    };
  } else {
    console.log(`[Notification Fallback]: Applied to ${jobTitle} at ${company} on ${platform}. Verification link: ${originalUrl}`);
  }
}
