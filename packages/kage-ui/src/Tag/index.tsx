import React, { useState, CSSProperties, ReactNode, MouseEvent } from 'react';
import './style.less';

// ============ 类型定义 ============

/** 预设颜色 */
export type TagPresetColor =
  | 'magenta'
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'geekblue'
  | 'purple'
  | 'pink';

/** 预设状态颜色 */
export type TagPresetStatus = 'success' | 'processing' | 'error' | 'warning' | 'default';

/** Tag 属性 */
export interface TagProps {
  /** 标签内容 */
  children?: ReactNode;
  /** 标签颜色（预设颜色或自定义颜色） */
  color?: TagPresetColor | TagPresetStatus | string;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭按钮的回调 */
  onClose?: (e: MouseEvent<HTMLSpanElement>) => void;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 标签图标 */
  icon?: ReactNode;
  /** 自定义关闭图标 */
  closeIcon?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击回调 */
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}

/** CheckableTag 属性 */
export interface CheckableTagProps {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 选中状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 标签内容 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击回调 */
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}

// ============ 预设颜色列表 ============

const PRESET_COLORS: TagPresetColor[] = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  'pink',
];

const PRESET_STATUS: TagPresetStatus[] = [
  'success',
  'processing',
  'error',
  'warning',
  'default',
];

/** 判断是否为预设颜色 */
function isPresetColor(color?: string): boolean {
  if (!color) return false;
  return PRESET_COLORS.includes(color as TagPresetColor) || PRESET_STATUS.includes(color as TagPresetStatus);
}

// ============ Tag 组件 ============

export const Tag: React.FC<TagProps> & {
  CheckableTag: typeof CheckableTag;
} = ({
  children,
  color,
  closable = false,
  onClose,
  bordered = true,
  icon,
  closeIcon,
  className = '',
  style,
  onClick,
}) => {
  const [visible, setVisible] = useState(true);

  // 处理关闭
  const handleClose = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onClose?.(e);
    if (!e.defaultPrevented) {
      setVisible(false);
    }
  };

  if (!visible) {
    return null;
  }

  // 判断颜色类型
  const isPreset = isPresetColor(color);
  const isCustomColor = color && !isPreset;

  // 构建类名
  const classNames = [
    'kage-tag',
    color && isPreset && `kage-tag-${color}`,
    isCustomColor && 'kage-tag-has-color',
    !bordered && 'kage-tag-borderless',
    closable && 'kage-tag-closable',
    icon && 'kage-tag-has-icon',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 自定义颜色样式
  const tagStyle: CSSProperties = {
    ...style,
    ...(isCustomColor
      ? {
          backgroundColor: color,
          borderColor: color,
          color: '#fff',
        }
      : {}),
  };

  // 关闭图标
  const closeIconNode = closable && (
    <span className="kage-tag-close-icon" onClick={handleClose}>
      {closeIcon || '×'}
    </span>
  );

  return (
    <span className={classNames} style={tagStyle} onClick={onClick}>
      {icon && <span className="kage-tag-icon">{icon}</span>}
      <span className="kage-tag-text">{children}</span>
      {closeIconNode}
    </span>
  );
};

// ============ CheckableTag 组件 ============

export const CheckableTag: React.FC<CheckableTagProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  children,
  className = '',
  style,
  onClick,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? internalChecked;

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    const newChecked = !checked;
    if (controlledChecked === undefined) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
    onClick?.(e);
  };

  const classNames = [
    'kage-tag',
    'kage-tag-checkable',
    checked && 'kage-tag-checkable-checked',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} style={style} onClick={handleClick}>
      <span className="kage-tag-text">{children}</span>
    </span>
  );
};

// 绑定子组件
Tag.CheckableTag = CheckableTag;

export default Tag;

