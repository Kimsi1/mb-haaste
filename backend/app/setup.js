import fs from 'node:fs'

try {
  // Check if database exists and create it from dummy data
  fs.statSync('../database/database.json')
  console.log('Database exists.')
} catch (error) {
  fs.copyFileSync('../database/initialDatabase.json', '../database/database.json')
  console.log('Creating database..')
}
