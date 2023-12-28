import Header from "@/components/Header";

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}

export default HomePageLayout;