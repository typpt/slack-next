export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#5c3b58]">
      <div className="md:h-auto md:w-[30rem]">{children}</div>
    </div>
  );
}
