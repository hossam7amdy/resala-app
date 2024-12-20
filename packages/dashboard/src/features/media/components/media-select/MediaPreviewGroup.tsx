import { ResalaTooltip } from '@/components';
import { PushpinFilled, PushpinOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import React from 'react';

import type { RequiredMedia } from './types';

interface MediaPreviewGroupProps {
  medias: RequiredMedia[];
  multiple?: boolean;
  onPrimaryChange?: (media: RequiredMedia) => void;
}
const MediaPreviewGroup: React.FC<MediaPreviewGroupProps> = ({
  medias,
  multiple,
  onPrimaryChange,
}) => {
  return (
    <Image.PreviewGroup>
      {medias.map((img, idx) => (
        <span key={img.id} className="relative">
          <Image
            key={img.id}
            src={img.url}
            width={82}
            height={100}
            alt={img.filename}
            className="relative object-cover rounded-lg"
          />
          {multiple && (
            <ResalaTooltip title={multiple && idx > 0 ? 'Mark as primary' : ''} placement="top">
              <Button
                size="small"
                type={idx === 0 ? 'link' : 'text'}
                icon={idx === 0 ? <PushpinFilled /> : <PushpinOutlined />}
                onClick={() => onPrimaryChange?.(img)}
                className="absolute top-[-50px] left-[-5px]"
              />
            </ResalaTooltip>
          )}
        </span>
      ))}
    </Image.PreviewGroup>
  );
};

export { MediaPreviewGroup };
