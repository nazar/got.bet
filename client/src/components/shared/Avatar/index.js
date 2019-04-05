import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import cx from 'classnames';

import avatar from './avatar.png';
import './avatar.styl';

export default function Avatar({ user, size, ...rest }) {
  const [imageSrc, setImageSrc] = useState(gravatarUrl() || avatar);
  const semanticSize = size === 'micro' ? null : size;
  const micro = size === 'micro';

  return (
    <Image
      avatar
      src={imageSrc}
      size={semanticSize}
      className={cx('avatar-soapee', { micro })}
      onError={handle}
      {...rest}
    />
  );

  //

  function handle() {
    setImageSrc(avatar);
  }

  function gravatarUrl() {
    return user.gravatarHash && `https://www.gravatar.com/avatar/${user.gravatarHash}?s=30&r=g`;
  }
}
