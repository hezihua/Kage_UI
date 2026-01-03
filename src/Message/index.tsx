import React, { useState, useEffect, useCallback, ReactNode, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import './style.less';

// ============ 类型定义 ============

/** Message 类型 */
export type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

/** Message 配置 */
export interface MessageConfig {
  /** 提示内容 */
  content: ReactNode;
  /** 提示类型 */
  type?: MessageType;
  /** 自动关闭的延时，单位秒。设为 0 时不自动关闭 */
  duration?: number;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 关闭时的回调 */
  onClose?: () => void;
  /** 消息唯一标识 */
  key?: string | number;
}

/** Message 实例 */
interface MessageInstance extends MessageConfig {
  key: string | number;
  visible: boolean;
  closing: boolean;
}

/** Message API */
export interface MessageApi {
  success: (content: ReactNode, duration?: number, onClose?: () => void) => void;
  error: (content: ReactNode, duration?: number, onClose?: () => void) => void;
  info: (content: ReactNode, duration?: number, onClose?: () => void) => void;
  warning: (content: ReactNode, duration?: number, onClose?: () => void) => void;
  loading: (content: ReactNode, duration?: number, onClose?: () => void) => void;
  open: (config: MessageConfig) => void;
  destroy: (key?: string | number) => void;
}

// ============ 默认图标 ============
const defaultIcons: Record<MessageType, ReactNode> = {
  success: '✓',
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
  loading: '⟳',
};

// ============ Message 管理器 ============
class MessageManager {
  private instances: MessageInstance[] = [];
  private listeners: Set<() => void> = new Set();
  private keyCounter = 0;

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  add(config: MessageConfig): string | number {
    const key = config.key ?? `message-${++this.keyCounter}`;
    const instance: MessageInstance = {
      ...config,
      key,
      visible: true,
      closing: false,
    };

    this.instances.push(instance);
    this.notify();

    // 自动关闭
    if (config.duration !== 0) {
      const duration = config.duration ?? 3;
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

  getInstances(): MessageInstance[] {
    return this.instances;
  }
}

const messageManager = new MessageManager();

// ============ Message 容器组件 ============
const MessageContainer: React.FC = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = messageManager.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  const instances = messageManager.getInstances();

  if (instances.length === 0) {
    return null;
  }

  return (
    <div className="kage-message-container">
      {instances.map((instance) => (
        <MessageItem key={instance.key} instance={instance} />
      ))}
    </div>
  );
};

// ============ Message 项组件 ============
const MessageItem: React.FC<{ instance: MessageInstance }> = ({ instance }) => {
  const { content, type = 'info', icon, className = '', style, closing, visible } = instance;

  if (!visible && !closing) {
    return null;
  }

  const classNames = [
    'kage-message',
    `kage-message-${type}`,
    closing && 'kage-message-closing',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconNode = icon || defaultIcons[type];

  return (
    <div className={classNames} style={style}>
      <span className="kage-message-icon">{iconNode}</span>
      <span className="kage-message-content">{content}</span>
    </div>
  );
};

// ============ Message API ============
const messageApi: MessageApi = {
  success: (content, duration, onClose) => {
    messageManager.add({ content, type: 'success', duration, onClose });
  },
  error: (content, duration, onClose) => {
    messageManager.add({ content, type: 'error', duration, onClose });
  },
  info: (content, duration, onClose) => {
    messageManager.add({ content, type: 'info', duration, onClose });
  },
  warning: (content, duration, onClose) => {
    messageManager.add({ content, type: 'warning', duration, onClose });
  },
  loading: (content, duration, onClose) => {
    messageManager.add({ content, type: 'loading', duration, onClose });
  },
  open: (config) => {
    messageManager.add(config);
  },
  destroy: (key) => {
    messageManager.destroy(key);
  },
};

// ============ Message 组件 ============
export const Message: React.FC = {} as MessageApi & {
  Container: typeof MessageContainer;
};

// 将 API 方法挂载到组件上
Object.assign(Message, messageApi);
(Message as any).Container = MessageContainer;

// 初始化容器（延迟执行，避免 SSR 问题）
let containerElement: HTMLDivElement | null = null;
let containerMounted = false;

const getContainer = (): HTMLDivElement => {
  if (!containerElement && typeof document !== 'undefined') {
    containerElement = document.createElement('div');
    containerElement.className = 'kage-message-root';
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
      ReactDOM.createRoot(container).render(React.createElement(MessageContainer));
    } else if (ReactDOM.render) {
      // React 17
      ReactDOM.render(React.createElement(MessageContainer), container);
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

export default Message;

