import React, { useState } from 'react';
import { resolveAssetUrl } from '../utils/assets';

const ProfileImage = ({
  src,
  alt = 'Alemu Sisay Nigru',
  fallbackSrc,
  className = '',
  wrapperClassName = ''
}) => {
  const [currentSrc, setCurrentSrc] = useState(() => resolveAssetUrl(src, fallbackSrc));

  return (
    <img
      src={currentSrc}
      alt={alt || 'Profile photo'}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(resolveAssetUrl(fallbackSrc));
        }
      }}
    />
  );
};

export default ProfileImage;
