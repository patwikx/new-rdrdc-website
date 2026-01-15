import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { properties } from '@/lib/data';

// Initialize Gemini - using flash-lite for lower token usage
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-lite',
  generationConfig: {
    maxOutputTokens: 256, // Limit response length to save tokens
    temperature: 0.7,
  }
});

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
 * Build condensed property summaries to reduce token usage
 */
function buildPropertySummaries(): string {
  return properties.map(p => {
    const availableUnits = p.availableUnits
      .filter(u => u.status === 'Available')
      .slice(0, 2) // Limit to 2 units per property
      .map(u => `${u.name} (${u.size})`)
      .join(', ');
    
    const mapsLink = `https://www.google.com/maps?q=${p.lat},${p.lng}`;
    
    return `• ${p.name} [${p.category}] - ${p.location}
  Map: ${mapsLink}
  Features: ${p.features.slice(0, 3).join(', ')}
  ${availableUnits ? `Units: ${availableUnits}` : ''}`;
  }).join('\n');
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

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Chat service is not configured' },
        { status: 500 }
      );
    }

    const propertySummaries = buildPropertySummaries();
    const conversationHistory = limitHistory(history);

    // Optimized system prompt - concise to save tokens
    const systemPrompt = `You are Rea, the friendly AI assistant for RD Realty Development Corporation in General Santos City, Philippines.

PROPERTIES:
${propertySummaries}

CONTACT:
${CONTACT_INFO.company}
📍 ${CONTACT_INFO.address}
�️ Office Map: ${OFFICE_MAPS_LINK}
�📱 ${CONTACT_INFO.mobile}
📞 ${CONTACT_INFO.phone}
✉️ ${CONTACT_INFO.email}
🕐 ${CONTACT_INFO.officeHours}

LEASING: 1) Inquire → 2) View → 3) Propose → 4) Move In

LINKS: [Properties](/properties) | [Leasing](/leasing) | [Contact](/contact)

RULES:
• You are "Rea" - be warm, helpful, concise
• Keep responses short (2-3 sentences max)
• Use bullet points for lists
• Only discuss RD Realty topics
• When asked for office location, use the Office Map link above
• Include property Google Maps links when mentioning specific properties
• Direct pricing questions to leasing team
• Politely redirect off-topic questions
${conversationHistory}
User: ${message}

Rea:`;

    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    const text = response.text();

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
