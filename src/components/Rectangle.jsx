import rectangle from "@/assets/rectangle.jpg"

export default function Rectangle({ width }) {
  return (
    <>
      <img src={rectangle} alt="Rectangle" width={width} />
    </>
  );
}
