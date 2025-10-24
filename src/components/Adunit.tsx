"use client";
import { useEffect, useRef } from "react";


declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdUnit() {
  // ✅ Correct ref type for <ins>
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!adRef.current || initialized.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initialized.current = true;
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "flex" }}
      data-ad-format="fluid"
      data-ad-layout-key="-fb+5w+4e-db+86"
      data-ad-client="ca-pub-3738297787059683"
      data-ad-slot="9651419496"
    ></ins>
  );
}
