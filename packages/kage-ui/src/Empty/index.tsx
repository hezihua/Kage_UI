import React, { ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ Empty Props ============
export interface EmptyProps {
  /** 图片地址或自定义图片元素 */
  image?: ReactNode | string;
  /** 图片样式 */
  imageStyle?: CSSProperties;
  /** 描述文字 */
  description?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素（通常是操作按钮） */
  children?: ReactNode;
}

// 默认空状态 SVG 图标
const DefaultEmptyImage = () => (
  <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0 1)" fill="none" fillRule="evenodd">
      <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" />
      <g fillRule="nonzero" stroke="#d9d9d9">
        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
        <path
          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
          fill="#fafafa"
        />
      </g>
    </g>
  </svg>
);

// 简单空状态图标
const SimpleEmptyImage = () => (
  <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0 1)" fill="none" fillRule="evenodd">
      <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" />
      <path
        d="M32 8c13.255 0 24 10.745 24 24H8c0-13.255 10.745-24 24-24z"
        fill="#fafafa"
        stroke="#d9d9d9"
      />
    </g>
  </svg>
);

// ============ Empty Component ============
export const Empty: React.FC<EmptyProps> & {
  PRESENTED_IMAGE_DEFAULT: ReactNode;
  PRESENTED_IMAGE_SIMPLE: ReactNode;
} = ({
  image = <DefaultEmptyImage />,
  imageStyle,
  description = '暂无数据',
  className = '',
  style,
  children,
}) => {
  const classNames = ['kage-empty', className].filter(Boolean).join(' ');

  // 渲染图片
  const renderImage = () => {
    if (typeof image === 'string') {
      return (
        <img
          src={image}
          alt="empty"
          className="kage-empty-image"
          style={imageStyle}
        />
      );
    }
    return (
      <div className="kage-empty-image" style={imageStyle}>
        {image}
      </div>
    );
  };

  return (
    <div className={classNames} style={style}>
      {renderImage()}
      {description && (
        <div className="kage-empty-description">{description}</div>
      )}
      {children && <div className="kage-empty-footer">{children}</div>}
    </div>
  );
};

// 预设图片
Empty.PRESENTED_IMAGE_DEFAULT = <DefaultEmptyImage />;
Empty.PRESENTED_IMAGE_SIMPLE = <SimpleEmptyImage />;

export default Empty;

