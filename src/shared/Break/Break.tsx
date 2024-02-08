import classNames from 'classnames';
import React from 'react';
import styles from './break.css';

type TBreakSize = 4 | 8 | 12 | 16 | 20
type TDisplays = 'mobile' | 'desktop' | 'tablet'

interface IBreakProps {
  size: TBreakSize;
  mobileSize?: TDisplays;
  desktopSize?: TDisplays;
  tabletSize?: TDisplays;
  inline?: boolean;
  top?: boolean
}

export function Break(props: IBreakProps) {
  const {
    size,
    inline = false,
    top = false,
    mobileSize,
    desktopSize,
    tabletSize
  } = props
  const classes = classNames(
    styles[`s${size}`],
    { [styles[`mobile_s${mobileSize}`]]: mobileSize},
    { [styles[`desktop_s${desktopSize}`]]: desktopSize},
    { [styles[`tablet_s${tabletSize}`]]: tabletSize},
    { [styles.inline]: inline},
    { [styles.top]: top},
  )
  return (
    <div className={classes}></div>
  );
}
