
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPersonalStylistAdvice = async (userPreference: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is interested in luxury leather goods. They say: "${userPreference}". Suggest which category (Totes, Clutches, Travel, Accessories) suits them best and why in a sophisticated, high-end brand voice. Keep it under 100 words.`,
      config: {
        systemInstruction: "You are a senior personal stylist for VietPrime, a luxury Italian leather brand. Your tone is elegant, exclusive, and helpful.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING },
            recommendedCategory: { type: Type.STRING },
          },
          required: ["advice", "recommendedCategory"]
        }
      },
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    return { advice: "Our artisans are currently preparing personalized recommendations. Please check back shortly.", recommendedCategory: "Accessories" };
  }
};
