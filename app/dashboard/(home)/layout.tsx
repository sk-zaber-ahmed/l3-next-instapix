import Header from "@/components/Header";

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default HomePageLayout;
