"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [deviceType, setDeviceType] = useState<string>("加载中...");
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const detectDeviceType = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (/android/i.test(userAgent)) {
        setDeviceType("Android");
      } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        setDeviceType("iOS");
        setCountdown(3);
      } else if (/macintosh/i.test(userAgent)) {
        setDeviceType("Macbook");
      } else {
        setDeviceType("其他");
      }
    };

    detectDeviceType();
  }, []);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = "https://d.id";
    }
  }, [countdown]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 text-center">
        <h2 className="text-xl font-bold mb-2">设备类型</h2>
        <p>{deviceType}</p>
        {deviceType === "iOS" && countdown !== null && (
          <p className="mt-2">
            {countdown > 0 ? `${countdown} 秒后跳转...` : "正在跳转..."}
          </p>
        )}
      </div>
    </main>
  );
}
