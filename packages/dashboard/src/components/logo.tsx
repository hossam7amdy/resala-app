import Image from 'next/image';

const Logo: React.FC = () => (
  <Image src={'/logo.png'} alt="Resala Logo" height={60} width={116} priority />
);

export default Logo;
