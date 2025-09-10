// components/MicrofrontendImage.tsx
import Image, { ImageProps } from 'next/image';
import { withAssetPath } from '@/lib/basePath';

export function MicrofrontendImage(props: ImageProps) {
  const imageSrc = typeof props.src === 'string' 
    ? withAssetPath(props.src) 
    : props.src;
  
  return <Image {...props} src={imageSrc} />;
}