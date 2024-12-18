import { ResalaTooltip } from '@/components';
import { classnames } from '@/utils/classnames';
import { CheckOutlined, LinkOutlined } from '@ant-design/icons';
import type { Media } from '@resala/shared';
import { App, Button, type ButtonProps, Flex, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const CopyToClipboard: React.FC<{ text: string } & ButtonProps> = ({ text, ...props }) => {
  const { message } = App.useApp();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      message.error('Failed to copy link');
    }
  };

  return (
    <ResalaTooltip title={copied ? '' : 'Copy link'} placement="top">
      <Button
        size="small"
        type="text"
        onClick={copyToClipboard}
        icon={copied ? <CheckOutlined /> : <LinkOutlined />}
        {...props}
      />
    </ResalaTooltip>
  );
};

interface FilenameCellProps {
  media: Media;
}
const FilenameCell: React.FC<FilenameCellProps> = ({ media }) => {
  const [type, subtype] = media.mimetype?.split('/') ?? [];
  const [showCopy, setShowCopy] = useState(false);

  return (
    <div onMouseEnter={() => setShowCopy(true)} onMouseLeave={() => setShowCopy(false)}>
      <Flex gap={2} align="center">
        <p>{media.filename}</p>
        <CopyToClipboard
          text={media.url}
          className={classnames('transition-opacity duration-200', {
            'opacity-0': !showCopy,
          })}
        />
      </Flex>
      <Typography.Text type="secondary">{(subtype || type)?.toUpperCase()}</Typography.Text>
    </div>
  );
};

export { FilenameCell };
