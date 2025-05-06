interface ErrorProps {
  name: string;
  message: string;
}

export default function Error({ name, message }: ErrorProps) {
  return (
    <div
      id="pageError"
      className="flex items-center justify-center text-center w-full h-[20%]"
    >
      <div>
        <h2 className="text-3xl">Error: {name}</h2>
        <p className="text-xl">{message}</p>
      </div>
    </div>
  );
}
