import Image from 'next/image';

export const Logo = () => {
  return <Image src={'/logo.png'} alt="Resala Logo" height={60} width={116} priority />;
};
