import { CheckOutlined, MobileOutlined } from '@ant-design/icons';
import { Flex, Tabs } from 'antd';
import React, { useEffect } from 'react';

import { LANDSCAPE_ASPECT_LIST, PORTRAIT_ASPECT_LIST } from './constants';

const aspectOptions = {
  portrait: PORTRAIT_ASPECT_LIST,
  landscape: LANDSCAPE_ASPECT_LIST,
};

const getOriginalRatio = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img.naturalWidth / img.naturalHeight);
    img.onerror = error => reject(error);
  });
};

interface AspectPickerProps {
  image: string;
  aspect: number;
  onChange: (aspect: number) => void;
}
const AspectPicker: React.FC<AspectPickerProps> = ({ image, aspect, onChange }) => {
  useEffect(() => {
    getOriginalRatio(image).then(aspectRatio => {
      PORTRAIT_ASPECT_LIST[0].value = aspectRatio;
      LANDSCAPE_ASPECT_LIST[0].value = aspectRatio;
    });
  }, [image]);

  const children = (type: 'portrait' | 'landscape') => (
    <Flex vertical gap={5}>
      {aspectOptions[type].map(({ label, value }) => (
        <Flex
          key={label}
          align="center"
          justify="space-between"
          className="cursor-pointer px-3 py-1 bg-gray-100 rounded-md"
          onClick={() => onChange(value)}
        >
          {label} {value === aspect ? <CheckOutlined /> : undefined}
        </Flex>
      ))}
    </Flex>
  );

  return (
    <Tabs
      size="small"
      centered
      items={[
        {
          label: 'Portrait',
          key: 'portrait',
          icon: <MobileOutlined />,
          children: children('portrait'),
        },
        {
          label: 'Landscape',
          key: 'landscape',
          icon: <MobileOutlined className="rotate-90" />,
          children: children('landscape'),
        },
      ]}
    />
  );
};

export { AspectPicker };
