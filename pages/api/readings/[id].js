export default function handler(req, res) {
    const {
      query: { id },
    } = req
  
    res.json({"value" : 123})
  }
  