import React from 'react';
import './style.less';

// ============ Step Item Type ============
export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepItem {
  /** 标题 */
  title: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 子标题 */
  subTitle?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 状态 */
  status?: StepStatus;
  /** 是否禁用 */
  disabled?: boolean;
}

// ============ Steps Props ============
export interface StepsProps {
  /** 步骤项 */
  items: StepItem[];
  /** 当前步骤 */
  current?: number;
  /** 方向 */
  direction?: 'horizontal' | 'vertical';
  /** 类型 */
  type?: 'default' | 'navigation' | 'inline';
  /** 尺寸 */
  size?: 'default' | 'small';
  /** 点状步骤条 */
  progressDot?: boolean | ((dot: React.ReactNode, info: { index: number; status: StepStatus }) => React.ReactNode);
  /** 标签位置 */
  labelPlacement?: 'horizontal' | 'vertical';
  /** 起始序号 */
  initial?: number;
  /** 全局状态 */
  status?: StepStatus;
  /** 点击回调 */
  onChange?: (current: number) => void;
  /** 是否可点击 */
  clickable?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Step Component ============
interface StepProps {
  item: StepItem;
  index: number;
  status: StepStatus;
  isLast: boolean;
  direction: 'horizontal' | 'vertical';
  size: 'default' | 'small';
  progressDot?: boolean | ((dot: React.ReactNode, info: { index: number; status: StepStatus }) => React.ReactNode);
  labelPlacement: 'horizontal' | 'vertical';
  clickable: boolean;
  onClick?: () => void;
}

const Step: React.FC<StepProps> = ({
  item,
  index,
  status,
  isLast,
  direction,
  size,
  progressDot,
  labelPlacement,
  clickable,
  onClick,
}) => {
  const { title, description, subTitle, icon, disabled } = item;

  const handleClick = () => {
    if (clickable && !disabled && onClick) {
      onClick();
    }
  };

  const classNames = [
    'kage-steps-item',
    `kage-steps-item-${status}`,
    isLast && 'kage-steps-item-last',
    disabled && 'kage-steps-item-disabled',
    clickable && !disabled && 'kage-steps-item-clickable',
  ].filter(Boolean).join(' ');

  // 渲染图标
  const renderIcon = () => {
    // 自定义图标
    if (icon) {
      return <span className="kage-steps-icon-custom">{icon}</span>;
    }

    // 点状
    if (progressDot) {
      const dot = <span className="kage-steps-dot" />;
      if (typeof progressDot === 'function') {
        return progressDot(dot, { index, status });
      }
      return dot;
    }

    // 默认图标
    if (status === 'finish') {
      return <span className="kage-steps-icon-check">✓</span>;
    }
    if (status === 'error') {
      return <span className="kage-steps-icon-error">✕</span>;
    }
    return <span className="kage-steps-icon-number">{index + 1}</span>;
  };

  return (
    <div className={classNames} onClick={handleClick}>
      {/* 尾部连接线 */}
      {!isLast && <div className="kage-steps-item-tail" />}
      
      {/* 图标 */}
      <div className="kage-steps-item-icon">
        {renderIcon()}
      </div>
      
      {/* 内容 */}
      <div className="kage-steps-item-content">
        <div className="kage-steps-item-title">
          {title}
          {subTitle && <span className="kage-steps-item-subtitle">{subTitle}</span>}
        </div>
        {description && (
          <div className="kage-steps-item-description">{description}</div>
        )}
      </div>
    </div>
  );
};

// ============ Steps Component ============
export const Steps: React.FC<StepsProps> = ({
  items,
  current = 0,
  direction = 'horizontal',
  type = 'default',
  size = 'default',
  progressDot = false,
  labelPlacement = 'horizontal',
  initial = 0,
  status: globalStatus,
  onChange,
  clickable = false,
  className = '',
  style,
}) => {
  // 计算每个步骤的状态
  const getStatus = (index: number, item: StepItem): StepStatus => {
    // 优先使用 item 自身的 status
    if (item.status) return item.status;
    
    // 当前步骤
    if (index === current) {
      return globalStatus || 'process';
    }
    // 已完成步骤
    if (index < current) {
      return 'finish';
    }
    // 等待中步骤
    return 'wait';
  };

  const classNames = [
    'kage-steps',
    `kage-steps-${direction}`,
    `kage-steps-${type}`,
    `kage-steps-${size}`,
    progressDot && 'kage-steps-dot',
    `kage-steps-label-${labelPlacement}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={style}>
      {items.map((item, index) => (
        <Step
          key={index}
          item={item}
          index={index + initial}
          status={getStatus(index, item)}
          isLast={index === items.length - 1}
          direction={direction}
          size={size}
          progressDot={progressDot}
          labelPlacement={labelPlacement}
          clickable={clickable || !!onChange}
          onClick={onChange ? () => onChange(index) : undefined}
        />
      ))}
    </div>
  );
};

// ============ Step 单独组件（用于 JSX 方式）============
export interface StepComponentProps extends StepItem {
  children?: React.ReactNode;
}

export const StepComponent: React.FC<StepComponentProps> = () => null;
StepComponent.displayName = 'Step';

// 挂载子组件
type StepsType = typeof Steps & {
  Step: typeof StepComponent;
};

const ExportSteps = Steps as StepsType;
ExportSteps.Step = StepComponent;

export default ExportSteps;

