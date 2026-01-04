import React from 'react';
import { Alert } from 'wssf-kage-ui';

export default () => (
  <Alert type="info">
    <strong>温馨提示</strong><br />
    使用 wssf-kage-ui 时，请确保安装配套的 wssf-kage-icon 包，避免版本不匹配带来的问题。
  </Alert>
);

