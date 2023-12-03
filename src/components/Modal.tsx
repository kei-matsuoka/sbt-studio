export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-white bg-opacity-60"
      onClick={onClose}
    >
      {children}
    </div>
  );
}
