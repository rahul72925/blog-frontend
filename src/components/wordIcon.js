"use client";
export const WordIcon = ({ handleClick = () => {}, word, size = 16 }) => {
  return (
    <div
      className={`flex justify-center items-center w-${size} h-${size} bg-gray-300 rounded-full`}
      onClick={handleClick}
    >
      <span className="text-4xl">{word.charAt(0).toUpperCase()}</span>
    </div>
  );
};
