const jwt = require("jsonwebtoken")

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVhY2UyZTkwZmU4MDAwMTc4NmI0YzciLCJpYXQiOjE1NzU2NzQ1NzJ9.aTrQrjmqo51WFjwRKhcYQxtEkTXkxBbq0ENLwwmiFgc"

const decoded = jwt.verify(token, "Lyndea Dew")

console.log(decoded)