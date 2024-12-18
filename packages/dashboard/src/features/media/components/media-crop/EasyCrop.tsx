import { Button, Divider, Flex, Space } from 'antd';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';

import { AspectPicker } from './AspectPicker';
import { RotateSlider } from './RotateSlider';
import { ZoomSlider } from './ZoomSlider';
import { PREFIX, ROTATION_INITIAL, ZOOM_INITIAL } from './constants';
import type { EasyCropProps, EasyCropRef } from './types';

const EasyCrop = forwardRef<EasyCropRef, EasyCropProps>((props, ref) => {
  const {
    cropperRef,
    zoomSlider,
    rotationSlider,
    aspectSlider,
    showReset,
    resetBtnText,

    modalImage,
    aspect: ASPECT_INITIAL,
    minZoom,
    maxZoom,
    cropShape,
    showGrid,

    cropperProps,
  } = props;

  const [zoom, setZoom] = useState(ZOOM_INITIAL);
  const [rotation, setRotation] = useState(ROTATION_INITIAL);
  const [aspect, setAspect] = useState(ASPECT_INITIAL);

  const isResetActive =
    zoom !== ZOOM_INITIAL || rotation !== ROTATION_INITIAL || aspect !== ASPECT_INITIAL;

  const onReset = () => {
    setZoom(ZOOM_INITIAL);
    setRotation(ROTATION_INITIAL);
    setAspect(ASPECT_INITIAL);
  };

  const [crop, onCropChange] = useState<Point>({ x: 0, y: 0 });
  const cropPixelsRef = useRef<Area>({ width: 0, height: 0, x: 0, y: 0 });

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    cropPixelsRef.current = croppedAreaPixels;
  }, []);

  useImperativeHandle(ref, () => ({
    rotation,
    cropPixelsRef,
    onReset,
  }));

  return (
    <Flex gap={10}>
      <div className="flex-1 shrink-0 w-full">
        <Cropper
          {...cropperProps}
          ref={cropperRef}
          image={modalImage}
          crop={crop}
          //
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          minZoom={minZoom}
          maxZoom={maxZoom}
          zoomWithScroll={zoomSlider}
          //
          cropShape={cropShape}
          showGrid={showGrid}
          onCropChange={onCropChange}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          classes={{
            containerClassName: `${PREFIX}-container ![position:relative] [width:100%] [height:40vh] [&~section:first-of-type]:[margin-top:16px] [&~section:last-of-type]:[margin-bottom:16px]`,
            mediaClassName: `${PREFIX}-media`,
          }}
        />
      </div>

      <Space
        size="small"
        direction="vertical"
        className="w-52"
        split={<Divider className="p-0 m-0" />}
      >
        <p className="text-center font-semibold">Crop and transform</p>

        {aspectSlider && <AspectPicker image={modalImage} aspect={aspect} onChange={setAspect} />}

        {rotationSlider && <RotateSlider rotation={rotation} onRotate={setRotation} />}

        {zoomSlider && (
          <ZoomSlider zoom={zoom} onZoom={setZoom} minZoom={minZoom} maxZoom={maxZoom} />
        )}

        {showReset && (zoomSlider || rotationSlider || aspectSlider) && (
          <Button block disabled={!isResetActive} onClick={onReset}>
            {resetBtnText}
          </Button>
        )}
      </Space>
    </Flex>
  );
});

EasyCrop.displayName = 'EasyCrop';

export default memo(EasyCrop);
