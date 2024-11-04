import NeroSilvaImage from "@/assets/nero-silva.png";

export default function NeroSilva({ width = 500 }) {
  return (
    <>
      <div className="flex justify-center mt-44 -mb-80">
        <img src={NeroSilvaImage} alt="" width={width} />
      </div>
    </>
  );
}
