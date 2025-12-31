import React, { useEffect, useRef, useState } from 'react';
import QRCodeGenerator from 'qrcode';
import './style.less';

export interface QRCodeProps {
  /** 二维码内容 */
  value: string;
  /** 二维码大小 */
  size?: number;
  /** 二维码颜色 */
  color?: string;
  /** 背景色 */
  bgColor?: string;
  /** 二维码中间的 icon */
  icon?: string;
  /** icon 大小 */
  iconSize?: number;
  /** 纠错级别 */
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  /** 是否有边框 */
  bordered?: boolean;
  /** 状态 */
  status?: 'active' | 'expired' | 'loading';
  /** 点击二维码的回调 */
  onRefresh?: () => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 160,
  color = '#000',
  bgColor = '#fff',
  icon,
  iconSize = 40,
  errorLevel = 'M',
  bordered = true,
  status = 'active',
  onRefresh,
  className,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !value || status !== 'active') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置 canvas 尺寸
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // 清空画布
    ctx.clearRect(0, 0, size, size);

    // 使用 qrcode 库生成二维码
    QRCodeGenerator.toCanvas(
      canvas,
      value,
      {
        width: size,
        margin: 1,
        color: {
          dark: color,
          light: bgColor,
        },
        errorCorrectionLevel: errorLevel,
      },
      (error) => {
        if (error) {
          console.error('QRCode generation error:', error);
          return;
        }

        // 如果有 icon，在二维码上绘制 icon
        if (icon && imgLoaded) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = icon;
          img.onload = () => {
            const iconX = (size - iconSize) / 2;
            const iconY = (size - iconSize) / 2;
            
            // 绘制白色背景
            ctx.fillStyle = '#fff';
            ctx.fillRect(iconX - 4, iconY - 4, iconSize + 8, iconSize + 8);
            
            // 绘制图标
            ctx.drawImage(img, iconX, iconY, iconSize, iconSize);
          };
        }
      }
    );
  }, [value, size, color, bgColor, icon, iconSize, errorLevel, status, imgLoaded]);

  useEffect(() => {
    if (icon) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = icon;
      img.onload = () => setImgLoaded(true);
    }
  }, [icon]);

  const prefixCls = 'kage-qrcode';

  const renderStatus = () => {
    if (status === 'expired') {
      return (
        <div className={`${prefixCls}-expired`}>
          <div className={`${prefixCls}-expired-icon`}>⟳</div>
          <div className={`${prefixCls}-expired-text`}>二维码已过期</div>
          {onRefresh && (
            <button
              className={`${prefixCls}-expired-btn`}
              onClick={onRefresh}
            >
              点击刷新
            </button>
          )}
        </div>
      );
    }

    if (status === 'loading') {
      return (
        <div className={`${prefixCls}-loading`}>
          <div className={`${prefixCls}-loading-spinner`}></div>
        </div>
      );
    }

    return null;
  };

  const handleDownload = () => {
    if (!canvasRef.current || status !== 'active') return;
    
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = url;
    link.click();
  };

  return (
    <div
      className={`${prefixCls} ${
        bordered ? `${prefixCls}-bordered` : ''
      } ${className || ''}`}
      style={style}
    >
      <div
        className={`${prefixCls}-wrapper`}
        style={{ width: size, height: size }}
      >
        <canvas
          ref={canvasRef}
          className={`${prefixCls}-canvas ${
            status !== 'active' ? `${prefixCls}-canvas-blur` : ''
          }`}
        />
        {renderStatus()}
      </div>
      {status === 'active' && (
        <div className={`${prefixCls}-actions`}>
          <button
            className={`${prefixCls}-action-btn`}
            onClick={handleDownload}
            title="下载二维码"
          >
            ⬇ 下载
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCode;

