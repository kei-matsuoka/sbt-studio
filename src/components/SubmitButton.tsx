export default function SubmitButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:scale-[1.03] transform transition duration-100 ease-in-out"
    >
      {text}
    </button>
  );
}
