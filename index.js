import express from 'express'
import cors from 'cors'
import pkg from 'pg'
const { Pool } = pkg
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000


const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: {rejectUnauthorized:false}
})

app.use(cors())
app.use(express.json())

app.get('/api/monthly-comparison', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM monthly_comparison ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch monthly comparison data' })
  }
})
app.get('/keep-alive', (req, res) => {
  res.status(200).send('I am alive  !');
});

app.get('/api/top-products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM top_products ORDER BY revenue DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top products' })
  }
})

app.get('/api/customers-by-device', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers_by_device ORDER BY date')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer device data' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})