import { RotateLeftOutlined, RotateRightOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';

import { ROTATION_MAX, ROTATION_MIN, ROTATION_STEP } from './constants';

interface RotateSliderProps {
  rotation: number;
  onRotate: (rotation: number) => void;
}
const RotateSlider: React.FC<RotateSliderProps> = ({ rotation, onRotate }) => {
  return (
    <Space.Compact block>
      <Button
        className="flex-1"
        icon={<RotateLeftOutlined />}
        onClick={() => onRotate(rotation - ROTATION_STEP)}
        disabled={rotation === ROTATION_MIN}
      />
      <Button
        className="flex-1"
        icon={<RotateRightOutlined />}
        onClick={() => onRotate(rotation + ROTATION_STEP)}
        disabled={rotation === ROTATION_MAX}
      />
    </Space.Compact>
  );
};

export { RotateSlider };
