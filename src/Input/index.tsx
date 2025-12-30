import React, {
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import './style.less';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 控件大小 */
  size?: 'large' | 'middle' | 'small';
  /** 状态 */
  status?: 'error' | 'warning';
  /** 允许清除 */
  allowClear?: boolean;
  /** 前缀图标/内容 */
  prefix?: React.ReactNode;
  /** 后缀图标/内容 */
  suffix?: React.ReactNode;
  /** 输入框前置标签 */
  addonBefore?: React.ReactNode;
  /** 输入框后置标签 */
  addonAfter?: React.ReactNode;
  /** 展示字数统计 */
  showCount?: boolean;
  /** 按下 Enter 回调 */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = '',
    size = 'middle',
    status,
    allowClear = false,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    showCount = false,
    disabled = false,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onPressEnter,
    className = '',
    style,
    maxLength,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mergedValue = controlledValue ?? internalValue;

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [ref],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (controlledValue === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    },
    [controlledValue, onChange],
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onPressEnter?.(e);
      }
      onKeyDown?.(e);
    },
    [onKeyDown, onPressEnter],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;

      if (controlledValue === undefined) {
        setInternalValue('');
      }

      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
      inputRef.current?.focus();
    },
    [controlledValue, disabled, onChange],
  );

  const showClear =
    allowClear && !disabled && (mergedValue ?? '').toString().length > 0;

  const wrapperClassNames = [
    'kage-input-wrapper',
    `kage-input-${size}`,
    status && `kage-input-status-${status}`,
    disabled && 'kage-input-disabled',
    focused && 'kage-input-focused',
    (prefix || suffix) && 'kage-input-has-affix',
    showClear && 'kage-input-has-clear',
  ]
    .filter(Boolean)
    .join(' ');

  const groupClassNames = [
    'kage-input-group',
    addonBefore && 'kage-input-group-addon-before',
    addonAfter && 'kage-input-group-addon-after',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const countText =
    maxLength !== undefined && maxLength >= 0
      ? `${(mergedValue ?? '').length}/${maxLength}`
      : (mergedValue ?? '').length;

  return (
    <div className={groupClassNames} style={style}>
      {addonBefore && <span className="kage-input-addon">{addonBefore}</span>}

      <span className={wrapperClassNames}>
        {prefix && <span className="kage-input-prefix">{prefix}</span>}

        <input
          ref={setInputRef}
          className="kage-input-element"
          value={mergedValue}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          maxLength={maxLength}
          {...rest}
        />

        {showClear && (
          <span
            className="kage-input-clear"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
          >
            ×
          </span>
        )}

        {suffix && <span className="kage-input-suffix">{suffix}</span>}

        {showCount && (
          <span className="kage-input-count">{countText}</span>
        )}
      </span>

      {addonAfter && <span className="kage-input-addon">{addonAfter}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

