// MongoDB playground test

use('petopia') // veritabanı adı

db.users.insertOne({
  name: 'Test User',
  email: 'test@example.com',
  password: '123456'
})
