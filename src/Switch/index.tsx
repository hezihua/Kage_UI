import React, { useState, useCallback } from 'react';
import './style.less';

export interface SwitchProps {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 尺寸 */
  size?: 'default' | 'small';
  /** 选中时的内容 */
  checkedChildren?: React.ReactNode;
  /** 非选中时的内容 */
  unCheckedChildren?: React.ReactNode;
  /** 变化时的回调 */
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 点击回调 */
  onClick?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  loading = false,
  size = 'default',
  checkedChildren,
  unCheckedChildren,
  onChange,
  onClick,
  className = '',
  style,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  const isDisabled = disabled || loading;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      const newChecked = !checked;

      if (controlledChecked === undefined) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked, e);
      onClick?.(newChecked, e);
    },
    [isDisabled, checked, controlledChecked, onChange, onClick],
  );

  const classNames = [
    'kage-switch',
    checked && 'kage-switch-checked',
    isDisabled && 'kage-switch-disabled',
    loading && 'kage-switch-loading',
    `kage-switch-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={isDisabled}
      className={classNames}
      style={style}
      onClick={handleClick}
    >
      {/* 加载图标 */}
      {loading && <span className="kage-switch-loading-icon">⏳</span>}

      {/* 内容 */}
      <span className="kage-switch-inner">
        {checked ? checkedChildren : unCheckedChildren}
      </span>

      {/* 滑块手柄 */}
      <span className="kage-switch-handle" />
    </button>
  );
};

export default Switch;

