import React, { ReactNode, CSSProperties, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import './style.less';

// ============ 类型定义 ============

/** Watermark 属性 */
export interface WatermarkProps {
  /** 水印内容（文字或图片 URL） */
  content?: string | string[];
  /** 图片地址（优先级高于 content） */
  image?: string;
  /** 水印宽度 */
  width?: number;
  /** 水印高度 */
  height?: number;
  /** 水印旋转角度 */
  rotate?: number;
  /** 水印透明度 */
  opacity?: number;
  /** 水印字体大小 */
  fontSize?: number;
  /** 水印字体颜色 */
  fontColor?: string;
  /** 水印字体 */
  fontFamily?: string;
  /** 水印之间的水平间距 */
  gapX?: number;
  /** 水印之间的垂直间距 */
  gapY?: number;
  /** 水印距离容器左边的偏移量 */
  offsetLeft?: number;
  /** 水印距离容器上边的偏移量 */
  offsetTop?: number;
  /** 水印层级 */
  zIndex?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: ReactNode;
}

// ============ 检查颜色是否包含透明度 ============
const hasAlpha = (color: string): boolean => {
  return color.includes('rgba') || color.includes('hsla') || (color.startsWith('#') && color.length === 9);
};

// ============ 生成水印 Canvas ============
const generateWatermark = (
  content: string | string[],
  image: string | undefined,
  options: {
    width: number;
    height: number;
    rotate: number;
    opacity: number;
    fontSize: number;
    fontColor: string;
    fontFamily: string;
  }
): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const { width, height, rotate, opacity, fontSize, fontColor, fontFamily } = options;

  canvas.width = width;
  canvas.height = height;

  ctx.save();
  
  // 如果 fontColor 已经包含透明度，就不使用 globalAlpha，避免双重透明度
  // 否则使用 globalAlpha 来控制整体透明度
  // 注意：如果 fontColor 已经有透明度，我们仍然需要应用 opacity，但要调整
  if (hasAlpha(fontColor)) {
    // fontColor 已经有透明度，直接使用，不叠加 globalAlpha
    ctx.globalAlpha = 1;
  } else {
    // fontColor 没有透明度，使用 globalAlpha
    ctx.globalAlpha = opacity;
  }
  
  ctx.translate(width / 2, height / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.translate(-width / 2, -height / 2);

  if (image) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image;
    // 注意：这里需要等待图片加载完成，但为了简化，先返回空字符串
    // 实际使用时应该使用 Promise 或回调
    ctx.drawImage(img, 0, 0, width, height);
  } else if (content) {
    // 确保 fontColor 有效
    if (!fontColor) {
      ctx.restore();
      return '';
    }
    
    ctx.fillStyle = fontColor;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const contents = Array.isArray(content) ? content : [content];
    const lineHeight = fontSize * 1.2;
    const totalHeight = contents.length * lineHeight;
    const startY = (height - totalHeight) / 2 + lineHeight / 2;

    contents.forEach((text, index) => {
      ctx.fillText(text, width / 2, startY + index * lineHeight);
    });
  }

  ctx.restore();
  return canvas.toDataURL();
};

// ============ 检测深色模式 ============
const isDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // 优先检查页面主题属性（最可靠）
  if (
    document.documentElement.hasAttribute('data-theme') &&
    document.documentElement.getAttribute('data-theme') === 'dark'
  ) {
    return true;
  }
  
  if (
    document.documentElement.hasAttribute('data-prefers-color-scheme') &&
    document.documentElement.getAttribute('data-prefers-color-scheme') === 'dark'
  ) {
    return true;
  }
  
  if (
    document.documentElement.hasAttribute('data-prefers-color') &&
    document.documentElement.getAttribute('data-prefers-color') === 'dark'
  ) {
    return true;
  }
  
  if (
    document.documentElement.classList.contains('dark') ||
    document.body.classList.contains('dark')
  ) {
    return true;
  }
  
  // 最后检查系统偏好（可能不准确，因为页面可能是亮色但系统是深色）
  // 如果页面没有明确的主题标识，才使用系统偏好
  // 这里暂时注释掉，优先使用页面主题
  // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //   return true;
  // }
  
  return false; // 默认亮色模式
};

// ============ Watermark 组件 ============
export const Watermark: React.FC<WatermarkProps> = ({
  content = 'Watermark',
  image,
  width = 120,
  height = 64,
  rotate = -22,
  opacity = 1, // 默认不应用额外透明度，因为 fontColor 已经包含透明度
  fontSize = 16,
  fontColor,
  fontFamily = 'sans-serif',
  gapX = 100,
  gapY = 100,
  offsetLeft = 0,
  offsetTop = 0,
  zIndex = 9,
  className = '',
  style,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [watermarkUrl, setWatermarkUrl] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // 在客户端初始化时检测深色模式，默认为 false（亮色模式）
    if (typeof window !== 'undefined') {
      return isDarkMode();
    }
    return false; // 默认亮色模式
  });

  // 使用默认字体颜色（如果未指定），依赖于 darkMode state
  const finalFontColor = useMemo(() => {
    if (fontColor) {
      return fontColor;
    }
    // 提高默认透明度，确保可见性
    // 亮色模式使用深色（黑色），深色模式使用浅色（白色）
    // 确保在客户端环境下正确检测，如果 darkMode 未初始化，默认使用亮色模式（黑色）
    if (typeof window === 'undefined') {
      return 'rgba(0, 0, 0, 0.35)'; // 服务端渲染默认亮色
    }
    const isDark = darkMode ?? isDarkMode();
    return isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.35)';
  }, [fontColor, darkMode]);

  // 监听深色模式变化
  useEffect(() => {
    const checkDarkMode = () => {
      const newDarkMode = isDarkMode();
      setDarkMode(newDarkMode);
    };

    // 立即检查一次，确保初始状态正确
    checkDarkMode();
    
    // 延迟再检查一次，确保 DOM 已完全加载
    const timer = setTimeout(() => {
      checkDarkMode();
    }, 100);

    // 监听主题变化
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-prefers-color-scheme', 'data-prefers-color', 'class'],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // 监听系统偏好变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => checkDarkMode();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // 兼容旧版浏览器
      mediaQuery.addListener(handleChange);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!content && !image) return;

    // 确保 finalFontColor 已经计算好
    if (!finalFontColor) {
      // 如果 finalFontColor 还未计算好，使用默认的黑色（亮色模式）
      const defaultColor = 'rgba(0, 0, 0, 0.35)';
      const url = generateWatermark(content, undefined, {
        width,
        height,
        rotate,
        opacity,
        fontSize,
        fontColor: defaultColor,
        fontFamily,
      });
      setWatermarkUrl(url);
      return;
    }

    // 如果使用图片，需要等待图片加载
    if (image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(width / 2, height / 2);
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();

        setWatermarkUrl(canvas.toDataURL());
      };
      img.onerror = () => {
        // 图片加载失败，使用文字
        const url = generateWatermark(content || 'Watermark', undefined, {
          width,
          height,
          rotate,
          opacity,
          fontSize,
          fontColor: finalFontColor,
          fontFamily,
        });
        setWatermarkUrl(url);
      };
      img.src = image;
    } else {
      // 使用文字
      const url = generateWatermark(content, undefined, {
        width,
        height,
        rotate,
        opacity,
        fontSize,
        fontColor: finalFontColor,
        fontFamily,
      });
      setWatermarkUrl(url);
    }
  }, [content, image, width, height, rotate, opacity, fontSize, finalFontColor, fontFamily, darkMode]);

  // 更新水印位置和大小
  const updateWatermark = useCallback(() => {
    if (!containerRef.current || !watermarkRef.current || !watermarkUrl) return;

    const watermark = watermarkRef.current;

    // 设置背景图片
    const backgroundSize = `${width + gapX}px ${height + gapY}px`;
    const backgroundPosition = `${offsetLeft}px ${offsetTop}px`;
    watermark.style.backgroundImage = `url(${watermarkUrl})`;
    watermark.style.backgroundSize = backgroundSize;
    watermark.style.backgroundPosition = backgroundPosition;
    watermark.style.backgroundRepeat = 'repeat';
  }, [watermarkUrl, gapX, gapY, offsetLeft, offsetTop, width, height]);

  // 监听容器大小变化
  useEffect(() => {
    if (!containerRef.current || !watermarkRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !watermarkRef.current) return;
      updateWatermark();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateWatermark]);

  useEffect(() => {
    if (watermarkUrl) {
      updateWatermark();
    }
  }, [watermarkUrl, updateWatermark]);

  const watermarkStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex,
    opacity: 1, // 确保水印层本身不透明
    ...style,
  };

  const containerClassNames = [
    'kage-watermark',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={containerClassNames} style={{ position: 'relative' }}>
      <div ref={watermarkRef} className="kage-watermark-content" style={watermarkStyle} />
      {children && <div className="kage-watermark-children">{children}</div>}
    </div>
  );
};

export default Watermark;

