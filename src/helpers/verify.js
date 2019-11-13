const jwt = require("jsonwebtoken")

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM3ODM1Yjk0MGRkNDAwMTdjZTQ0NzUiLCJpYXQiOjE1NzM1MjE1MDR9.WIFW6Mi8dTOwhjeqXFCEuO92O5ZLMlw8A4GoV8cif_I"

const decoded = jwt.verify(token, "Lyndea Dew")

console.log(decoded)