import { Image, ResalaTooltip } from '@/components';
import { DeleteOutlined, PushpinOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import type { RequiredMedia } from './types';

interface MediaPreviewGroupProps {
  medias: RequiredMedia[];
  multiple?: boolean;
  onRemove?: (media: RequiredMedia) => void;
  onPrimaryChange?: (media: RequiredMedia) => void;
}
const MediaPreviewGroup: React.FC<MediaPreviewGroupProps> = ({
  medias,
  multiple,
  onRemove,
  onPrimaryChange,
}) => {
  return (
    <Image.PreviewGroup>
      {medias.map((img, idx) => (
        <Image
          key={img.id}
          src={img.url}
          width={82}
          height={100}
          alt={img.filename}
          className="relative object-cover rounded-lg"
          preview={{
            mask: (
              <>
                {multiple && idx > 0 && (
                  <ResalaTooltip title={'Mark as primary'} placement="top">
                    <Button
                      type="link"
                      size="small"
                      className="text-white"
                      icon={<PushpinOutlined className="-rotate-90" />}
                      onClick={e => {
                        e.stopPropagation();
                        onPrimaryChange?.(img);
                      }}
                    />
                  </ResalaTooltip>
                )}
                <Button
                  type="link"
                  size="small"
                  className="text-white"
                  icon={<DeleteOutlined />}
                  onClick={e => {
                    e.stopPropagation();
                    onRemove?.(img);
                  }}
                />
              </>
            ),
          }}
        />
      ))}
    </Image.PreviewGroup>
  );
};

export { MediaPreviewGroup };
