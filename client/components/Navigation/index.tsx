export default function Navigation() {
  return (
    <nav className="flex items-center">
      <div className="text-sm lg:flex-grow">
        <a href="#contacts" className="text-white text-sm inline-block mr-8">
          Contacts
        </a>
        <a href="#support" className="text-white text-sm inline-block mr-8">
          Support
        </a>
        <a href="#my-tickets" className="text-white text-sm inline-block">
          My Tickets
        </a>
      </div>
    </nav>
  );
}