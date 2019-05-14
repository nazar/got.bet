import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import {
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookShareButton,
  TwitterIcon,
  RedditIcon,
  EmailIcon,
  FacebookIcon
} from 'react-share';

import './footer.styl';

export default function Footer() {
  const url = 'http://got.bet';
  const title = 'Game of Thrones - Who Lives? Who Dies? Who Wights?';

  return (
    <Segment inverted className="footer">
      <Grid container stackable columns={2}>
        <Grid.Row>
          <Grid.Column>
            {title}
          </Grid.Column>

          <Grid.Column textAlign="right" verticalAlign="middle">
            <Email />
            <Twitter />
            <Reddit />
            <Facebook />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );

  function Twitter() {
    return (
      <TwitterShareButton
        url={url}
        title={title}
        style={buttonStyle}
      >
        <TwitterIcon
          round
          size={32}
        />
      </TwitterShareButton>
    );
  }

  function Reddit() {
    return (
      <RedditShareButton
        url={url}
        title={title}
        style={buttonStyle}
      >
        <RedditIcon
          round
          size={32}
        />
      </RedditShareButton>
    );
  }

  function Email() {
    return (
      <EmailShareButton
        url={url}
        title={title}
        style={buttonStyle}
      >
        <EmailIcon
          round
          size={32}
        />
      </EmailShareButton>
    );
  }

  function Facebook() {
    return (
      <FacebookShareButton
        url={url}
        quote={title}
        style={buttonStyle}
      >
        <FacebookIcon
          round
          size={32}
        />
      </FacebookShareButton>
    );
  }
}

const buttonStyle = { display: 'inline-block', paddingRight: 8, verticalAlign: 'sub', cursor: 'pointer' };
