export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 mt-14">{children}</div>
    </div>
  );
}
