export default function SubmitButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 duration-100"
    >
      {text}
    </button>
  );
}
