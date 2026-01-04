import React, { useState, useEffect, useCallback, useRef, CSSProperties } from 'react';
import './style.less';

export type DotPosition = 'top' | 'bottom' | 'left' | 'right';

// ============ Carousel Props ============
export interface CarouselProps {
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 自动切换的时间间隔（毫秒） */
  autoplaySpeed?: number;
  /** 面板指示点位置 */
  dotPosition?: DotPosition;
  /** 是否显示面板指示点 */
  dots?: boolean;
  /** 切换效果 */
  effect?: 'scrollx' | 'fade';
  /** 是否无限循环 */
  infinite?: boolean;
  /** 当前激活的索引 */
  activeIndex?: number;
  /** 默认激活的索引 */
  defaultActiveIndex?: number;
  /** 切换面板的回调 */
  onChange?: (current: number) => void;
  /** 切换面板前的回调 */
  beforeChange?: (from: number, to: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 轮播项 */
  children?: React.ReactNode;
}

// ============ Carousel Component ============
export const Carousel: React.FC<CarouselProps> = ({
  autoplay = false,
  autoplaySpeed = 3000,
  dotPosition = 'bottom',
  dots = true,
  effect = 'scrollx',
  infinite = true,
  activeIndex: controlledIndex,
  defaultActiveIndex = 0,
  onChange,
  beforeChange,
  className = '',
  style,
  children,
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const trackRef = useRef<HTMLDivElement>(null);

  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const childrenArray = React.Children.toArray(children);
  const count = childrenArray.length;

  // 切换到指定索引
  const goTo = useCallback((index: number) => {
    if (isTransitioning || count === 0) return;

    let nextIndex = index;
    
    // 处理循环
    if (infinite) {
      if (nextIndex < 0) {
        nextIndex = count - 1;
      } else if (nextIndex >= count) {
        nextIndex = 0;
      }
    } else {
      if (nextIndex < 0 || nextIndex >= count) return;
    }

    if (nextIndex === currentIndex) return;

    beforeChange?.(currentIndex, nextIndex);

    if (controlledIndex === undefined) {
      setInternalIndex(nextIndex);
    }

    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);

    onChange?.(nextIndex);
  }, [currentIndex, count, infinite, isTransitioning, controlledIndex, beforeChange, onChange]);

  // 上一张
  const prev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  // 下一张
  const next = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  // 自动播放
  useEffect(() => {
    if (autoplay && count > 1) {
      timerRef.current = setInterval(() => {
        next();
      }, autoplaySpeed);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [autoplay, autoplaySpeed, count, next]);

  // 鼠标悬停时暂停自动播放
  const handleMouseEnter = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (autoplay && count > 1) {
      timerRef.current = setInterval(() => {
        next();
      }, autoplaySpeed);
    }
  }, [autoplay, autoplaySpeed, count, next]);

  if (count === 0) {
    return null;
  }

  const classNames = [
    'kage-carousel',
    `kage-carousel-${effect}`,
    `kage-carousel-dots-${dotPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const trackStyle: CSSProperties =
    effect === 'scrollx'
      ? {
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease' : 'none',
        }
      : {};

  return (
    <div
      className={classNames}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 轮播容器 */}
      <div className="kage-carousel-container">
        <div
          ref={trackRef}
          className="kage-carousel-track"
          style={trackStyle}
        >
          {childrenArray.map((child, index) => (
            <div
              key={index}
              className={`kage-carousel-item ${
                effect === 'fade'
                  ? index === currentIndex
                    ? 'kage-carousel-item-active'
                    : ''
                  : ''
              }`}
            >
              {child}
            </div>
          ))}
        </div>

        {/* 前后切换箭头 */}
        <button
          className="kage-carousel-arrow kage-carousel-arrow-left"
          onClick={prev}
          disabled={!infinite && currentIndex === 0}
        >
          ‹
        </button>
        <button
          className="kage-carousel-arrow kage-carousel-arrow-right"
          onClick={next}
          disabled={!infinite && currentIndex === count - 1}
        >
          ›
        </button>
      </div>

      {/* 指示器 */}
      {dots && (
        <div className="kage-carousel-dots">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              className={`kage-carousel-dot ${
                index === currentIndex ? 'kage-carousel-dot-active' : ''
              }`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

