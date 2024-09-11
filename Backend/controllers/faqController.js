// controllers/faqController.js
const FaqArray = require('../Models/Faq'); // Adjust the path as needed

// Get all FAQs
const getAllFaqs = async (req, res) => {
  try {
    const faqsArray = await FaqArray.findOne(); // Assuming only one FAQ array exists
    if (!faqsArray) {
      return res.status(404).json({ message: 'No FAQs found' });
    }
    res.json(faqsArray);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add a new FAQ
const addFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Find or create FAQ array document
    let faqsArray = await FaqArray.findOne();
    if (!faqsArray) {
      faqsArray = new FaqArray({ faqs: [] });
    }

    // Add the new FAQ to the array
    faqsArray.faqs.push({ question, answer });
    await faqsArray.save();

    res.status(201).json(faqsArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update an FAQ by ID
const updateFaq = async (req, res) => {
  try {
    const { faqId } = req.params;
    const { question, answer } = req.body;

    const faqsArray = await FaqArray.findOne();
    if (!faqsArray) {
      return res.status(404).send('No FAQ array found');
    }

    const faq = faqsArray.faqs.id(faqId);
    if (!faq) {
      return res.status(404).send('FAQ not found');
    }

    faq.question = question;
    faq.answer = answer;
    await faqsArray.save();

    res.json(faqsArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Remove an FAQ by ID
const removeFaq = async (req, res) => {
  try {
    const { faqId } = req.params;

    const faqsArray = await FaqArray.findOne();
    if (!faqsArray) {
      return res.status(404).send('No FAQ array found');
    }

    const faq = faqsArray.faqs.id(faqId);
    if (!faq) {
      return res.status(404).send('FAQ not found');
    }

    faq.deleteOne();
    await faqsArray.save();

    res.json(faqsArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllFaqs,
  addFaq,
  updateFaq,
  removeFaq
};
