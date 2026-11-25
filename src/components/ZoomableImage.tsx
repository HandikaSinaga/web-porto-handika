"use client";

import React, { useState, useRef } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  onOpenFullscreen?: () => void;
  isEN?: boolean;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

export default function ZoomableImage({
  src,
  alt,
  containerClassName = "h-64 sm:h-80 md:h-96",
  onOpenFullscreen,
  isEN = false,
}: ZoomableImageProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragOrigin = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number; moved: boolean } | null>(
    null
  );

  const clampZoom = (val: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(val * 100) / 100));

  const handleZoomIn = () => setZoom((z) => clampZoom(z + ZOOM_STEP));
  const handleZoomOut = () => setZoom((z) => clampZoom(z - ZOOM_STEP));
  const handleReset = () => {
    setZoom(1);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, left: 0 });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || zoom > 1) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setZoom((z) => clampZoom(z + delta));
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1 || !scrollRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragOrigin.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: scrollRef.current.scrollLeft,
      scrollTop: scrollRef.current.scrollTop,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragOrigin.current || !scrollRef.current) return;
    const dx = e.clientX - dragOrigin.current.x;
    const dy = e.clientY - dragOrigin.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragOrigin.current.moved = true;
    }
    scrollRef.current.scrollLeft = dragOrigin.current.scrollLeft - dx;
    scrollRef.current.scrollTop = dragOrigin.current.scrollTop - dy;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = () => {
    if (dragOrigin.current?.moved) {
      dragOrigin.current = null;
      return;
    }
    dragOrigin.current = null;
    setZoom((z) => (z === 1 ? 2 : 1));
  };

  return (
    <div className="space-y-2.5">
      {/* Zoom Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border p-1 bg-zinc-900/90 border-white/15 text-white">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= MIN_ZOOM}
            aria-label={isEN ? "Zoom out" : "Perkecil gambar"}
            title={isEN ? "Zoom out" : "Perkecil"}
            className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-40 transition-colors"
          >
            <ZoomOut className="w-4 h-4" aria-hidden="true" />
          </button>

          <span className="min-w-[52px] text-center text-xs font-mono font-semibold text-zinc-200">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= MAX_ZOOM}
            aria-label={isEN ? "Zoom in" : "Perbesar gambar"}
            title={isEN ? "Zoom in" : "Perbesar"}
            className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-40 transition-colors"
          >
            <ZoomIn className="w-4 h-4" aria-hidden="true" />
          </button>

          {zoom > 1 && (
            <button
              type="button"
              onClick={handleReset}
              aria-label={isEN ? "Reset zoom" : "Reset ukuran"}
              title={isEN ? "Reset zoom" : "Reset"}
              className="h-9 px-3 inline-flex items-center gap-1 rounded-full text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-400 hidden sm:inline">
            {zoom > 1
              ? isEN
                ? "Drag or scroll to pan · Click to reset"
                : "Geser untuk melihat detail · Klik untuk reset"
              : isEN
              ? "Click image or press + to zoom"
              : "Klik foto atau tekan + untuk zoom"}
          </span>

          {onOpenFullscreen && (
            <button
              type="button"
              onClick={onOpenFullscreen}
              aria-label={isEN ? "Open fullscreen view" : "Buka layar penuh"}
              className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-full border text-xs font-semibold bg-zinc-900/90 border-white/15 text-white hover:bg-red-600 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isEN ? "Fullscreen" : "Layar Penuh"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Zoom Stage */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full ${containerClassName} rounded-2xl overflow-auto border border-white/15 bg-black select-none ${
          zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
        }`}
      >
        <div
          onClick={handleImageClick}
          className="flex items-center justify-center transition-[width,height] duration-150 ease-out"
          style={{
            width: `${zoom * 100}%`,
            height: `${zoom * 100}%`,
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
