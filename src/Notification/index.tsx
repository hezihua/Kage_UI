import React, { useState, useEffect, useCallback, ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ 类型定义 ============

/** Notification 类型 */
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

/** Notification 位置 */
export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

/** Notification 配置 */
export interface NotificationConfig {
  /** 通知标题 */
  message?: ReactNode;
  /** 通知内容 */
  description?: ReactNode;
  /** 通知类型 */
  type?: NotificationType;
  /** 自动关闭的延时，单位秒。设为 0 时不自动关闭 */
  duration?: number;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 自定义关闭图标 */
  closeIcon?: ReactNode;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 关闭时的回调 */
  onClose?: () => void;
  /** 通知唯一标识 */
  key?: string | number;
  /** 通知位置 */
  placement?: NotificationPlacement;
}

/** Notification 实例 */
interface NotificationInstance extends NotificationConfig {
  key: string | number;
  visible: boolean;
  closing: boolean;
}

/** Notification API */
export interface NotificationApi {
  success: (config: NotificationConfig | ReactNode, description?: ReactNode) => void;
  error: (config: NotificationConfig | ReactNode, description?: ReactNode) => void;
  info: (config: NotificationConfig | ReactNode, description?: ReactNode) => void;
  warning: (config: NotificationConfig | ReactNode, description?: ReactNode) => void;
  open: (config: NotificationConfig) => void;
  destroy: (key?: string | number) => void;
  close: (key: string | number) => void;
}

// ============ 默认图标 ============
const defaultIcons: Record<NotificationType, ReactNode> = {
  success: '✓',
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
};

// ============ Notification 管理器 ============
class NotificationManager {
  private instances: NotificationInstance[] = [];
  private listeners: Set<() => void> = new Set();
  private keyCounter = 0;
  private placement: NotificationPlacement = 'topRight';

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  setPlacement(placement: NotificationPlacement) {
    this.placement = placement;
  }

  add(config: NotificationConfig): string | number {
    const key = config.key ?? `notification-${++this.keyCounter}`;
    const instance: NotificationInstance = {
      ...config,
      key,
      visible: true,
      closing: false,
      placement: config.placement ?? this.placement,
      closable: config.closable !== undefined ? config.closable : true,
    };

    this.instances.push(instance);
    this.notify();

    // 自动关闭
    if (instance.duration !== 0) {
      const duration = instance.duration ?? 4.5;
      setTimeout(() => {
        this.remove(key);
      }, duration * 1000);
    }

    return key;
  }

  remove(key: string | number) {
    const instance = this.instances.find((item) => item.key === key);
    if (!instance) return;

    instance.closing = true;
    this.notify();

    // 等待动画完成
    setTimeout(() => {
      const index = this.instances.findIndex((item) => item.key === key);
      if (index > -1) {
        this.instances.splice(index, 1);
        this.notify();
        instance.onClose?.();
      }
    }, 300);
  }

  destroy(key?: string | number) {
    if (key) {
      this.remove(key);
    } else {
      this.instances.forEach((instance) => {
        instance.closing = true;
      });
      this.notify();

      setTimeout(() => {
        this.instances.forEach((instance) => {
          instance.onClose?.();
        });
        this.instances = [];
        this.notify();
      }, 300);
    }
  }

  getInstances(): NotificationInstance[] {
    return this.instances;
  }
}

const notificationManager = new NotificationManager();

// ============ Notification 容器组件 ============
const NotificationContainer: React.FC = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = notificationManager.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  const instances = notificationManager.getInstances();

  if (instances.length === 0) {
    return null;
  }

  // 按位置分组
  const groupedInstances: Record<NotificationPlacement, NotificationInstance[]> = {
    topLeft: [],
    topRight: [],
    bottomLeft: [],
    bottomRight: [],
  };

  instances.forEach((instance) => {
    const placement = instance.placement ?? 'topRight';
    groupedInstances[placement].push(instance);
  });

  return (
    <>
      {Object.entries(groupedInstances).map(([placement, placementInstances]) => {
        if (placementInstances.length === 0) return null;
        return (
          <div
            key={placement}
            className={`kage-notification-container kage-notification-${placement}`}
          >
            {placementInstances.map((instance) => (
              <NotificationItem key={instance.key} instance={instance} />
            ))}
          </div>
        );
      })}
    </>
  );
};

// ============ Notification 项组件 ============
const NotificationItem: React.FC<{ instance: NotificationInstance }> = ({ instance }) => {
  const {
    message,
    description,
    type = 'info',
    icon,
    closeIcon,
    closable = true,
    className = '',
    style,
    closing,
    visible,
    key,
  } = instance;

  if (!visible && !closing) {
    return null;
  }

  const classNames = [
    'kage-notification',
    `kage-notification-${type}`,
    closing && 'kage-notification-closing',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconNode = icon || defaultIcons[type];

  const handleClose = () => {
    notificationManager.remove(key);
  };

  return (
    <div className={classNames} style={style}>
      <div className="kage-notification-content">
        {iconNode && <span className="kage-notification-icon">{iconNode}</span>}
        <div className="kage-notification-body">
          {message && <div className="kage-notification-message">{message}</div>}
          {description && (
            <div className="kage-notification-description">{description}</div>
          )}
        </div>
        {closable && (
          <button
            type="button"
            className="kage-notification-close-icon"
            onClick={handleClose}
            aria-label="关闭"
          >
            {closeIcon || '×'}
          </button>
        )}
      </div>
    </div>
  );
};

// ============ Notification API ============
const normalizeConfig = (
  config: NotificationConfig | ReactNode,
  description?: ReactNode
): NotificationConfig => {
  if (typeof config === 'object' && config !== null && 'message' in config) {
    return config as NotificationConfig;
  }
  return {
    message: config as ReactNode,
    description,
  };
};

const notificationApi: NotificationApi = {
  success: (config, description) => {
    const normalized = normalizeConfig(config, description);
    notificationManager.add({ ...normalized, type: 'success' });
  },
  error: (config, description) => {
    const normalized = normalizeConfig(config, description);
    notificationManager.add({ ...normalized, type: 'error' });
  },
  info: (config, description) => {
    const normalized = normalizeConfig(config, description);
    notificationManager.add({ ...normalized, type: 'info' });
  },
  warning: (config, description) => {
    const normalized = normalizeConfig(config, description);
    notificationManager.add({ ...normalized, type: 'warning' });
  },
  open: (config) => {
    notificationManager.add(config);
  },
  destroy: (key) => {
    notificationManager.destroy(key);
  },
  close: (key) => {
    notificationManager.remove(key);
  },
};

// ============ Notification 组件 ============
export const Notification = {} as NotificationApi & {
  Container: typeof NotificationContainer;
};

// 将 API 方法挂载到组件上
Object.assign(Notification, notificationApi);
(Notification as any).Container = NotificationContainer;

// 初始化容器（延迟执行，避免 SSR 问题）
let containerElement: HTMLDivElement | null = null;
let containerMounted = false;

const getContainer = (): HTMLDivElement => {
  if (!containerElement && typeof document !== 'undefined') {
    containerElement = document.createElement('div');
    containerElement.className = 'kage-notification-root';
    document.body.appendChild(containerElement);
  }
  return containerElement!;
};

// 延迟初始化容器组件
const initContainer = () => {
  if (containerMounted || typeof document === 'undefined') return;
  containerMounted = true;

  const container = getContainer();
  try {
    const React = require('react');
    const ReactDOM = require('react-dom');

    if (ReactDOM.createRoot) {
      // React 18
      ReactDOM.createRoot(container).render(React.createElement(NotificationContainer));
    } else if (ReactDOM.render) {
      // React 17
      ReactDOM.render(React.createElement(NotificationContainer), container);
    }
  } catch (e) {
    // 静默失败，避免影响应用启动
  }
};

// 在浏览器环境中初始化
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initContainer, 0);
  } else {
    document.addEventListener('DOMContentLoaded', initContainer);
  }
}

export default Notification;

