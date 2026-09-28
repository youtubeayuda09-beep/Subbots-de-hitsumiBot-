import express from 'express'
import cors from 'cors'
import pino from 'pino'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const logger = pino({
  level: 'info'
})

app.get('/', (req, res) => {
  res.json({
    ok: true,
    name: 'HitsumiBot Subbot Server',
    status: 'online'
  })
})

app.get('/api/status', (req, res) => {
  res.json({
    ok: true,
    status: 'online'
  })
})

app.post('/api/subbots/create', async (req, res) => {
  try {
    const { phone, name } = req.body

    if (!phone || !name) {
      return res.status(400).json({
        ok: false,
        error: 'Faltan el número de WhatsApp o el nombre del Subbot.'
      })
    }

    logger.info({
      phone,
      name
    }, 'Solicitud para crear Subbot')

    /*
     * Aquí conectaremos Baileys en el siguiente paso.
     * No vamos a inventar ningún código de vinculación.
     */

    return res.json({
      ok: true,
      status: 'pending',
      message: 'Solicitud recibida. Baileys será conectado próximamente.'
    })

  } catch (error) {
    logger.error(error)

    return res.status(500).json({
      ok: false,
      error: 'Error interno del servidor.'
    })
  }
})

app.listen(PORT, () => {
  logger.info(`HitsumiBot Subbot Server escuchando en el puerto ${PORT}`)
})
