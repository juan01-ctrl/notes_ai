'use client'

import { useAuth } from "@clerk/nextjs";
import Image       from "next/image";
import Link        from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="h-screen flex items-center justify-center px-10 md:px-40 max-w-7xl mx-auto flex-col gap-16">
      <Image src="/assets/ai-logo.svg" className="rounded-full" alt="logo" width={100} height={100} />
      <span className="text-2xl text-center text-white leading-relaxed">
        Unlock the potential of your notes with our AI-powered assistant!🚀<br /> Effortlessly organize, search, and explore your thoughts.<br /> Ask questions about your notes, find connections you didn’t know existed, and let our smart assistant provide insights that go beyond simple text.
      </span>
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-7"
      >
        <source src="/assets/particles-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Link href={
        isSignedIn
          ? ROUTES.DASHBOARD.NOTES
          : ROUTES.SIGN_IN
      }>
        <Button variant="outline" className="text-lg">Get Started</Button>
      </Link>
    </div>
  );
}
