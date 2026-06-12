import React from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NotificationToasts() {
  const { notifications } = useApp();

  if (notifications.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'warning':
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-sky-500" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/20 bg-emerald-50/90 dark:bg-emerald-950/20';
      case 'warning':
      case 'error':
        return 'border-amber-500/20 bg-amber-50/90 dark:bg-amber-950/20';
      case 'info':
      default:
        return 'border-sky-500/20 bg-sky-50/90 dark:bg-sky-950/20';
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg animate-slide-down ${getBorderColor(
            notif.type
          )}`}
        >
          <div className="mt-0.5">{getIcon(notif.type)}</div>
          <div className="flex-1">
            <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
              {notif.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
