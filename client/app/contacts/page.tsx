const contactsData = [
    { id: 1, name: 'Yevhen Semenyuk', email: 'john@uhr.com', phone: '050-170-02-06' },
    { id: 2, name: 'Stefaniya Sydorenko', email: 'jane@uhr.com', phone: '096-725-83-17' },
];

export default function Contacts() {
    return (
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold mb-4 text-white">Contacts</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contactsData.map(contact => (
              <div key={contact.id} className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold">{contact.name}</h2>
                <p className="text-gray-600 mb-2">
                  <a href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </p>
                <p className="text-gray-600">
                  <a href={`tel:${contact.phone}`}>
                    {contact.phone}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
    );
}