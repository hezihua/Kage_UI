import React, { useRef, useState, useCallback } from 'react';
import './style.less';

// ============ 文件信息 ============
export interface UploadFile {
  uid: string;
  name: string;
  size?: number;
  type?: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  percent?: number;
  response?: any;
  error?: any;
  url?: string;
  thumbUrl?: string;
}

export type UploadListType = 'text' | 'picture' | 'picture-card';

// ============ Upload Props ============
export interface UploadProps {
  /** 接受上传的文件类型 */
  accept?: string;
  /** 上传的地址 */
  action?: string;
  /** 是否支持多选文件 */
  multiple?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 已上传的文件列表 */
  fileList?: UploadFile[];
  /** 默认已上传的文件列表 */
  defaultFileList?: UploadFile[];
  /** 上传列表的内建样式 */
  listType?: UploadListType;
  /** 是否显示上传列表 */
  showUploadList?: boolean;
  /** 上传前的钩子 */
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  /** 自定义上传实现 */
  customRequest?: (options: {
    file: File;
    onProgress: (percent: number) => void;
    onSuccess: (response: any) => void;
    onError: (error: Error) => void;
  }) => void;
  /** 上传文件改变时的回调 */
  onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void;
  /** 文件上传成功时的回调 */
  onSuccess?: (response: any, file: UploadFile) => void;
  /** 文件上传失败时的回调 */
  onError?: (error: Error, file: UploadFile) => void;
  /** 点击移除文件时的回调 */
  onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
  /** 最大上传文件数 */
  maxCount?: number;
  /** 是否支持拖拽上传 */
  drag?: boolean;
  /** 上传按钮/区域的内容 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Upload Component ============
export const Upload: React.FC<UploadProps> = ({
  accept,
  action,
  multiple = false,
  disabled = false,
  fileList: controlledFileList,
  defaultFileList = [],
  listType = 'text',
  showUploadList = true,
  beforeUpload,
  customRequest,
  onChange,
  onSuccess,
  onError,
  onRemove,
  maxCount,
  drag = false,
  children,
  className = '',
  style,
}) => {
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uidCounter = useRef(0);

  const fileList = controlledFileList !== undefined ? controlledFileList : internalFileList;

  // 生成唯一ID
  const getUid = useCallback(() => {
    uidCounter.current += 1;
    return `upload-${Date.now()}-${uidCounter.current}`;
  }, []);

  // 模拟文件上传
  const simulateUpload = useCallback((uploadFile: UploadFile, file: File) => {
    let percent = 0;
    const timer = setInterval(() => {
      percent += 10;
      if (percent > 100) {
        clearInterval(timer);
        
        // 模拟上传成功
        const updatedFile: UploadFile = {
          ...uploadFile,
          status: 'done',
          percent: 100,
          response: { url: URL.createObjectURL(file) },
        };

        updateFileList(updatedFile);
        onSuccess?.({ url: URL.createObjectURL(file) }, updatedFile);
      } else {
        const updatedFile: UploadFile = {
          ...uploadFile,
          status: 'uploading',
          percent,
        };
        updateFileList(updatedFile);
      }
    }, 200);
  }, [onSuccess]);

  // 更新文件列表
  const updateFileList = useCallback((file: UploadFile) => {
    const newFileList = fileList.map((item) =>
      item.uid === file.uid ? file : item
    );

    if (controlledFileList === undefined) {
      setInternalFileList(newFileList);
    }

    onChange?.({ file, fileList: newFileList });
  }, [fileList, controlledFileList, onChange]);

  // 添加文件到列表
  const addFileToList = useCallback((file: File) => {
    const uploadFile: UploadFile = {
      uid: getUid(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      percent: 0,
    };

    const newFileList = [...fileList, uploadFile];

    if (controlledFileList === undefined) {
      setInternalFileList(newFileList);
    }

    onChange?.({ file: uploadFile, fileList: newFileList });

    // 开始上传
    if (customRequest) {
      customRequest({
        file,
        onProgress: (percent) => {
          updateFileList({ ...uploadFile, percent });
        },
        onSuccess: (response) => {
          const updatedFile = { ...uploadFile, status: 'done' as const, response };
          updateFileList(updatedFile);
          onSuccess?.(response, updatedFile);
        },
        onError: (error) => {
          const updatedFile = { ...uploadFile, status: 'error' as const, error };
          updateFileList(updatedFile);
          onError?.(error, updatedFile);
        },
      });
    } else {
      // 使用模拟上传
      simulateUpload(uploadFile, file);
    }
  }, [fileList, controlledFileList, getUid, onChange, customRequest, simulateUpload, updateFileList, onSuccess, onError]);

  // 处理文件选择
  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 检查最大数量
    if (maxCount && fileList.length + files.length > maxCount) {
      console.warn(`最多只能上传 ${maxCount} 个文件`);
      return;
    }

    // beforeUpload 钩子
    for (const file of files) {
      if (beforeUpload) {
        const result = await beforeUpload(file, files);
        if (!result) continue;
      }
      addFileToList(file);
    }

    // 重置 input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [fileList, maxCount, beforeUpload, addFileToList]);

  // 点击上传
  const handleClick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  // 移除文件
  const handleRemove = useCallback(async (file: UploadFile) => {
    if (onRemove) {
      const result = await onRemove(file);
      if (result === false) return;
    }

    const newFileList = fileList.filter((item) => item.uid !== file.uid);

    if (controlledFileList === undefined) {
      setInternalFileList(newFileList);
    }

    const removedFile = { ...file, status: 'removed' as const };
    onChange?.({ file: removedFile, fileList: newFileList });
  }, [fileList, controlledFileList, onRemove, onChange]);

  // 拖拽相关
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    // 检查最大数量
    if (maxCount && fileList.length + files.length > maxCount) {
      console.warn(`最多只能上传 ${maxCount} 个文件`);
      return;
    }

    // beforeUpload 钩子
    for (const file of files) {
      if (beforeUpload) {
        const result = await beforeUpload(file, files);
        if (!result) continue;
      }
      addFileToList(file);
    }
  }, [disabled, fileList, maxCount, beforeUpload, addFileToList]);

  // 格式化文件大小
  const formatFileSize = (size?: number): string => {
    if (!size) return '';
    if (size < 1024) return `${size}B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`;
    return `${(size / (1024 * 1024)).toFixed(1)}MB`;
  };

  // 渲染文件列表
  const renderFileList = () => {
    if (!showUploadList || fileList.length === 0) return null;

    if (listType === 'picture-card') {
      return (
        <div className="kage-upload-list-picture-card">
          {fileList.map((file) => (
            <div key={file.uid} className={`kage-upload-list-item ${file.status}`}>
              <div className="kage-upload-list-item-thumbnail">
                {file.thumbUrl || file.url ? (
                  <img src={file.thumbUrl || file.url} alt={file.name} />
                ) : (
                  <span className="kage-upload-list-item-icon">📄</span>
                )}
              </div>
              {file.status === 'uploading' && (
                <div className="kage-upload-list-item-progress">
                  <div
                    className="kage-upload-list-item-progress-bar"
                    style={{ width: `${file.percent}%` }}
                  />
                </div>
              )}
              <div className="kage-upload-list-item-actions">
                <span
                  className="kage-upload-list-item-action"
                  onClick={() => handleRemove(file)}
                  title="删除"
                >
                  🗑️
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (listType === 'picture') {
      return (
        <div className="kage-upload-list-picture">
          {fileList.map((file) => (
            <div key={file.uid} className={`kage-upload-list-item ${file.status}`}>
              <div className="kage-upload-list-item-thumbnail">
                {file.thumbUrl || file.url ? (
                  <img src={file.thumbUrl || file.url} alt={file.name} />
                ) : (
                  <span className="kage-upload-list-item-icon">📄</span>
                )}
              </div>
              <div className="kage-upload-list-item-info">
                <span className="kage-upload-list-item-name">{file.name}</span>
                {file.status === 'uploading' && (
                  <div className="kage-upload-list-item-progress">
                    <div
                      className="kage-upload-list-item-progress-bar"
                      style={{ width: `${file.percent}%` }}
                    />
                  </div>
                )}
              </div>
              <span
                className="kage-upload-list-item-remove"
                onClick={() => handleRemove(file)}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      );
    }

    // text 类型
    return (
      <div className="kage-upload-list-text">
        {fileList.map((file) => (
          <div key={file.uid} className={`kage-upload-list-item ${file.status}`}>
            <span className="kage-upload-list-item-icon">
              {file.status === 'uploading' && '⏳'}
              {file.status === 'done' && '✓'}
              {file.status === 'error' && '✗'}
            </span>
            <span className="kage-upload-list-item-name">{file.name}</span>
            <span className="kage-upload-list-item-size">{formatFileSize(file.size)}</span>
            {file.status === 'uploading' && (
              <span className="kage-upload-list-item-percent">{file.percent}%</span>
            )}
            <span
              className="kage-upload-list-item-remove"
              onClick={() => handleRemove(file)}
            >
              ×
            </span>
          </div>
        ))}
      </div>
    );
  };

  const classNames = [
    'kage-upload',
    drag && 'kage-upload-drag',
    dragOver && 'kage-upload-drag-over',
    disabled && 'kage-upload-disabled',
    listType === 'picture-card' && 'kage-upload-picture-card',
    className,
  ].filter(Boolean).join(' ');

  const shouldShowUploadButton = !maxCount || fileList.length < maxCount;

  return (
    <div className={classNames} style={style}>
      {/* 隐藏的 input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* 上传按钮/区域 */}
      {shouldShowUploadButton && (
        <div
          className="kage-upload-trigger"
          onClick={handleClick}
          onDragOver={drag ? handleDragOver : undefined}
          onDragLeave={drag ? handleDragLeave : undefined}
          onDrop={drag ? handleDrop : undefined}
        >
          {children || (
            <div className="kage-upload-default">
              <span className="kage-upload-icon">📁</span>
              <span className="kage-upload-text">
                {drag ? '点击或拖拽文件到此处上传' : '点击上传'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 文件列表 */}
      {renderFileList()}
    </div>
  );
};

export default Upload;

