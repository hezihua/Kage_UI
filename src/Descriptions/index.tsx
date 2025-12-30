import React, { ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ Descriptions Item Props ============
export interface DescriptionsItemProps {
  /** 标签内容 */
  label?: ReactNode;
  /** 内容区域 */
  children?: ReactNode;
  /** 包含列的数量 */
  span?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义标签样式 */
  labelStyle?: CSSProperties;
  /** 自定义内容样式 */
  contentStyle?: CSSProperties;
}

// ============ Descriptions Props ============
export interface DescriptionsProps {
  /** 标题 */
  title?: ReactNode;
  /** 额外的操作区域 */
  extra?: ReactNode;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 一行显示几列 */
  column?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number };
  /** 描述列表的大小 */
  size?: 'default' | 'middle' | 'small';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 标签样式 */
  labelStyle?: CSSProperties;
  /** 内容样式 */
  contentStyle?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: ReactNode;
}

// ============ Descriptions Item Component ============
export const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ children }) => {
  return <>{children}</>;
};

// ============ Descriptions Component ============
export const Descriptions: React.FC<DescriptionsProps> & {
  Item: typeof DescriptionsItem;
} = ({
  title,
  extra,
  bordered = false,
  column = 3,
  size = 'default',
  colon = true,
  labelStyle,
  contentStyle,
  className = '',
  style,
  children,
}) => {
  // 获取响应式列数
  const getColumn = () => {
    if (typeof column === 'number') {
      return column;
    }
    // 简化处理：默认返回 md 或 3
    return column.md || 3;
  };

  const cols = getColumn();

  // 收集所有 Item
  const items: Array<{
    label?: ReactNode;
    content?: ReactNode;
    span?: number;
    className?: string;
    style?: CSSProperties;
    labelStyle?: CSSProperties;
    contentStyle?: CSSProperties;
  }> = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement<DescriptionsItemProps>(child)) {
      items.push({
        label: child.props.label,
        content: child.props.children,
        span: child.props.span || 1,
        className: child.props.className,
        style: child.props.style,
        labelStyle: child.props.labelStyle,
        contentStyle: child.props.contentStyle,
      });
    }
  });

  // 生成行
  const rows: Array<typeof items> = [];
  let currentRow: typeof items = [];
  let currentSpan = 0;

  items.forEach((item) => {
    const itemSpan = Math.min(item.span || 1, cols);
    
    if (currentSpan + itemSpan > cols) {
      // 当前行放不下，开始新行
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }
      currentRow = [item];
      currentSpan = itemSpan;
    } else {
      currentRow.push(item);
      currentSpan += itemSpan;
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  const classNames = [
    'kage-descriptions',
    `kage-descriptions-${size}`,
    bordered ? 'kage-descriptions-bordered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 渲染无边框样式
  const renderUnbordered = () => (
    <div className="kage-descriptions-view">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="kage-descriptions-row">
          {row.map((item, itemIndex) => {
            const itemWidth = `${(item.span! / cols) * 100}%`;
            return (
              <div
                key={itemIndex}
                className={`kage-descriptions-item ${item.className || ''}`}
                style={{ ...item.style, width: itemWidth }}
              >
                <span
                  className="kage-descriptions-item-label"
                  style={{ ...labelStyle, ...item.labelStyle }}
                >
                  {item.label}
                  {colon && item.label && ':'}
                </span>
                <span
                  className="kage-descriptions-item-content"
                  style={{ ...contentStyle, ...item.contentStyle }}
                >
                  {item.content}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  // 渲染有边框样式
  const renderBordered = () => {
    return (
      <div className="kage-descriptions-view">
        <table>
          <tbody>
            {rows.map((row, rowIndex) => {
              // 计算当前行已使用的列数
              const usedCols = row.reduce((sum, item) => sum + item.span!, 0);
              const remainingCols = cols - usedCols;

              return (
                <tr key={rowIndex} className="kage-descriptions-row">
                  {row.map((item, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      <th
                        className={`kage-descriptions-item-label ${item.className || ''}`}
                        style={{ ...labelStyle, ...item.labelStyle }}
                      >
                        {item.label}
                        {colon && item.label && ':'}
                      </th>
                      <td
                        className="kage-descriptions-item-content"
                        colSpan={item.span! > 1 ? item.span! * 2 - 1 : 1}
                        style={{ ...contentStyle, ...item.contentStyle, ...item.style }}
                      >
                        {item.content}
                      </td>
                    </React.Fragment>
                  ))}
                  {/* 填充剩余的空列 */}
                  {remainingCols > 0 &&
                    Array.from({ length: remainingCols }).map((_, idx) => (
                      <React.Fragment key={`empty-${idx}`}>
                        <th />
                        <td />
                      </React.Fragment>
                    ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={classNames} style={style}>
      {(title || extra) && (
        <div className="kage-descriptions-header">
          {title && <div className="kage-descriptions-title">{title}</div>}
          {extra && <div className="kage-descriptions-extra">{extra}</div>}
        </div>
      )}
      {bordered ? renderBordered() : renderUnbordered()}
    </div>
  );
};

// 绑定子组件
Descriptions.Item = DescriptionsItem;

export default Descriptions;

