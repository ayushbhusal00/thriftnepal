import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
// console.log("API", genAi);
export async function POST(req: Request): Promise<Response> {
  try {
    const { image } = await req.json();
    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Analyze this product and provide detailed information in the following JSON format:
    {
      "productAnalysis": {
        "identifiedProduct": "Name and short detailed description of what you see in the image",
        "size": "Estimated size in format: 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL' or 'Regular' if it doesn't fit into any size category",
        "brand": "Brand Name of the product",
        "productDescription": {
          "verbalDescription": "Describe the product's composition and style",
          "fabricsUsed": "Fabrics and accesories used to make the product",
          "featureHighlights": "Describe the garment's highlights",
          "productCategory": "Category the product belongs to: "Skirt", "Top", "Pants", "Dress", "Outerwear", "Accessories", "Footwear", "Bags", "Jewellery", "Other,
          "estimatedCost": "Price of the product, find the closest price of the product online",
          "condition":"Estimate the condition of the garment: 'New', 'Used', 'Fair', or 'Unknown'",
        }
      }
    }
    
    Ensure the response is in valid JSON format exactly as specified above, without any markdown formatting.
    Provide realistic estimates and description.
    Be as specific and accurate as possible in identifying the material used, condition, cost and brand and its components.`;
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text();
    // Clean up the response text to remove any markdown formatting
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
    // Parse the response text as JSON to validate the format
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedText);
      return Response.json({
        success: true,
        data: parsedResponse,
      });
    } catch (error) {
      console.error("Failed to parse Gemini response as JSON:", error);
      throw new Error("Invalid response format from Gemini");
    }
  } catch (error) {
    return Response.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
