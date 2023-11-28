import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex items-center">
      <div className="text-sm lg:flex-grow">
        <Link href="/contacts" className="text-white text-sm inline-block mr-8">
          Contacts
        </Link>
        <Link href="/tickets" className="text-white text-sm inline-block">
          My Tickets
        </Link>
      </div>
    </nav>
  );
}