import React, { useState, useRef, useEffect, useCallback } from 'react';
import './style.less';

// ============ 颜色工具函数 ============
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
};

const hsvToRgb = (h: number, s: number, v: number): { r: number; g: number; b: number } => {
  let r = 0, g = 0, b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h, s, v };
};

// ============ ColorPicker Props ============
export interface ColorPickerProps {
  /** 当前颜色值 */
  value?: string;
  /** 默认颜色值 */
  defaultValue?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 是否显示透明度 */
  showAlpha?: boolean;
  /** 预设颜色 */
  presets?: string[];
  /** 颜色格式 */
  format?: 'hex' | 'rgb';
  /** 颜色变化回调 */
  onChange?: (color: string) => void;
  /** 面板打开/关闭回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// 默认预设颜色
const defaultPresets = [
  '#f5222d', '#fa541c', '#fa8c16', '#faad14', '#fadb14', '#a0d911',
  '#52c41a', '#13c2c2', '#1890ff', '#2f54eb', '#722ed1', '#eb2f96',
  '#000000', '#434343', '#666666', '#999999', '#cccccc', '#ffffff',
];

// ============ ColorPicker Component ============
export const ColorPicker: React.FC<ColorPickerProps> = ({
  value: controlledValue,
  defaultValue = '#6366f1',
  disabled = false,
  size = 'middle',
  showAlpha = false,
  presets = defaultPresets,
  format = 'hex',
  onChange,
  onOpenChange,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [alpha, setAlpha] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const saturationRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const value = controlledValue ?? internalValue;

  // 初始化 HSV 值
  useEffect(() => {
    const rgb = hexToRgb(value);
    if (rgb) {
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      setHue(hsv.h);
      setSaturation(hsv.s);
      setBrightness(hsv.v);
      setInputValue(value);
    }
  }, [value]);

  // 更新颜色
  const updateColor = useCallback((h: number, s: number, v: number, a: number = 1) => {
    const rgb = hsvToRgb(h, s, v);
    let colorValue: string;

    if (format === 'rgb') {
      colorValue = showAlpha
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`
        : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else {
      colorValue = rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    if (controlledValue === undefined) {
      setInternalValue(colorValue);
    }
    setInputValue(colorValue);
    onChange?.(colorValue);
  }, [controlledValue, format, showAlpha, onChange]);

  // 打开/关闭面板
  const toggleOpen = useCallback(() => {
    if (disabled) return;
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  }, [disabled, isOpen, onOpenChange]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onOpenChange]);

  // 饱和度/明度面板拖动
  const handleSaturationMouseDown = useCallback((e: React.MouseEvent) => {
    const rect = saturationRef.current?.getBoundingClientRect();
    if (!rect) return;

    const updateSaturationBrightness = (clientX: number, clientY: number) => {
      const s = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const v = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
      setSaturation(s);
      setBrightness(v);
      updateColor(hue, s, v, alpha);
    };

    updateSaturationBrightness(e.clientX, e.clientY);

    const handleMouseMove = (e: MouseEvent) => {
      updateSaturationBrightness(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [hue, alpha, updateColor]);

  // 色相条拖动
  const handleHueMouseDown = useCallback((e: React.MouseEvent) => {
    const rect = hueRef.current?.getBoundingClientRect();
    if (!rect) return;

    const updateHue = (clientX: number) => {
      const h = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setHue(h);
      updateColor(h, saturation, brightness, alpha);
    };

    updateHue(e.clientX);

    const handleMouseMove = (e: MouseEvent) => {
      updateHue(e.clientX);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [saturation, brightness, alpha, updateColor]);

  // 输入框变化
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    // 尝试解析颜色
    if (val.startsWith('#') && (val.length === 4 || val.length === 7)) {
      const rgb = hexToRgb(val.length === 4 ? val.replace(/([a-f\d])/gi, '$1$1') : val);
      if (rgb) {
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setHue(hsv.h);
        setSaturation(hsv.s);
        setBrightness(hsv.v);
        if (controlledValue === undefined) {
          setInternalValue(val);
        }
        onChange?.(val);
      }
    }
  }, [controlledValue, onChange]);

  // 选择预设颜色
  const handlePresetClick = useCallback((color: string) => {
    const rgb = hexToRgb(color);
    if (rgb) {
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      setHue(hsv.h);
      setSaturation(hsv.s);
      setBrightness(hsv.v);
      setInputValue(color);
      if (controlledValue === undefined) {
        setInternalValue(color);
      }
      onChange?.(color);
    }
  }, [controlledValue, onChange]);

  const classNames = [
    'kage-color-picker',
    `kage-color-picker-${size}`,
    disabled && 'kage-color-picker-disabled',
    isOpen && 'kage-color-picker-open',
    className,
  ].filter(Boolean).join(' ');

  const hueColor = rgbToHex(...Object.values(hsvToRgb(hue, 1, 1)) as [number, number, number]);

  return (
    <div ref={containerRef} className={classNames} style={style}>
      {/* 触发器 */}
      <div className="kage-color-picker-trigger" onClick={toggleOpen}>
        <div
          className="kage-color-picker-color-block"
          style={{ backgroundColor: value }}
        />
      </div>

      {/* 面板 */}
      {isOpen && (
        <div className="kage-color-picker-panel">
          {/* 饱和度/明度面板 */}
          <div
            ref={saturationRef}
            className="kage-color-picker-saturation"
            style={{ backgroundColor: hueColor }}
            onMouseDown={handleSaturationMouseDown}
          >
            <div className="kage-color-picker-saturation-white" />
            <div className="kage-color-picker-saturation-black" />
            <div
              className="kage-color-picker-saturation-cursor"
              style={{
                left: `${saturation * 100}%`,
                top: `${(1 - brightness) * 100}%`,
                backgroundColor: value,
              }}
            />
          </div>

          {/* 色相条 */}
          <div
            ref={hueRef}
            className="kage-color-picker-hue"
            onMouseDown={handleHueMouseDown}
          >
            <div
              className="kage-color-picker-hue-cursor"
              style={{ left: `${hue * 100}%` }}
            />
          </div>

          {/* 输入框 */}
          <div className="kage-color-picker-input-wrapper">
            <div
              className="kage-color-picker-preview"
              style={{ backgroundColor: value }}
            />
            <input
              type="text"
              className="kage-color-picker-input"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>

          {/* 预设颜色 */}
          {presets.length > 0 && (
            <div className="kage-color-picker-presets">
              {presets.map((color, index) => (
                <div
                  key={index}
                  className="kage-color-picker-preset"
                  style={{ backgroundColor: color }}
                  onClick={() => handlePresetClick(color)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

