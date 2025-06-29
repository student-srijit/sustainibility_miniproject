import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { emission } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API key not set.' }, { status: 500 });
  }

  if (typeof emission !== 'number' || emission <= 0) {
    return NextResponse.json({ error: 'Invalid emission value.' }, { status: 400 });
  }

  const prompt = `My annual carbon footprint is ${emission} kg CO2. Give me 5 practical, personalized tips to reduce my carbon footprint, focusing on the highest impact changes for someone at this level.`;

  try {
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
    const geminiData = await geminiRes.json();
    // Log the response for debugging
    console.log(JSON.stringify(geminiData, null, 2));
    if (geminiData.error) {
      return NextResponse.json({ error: geminiData.error.message || 'Gemini API error.' }, { status: 500 });
    }
    const tips = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!tips) {
      return NextResponse.json({ error: 'No tips found in Gemini response.' }, { status: 500 });
    }
    return NextResponse.json({ tips });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch tips from Gemini.' }, { status: 500 });
  }
}
