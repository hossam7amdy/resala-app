import Image from 'next/image';
import type { ImageProps } from 'next/image';

type ResalaLogoProps = Omit<ImageProps, 'src' | 'alt'>;

export const ResalaLogo: React.FC<ResalaLogoProps> = ({ height = 60, width = 116, ...props }) => (
  <Image priority src="/logo.png" alt="Resala Logo" height={height} width={width} {...props} />
);
