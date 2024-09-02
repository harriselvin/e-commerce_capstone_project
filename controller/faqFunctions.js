import { getFaqDB } from '../model/faqDB.js'

const fetchFaq = async (req, res) => {
  res.json(await getFaqDB())
}

export { fetchFaq }