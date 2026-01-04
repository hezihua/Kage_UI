import React, { useState, useCallback, createContext, useContext } from 'react';
import './style.less';

// ============ Radio Context ============
interface RadioGroupContextType {
  value: string | number | null;
  disabled: boolean;
  onChange: (val: string | number) => void;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

// ============ Radio Props ============
export interface RadioProps {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
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

// ============ Radio Component ============
export const Radio: React.FC<RadioProps> & {
  Group: typeof RadioGroup;
  Button: typeof RadioButton;
} = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  value,
  onChange,
  children,
  className = '',
  style,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const groupContext = useContext(RadioGroupContext);

  // 如果在 Group 中，使用 Group 的状态
  const isInGroup = groupContext !== null;
  const isDisabled = disabled || (isInGroup && groupContext.disabled);
  
  let isChecked: boolean;
  if (isInGroup && value !== undefined) {
    isChecked = groupContext.value === value;
  } else {
    isChecked = controlledChecked ?? internalChecked;
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    if (isInGroup && value !== undefined) {
      groupContext.onChange(value);
    } else {
      if (controlledChecked === undefined) {
        setInternalChecked(true);
      }
      onChange?.(e);
    }
  }, [isDisabled, isInGroup, value, groupContext, controlledChecked, onChange]);

  const classNames = [
    'kage-radio-wrapper',
    isChecked && 'kage-radio-wrapper-checked',
    isDisabled && 'kage-radio-wrapper-disabled',
    className,
  ].filter(Boolean).join(' ');

  const radioClassNames = [
    'kage-radio',
    isChecked && 'kage-radio-checked',
    isDisabled && 'kage-radio-disabled',
  ].filter(Boolean).join(' ');

  return (
    <label className={classNames} style={style}>
      <span className={radioClassNames}>
        <input
          type="radio"
          className="kage-radio-input"
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
        />
        <span className="kage-radio-inner" />
      </span>
      {children && <span className="kage-radio-label">{children}</span>}
    </label>
  );
};

// ============ Radio Button Component ============
export interface RadioButtonProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 值（在 Group 中使用） */
  value?: string | number;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  disabled = false,
  value,
  children,
  className = '',
  style,
}) => {
  const groupContext = useContext(RadioGroupContext);

  if (!groupContext) {
    throw new Error('Radio.Button must be used within a Radio.Group');
  }

  const isDisabled = disabled || groupContext.disabled;
  const isChecked = value !== undefined && groupContext.value === value;

  const handleClick = useCallback(() => {
    if (isDisabled || value === undefined) return;
    groupContext.onChange(value);
  }, [isDisabled, value, groupContext]);

  const classNames = [
    'kage-radio-button',
    isChecked && 'kage-radio-button-checked',
    isDisabled && 'kage-radio-button-disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={classNames} style={style} onClick={handleClick}>
      <input
        type="radio"
        className="kage-radio-button-input"
        checked={isChecked}
        disabled={isDisabled}
        readOnly
      />
      <span className="kage-radio-button-label">{children}</span>
    </label>
  );
};

// ============ Radio Option Type ============
export interface RadioOptionType {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

// ============ Radio Group Props ============
export interface RadioGroupProps {
  /** 选项 */
  options?: (RadioOptionType | string | number)[];
  /** 当前值 */
  value?: string | number | null;
  /** 默认值 */
  defaultValue?: string | number | null;
  /** 是否禁用 */
  disabled?: boolean;
  /** 方向 */
  direction?: 'horizontal' | 'vertical';
  /** 按钮样式 */
  buttonStyle?: 'solid' | 'outline';
  /** 尺寸（仅按钮样式有效） */
  size?: 'large' | 'middle' | 'small';
  /** 是否使用按钮样式 */
  optionType?: 'default' | 'button';
  /** 值变化回调 */
  onChange?: (value: string | number) => void;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Radio Group Component ============
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value: controlledValue,
  defaultValue = null,
  disabled = false,
  direction = 'horizontal',
  buttonStyle = 'outline',
  size = 'middle',
  optionType = 'default',
  onChange,
  children,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState<string | number | null>(defaultValue);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = useCallback((val: string | number) => {
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  }, [controlledValue, onChange]);

  const contextValue: RadioGroupContextType = {
    value,
    disabled,
    onChange: handleChange,
  };

  const classNames = [
    'kage-radio-group',
    `kage-radio-group-${direction}`,
    optionType === 'button' && 'kage-radio-group-button',
    optionType === 'button' && `kage-radio-group-button-${buttonStyle}`,
    optionType === 'button' && `kage-radio-group-${size}`,
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
    <RadioGroupContext.Provider value={contextValue}>
      <div className={classNames} style={style}>
        {normalizedOptions
          ? normalizedOptions.map((opt) =>
              optionType === 'button' ? (
                <RadioButton
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </RadioButton>
              ) : (
                <Radio
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </Radio>
              )
            )
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
};

// 挂载子组件
Radio.Group = RadioGroup;
Radio.Button = RadioButton;

export default Radio;

