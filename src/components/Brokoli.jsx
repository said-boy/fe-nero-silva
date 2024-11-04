import brokoli from "@/assets/brokoli.jpg";

export default function Brokoli({ width }) {
  return (
    <>
      <img style={{ scale: '1.6', marginLeft: '-40px' }} src={brokoli} alt="Brokoli" width={width} />
    </>
  );
}
