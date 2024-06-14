const db = require('../config/database');

class User {
  constructor(name, email, password, nickname, country) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.country = country;
  }

  async save() {
    const sql = `
      INSERT INTO users (name, email, password, nickname, country)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [this.name, this.email, this.password, this.nickname, this.country];
    await db.run(sql, values);
  }

  static async findUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const row = await db.get(sql, [email]);
    if (row) {
      return new User(row.name, row.email, row.password, row.nickname, row.country);
    } else {
      return null;
    }
  }
}

module.exports = User;