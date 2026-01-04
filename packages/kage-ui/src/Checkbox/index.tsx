import React, { useState, useCallback, createContext, useContext } from 'react';
import './style.less';

// ============ Checkbox Context ============
interface CheckboxGroupContextType {
  value: (string | number)[];
  disabled: boolean;
  onChange: (val: string | number, checked: boolean) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null);

// ============ Checkbox Props ============
export interface CheckboxProps {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 半选状态 */
  indeterminate?: boolean;
  /** 值（在 Group 中使用） */
  value?: string | number;
  /** 选中状态变化回调 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Checkbox Component ============
export const Checkbox: React.FC<CheckboxProps> & {
  Group: typeof CheckboxGroup;
} = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  value,
  onChange,
  children,
  className = '',
  style,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const groupContext = useContext(CheckboxGroupContext);

  // 如果在 Group 中，使用 Group 的状态
  const isInGroup = groupContext !== null;
  const isDisabled = disabled || (isInGroup && groupContext.disabled);
  
  let isChecked: boolean;
  if (isInGroup && value !== undefined) {
    isChecked = groupContext.value.includes(value);
  } else {
    isChecked = controlledChecked ?? internalChecked;
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    const newChecked = e.target.checked;

    if (isInGroup && value !== undefined) {
      groupContext.onChange(value, newChecked);
    } else {
      if (controlledChecked === undefined) {
        setInternalChecked(newChecked);
      }
      onChange?.(e);
    }
  }, [isDisabled, isInGroup, value, groupContext, controlledChecked, onChange]);

  const classNames = [
    'kage-checkbox-wrapper',
    isChecked && 'kage-checkbox-wrapper-checked',
    isDisabled && 'kage-checkbox-wrapper-disabled',
    indeterminate && 'kage-checkbox-wrapper-indeterminate',
    className,
  ].filter(Boolean).join(' ');

  const checkboxClassNames = [
    'kage-checkbox',
    isChecked && 'kage-checkbox-checked',
    isDisabled && 'kage-checkbox-disabled',
    indeterminate && 'kage-checkbox-indeterminate',
  ].filter(Boolean).join(' ');

  return (
    <label className={classNames} style={style}>
      <span className={checkboxClassNames}>
        <input
          type="checkbox"
          className="kage-checkbox-input"
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
        />
        <span className="kage-checkbox-inner" />
      </span>
      {children && <span className="kage-checkbox-label">{children}</span>}
    </label>
  );
};

// ============ Checkbox Group Props ============
export interface CheckboxOptionType {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** 选项 */
  options?: (CheckboxOptionType | string | number)[];
  /** 当前值 */
  value?: (string | number)[];
  /** 默认值 */
  defaultValue?: (string | number)[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 方向 */
  direction?: 'horizontal' | 'vertical';
  /** 值变化回调 */
  onChange?: (checkedValue: (string | number)[]) => void;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Checkbox Group Component ============
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value: controlledValue,
  defaultValue = [],
  disabled = false,
  direction = 'horizontal',
  onChange,
  children,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState<(string | number)[]>(defaultValue);

  const value = controlledValue ?? internalValue;

  const handleChange = useCallback((val: string | number, checked: boolean) => {
    const newValue = checked
      ? [...value, val]
      : value.filter((v) => v !== val);

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [value, controlledValue, onChange]);

  const contextValue: CheckboxGroupContextType = {
    value,
    disabled,
    onChange: handleChange,
  };

  const classNames = [
    'kage-checkbox-group',
    `kage-checkbox-group-${direction}`,
    className,
  ].filter(Boolean).join(' ');

  // 标准化选项
  const normalizedOptions = options?.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: opt, value: opt };
    }
    return opt;
  });

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={classNames} style={style}>
        {normalizedOptions
          ? normalizedOptions.map((opt) => (
              <Checkbox
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </Checkbox>
            ))
          : children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

// 挂载子组件
Checkbox.Group = CheckboxGroup;

export default Checkbox;

