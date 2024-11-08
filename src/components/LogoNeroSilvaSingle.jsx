import NeroSilvaImage from "@/assets/nero-single.png";

export default function NeroSilvaSingle({ width = '40' }) {
  return (
    <>
      <div className="flex justify-center">
        <img src={NeroSilvaImage} alt="" width={width} />
      </div>
    </>
  );
}
