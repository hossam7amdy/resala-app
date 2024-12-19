import { getUploadUrl, setMediaMetadata } from '@/fetch/media';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';

const handleUpload: UploadProps['customRequest'] = async ({
  file,
  onSuccess,
  onError,
  onProgress,
}) => {
  try {
    const rcFile = file as RcFile & { xhr?: XMLHttpRequest };
    // Get upload URL
    const uploadUrl = await getUploadUrl(rcFile.uid);

    // Use XMLHttpRequest to track progress
    const xhr = new XMLHttpRequest();

    // check if xhr is aborted before starting the upload
    xhr.open('PUT', uploadUrl, true);

    // Store the xhr object in the file object
    rcFile.xhr = xhr;

    // Update progress
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress?.({ percent, ...e }, rcFile);
      } else {
        onProgress?.(e, rcFile);
      }
    };

    // Handle success and error
    xhr.onload = async e => {
      if (xhr.status === 200) {
        await setMediaMetadata(rcFile.uid, {
          size: rcFile.size,
          filename: rcFile.name,
          mimetype: rcFile.type,
        });
        onSuccess?.(e, rcFile);
      } else {
        onError?.(e, rcFile);
      }
    };

    // Handle error
    xhr.onerror = e => {
      onError?.(e, rcFile);
    };

    // Send the file
    xhr.send(rcFile);
  } catch (e) {
    onError?.(e as Error);
  }
};

export { handleUpload };
