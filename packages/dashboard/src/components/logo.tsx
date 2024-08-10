import Image from 'next/image';

export const Logo: React.FC<{ height?: number; width?: number }> = ({
  height = 60,
  width = 116,
}) => <Image priority src="/logo.png" alt="Resala Logo" height={height} width={width} />;
