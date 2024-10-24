"use client";

import React from "react";

interface TrackProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
}

export const renderTrack = ({ style, ...props }: TrackProps) => {
  const trackStyle: React.CSSProperties = {
    position: "absolute",
    maxWidth: "100%",
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    background: "transparent",
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };

  return (
    <div style={{ ...style, ...trackStyle }} className="xl:pr-3.5" {...props} />
  );
};

interface ThumbProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
}

export const renderThumb = ({ style, ...props }: ThumbProps) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
  };

  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
}

export const renderView = ({ style, ...props }: ViewProps) => {
  const viewStyle: React.CSSProperties = {
    width: "100%",
    marginBottom: -22,
  };

  return (
    <div
      style={{ ...style, ...viewStyle }}
      className="!translate-x-[5.5%] pr-4 xl:!-mr-8 xl:w-[calc(100%_+_20px)]"
      {...props}
    />
  );
};
