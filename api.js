const parseContacts = contact => ({
    name: `${contact.name.first} ${contact.name.last}`,
    phone: contact.phone,
    image: '',
})

export const fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=30&nat=us')
    const {results} = await response.json()
    return results.map(contact => parseContacts(contact))
}