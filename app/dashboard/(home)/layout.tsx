import Header from "@/components/Header";

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-between">
        {children}
      </div>
    </div>
  );
}

export default HomePageLayout;
