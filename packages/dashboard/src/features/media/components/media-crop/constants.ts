export const PREFIX = 'resala-media-crop';

export const ZOOM_INITIAL = 1;
export const ZOOM_STEP = 0.1;

export const ROTATION_INITIAL = 0;
export const ROTATION_MIN = -180;
export const ROTATION_MAX = 180;
export const ROTATION_STEP = 90;

export const ASPECT_MIN = 0.5;
export const ASPECT_MAX = 2;
export const ASPECT_STEP = 0.01;

export const PORTRAIT_ASPECT_LIST = [
  { label: 'Original', value: 0 },
  { label: 'Square', value: 1 },
  { label: '2:3', value: 2 / 3 },
  { label: '4:5', value: 4 / 5 },
  { label: '5:7', value: 5 / 7 },
  { label: '9:16', value: 9 / 16 },
];
export const LANDSCAPE_ASPECT_LIST = [
  { label: 'Original', value: 0 },
  { label: 'Square', value: 1 },
  { label: '3:2', value: 3 / 2 },
  { label: '5:4', value: 5 / 4 },
  { label: '7:5', value: 7 / 5 },
  { label: '16:9', value: 16 / 9 },
];
