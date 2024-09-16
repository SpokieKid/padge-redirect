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
    }
  }, [deviceType]);

  if (deviceType === null) {
    return <div>加载中...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      {deviceType === "Android" ? (
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-sm w-full text-center">
          <h2 className="text-3xl font-bold mb-4">感谢您对Padge的兴趣！🎉</h2>
          <p className="text-lg mb-6">我们正在开发Android版本。您可以访问我们的Notion页面或加入我们的Telegram群组以获取更多信息。</p>
          <div className="space-y-4">
            <a href="https://humdrum-cashew-1cf.notion.site" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold block flex items-center">
              <img src="/notion.png" alt="Notion Icon" className="w-6 h-6 mr-2" />
              Padge Notion
            </a>
            <a href="https://t.me/padgebeta" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold block flex items-center">
              <img src="/telegram-icon.png" alt="Telegram Icon" className="w-6 h-6 mr-2" />
              Telegram Beta Collectors
            </a>
          </div>
        </div>
      ) : deviceType === "Other" ? (
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Please open this page on a mobile device</h2>
          <p className="text-lg">We will then redirect you to the correct page.</p>
        </div>
      ) : null}
    </main>
  );
}
