const Product = require('../models/productModel');
require('dotenv').config();
const axios = require('axios');


exports.getProducts = async (req, res) => {
  const { search } = req.query;
  // console.log("I am inside",search)

  let query = {};

  if (search) {
    query = {
      $or: [
        { Title: { $regex: search, $options: 'i' } },
        { "Variant SKU": { $regex: search, $options: 'i' } }
      ]
    };
  }

  const products = await Product.find(query);
  res.json(products);
};



exports.getProductFromChat = async (req, res) => {
  const { message } = req.query;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  //console.log("Chat Message Received:", message);

  try {
    const prompt = `
You are an intelligent assistant that helps convert chat messages into MongoDB queries for a fashion product store.

The MongoDB product schema looks like this:
{
  "Handle": String,
  "Title": String,
  "Body": String,
  "Vendor": String,
  "Type": String,
  "Tags": String,
  "Option1 Name": String,
  "Option1 Value": String,
  "Option2 Name": String,
  "Option2 Value": String,
  "Option3 Name": String,
  "Option3 Value": String,
  "Variant SKU": String,
  "Variant Grams": Number,
  "Variant Inventory Tracker": String,
  "Variant Inventory Qty": Number,
  "Variant Inventory Policy": String,
  "Variant Fulfillment Service": String,
  "Variant Price": Number,
  "Variant Compare At Price": String,
  "Image Src": String
}

User Message: "${message}"

Expected Output:
Return a **valid MongoDB query object** that searches the "Title", "Tags", "Type", "Vendor", and "Variant SKU" fields using $regex for text.

If the message mentions price filters like "under", "above", or "between", use "Variant Price" with $lt, $gt, $lte, $gte accordingly.

Only return a pure valid MongoDB query object. No explanations, no placeholder values, no extra text.
`;

    const openRouterResponse = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let queryText = openRouterResponse.data.choices[0].message.content.trim();
    //console.log(" Final Mongo Query (raw):", queryText);

    
    let query;
    try {
      query = JSON.parse(queryText);
    } catch (e) {
      // Try to eval if it's a JS object (not ideal but needed if OpenAI returns raw object)
      try {
        query = eval(`(${queryText})`);
      } catch (err) {
        console.error("Error parsing query:", err.message);
        return res.status(400).json({ error: 'Failed to parse AI response', details: err.message });
      }
    }

    //console.log("Parsed MongoDB Query:", JSON.stringify(query, null, 2));

    // Execute query
    const results = await Product.find(query).limit();
    //console.log("AI Query Results:", results.length);
    res.json(results);

  } catch (err) {
    //console.error('Chat Query Error:', err.message);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
};

