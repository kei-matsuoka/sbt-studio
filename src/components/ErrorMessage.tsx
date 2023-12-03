export default function ErrorMessage({
  message,
}: {
  message: string | undefined;
}) {
  return <p className="text-red-600 mt-1">{message}</p>;
}
