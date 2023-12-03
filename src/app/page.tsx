import MembershipForm from "@/components/MembershipForm";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-lg font-bold text-center">会員証を作成する</h1>
      <MembershipForm />
    </div>
  );
}
