import { ResalaTooltip } from '@/components';
import { resendVerificationEmail } from '@/fetch/auth';
import { useMutation, useNotification } from '@/hooks';
import { SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const ResendEmailVerificationButton: React.FC<{ email: string }> = ({ email }) => {
  const notification = useNotification();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => resendVerificationEmail({ email }),
    onSuccess: data => {
      notification.success(data?.message || 'Email verification sent successfully');
    },
    onError: error => {
      notification.error(error.message || 'Failed to send email verification');
    },
  });

  return (
    <ResalaTooltip title="Resend verification email">
      <Button type="text" size="small" icon={<SyncOutlined spin={isLoading} />} onClick={mutate} />
    </ResalaTooltip>
  );
};
