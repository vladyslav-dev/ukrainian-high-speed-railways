import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

export default function Header() {
    return (
      <div className="flex justify-between py-8">
        <Logo />
        <Navigation />
      </div>
    )
  }
  