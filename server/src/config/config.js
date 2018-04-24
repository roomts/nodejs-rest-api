module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'new-jogue',
    user: 'root',
    password: 'root',
    // user: process.env.DB_USER || 'exchange_admin',
    // password: process.env.DB_PASS || 'full nick bass wine data corn',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      storage: './safe.mysql',
      logging: false
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
