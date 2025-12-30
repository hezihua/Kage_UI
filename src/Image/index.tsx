import React, { useState, useCallback, CSSProperties, ImgHTMLAttributes } from 'react';
import './style.less';

// ============ Image Props ============
export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  /** 图片地址 */
  src?: string;
  /** 图片描述 */
  alt?: string;
  /** 图片宽度 */
  width?: string | number;
  /** 图片高度 */
  height?: string | number;
  /** 加载占位图 */
  placeholder?: React.ReactNode;
  /** 加载失败容错图 */
  fallback?: string;
  /** 预览配置 */
  preview?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 图片根样式 */
  rootClassName?: string;
  /** 加载完成回调 */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /** 加载失败回调 */
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

// ============ Image Component ============
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  placeholder,
  fallback,
  preview = false,
  className = '',
  style,
  rootClassName = '',
  onLoad,
  onError,
  ...restProps
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setLoading(false);
      onLoad?.(e);
    },
    [onLoad]
  );

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setLoading(false);
      setError(true);
      onError?.(e);
    },
    [onError]
  );

  const handlePreview = useCallback(() => {
    if (preview && !error) {
      setPreviewVisible(true);
    }
  }, [preview, error]);

  const handleClosePreview = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  const containerStyle: CSSProperties = {
    width,
    height,
    ...style,
  };

  const imgStyle: CSSProperties = {
    width: width || '100%',
    height: height || 'auto',
  };

  const classNames = [
    'kage-image',
    preview && !error ? 'kage-image-preview-enabled' : '',
    rootClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const imgClassNames = [
    'kage-image-img',
    loading ? 'kage-image-img-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 默认占位符
  const defaultPlaceholder = (
    <div className="kage-image-placeholder">
      <svg
        viewBox="0 0 1024 1024"
        width="48"
        height="48"
        fill="currentColor"
      >
        <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" />
        <path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" />
      </svg>
    </div>
  );

  // 错误占位符
  const errorPlaceholder = (
    <div className="kage-image-error">
      <svg
        viewBox="0 0 1024 1024"
        width="48"
        height="48"
        fill="currentColor"
      >
        <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136V232h752v560z" />
        <path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28zM674.5 440.5l-68 68-68-68c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l68 68-68 68c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4l68-68 68 68c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3l-68-68 68-68c12.5-12.5 12.5-32.8 0-45.3s-32.7-12.5-45.2 0z" />
      </svg>
      <div className="kage-image-error-text">加载失败</div>
    </div>
  );

  return (
    <>
      <div className={classNames} style={containerStyle}>
        {/* 加载占位符 */}
        {loading && (placeholder !== undefined ? placeholder : defaultPlaceholder)}

        {/* 图片 */}
        {!error && (
          <img
            {...restProps}
            src={src}
            alt={alt}
            className={imgClassNames}
            style={imgStyle}
            onLoad={handleLoad}
            onError={handleError}
            onClick={handlePreview}
          />
        )}

        {/* 错误占位符 */}
        {error && (
          <>
            {fallback ? (
              <img
                {...restProps}
                src={fallback}
                alt={alt}
                className={imgClassNames}
                style={imgStyle}
              />
            ) : (
              errorPlaceholder
            )}
          </>
        )}

        {/* 预览遮罩 */}
        {preview && previewVisible && (
          <div className="kage-image-preview-mask" onClick={handleClosePreview}>
            <div className="kage-image-preview-wrap">
              <img src={src} alt={alt} className="kage-image-preview-img" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Image;

