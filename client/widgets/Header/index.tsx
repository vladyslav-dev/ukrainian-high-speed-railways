"use client"

import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import { useWorkflowStore } from "@/stores/useWorkflowStore";
import { useRouter } from "next/navigation";


export default function Header() {
  const router = useRouter()
  const { setSelectedSeats } = useWorkflowStore()

    return (
      <div className="flex justify-between py-8">
        <Logo onClick={() =>{
           router.push("/")
           setSelectedSeats([])
        }} />
        <Navigation />
      </div>
    )
  }
  