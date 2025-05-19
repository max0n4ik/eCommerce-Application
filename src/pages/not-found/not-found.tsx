import Nothing from '@/assets/images/nothing.png';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="w-full  flex justify-center">
      <img
        src={Nothing}
        alt="Nothing"
        className="size-[200px] lg:size-[700px]"
      />
    </div>
  );
}
