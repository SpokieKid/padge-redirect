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
      window.location.href = "https://apps.apple.com/us/app/padge/id6476600623";
    } else if (deviceType === "Android") {
      window.location.href = "https://play.google.com/store/apps/details?id=com.padge.mobile"; // 请替换为实际的Android链接
    }
  }, [deviceType]);

  if (deviceType === null) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      {deviceType === "Other" ? (
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Please open this page on a mobile device</h2>
          <p className="text-lg">We will then redirect you to the correct page.</p>
        </div>
      ) : null}
    </main>
  );
}
