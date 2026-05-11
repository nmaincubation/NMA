let tasksData = null;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'GET') {
    if (tasksData) {
      return res.status(200).json({ tasks: tasksData })
    }
    return res.status(404).json({ message: 'No data found' })
  }

  if (req.method === 'POST') {
    tasksData = req.body.tasks
    return res.status(200).json({ message: 'Tasks saved successfully', tasks: tasksData })
  }

  res.status(405).json({ message: 'Method not allowed' })
}
