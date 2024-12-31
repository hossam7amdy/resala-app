import { renderHook } from '@testing-library/react';
import { App } from 'antd';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';

import { useNotification } from './useNotification';

vi.mock('antd', () => ({
  App: {
    useApp: vi.fn(),
  },
}));

describe('useNotification', () => {
  const mockNotification = {
    success: vi.fn(),
    error: vi.fn(),
  };

  beforeEach(() => {
    (App.useApp as Mock).mockReturnValue({ notification: mockNotification });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call notification.success with the correct message and description', () => {
    const { result } = renderHook(() => useNotification());

    result.current.success('Success description');

    expect(mockNotification.success).toHaveBeenCalledWith({
      message: 'Success',
      description: 'Success description',
    });
  });

  it('should call notification.error with the correct message and description', () => {
    const { result } = renderHook(() => useNotification());

    result.current.error('Error description');

    expect(mockNotification.error).toHaveBeenCalledWith({
      message: 'Error',
      description: 'Error description',
    });
  });
});
