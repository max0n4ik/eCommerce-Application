export function Tooltip({
  message,
}: {
  message: string | undefined | string[];
}): React.JSX.Element {
  return (
    <div className="absolute left-full top-1/4 z-10 ml-2 w-max -translate-y-1/4 rounded bg-background border border-destructive px-2 py-1 text-sm font-medium text-destructive shadow-lg">
      {message}
    </div>
  );
}
