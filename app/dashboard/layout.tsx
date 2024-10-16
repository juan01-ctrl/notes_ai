import { NavBar } from "@/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {

  return (
    <>
      <NavBar />
      <main className="w-full max-w-7xl p-4 mx-auto flex-1 flex flex-col">{children}</main>
    </>
  )
}