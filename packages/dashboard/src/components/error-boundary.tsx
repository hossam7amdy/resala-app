'use client';

import ResalaTooltip from '@/components/tooltip';
import { Collapse, Input, Result } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import { useEffect } from 'react';

const ErrorBoundary: React.FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('ErrorBoundary:', error);
  }, [error]);

  const message = error.message ? `${error.message}` : 'Sorry, something went wrong.';
  return (
    <div className="global-boundary">
      <Result
        status="error"
        title="Oops, something went wrong"
        subTitle="More likely there are some issues with the application. Please try again later."
      >
        <div>
          <Paragraph>
            <Paragraph strong>What has happened?</Paragraph>
            <Paragraph>Program error has just occurred</Paragraph>
            <Collapse accordion>
              <Collapse.Panel header="ErrorBoundary message" key="errorMessage">
                <Text type="danger">
                  <Input.TextArea autoSize value={message} />
                </Text>
              </Collapse.Panel>
            </Collapse>
          </Paragraph>

          <Paragraph>
            <Text strong>What should I do?</Text>
          </Paragraph>
          <ul className="error-list">
            <li>
              <ResalaTooltip title="Copied!" trigger="click">
                {/* eslint-disable-next-line */}
                <a
                  onClick={() => {
                    navigator.clipboard.writeText(message);
                  }}
                >
                  {' '}
                  Copy{' '}
                </a>
              </ResalaTooltip>
              the error message to clipboard
            </li>
            <li>
              Notify an administrator with the issue, provide also:
              <ul className="error-list">
                <li>Steps to reproduce the issue</li>
                <li>Your operating system and browser version</li>
              </ul>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <a onClick={reset}>Reload </a>
              the page
            </li>
          </ul>
        </div>
      </Result>
    </div>
  );
};

export default ErrorBoundary;
