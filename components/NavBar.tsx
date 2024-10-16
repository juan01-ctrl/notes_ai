'use client'

import { UserButton } from "@clerk/nextjs";
import { dark }       from "@clerk/themes";
import dynamic        from "next/dynamic";
import Image          from "next/image";
import Link           from "next/link";
import { useTheme }   from "next-themes";

import { ROUTES } from "@/constants/routes";

import AIChatButton from "./AIChatButton";



const ThemeToggleButton = dynamic(() => import('@/components/ThemeToggleButton'), {
  ssr: false
})

export function NavBar() {
  const { theme } = useTheme()
  return (
    <div className="p-4 shadow">
      <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between">
        <Link href={ROUTES.DASHBOARD.NOTES}>
          <Image src="/assets/ai-logo.svg" alt="logo" width={50} height={50} className="rounded-full" />
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          <UserButton
            appearance={{
              baseTheme: theme === 'dark' ? dark : undefined,
              elements: { avatarBox: { width: '2rem', height: '2rem' } }
            }}
          />
          <AIChatButton />
        </div>
      </div>
    </div>
  )
}
