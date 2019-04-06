import React from 'react';
import { Image, Popup } from 'semantic-ui-react';
import cx from 'classnames';

import arya from './assets/arya.jpg';
import beric from './assets/beric.jpg';
import bran from './assets/bran.jpg';
import brienne from './assets/brienne.jpg';
import bronn from './assets/bronn.jpg';
import cersei from './assets/cersei.jpg';
import daenerys from './assets/daenerys.jpg';
import davos from './assets/davos.jpg';
import euron from './assets/euron.png';
import gendry from './assets/gendry.png';
import gilly from './assets/gilly.jpg';
import greyworm from './assets/greyworm.jpg';
import hound from './assets/hound.jpg';
import jaime from './assets/jaime.jpg';
import john from './assets/john.jpg';
import jorah from './assets/jorah.jpg';
import melisandre from './assets/melisandre.jpg';
import mountain from './assets/mountain.jpg';
import podrick from './assets/podrick.jpg';
import samchild from './assets/samchild.jpg';
import samwell from './assets/samwell.jpg';
import sansa from './assets/sansa.jpg';
import theon from './assets/theon.jpg';
import tormund from './assets/tormund.png';
import tyrion from './assets/tyrion.jpg';
import varys from './assets/varys.jpg';
import yara from './assets/yara.jpg';

import './playerImage.styl';

export default function PlayerImage({ player, popup, cover, card, ...rest }) {
  const src = imageMap[player.name];

  if (popup) {
    return (
      <PlayerPopup trigger={<Image src={src} {...rest} />} />
    );
  } else {
    return (
      <Image className={cx('player-image', { cover, card })} src={src} {...rest} />
    );
  }

  //

  function PlayerPopup({ tigger, ...rest2 }) {
    return (
      <Popup trigger={tigger} {...rest2}>
        <Popup.Header>{player.name}</Popup.Header>
        <Popup.Content>
          <Image src={src} size="large" />
        </Popup.Content>
      </Popup>
    );
  }
}

const imageMap = {
  'John Snow': john,
  'Sansa Stark': sansa,
  'Arya Stark': arya,
  'Bran Stark': bran,
  'Cersei Lannister': cersei,
  'Jaime Lannister': jaime,
  'Tyrion Lannister': tyrion,
  'Daenerys Targaryen': daenerys,
  'Yara Greyjoy': yara,
  'Theon Greyjoy': theon,
  Melisandre: melisandre,
  'Jorah Mormont': jorah,
  'The Hound': hound,
  'The Mountain': mountain,
  'Samwell Tarley': samwell,
  Gilly: gilly,
  'Sam (Child)': samchild,
  'Lord Varys': varys,
  'Brienne of Tarth': brienne,
  'Davos Seaworth': davos,
  Bronn: bronn,
  'Podrick Payne': podrick,
  'Tormund Giantsbane': tormund,
  'Grey Worm': greyworm,
  Gendry: gendry,
  'Beric Dondarrion': beric,
  'Euron Greyjoy': euron
};
