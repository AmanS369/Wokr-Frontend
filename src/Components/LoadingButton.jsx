// LoadingButton.jsx
import React from "react";

const LoadingButton = ({ loading, onClick, disabled, children }) => {
  return (
    <button
      className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V2.83a1 1 0 10-2 0V12H4zm12 0a8 8 0 018 8v2.17a1 1 0 11-2 0V12h-6zm2-6a1 1 0 100-2 1 1 0 000 2z"
          ></path>
        </svg>
      ) : (
        <>
          <svg
            className="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy={7} r={4} />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <span className="ml-3">{children}</span>
        </>
      )}
    </button>
  );
};

export default LoadingButton;
