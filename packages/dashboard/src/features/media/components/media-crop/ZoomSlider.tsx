import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Slider } from 'antd';
import React from 'react';

import { ZOOM_STEP } from './constants';

interface ZoomSliderProps {
  zoom: number;
  onZoom: (zoom: number) => void;
  minZoom: number;
  maxZoom: number;
}
const ZoomSlider: React.FC<ZoomSliderProps> = ({ zoom, onZoom, minZoom, maxZoom }) => {
  return (
    <Flex align="center" gap={5}>
      <Button
        size="small"
        type="text"
        onClick={() => onZoom(+(zoom - ZOOM_STEP).toFixed(1))}
        disabled={zoom - ZOOM_STEP < minZoom}
        icon={<MinusOutlined />}
      />
      <Slider
        min={minZoom}
        max={maxZoom}
        step={ZOOM_STEP}
        value={zoom}
        onChange={onZoom}
        className="flex-1"
      />
      <Button
        size="small"
        type="text"
        icon={<PlusOutlined />}
        onClick={() => onZoom(+(zoom + ZOOM_STEP).toFixed(1))}
        disabled={zoom + ZOOM_STEP > maxZoom}
      />
    </Flex>
  );
};

export { ZoomSlider };
