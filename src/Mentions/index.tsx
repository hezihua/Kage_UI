import React, {
  forwardRef,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import './style.less';

// ============ Option Type ============
export interface MentionOption {
  /** 选项值 */
  value: string;
  /** 显示文本 */
  label?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

// ============ Mentions Props ============
export interface MentionsProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'defaultValue' | 'onChange' | 'prefix'
  > {
  /** 当前值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 提及选项 */
  options?: MentionOption[] | string[];
  /** 触发字符 */
  prefix?: string | string[];
  /** 分隔符 */
  split?: string;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 状态 */
  status?: 'error' | 'warning';
  /** 自动调整高度 */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** 过滤选项 */
  filterOption?: boolean | ((input: string, option: MentionOption) => boolean);
  /** 无匹配时的内容 */
  notFoundContent?: React.ReactNode;
  /** 获取选项时的加载状态 */
  loading?: boolean;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 选中回调 */
  onSelect?: (option: MentionOption, prefix: string) => void;
  /** 搜索回调 */
  onSearch?: (text: string, prefix: string) => void;
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Mentions Component ============
export const Mentions = forwardRef<HTMLTextAreaElement, MentionsProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = '',
    options = [],
    prefix: prefixConfig = '@',
    split = ' ',
    placeholder,
    disabled = false,
    size = 'middle',
    status,
    autoSize = false,
    filterOption = true,
    notFoundContent = '无匹配结果',
    loading = false,
    onChange,
    onSelect,
    onSearch,
    onFocus,
    onBlur,
    className = '',
    style,
    rows = 3,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchText, setSearchText] = useState('');
  const [currentPrefix, setCurrentPrefix] = useState('');
  const [mentionPosition, setMentionPosition] = useState({ start: 0, end: 0 });
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // 标准化前缀配置
  const prefixes = Array.isArray(prefixConfig) ? prefixConfig : [prefixConfig];

  // 标准化选项
  const normalizedOptions: MentionOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  // 过滤选项
  const filteredOptions = normalizedOptions.filter((option) => {
    if (!filterOption) return true;
    if (typeof filterOption === 'function') {
      return filterOption(searchText, option);
    }
    // 默认过滤：值包含搜索内容（不区分大小写）
    return option.value.toLowerCase().includes(searchText.toLowerCase());
  });

  // 设置 ref
  const setTextareaRef = useCallback(
    (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      }
    },
    [ref],
  );

  // 计算光标位置对应的坐标
  const getCursorCoordinates = useCallback((textarea: HTMLTextAreaElement, position: number) => {
    if (!measureRef.current) return { top: 0, left: 0 };

    const div = measureRef.current;
    const textBeforeCursor = textarea.value.substring(0, position);
    
    // 复制 textarea 的样式到测量元素
    const computedStyle = window.getComputedStyle(textarea);
    div.style.font = computedStyle.font;
    div.style.padding = computedStyle.padding;
    div.style.border = computedStyle.border;
    div.style.width = `${textarea.clientWidth}px`;
    div.textContent = textBeforeCursor;

    // 添加一个光标标记
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    div.appendChild(cursor);

    const rect = textarea.getBoundingClientRect();
    const cursorRect = cursor.getBoundingClientRect();

    return {
      top: cursorRect.top - rect.top + textarea.scrollTop + 20,
      left: cursorRect.left - rect.left,
    };
  }, []);

  // 检测提及触发
  const detectMention = useCallback(
    (text: string, cursorPos: number) => {
      // 从光标位置向前查找最近的前缀
      let mentionStart = -1;
      let detectedPrefix = '';

      for (let i = cursorPos - 1; i >= 0; i--) {
        const char = text[i];
        
        // 遇到空格或换行，停止查找
        if (char === ' ' || char === '\n') {
          break;
        }

        // 检查是否是前缀字符
        if (prefixes.includes(char)) {
          mentionStart = i;
          detectedPrefix = char;
          break;
        }
      }

      if (mentionStart >= 0) {
        const mentionEnd = cursorPos;
        const search = text.substring(mentionStart + 1, mentionEnd);
        return {
          active: true,
          prefix: detectedPrefix,
          start: mentionStart,
          end: mentionEnd,
          search,
        };
      }

      return { active: false, prefix: '', start: 0, end: 0, search: '' };
    },
    [prefixes],
  );

  // 输入变化
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      const cursorPos = e.target.selectionStart || 0;

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);

      // 检测提及
      const mention = detectMention(newValue, cursorPos);

      if (mention.active) {
        setSearchText(mention.search);
        setCurrentPrefix(mention.prefix);
        setMentionPosition({ start: mention.start, end: mention.end });
        setIsOpen(true);
        setActiveIndex(-1);
        onSearch?.(mention.search, mention.prefix);

        // 计算下拉框位置
        if (textareaRef.current) {
          const coords = getCursorCoordinates(textareaRef.current, mention.start);
          setDropdownPosition(coords);
        }
      } else {
        setIsOpen(false);
        setSearchText('');
        setCurrentPrefix('');
      }
    },
    [controlledValue, onChange, detectMention, onSearch, getCursorCoordinates],
  );

  // 选择选项
  const handleSelect = useCallback(
    (option: MentionOption) => {
      if (option.disabled || !textareaRef.current) return;

      const textarea = textareaRef.current;
      const before = value.substring(0, mentionPosition.start);
      const after = value.substring(mentionPosition.end);
      const newValue = `${before}${currentPrefix}${option.value}${split}${after}`;
      const newCursorPos = before.length + currentPrefix.length + option.value.length + split.length;

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      onSelect?.(option, currentPrefix);

      setIsOpen(false);
      setSearchText('');
      setCurrentPrefix('');

      // 恢复焦点并设置光标位置
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [value, mentionPosition, currentPrefix, split, controlledValue, onChange, onSelect],
  );

  // 键盘导航
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!isOpen || filteredOptions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev + 1;
            return next >= filteredOptions.length ? 0 : next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? filteredOptions.length - 1 : next;
          });
          break;
        case 'Enter':
          if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
            e.preventDefault();
            handleSelect(filteredOptions[activeIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    },
    [isOpen, filteredOptions, activeIndex, handleSelect],
  );

  // 聚焦
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onFocus?.(e);
    },
    [onFocus],
  );

  // 失焦
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      // 延迟关闭，允许点击选项
      setTimeout(() => {
        setIsOpen(false);
      }, 150);
      onBlur?.(e);
    },
    [onBlur],
  );

  // 滚动到激活项
  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const activeItem = dropdownRef.current.querySelector('.kage-mentions-option-active');
      activeItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const classNames = [
    'kage-mentions',
    `kage-mentions-${size}`,
    disabled && 'kage-mentions-disabled',
    status && `kage-mentions-status-${status}`,
    isOpen && 'kage-mentions-open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={classNames} style={style}>
      <textarea
        ref={setTextareaRef}
        className="kage-mentions-textarea"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...rest}
      />

      {/* 测量光标位置的隐藏元素 */}
      <div ref={measureRef} className="kage-mentions-measure" />

      {/* 下拉菜单 */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="kage-mentions-dropdown"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          {loading ? (
            <div className="kage-mentions-loading">加载中...</div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const optionClassNames = [
                'kage-mentions-option',
                option.disabled && 'kage-mentions-option-disabled',
                index === activeIndex && 'kage-mentions-option-active',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={option.value}
                  className={optionClassNames}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {option.label || option.value}
                </div>
              );
            })
          ) : (
            <div className="kage-mentions-empty">{notFoundContent}</div>
          )}
        </div>
      )}
    </div>
  );
});

Mentions.displayName = 'Mentions';

export default Mentions;

