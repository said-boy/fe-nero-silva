import toinane from "@/assets/toinane.jpg"

export default function Toinane({ width }) {
  return (
    <>
      <img className="rotate-90" style={{ scale: '2.5' }} src={toinane} alt="Toinane" width={width} />
    </>
  );
}
