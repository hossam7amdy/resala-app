import Image from 'next/image';
import type { ImageProps } from 'next/image';

type LogoProps = Omit<ImageProps, 'src' | 'alt'>;

export const Logo: React.FC<LogoProps> = ({ height = 60, width = 116, ...props }) => (
  <Image priority src="/logo.png" alt="Resala Logo" height={height} width={width} {...props} />
);
