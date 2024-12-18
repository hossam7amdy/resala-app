import {
  CheckOutlined,
  MinusOutlined,
  MobileOutlined,
  PlusOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
} from '@ant-design/icons';
import { Button, Col, Flex, Radio, type RadioChangeEvent, Row, Slider, Space } from 'antd';
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';

import {
  LANDSCAPE_ASPECT_LIST,
  PORTRAIT_ASPECT_LIST,
  PREFIX,
  ROTATION_INITIAL,
  ROTATION_MAX,
  ROTATION_MIN,
  ROTATION_STEP,
  ZOOM_INITIAL,
  ZOOM_STEP,
} from './constants';
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
  const [aspectList, setAspectList] = useState(PORTRAIT_ASPECT_LIST);

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

  const getImageAspectRatio = useCallback((url: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img.naturalWidth / img.naturalHeight);
      img.onerror = error => reject(error);
    });
  }, []);

  useEffect(() => {
    getImageAspectRatio(modalImage).then(aspectRatio => {
      PORTRAIT_ASPECT_LIST[0].value = aspectRatio;
      LANDSCAPE_ASPECT_LIST[0].value = aspectRatio;
    });
  }, [getImageAspectRatio, modalImage]);

  useImperativeHandle(ref, () => ({
    rotation,
    cropPixelsRef,
    onReset,
  }));

  const onAspectTypeChange = (e: RadioChangeEvent) => {
    if (e.target.value === 'landscape') {
      setAspectList(LANDSCAPE_ASPECT_LIST);
    } else {
      setAspectList(PORTRAIT_ASPECT_LIST);
    }
  };

  return (
    <Row gutter={[10, 10]}>
      <Col span={18}>
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
      </Col>

      <Col span={6}>
        <p className="text-center mb-2 font-semibold">Crop and transform</p>

        {aspectSlider && (
          <>
            <Radio.Group
              block
              options={[
                {
                  label: (
                    <Flex align="center" gap={5}>
                      <MobileOutlined /> Portrait
                    </Flex>
                  ),
                  value: 'portrait',
                },
                {
                  label: (
                    <Flex align="center" gap={5}>
                      <MobileOutlined className="rotate-90" /> Landscape
                    </Flex>
                  ),
                  value: 'landscape',
                },
              ]}
              defaultValue="portrait"
              optionType="button"
              onChange={onAspectTypeChange}
            />
            <Flex vertical gap={5} className="mt-1">
              {aspectList.map(({ label, value }) => (
                <Flex
                  key={label}
                  align="center"
                  justify="space-between"
                  className="cursor-pointer px-3 py-1 bg-gray-100 rounded-md"
                  onClick={() => setAspect(value)}
                >
                  {label} {value === aspect ? <CheckOutlined /> : undefined}
                </Flex>
              ))}
            </Flex>
          </>
        )}

        <br />

        {rotationSlider && (
          <Space.Compact block>
            <Button
              className="flex-1"
              icon={<RotateLeftOutlined />}
              onClick={() => setRotation(rotation - ROTATION_STEP)}
              disabled={rotation === ROTATION_MIN}
            />
            <Button
              className="flex-1"
              icon={<RotateRightOutlined />}
              onClick={() => setRotation(rotation + ROTATION_STEP)}
              disabled={rotation === ROTATION_MAX}
            />
          </Space.Compact>
        )}

        <br />

        {zoomSlider && (
          <Flex align="center" gap={5}>
            <Button
              size="small"
              type="text"
              onClick={() => setZoom(+(zoom - ZOOM_STEP).toFixed(1))}
              disabled={zoom - ZOOM_STEP < minZoom}
              icon={<MinusOutlined />}
            />
            <Slider
              min={minZoom}
              max={maxZoom}
              step={ZOOM_STEP}
              value={zoom}
              onChange={setZoom}
              className="flex-1"
            />
            <Button
              size="small"
              type="text"
              icon={<PlusOutlined />}
              onClick={() => setZoom(+(zoom + ZOOM_STEP).toFixed(1))}
              disabled={zoom + ZOOM_STEP > maxZoom}
            />
          </Flex>
        )}

        <br />

        {showReset && (zoomSlider || rotationSlider || aspectSlider) && (
          <Button block disabled={!isResetActive} onClick={onReset}>
            {resetBtnText}
          </Button>
        )}
      </Col>
    </Row>
  );
});

EasyCrop.displayName = 'EasyCrop';

export default memo(EasyCrop);
