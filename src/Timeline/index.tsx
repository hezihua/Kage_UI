import React, { ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ 类型定义 ============

/** 时间轴节点颜色 */
export type TimelineItemColor = 'blue' | 'green' | 'red' | 'gray' | string;

/** 时间轴模式 */
export type TimelineMode = 'left' | 'alternate' | 'right';

/** 时间轴节点属性 */
export interface TimelineItemProps {
  /** 节点颜色 */
  color?: TimelineItemColor;
  /** 自定义圆点图标 */
  dot?: ReactNode;
  /** 标签内容（在 alternate 和 right 模式下显示在另一侧） */
  label?: ReactNode;
  /** 节点内容 */
  children?: ReactNode;
  /** 是否是幽灵节点（即最后一个，用于表示未完成） */
  pending?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 节点位置（仅在 alternate 模式下生效） */
  position?: 'left' | 'right';
}

/** 时间轴属性 */
export interface TimelineProps {
  /** 是否倒序排列 */
  reverse?: boolean;
  /** 时间轴点的位置模式 */
  mode?: TimelineMode;
  /** 是否有幽灵节点（加载更多） */
  pending?: ReactNode;
  /** 当最后一个幽灵节点存在时，自定义其圆点 */
  pendingDot?: ReactNode;
  /** 子节点 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

// ============ 预设颜色 ============

const PRESET_COLORS = ['blue', 'green', 'red', 'gray'];

function isPresetColor(color?: string): boolean {
  return PRESET_COLORS.includes(color || '');
}

// ============ TimelineItem 组件 ============

export const TimelineItem: React.FC<TimelineItemProps> = ({
  color = 'blue',
  dot,
  label,
  children,
  pending = false,
  className = '',
  style,
  position,
}) => {
  const isPreset = isPresetColor(color);

  const classNames = [
    'kage-timeline-item',
    pending && 'kage-timeline-item-pending',
    position && `kage-timeline-item-${position}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const dotClassNames = [
    'kage-timeline-item-head',
    dot ? 'kage-timeline-item-head-custom' : '',
    isPreset && `kage-timeline-item-head-${color}`,
  ]
    .filter(Boolean)
    .join(' ');

  const dotStyle: CSSProperties = !isPreset && color ? { borderColor: color, color } : {};

  return (
    <li className={classNames} style={style}>
      {label !== undefined && <div className="kage-timeline-item-label">{label}</div>}
      <div className="kage-timeline-item-tail" />
      <div className={dotClassNames} style={dotStyle}>
        {dot}
      </div>
      <div className="kage-timeline-item-content">{children}</div>
    </li>
  );
};

// ============ Timeline 组件 ============

export const Timeline: React.FC<TimelineProps> & {
  Item: typeof TimelineItem;
} = ({
  reverse = false,
  mode = 'left',
  pending,
  pendingDot,
  children,
  className = '',
  style,
}) => {
  // 处理子节点
  const getItems = () => {
    const items = React.Children.toArray(children);

    // 如果有 pending 节点，添加到末尾
    if (pending) {
      const pendingItem = (
        <TimelineItem
          key="pending"
          pending
          dot={pendingDot || <span className="kage-timeline-item-pending-dot" />}
        >
          {typeof pending === 'boolean' ? null : pending}
        </TimelineItem>
      );
      items.push(pendingItem);
    }

    // 如果需要倒序
    if (reverse) {
      items.reverse();
    }

    // 处理 alternate 模式下的位置
    return items.map((item, index) => {
      if (!React.isValidElement<TimelineItemProps>(item)) return item;

      let position = item.props.position;
      if (mode === 'alternate' && !position) {
        position = index % 2 === 0 ? 'left' : 'right';
      } else if (mode === 'right') {
        position = 'right';
      } else if (mode === 'left') {
        position = 'left';
      }

      const isLast = index === items.length - 1;

      return React.cloneElement(item, {
        ...item.props,
        position,
        className: [
          item.props.className,
          isLast && 'kage-timeline-item-last',
        ]
          .filter(Boolean)
          .join(' '),
      });
    });
  };

  const classNames = [
    'kage-timeline',
    `kage-timeline-${mode}`,
    pending && 'kage-timeline-pending',
    reverse && 'kage-timeline-reverse',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ul className={classNames} style={style}>
      {getItems()}
    </ul>
  );
};

// 绑定子组件
Timeline.Item = TimelineItem;

export default Timeline;

