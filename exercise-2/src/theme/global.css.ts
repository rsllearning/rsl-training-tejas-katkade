import { globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('html, body', {
  minHeight: '100%',
  fontFamily: vars.typography.fontFamily,
  backgroundColor: vars.color.background,
  color: vars.color.textPrimary,
  lineHeight: vars.typography.lineHeight.normal,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});
