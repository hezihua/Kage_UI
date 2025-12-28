import React, { useState, useCallback, useMemo } from 'react';
import './style.less';

export interface PaginationProps {
  /** 当前页码 */
  current?: number;
  /** 默认当前页码 */
  defaultCurrent?: number;
  /** 数据总数 */
  total: number;
  /** 每页条数 */
  pageSize?: number;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 每页条数选项 */
  pageSizeOptions?: number[];
  /** 是否显示每页条数选择器 */
  showSizeChanger?: boolean;
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean;
  /** 是否显示总数 */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 简洁模式 */
  simple?: boolean;
  /** 尺寸 */
  size?: 'default' | 'small';
  /** 页码改变回调 */
  onChange?: (page: number, pageSize: number) => void;
  /** 每页条数改变回调 */
  onShowSizeChange?: (current: number, size: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Pagination: React.FC<PaginationProps> = ({
  current: controlledCurrent,
  defaultCurrent = 1,
  total,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  showSizeChanger = false,
  showQuickJumper = false,
  showTotal,
  disabled = false,
  simple = false,
  size = 'default',
  onChange,
  onShowSizeChange,
  className = '',
  style,
}) => {
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const [jumpValue, setJumpValue] = useState('');

  const current = controlledCurrent ?? internalCurrent;
  const pageSize = controlledPageSize ?? internalPageSize;
  const totalPages = Math.ceil(total / pageSize);

  // 计算当前页显示的数据范围
  const range: [number, number] = useMemo(() => {
    const start = (current - 1) * pageSize + 1;
    const end = Math.min(current * pageSize, total);
    return [start, end];
  }, [current, pageSize, total]);

  // 改变页码
  const handlePageChange = useCallback((page: number) => {
    if (disabled || page < 1 || page > totalPages || page === current) return;
    
    if (controlledCurrent === undefined) {
      setInternalCurrent(page);
    }
    onChange?.(page, pageSize);
  }, [disabled, totalPages, current, controlledCurrent, pageSize, onChange]);

  // 改变每页条数
  const handlePageSizeChange = useCallback((newSize: number) => {
    if (disabled) return;
    
    const newTotalPages = Math.ceil(total / newSize);
    const newCurrent = Math.min(current, newTotalPages);
    
    if (controlledPageSize === undefined) {
      setInternalPageSize(newSize);
    }
    if (controlledCurrent === undefined) {
      setInternalCurrent(newCurrent);
    }
    
    onShowSizeChange?.(newCurrent, newSize);
    onChange?.(newCurrent, newSize);
  }, [disabled, total, current, controlledPageSize, controlledCurrent, onShowSizeChange, onChange]);

  // 快速跳转
  const handleJump = useCallback(() => {
    const page = parseInt(jumpValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageChange(page);
    }
    setJumpValue('');
  }, [jumpValue, totalPages, handlePageChange]);

  // 生成页码列表
  const generatePages = useCallback(() => {
    const pages: (number | 'prev-ellipsis' | 'next-ellipsis')[] = [];
    const showPages = 5; // 最多显示的页码数
    
    if (totalPages <= showPages + 2) {
      // 总页数较少，全部显示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总页数较多，显示省略号
      pages.push(1);
      
      if (current <= 3) {
        // 当前页靠前
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('next-ellipsis');
      } else if (current >= totalPages - 2) {
        // 当前页靠后
        pages.push('prev-ellipsis');
        for (let i = totalPages - 3; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间
        pages.push('prev-ellipsis');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('next-ellipsis');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  }, [totalPages, current]);

  const classNames = [
    'kage-pagination',
    `kage-pagination-${size}`,
    simple && 'kage-pagination-simple',
    disabled && 'kage-pagination-disabled',
    className,
  ].filter(Boolean).join(' ');

  // 简洁模式
  if (simple) {
    return (
      <div className={classNames} style={style}>
        <button
          className="kage-pagination-prev"
          disabled={disabled || current === 1}
          onClick={() => handlePageChange(current - 1)}
        >
          ‹
        </button>
        <span className="kage-pagination-simple-pager">
          <input
            type="text"
            value={current}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) handlePageChange(val);
            }}
            disabled={disabled}
          />
          <span className="kage-pagination-simple-separator">/</span>
          <span>{totalPages}</span>
        </span>
        <button
          className="kage-pagination-next"
          disabled={disabled || current === totalPages}
          onClick={() => handlePageChange(current + 1)}
        >
          ›
        </button>
      </div>
    );
  }

  return (
    <div className={classNames} style={style}>
      {/* 显示总数 */}
      {showTotal && (
        <span className="kage-pagination-total">
          {showTotal(total, range)}
        </span>
      )}

      {/* 上一页 */}
      <button
        className="kage-pagination-prev"
        disabled={disabled || current === 1}
        onClick={() => handlePageChange(current - 1)}
      >
        ‹
      </button>

      {/* 页码列表 */}
      {generatePages().map((page, index) => {
        if (page === 'prev-ellipsis') {
          return (
            <span
              key="prev-ellipsis"
              className="kage-pagination-ellipsis"
              onClick={() => handlePageChange(Math.max(1, current - 5))}
            >
              •••
            </span>
          );
        }
        if (page === 'next-ellipsis') {
          return (
            <span
              key="next-ellipsis"
              className="kage-pagination-ellipsis"
              onClick={() => handlePageChange(Math.min(totalPages, current + 5))}
            >
              •••
            </span>
          );
        }
        return (
          <button
            key={page}
            className={`kage-pagination-item ${current === page ? 'kage-pagination-item-active' : ''}`}
            disabled={disabled}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      })}

      {/* 下一页 */}
      <button
        className="kage-pagination-next"
        disabled={disabled || current === totalPages}
        onClick={() => handlePageChange(current + 1)}
      >
        ›
      </button>

      {/* 每页条数选择器 */}
      {showSizeChanger && (
        <select
          className="kage-pagination-size-changer"
          value={pageSize}
          disabled={disabled}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} 条/页
            </option>
          ))}
        </select>
      )}

      {/* 快速跳转 */}
      {showQuickJumper && (
        <span className="kage-pagination-jumper">
          跳至
          <input
            type="text"
            value={jumpValue}
            disabled={disabled}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJump()}
            onBlur={handleJump}
          />
          页
        </span>
      )}
    </div>
  );
};

export default Pagination;

