"use client"

import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";


export default function Header() {
  const router = useRouter()

    return (
      <div className="flex justify-between py-8">
        <Logo onClick={() => router.push("/")} />
        <Navigation />
      </div>
    )
  }
  