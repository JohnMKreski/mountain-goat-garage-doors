'use client';

import { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import type { ReCAPTCHA as ReCAPTCHAClass } from 'react-google-recaptcha';

// Forward the ref properly
const ReCAPTCHAWrapper = forwardRef<ReCAPTCHAClass, React.ComponentProps<typeof ReCAPTCHA>>(
  (props, ref) => <ReCAPTCHA {...props} ref={ref} />
);

ReCAPTCHAWrapper.displayName = 'ReCAPTCHAWrapper';

export default ReCAPTCHAWrapper;


