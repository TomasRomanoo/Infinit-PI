"use client";
import React, { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      window.location.href = "/"; // Replace "/destination" with your desired URL
    }, 3000);

    return () => {
      clearTimeout(redirectTimeout); // Clear the timeout if the component is unmounted before the delay completes
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Success!</h2>
        <p className="text-lg text-gray-600">
          Your signup process is complete. Let's get rocking!
        </p>
      </div>
    </div>
  );
}
