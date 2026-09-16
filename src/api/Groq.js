import axios from "axios";

const API_KEY = process.env.REACT_APP_GROQ_API_KEY;

// console.log("KEY:", API_KEY);

export const generateReport = async (transactions) => {
  const summary = transactions.map((t) => ({
    title: t.title,
    amount: t.amount,
    type: t.type,
    category: t.category,
  }));

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content:
            "Analyze these transactions and give savings tips: " +
            JSON.stringify(summary),
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};
