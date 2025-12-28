import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import './style.less';

// ============ Form Context ============
interface FormContextType {
  values: Record<string, any>;
  errors: Record<string, string>;
  layout: 'horizontal' | 'vertical' | 'inline';
  labelCol?: { span?: number };
  wrapperCol?: { span?: number };
  disabled: boolean;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  validateField: (name: string) => Promise<boolean>;
  registerField: (name: string, rules?: Rule[]) => void;
  unregisterField: (name: string) => void;
}

const FormContext = createContext<FormContextType | null>(null);

// ============ Rule Type ============
export interface Rule {
  /** 是否必填 */
  required?: boolean;
  /** 最小长度 */
  min?: number;
  /** 最大长度 */
  max?: number;
  /** 正则表达式 */
  pattern?: RegExp;
  /** 自定义验证函数 */
  validator?: (value: any) => Promise<void> | void;
  /** 错误提示 */
  message?: string;
  /** 类型 */
  type?: 'email' | 'url' | 'number';
}

// ============ Form Props ============
export interface FormProps {
  /** 初始值 */
  initialValues?: Record<string, any>;
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** label 布局 */
  labelCol?: { span?: number };
  /** 内容布局 */
  wrapperCol?: { span?: number };
  /** 是否禁用 */
  disabled?: boolean;
  /** 提交回调 */
  onFinish?: (values: Record<string, any>) => void;
  /** 提交失败回调 */
  onFinishFailed?: (errors: Record<string, string>) => void;
  /** 值变化回调 */
  onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Form Component ============
export const Form: React.FC<FormProps> & {
  Item: typeof FormItem;
  useForm: typeof useForm;
} = ({
  initialValues = {},
  layout = 'horizontal',
  labelCol,
  wrapperCol,
  disabled = false,
  onFinish,
  onFinishFailed,
  onValuesChange,
  children,
  className = '',
  style,
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fieldsRef = useRef<Map<string, Rule[]>>(new Map());

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      onValuesChange?.({ [name]: value }, newValues);
      return newValues;
    });
    // 清除错误
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, [onValuesChange]);

  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const validateField = useCallback(async (name: string): Promise<boolean> => {
    const rules = fieldsRef.current.get(name);
    const value = values[name];

    if (!rules || rules.length === 0) return true;

    for (const rule of rules) {
      // 必填验证
      if (rule.required && (value === undefined || value === null || value === '')) {
        setFieldError(name, rule.message || '此项为必填项');
        return false;
      }

      if (value === undefined || value === null || value === '') continue;

      // 最小长度
      if (rule.min !== undefined && String(value).length < rule.min) {
        setFieldError(name, rule.message || `长度不能小于 ${rule.min}`);
        return false;
      }

      // 最大长度
      if (rule.max !== undefined && String(value).length > rule.max) {
        setFieldError(name, rule.message || `长度不能大于 ${rule.max}`);
        return false;
      }

      // 正则验证
      if (rule.pattern && !rule.pattern.test(String(value))) {
        setFieldError(name, rule.message || '格式不正确');
        return false;
      }

      // 类型验证
      if (rule.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
        setFieldError(name, rule.message || '请输入有效的邮箱地址');
        return false;
      }

      if (rule.type === 'url' && !/^https?:\/\/.+/.test(String(value))) {
        setFieldError(name, rule.message || '请输入有效的网址');
        return false;
      }

      // 自定义验证
      if (rule.validator) {
        try {
          await rule.validator(value);
        } catch (e: any) {
          setFieldError(name, e?.message || rule.message || '验证失败');
          return false;
        }
      }
    }

    return true;
  }, [values, setFieldError]);

  const registerField = useCallback((name: string, rules?: Rule[]) => {
    fieldsRef.current.set(name, rules || []);
  }, []);

  const unregisterField = useCallback((name: string) => {
    fieldsRef.current.delete(name);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证所有字段
    const fieldNames = Array.from(fieldsRef.current.keys());
    const results = await Promise.all(fieldNames.map((name) => validateField(name)));
    const hasErrors = results.some((r) => !r);

    if (hasErrors) {
      onFinishFailed?.(errors);
    } else {
      onFinish?.(values);
    }
  }, [values, errors, validateField, onFinish, onFinishFailed]);

  const contextValue: FormContextType = {
    values,
    errors,
    layout,
    labelCol,
    wrapperCol,
    disabled,
    setFieldValue,
    setFieldError,
    validateField,
    registerField,
    unregisterField,
  };

  const classNames = [
    'kage-form',
    `kage-form-${layout}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <FormContext.Provider value={contextValue}>
      <form className={classNames} style={style} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

// ============ Form Item Props ============
export interface FormItemProps {
  /** 字段名 */
  name?: string;
  /** 标签 */
  label?: React.ReactNode;
  /** 验证规则 */
  rules?: Rule[];
  /** 是否必填（显示红色星号） */
  required?: boolean;
  /** 额外提示 */
  extra?: React.ReactNode;
  /** 帮助信息 */
  help?: React.ReactNode;
  /** label 布局 */
  labelCol?: { span?: number };
  /** 内容布局 */
  wrapperCol?: { span?: number };
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Form Item Component ============
export const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  rules = [],
  required,
  extra,
  help,
  labelCol: itemLabelCol,
  wrapperCol: itemWrapperCol,
  children,
  className = '',
  style,
}) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Form.Item must be used within a Form');
  }

  const {
    values,
    errors,
    layout,
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    disabled,
    setFieldValue,
    validateField,
    registerField,
    unregisterField,
  } = context;

  const labelCol = itemLabelCol || formLabelCol;
  const wrapperCol = itemWrapperCol || formWrapperCol;

  // 注册/注销字段
  useEffect(() => {
    if (name) {
      registerField(name, rules);
      return () => unregisterField(name);
    }
  }, [name, rules, registerField, unregisterField]);

  const value = name ? values[name] : undefined;
  const error = name ? errors[name] : undefined;
  const isRequired = required || rules.some((r) => r.required);

  // 克隆子元素，注入 value 和 onChange
  const renderChildren = () => {
    if (!name || !children) return children;

    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      return React.cloneElement(child as React.ReactElement<any>, {
        value,
        disabled: disabled || (child.props as any).disabled,
        onChange: (e: any) => {
          const newValue = e?.target?.value ?? e?.target?.checked ?? e;
          setFieldValue(name, newValue);
          (child.props as any).onChange?.(e);
        },
        onBlur: (e: any) => {
          validateField(name);
          (child.props as any).onBlur?.(e);
        },
      });
    });
  };

  const classNames = [
    'kage-form-item',
    error && 'kage-form-item-has-error',
    className,
  ].filter(Boolean).join(' ');

  const labelStyle: React.CSSProperties = {};
  const wrapperStyle: React.CSSProperties = {};

  if (layout === 'horizontal' && labelCol?.span) {
    labelStyle.width = `${(labelCol.span / 24) * 100}%`;
  }
  if (layout === 'horizontal' && wrapperCol?.span) {
    wrapperStyle.width = `${(wrapperCol.span / 24) * 100}%`;
  }

  return (
    <div className={classNames} style={style}>
      {label && (
        <div className="kage-form-item-label" style={labelStyle}>
          {isRequired && <span className="kage-form-item-required">*</span>}
          <label>{label}</label>
        </div>
      )}
      <div className="kage-form-item-control" style={wrapperStyle}>
        <div className="kage-form-item-control-input">
          {renderChildren()}
        </div>
        {error && <div className="kage-form-item-error">{error}</div>}
        {help && !error && <div className="kage-form-item-help">{help}</div>}
        {extra && <div className="kage-form-item-extra">{extra}</div>}
      </div>
    </div>
  );
};

// ============ useForm Hook ============
export interface FormInstance {
  getFieldValue: (name: string) => any;
  getFieldsValue: () => Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  setFieldsValue: (values: Record<string, any>) => void;
  resetFields: () => void;
  validateFields: () => Promise<Record<string, any>>;
}

export const useForm = (): [FormInstance] => {
  const valuesRef = useRef<Record<string, any>>({});
  const settersRef = useRef<{
    setFieldValue?: (name: string, value: any) => void;
  }>({});

  const formInstance: FormInstance = {
    getFieldValue: (name) => valuesRef.current[name],
    getFieldsValue: () => ({ ...valuesRef.current }),
    setFieldValue: (name, value) => {
      valuesRef.current[name] = value;
      settersRef.current.setFieldValue?.(name, value);
    },
    setFieldsValue: (values) => {
      Object.entries(values).forEach(([name, value]) => {
        valuesRef.current[name] = value;
        settersRef.current.setFieldValue?.(name, value);
      });
    },
    resetFields: () => {
      valuesRef.current = {};
    },
    validateFields: async () => {
      return valuesRef.current;
    },
  };

  return [formInstance];
};

// 挂载子组件
Form.Item = FormItem;
Form.useForm = useForm;

export default Form;

