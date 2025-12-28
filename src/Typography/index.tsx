import React from 'react';
import './style.less';

// ============ Title 标题组件 ============
export interface TitleProps {
  /** 标题级别 h1-h5 */
  level?: 1 | 2 | 3 | 4 | 5;
  /** 是否可复制 */
  copyable?: boolean;
  /** 是否添加删除线 */
  delete?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否添加标记样式（高亮） */
  mark?: boolean;
  /** 是否添加下划线 */
  underline?: boolean;
  /** 文本类型 */
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Title: React.FC<TitleProps> = ({
  level = 1,
  delete: del,
  disabled,
  mark,
  underline,
  type,
  children,
  className = '',
  style,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const classNames = [
    'kage-typography',
    'kage-typography-title',
    `kage-typography-title-${level}`,
    type && `kage-typography-${type}`,
    disabled && 'kage-typography-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  let content: React.ReactNode = children;
  if (del) content = <del>{content}</del>;
  if (underline) content = <u>{content}</u>;
  if (mark) content = <mark>{content}</mark>;

  return (
    <Tag className={classNames} style={style}>
      {content}
    </Tag>
  );
};

// ============ Text 文本组件 ============
export interface TextProps {
  /** 文本类型 */
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否添加标记样式（高亮） */
  mark?: boolean;
  /** 是否添加代码样式 */
  code?: boolean;
  /** 是否使用键盘样式 */
  keyboard?: boolean;
  /** 是否添加下划线 */
  underline?: boolean;
  /** 是否添加删除线 */
  delete?: boolean;
  /** 是否加粗 */
  strong?: boolean;
  /** 是否斜体 */
  italic?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  type,
  disabled,
  mark,
  code,
  keyboard,
  underline,
  delete: del,
  strong,
  italic,
  children,
  className = '',
  style,
}) => {
  const classNames = [
    'kage-typography',
    'kage-typography-text',
    type && `kage-typography-${type}`,
    disabled && 'kage-typography-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  let content: React.ReactNode = children;
  if (strong) content = <strong>{content}</strong>;
  if (italic) content = <em>{content}</em>;
  if (del) content = <del>{content}</del>;
  if (underline) content = <u>{content}</u>;
  if (code) content = <code className="kage-typography-code">{content}</code>;
  if (keyboard) content = <kbd className="kage-typography-keyboard">{content}</kbd>;
  if (mark) content = <mark className="kage-typography-mark">{content}</mark>;

  return (
    <span className={classNames} style={style}>
      {content}
    </span>
  );
};

// ============ Paragraph 段落组件 ============
export interface ParagraphProps {
  /** 文本类型 */
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否添加删除线 */
  delete?: boolean;
  /** 是否添加下划线 */
  underline?: boolean;
  /** 是否加粗 */
  strong?: boolean;
  /** 是否斜体 */
  italic?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  type,
  disabled,
  delete: del,
  underline,
  strong,
  italic,
  children,
  className = '',
  style,
}) => {
  const classNames = [
    'kage-typography',
    'kage-typography-paragraph',
    type && `kage-typography-${type}`,
    disabled && 'kage-typography-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  let content: React.ReactNode = children;
  if (strong) content = <strong>{content}</strong>;
  if (italic) content = <em>{content}</em>;
  if (del) content = <del>{content}</del>;
  if (underline) content = <u>{content}</u>;

  return (
    <p className={classNames} style={style}>
      {content}
    </p>
  );
};

// ============ Link 链接组件 ============
export interface LinkProps {
  /** 链接地址 */
  href?: string;
  /** 打开方式 */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** 文本类型 */
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否添加下划线 */
  underline?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const Link: React.FC<LinkProps> = ({
  href,
  target,
  type,
  disabled,
  underline = true,
  children,
  className = '',
  style,
  onClick,
}) => {
  const classNames = [
    'kage-typography',
    'kage-typography-link',
    type && `kage-typography-${type}`,
    disabled && 'kage-typography-disabled',
    !underline && 'kage-typography-link-no-underline',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      href={disabled ? undefined : href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={classNames}
      style={style}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

// ============ Typography 命名空间导出 ============
type TypographyType = React.FC & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
  Link: typeof Link;
};

const Typography: TypographyType = (() => null) as TypographyType;
Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
Typography.Link = Link;

export default Typography;

