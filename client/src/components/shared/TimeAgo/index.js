import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Popup } from 'semantic-ui-react';
import { format, parse, differenceInSeconds, distanceInWordsToNow } from 'date-fns';
import cx from 'classnames';

import './timeAgo.styl';

export default function TimeAgo({ date, render, plain }) {
  if (date) {
    return <TimeAgoHasDate />;
  } else {
    return null;
  }

  function TimeAgoHasDate() {
    const parsedDate = parse(date);
    const waitSeconds = getTimeoutWait(date);

    const [timeWords, setTimeWords] = useState(distanceInWordsToNow(parsedDate));

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeWords(distanceInWordsToNow(parsedDate));
      }, waitSeconds * 1000);
      //
      return () => clearInterval(interval);
    }, [date]);

    // render

    if (_.isFunction(render)) {
      return <TimeAgoContainer>{render(timeWords)}</TimeAgoContainer>;
    } else {
      return <TimeAgoContainer>{timeWords} ago</TimeAgoContainer>;
    }

    function TimeAgoContainer({ children }) {
      return (
        <Popup
          trigger={<span className={cx('time-ago', { plain })}>{children}</span>}
          content={format(parsedDate, 'Do MMMM YYYY h:mm a')}
        />
      );
    }
  }
}

function getTimeoutWait(date) {
  const parsedDate = parse(date);
  const diffSeconds = differenceInSeconds(new Date(), parsedDate);

  // if diffSeconds is small then we want to update the timer more frequently
  let waitSeconds;

  if (diffSeconds < 60 * 60) {
    waitSeconds = 60;
  } else {
    waitSeconds = 60 * 60;
  }

  return waitSeconds;
}
