import Sidenav from "@/components/Sidenav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
      <div className="w-20 flex-none 2xl:w-64 md:border-r">
        <Sidenav />
      </div>
      <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-3 md:p-6 mx-auto">
        {children}
      </div>
    </main>
  );
}
