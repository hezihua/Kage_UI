import React, {
  forwardRef,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import './style.less';

export interface InputNumberProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'value' | 'defaultValue' | 'onChange' | 'prefix'
  > {
  /** 控件大小 */
  size?: 'large' | 'middle' | 'small';
  /** 状态 */
  status?: 'error' | 'warning';
  /** 当前值 */
  value?: number | null;
  /** 默认值 */
  defaultValue?: number | null;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 小数精度 */
  precision?: number;
  /** 格式化显示 */
  formatter?: (value: number | string | undefined) => string;
  /** 解析输入 */
  parser?: (displayValue: string | undefined) => string;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 输入框前置标签 */
  addonBefore?: React.ReactNode;
  /** 输入框后置标签 */
  addonAfter?: React.ReactNode;
  /** 是否显示增减按钮 */
  controls?: boolean;
  /** 增减按钮位置 */
  controlsPosition?: 'default' | 'right';
  /** 值变化回调 */
  onChange?: (value: number | null) => void;
  /** 按下 Enter 回调 */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 步进回调 */
  onStep?: (value: number | null, info: { offset: number; type: 'up' | 'down' }) => void;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    size = 'middle',
    status,
    min = -Infinity,
    max = Infinity,
    step = 1,
    precision,
    formatter,
    parser,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    controls = true,
    controlsPosition = 'default',
    disabled = false,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onPressEnter,
    onStep,
    className = '',
    style,
    placeholder,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState<number | null>(defaultValue ?? null);
  const [displayValue, setDisplayValue] = useState<string>('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mergedValue = controlledValue !== undefined ? controlledValue : internalValue;

  // 标记是否已初始化
  const [initialized, setInitialized] = useState(false);

  // 设置 ref
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

  // 格式化数字
  const formatNumber = useCallback(
    (num: number | null): string => {
      if (num === null) return '';
      
      let formattedNum = num;
      if (precision !== undefined && precision >= 0) {
        formattedNum = Number(num.toFixed(precision));
      }

      if (formatter) {
        return formatter(formattedNum);
      }

      return String(formattedNum);
    },
    [precision, formatter],
  );

  // 解析输入值
  const parseValue = useCallback(
    (input: string): number | null => {
      if (!input || input === '-' || input === '.') return null;

      let parsedInput = input;
      if (parser) {
        parsedInput = parser(input);
      }

      const num = Number(parsedInput);
      if (isNaN(num)) return null;

      return num;
    },
    [parser],
  );

  // 限制在范围内
  const clampValue = useCallback(
    (num: number | null): number | null => {
      if (num === null) return null;
      
      let clampedNum = Math.max(min, Math.min(max, num));
      
      if (precision !== undefined && precision >= 0) {
        clampedNum = Number(clampedNum.toFixed(precision));
      }

      return clampedNum;
    },
    [min, max, precision],
  );

  // 初始化显示值
  useEffect(() => {
    if (!initialized) {
      setDisplayValue(formatNumber(mergedValue));
      setInitialized(true);
    }
  }, [initialized, mergedValue, formatNumber]);

  // 更新显示值
  useEffect(() => {
    if (!focused && initialized) {
      setDisplayValue(formatNumber(mergedValue));
    }
  }, [mergedValue, focused, formatNumber, initialized]);

  // 更新数值
  const updateValue = useCallback(
    (newValue: number | null, shouldClamp = true) => {
      const finalValue = shouldClamp ? clampValue(newValue) : newValue;

      if (controlledValue === undefined) {
        setInternalValue(finalValue);
      }
      
      onChange?.(finalValue);
    },
    [controlledValue, clampValue, onChange],
  );

  // 步进操作
  const stepValue = useCallback(
    (type: 'up' | 'down') => {
      if (disabled) return;

      const offset = type === 'up' ? step : -step;
      const baseValue = mergedValue ?? 0;
      let newValue = baseValue + offset;

      newValue = clampValue(newValue);

      updateValue(newValue);
      onStep?.(newValue, { offset, type });
      
      // 立即更新显示值（步进操作后应该显示格式化后的值）
      setDisplayValue(formatNumber(newValue));
    },
    [disabled, step, mergedValue, clampValue, updateValue, onStep, formatNumber],
  );

  // 输入变化
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      const parsedValue = parseValue(inputValue);
      if (parsedValue !== null || inputValue === '') {
        updateValue(parsedValue, false);
      }
    },
    [parseValue, updateValue],
  );

  // 聚焦
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      
      // 去除格式化，便于编辑
      if (mergedValue !== null) {
        const rawValue = parser
          ? parser(formatNumber(mergedValue))
          : String(mergedValue);
        setDisplayValue(rawValue);
      }
      
      onFocus?.(e);
    },
    [mergedValue, formatNumber, parser, onFocus],
  );

  // 失焦
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      
      // 应用限制范围
      const parsedValue = parseValue(displayValue);
      const clampedValue = clampValue(parsedValue);
      
      if (clampedValue !== mergedValue) {
        updateValue(clampedValue);
      }
      
      setDisplayValue(formatNumber(clampedValue));
      onBlur?.(e);
    },
    [displayValue, mergedValue, parseValue, clampValue, updateValue, formatNumber, onBlur],
  );

  // 键盘事件
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        stepValue('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        stepValue('down');
      } else if (e.key === 'Enter') {
        onPressEnter?.(e);
      }
      onKeyDown?.(e);
    },
    [stepValue, onKeyDown, onPressEnter],
  );

  // 按钮是否禁用
  const upDisabled = disabled || (mergedValue !== null && mergedValue >= max);
  const downDisabled = disabled || (mergedValue !== null && mergedValue <= min);

  const wrapperClassNames = [
    'kage-input-number-wrapper',
    `kage-input-number-${size}`,
    status && `kage-input-number-status-${status}`,
    disabled && 'kage-input-number-disabled',
    focused && 'kage-input-number-focused',
    controls && 'kage-input-number-has-controls',
    controls && `kage-input-number-controls-${controlsPosition}`,
  ]
    .filter(Boolean)
    .join(' ');

  const groupClassNames = [
    'kage-input-number-group',
    addonBefore && 'kage-input-number-group-addon-before',
    addonAfter && 'kage-input-number-group-addon-after',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClassNames} style={style}>
      {addonBefore && <span className="kage-input-number-addon">{addonBefore}</span>}

      <span className={wrapperClassNames}>
        {prefix && <span className="kage-input-number-prefix">{prefix}</span>}

        <input
          ref={setInputRef}
          type="text"
          className="kage-input-number-element"
          value={displayValue}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          {...rest}
        />

        {suffix && <span className="kage-input-number-suffix">{suffix}</span>}

        {controls && controlsPosition === 'default' && (
          <span className="kage-input-number-controls">
            <button
              type="button"
              className="kage-input-number-control-up"
              disabled={upDisabled}
              onClick={() => stepValue('up')}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="kage-input-number-control-icon">▲</span>
            </button>
            <button
              type="button"
              className="kage-input-number-control-down"
              disabled={downDisabled}
              onClick={() => stepValue('down')}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="kage-input-number-control-icon">▼</span>
            </button>
          </span>
        )}

        {controls && controlsPosition === 'right' && (
          <span className="kage-input-number-controls-right">
            <button
              type="button"
              className="kage-input-number-control kage-input-number-control-up"
              disabled={upDisabled}
              onClick={() => stepValue('up')}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="kage-input-number-control-icon">▲</span>
            </button>
            <button
              type="button"
              className="kage-input-number-control kage-input-number-control-down"
              disabled={downDisabled}
              onClick={() => stepValue('down')}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="kage-input-number-control-icon">▼</span>
            </button>
          </span>
        )}
      </span>

      {addonAfter && <span className="kage-input-number-addon">{addonAfter}</span>}
    </div>
  );
});

InputNumber.displayName = 'InputNumber';

export default InputNumber;

