"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [deviceType, setDeviceType] = useState<string | null>(null);

  useEffect(() => {
    const detectDeviceType = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      if (/android/i.test(userAgent)) {
        setDeviceType("Android");
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        setDeviceType("iOS");
      } else {
        setDeviceType("Other");
      }
    };

    detectDeviceType();
  }, []);

  useEffect(() => {
    if (deviceType === "iOS") {
      window.location.href = "https://testflight.apple.com/join/Kd1zGEEH";
    } else if (deviceType === "Android") {
      window.location.href = "https://expo.dev/artifacts/eas/hCQ35KrHiUuoJRKUfD9qdo.apk"; // 请替换为实际的Android链接
    }
  }, [deviceType]);

  if (deviceType === null) {
    return <div>加载中...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      {deviceType === "Other" ? (
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold mb-4">请在移动设备上打开此页面</h2>
          <p className="text-lg">我们将会将您重定向到正确的页面。</p>
        </div>
      ) : null}
    </main>
  );
}
