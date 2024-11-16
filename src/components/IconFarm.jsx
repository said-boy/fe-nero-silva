import rain from "../assets/rain.png";

export const Cloud = ({ width = "24px", height = "24px" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4C6 4 6 8 6 10C4.33333 10 1 11 1 15C1 19 4.33333 20 6 20H18C19.6667 20 23 19 23 15C23 11 19.6667 10 18 10C18 8 18 4 12 4Z"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Rain = () => {
  return <img className="w-[88px]" src={rain} alt="Hujan" />;
};

export const Task = ({ width = "24px", height = "24px" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6L20 6"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.7998 5.7998L4.5998 6.5998L6.59979 4.59981"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.7998 11.7998L4.5998 12.5998L6.59979 10.5998"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.7998 17.7998L4.5998 18.5998L6.59979 16.5998"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L20 12"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 18L20 18"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Soil = ({ width = "24px", height = "24px" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12H6"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 12H22"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 20.01L3.01 19.9989"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 16.01L6.01 15.9989"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 20.01L9.01 19.9989"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.01L12.01 15.9989"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 20.01L15.01 19.9989"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 16.01L18.01 15.9989"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 20.01L21.01 19.9989"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13C9 13 9.9 9.25882 12 7"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1857 2.24146L16.5601 6.13071C16.8031 8.65376 14.9114 10.9002 12.3883 11.1432C9.91266 11.3815 7.67 9.57197 7.43162 7.09632C7.19324 4.62068 9.00691 2.42053 11.4826 2.18215L15.6293 1.78286C15.9096 1.75587 16.1587 1.96119 16.1857 2.24146Z"
        stroke="#F4F9F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default { Cloud, Rain, Task };
