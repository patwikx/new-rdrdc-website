import { NextResponse } from 'next/server';
import { properties } from '@/lib/data';

// APIFree.ai configuration
const API_KEY = process.env.API_KEY || '';
const BASE_URL = 'https://api.apifree.ai/v1';
const MODEL = 'google/gemini-2.5-flash-lite';

// Website base URL for property links
const WEBSITE_URL = 'https://rdrealty.com.ph';

/**
 * Contact information for RD Realty
 */
const CONTACT_INFO = {
  company: 'RD Realty Development Corporation',
  address: 'Cagampang Ext. Brgy. Bula, General Santos City',
  phone: '+63 (83) 552-4435',
  mobile: '+63 917 979 7502',
  email: 'marketing@rdrealty.com.ph',
  officeHours: 'Mon-Sat, 7:30 AM - 5:10 PM',
  // Office coordinates from contact page
  lat: 6.1088039,
  lng: 125.1807528,
};

// Pre-computed office Google Maps link
const OFFICE_MAPS_LINK = `https://www.google.com/maps?q=${CONTACT_INFO.lat},${CONTACT_INFO.lng}`;

/**
 * Build detailed property summaries with clickable links
 */
function buildPropertySummaries(): string {
  return properties.map(p => {
    const availableUnits = p.availableUnits
      .filter(u => u.status === 'Available')
      .slice(0, 2) // Limit to 2 units per property
      .map(u => `${u.name} (${u.size})`)
      .join(', ');

    const mapsLink = `https://www.google.com/maps?q=${p.lat},${p.lng}`;
    const propertyPageLink = `${WEBSITE_URL}/properties/${p.slug}`;

    return `• **${p.name}** [${p.category}]
  📍 Location: ${p.location}
  🗺️ View on Map: ${mapsLink}
  🔗 Property Page: ${propertyPageLink}
  ✨ Features: ${p.features.slice(0, 3).join(', ')}
  ${availableUnits ? `🏢 Available: ${availableUnits}` : ''}`;
  }).join('\n\n');
}

/**
 * Build a summary of properties grouped by location with counts
 */
function buildLocationSummary(): string {
  const locationMap: Record<string, { count: number; properties: string[] }> = {};

  properties.forEach(p => {
    // Normalize location to broader area
    let area = p.location;

    // Group by city/area
    if (p.location.includes('General Santos') || p.location.includes('GenSan')) {
      area = 'General Santos City';
    } else if (p.location.includes('Polomolok')) {
      area = 'Polomolok / GenSan Boundary';
    } else if (p.location.includes('Tacurong')) {
      area = 'Tacurong City, Sultan Kudarat';
    } else if (p.location.includes('Isulan')) {
      area = 'Isulan, Sultan Kudarat';
    } else if (p.location.includes('Davao')) {
      area = 'Davao City';
    }

    if (!locationMap[area]) {
      locationMap[area] = { count: 0, properties: [] };
    }
    locationMap[area].count++;
    locationMap[area].properties.push(p.name);
  });

  return Object.entries(locationMap)
    .map(([area, data]) => `• ${area} — ${data.count} ${data.count === 1 ? 'property' : 'properties'}`)
    .join('\n');
}

/**
 * Limit conversation history to save tokens
 * Keep only last 4 exchanges (8 messages)
 */
function limitHistory(history: Array<{ role: string; content: string }>): string {
  if (history.length === 0) return '';

  // Keep only last 4 exchanges
  const limited = history.slice(-8);

  // Truncate long messages
  const formatted = limited.map(h => {
    const content = h.content.length > 150
      ? h.content.substring(0, 150) + '...'
      : h.content;
    return `${h.role === 'user' ? 'U' : 'Rea'}: ${content}`;
  }).join('\n');

  return `\nRecent chat:\n${formatted}\n`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    // Input validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Chat service is not configured' },
        { status: 500 }
      );
    }

    const propertySummaries = buildPropertySummaries();
    const locationSummary = buildLocationSummary();
    const conversationHistory = limitHistory(history);

    // Conversational system prompt - natural and human-like
    const systemPrompt = `You are Rea, a friendly and helpful virtual assistant for RD Realty Development Corporation. You chat naturally like a real person would - warm, casual, and easy to talk to.

WHAT YOU KNOW:

Our locations and property counts:
${locationSummary}

Property details:
${propertySummaries}

Office: ${CONTACT_INFO.address}
Office Map: ${OFFICE_MAPS_LINK}
Mobile: ${CONTACT_INFO.mobile} | Phone: ${CONTACT_INFO.phone}
Email: ${CONTACT_INFO.email}
Hours: ${CONTACT_INFO.officeHours}

YOUR PERSONALITY:

You're like a friendly leasing agent having a casual chat. Speak naturally - the way you'd text a friend, not write a formal document.

IMPORTANT RULES:

- DO NOT use markdown formatting like **bold** or bullet points with asterisks. Just write plain, natural sentences.
- Break your message into short paragraphs with blank lines between them, like texting.
- When someone asks about properties, casually mention we have locations in GenSan, Davao, Tacurong, and other areas. Ask which area they're interested in.
- When giving a location, put the Google Maps link on its own line so they can tap it easily.
- Keep responses short - 2 to 4 short paragraphs max.
- For pricing, just say rates vary and give them the contact number to call.
- Only talk about RD Realty stuff.

EXAMPLE OF HOW TO RESPOND:

User: "What properties do you have?"

Good response:
"Hey! We've got quite a few actually. 😊

Most of our properties are in General Santos City - commercial buildings, malls, and office spaces. We also have properties in Davao, Tacurong, and Isulan.

What type of space are you looking for? And which area works best for you?"

BAD response (too robotic):
"We have properties in the following locations:
* General Santos City - 25 properties
* Davao City - 1 property
..."

Be natural. Be helpful. Be human.`;

    // Build messages array for chat completions API
    const messages = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history
    if (history && history.length > 0) {
      const limitedHistory = history.slice(-8);
      for (const h of limitedHistory) {
        messages.push({
          role: h.role === 'user' ? 'user' : 'assistant',
          content: h.content.length > 200 ? h.content.substring(0, 200) + '...' : h.content
        });
      }
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    // Call apifree.com API (OpenAI-compatible)
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        max_tokens: 300,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('APIFree error:', response.status, errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({
      success: true,
      message: text,
    });
  } catch (error) {
    console.error('Chat API error:', error);

    // Handle rate limiting
    if (error instanceof Error && (error.message.includes('429') || error.message.toLowerCase().includes('rate'))) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    // Handle quota exceeded
    if (error instanceof Error && error.message.toLowerCase().includes('quota')) {
      return NextResponse.json(
        { success: false, error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, error: "I'm having trouble connecting right now. Please try again." },
      { status: 500 }
    );
  }
}
