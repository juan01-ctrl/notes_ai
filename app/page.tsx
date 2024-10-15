'use client'

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="h-screen flex items-center justify-center px-10 md:px-40 max-w-7xl mx-auto flex-col gap-16">
      <Image src="/assets/ai-logo.svg" className="rounded-full" alt="logo" width={100} height={100} />
      <span className="text-2xl text-center">
        Unlock the potential of your notes with our AI-powered assistant!🚀<br/> Effortlessly organize, search, and explore your thoughts. Ask questions about your notes, find connections you didn’t know existed, and let our smart assistant provide insights that go beyond simple text.
      </span>
      <Link href={
        isSignedIn
          ? ROUTES.DASHBOARD.NOTES
          : ROUTES.SIGN_IN
      }>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
