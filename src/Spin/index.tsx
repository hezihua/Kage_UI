import React, { ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ 类型定义 ============

/** Spin 属性 */
export interface SpinProps {
  /** 是否显示加载中 */
  spinning?: boolean;
  /** 自定义指示符 */
  indicator?: ReactNode;
  /** 尺寸 */
  size?: 'small' | 'default' | 'large';
  /** 提示文字 */
  tip?: ReactNode;
  /** 延迟显示时间（毫秒） */
  delay?: number;
  /** 包装器类名 */
  wrapperClassName?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: ReactNode;
}

// ============ 默认指示符 ============
const DefaultIndicator = () => (
  <span className="kage-spin-dot">
    <span className="kage-spin-dot-item" />
    <span className="kage-spin-dot-item" />
    <span className="kage-spin-dot-item" />
    <span className="kage-spin-dot-item" />
  </span>
);

// ============ Spin 组件 ============
export const Spin: React.FC<SpinProps> = ({
  spinning = true,
  indicator,
  size = 'default',
  tip,
  delay = 0,
  wrapperClassName = '',
  className = '',
  style,
  children,
}) => {
  const [delayedSpinning, setDelayedSpinning] = React.useState(false);

  React.useEffect(() => {
    if (spinning && delay > 0) {
      const timer = setTimeout(() => {
        setDelayedSpinning(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setDelayedSpinning(spinning);
    }
  }, [spinning, delay]);

  const indicatorNode = indicator || <DefaultIndicator />;

  const spinClassNames = [
    'kage-spin',
    `kage-spin-${size}`,
    delayedSpinning && 'kage-spin-spinning',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClassNames = [
    'kage-spin-container',
    delayedSpinning && 'kage-spin-container-blur',
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // 如果没有子元素，直接显示 Spin
  if (!children) {
    return (
      <div className={spinClassNames} style={style}>
        {indicatorNode}
        {tip && <div className="kage-spin-tip">{tip}</div>}
      </div>
    );
  }

  // 有子元素时，包装显示
  return (
    <div className={containerClassNames} style={style}>
      {delayedSpinning && (
        <div className={spinClassNames}>
          {indicatorNode}
          {tip && <div className="kage-spin-tip">{tip}</div>}
        </div>
      )}
      <div className="kage-spin-children">{children}</div>
    </div>
  );
};

export default Spin;

