import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');

const vidPlayer = new Player(iframe);

vidPlayer.on(
  'timeupdate',
  throttle(e => {
    localStorage.setItem('videoplayer-current-time', e.seconds);
  }, 1000)
);

vidPlayer.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 1);
