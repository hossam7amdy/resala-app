import Image from 'next/image';

export default function Logo() {
  return <Image src={'/logo.png'} alt="Resala Logo" height={60} width={116} priority />;
}
