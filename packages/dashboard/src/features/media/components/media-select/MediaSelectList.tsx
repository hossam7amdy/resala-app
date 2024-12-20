'use client';

import { Checkbox } from 'antd';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import type { RequiredMedia } from './types';

export interface MediaSelectProps {
  multiple?: boolean;
  maxCount?: number;
  selected?: RequiredMedia[];
  onSelect?: (media: RequiredMedia[]) => void;
  options: RequiredMedia[];
}
const MediaSelectList: React.FC<MediaSelectProps> = ({
  options,
  selected,
  onSelect,
  multiple,
  maxCount,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<RequiredMedia[]>(selected || []);

  const isSelected = useCallback(
    (media: RequiredMedia) => selectedMedia.some(m => m.id === media.id),
    [selectedMedia]
  );

  const handleSelectMedia = useCallback(
    (media: RequiredMedia) => {
      const selected = isSelected(media);

      if (!multiple && selected) {
        onSelect?.([]);
        setSelectedMedia([]);
        return;
      }

      if (selected) {
        const filtered = selectedMedia.filter(m => m.id !== media.id);
        onSelect?.(filtered);
        setSelectedMedia(filtered);
        return;
      }

      let updated = multiple ? [media, ...selectedMedia] : [media];
      if (maxCount && updated.length > maxCount) {
        updated = updated.slice(0, maxCount);
      }
      onSelect?.(updated);
      setSelectedMedia(updated);
    },
    [isSelected, maxCount, multiple, onSelect, selectedMedia]
  );

  return (
    <ul className="list-none flex flex-wrap gap-5">
      {options.map(item => (
        <li
          key={item.id}
          className="relative cursor-pointer border"
          onClick={() => handleSelectMedia(item)}
        >
          <Checkbox className="absolute top-1 left-1" type="checkbox" checked={isSelected(item)} />
          <Image
            src={item.url}
            alt={item.alt || item.filename || ''}
            width={100}
            height={150}
            className="object-cover rounded-md shadow-md p-1"
          />
        </li>
      ))}
    </ul>
  );
};

export { MediaSelectList };
