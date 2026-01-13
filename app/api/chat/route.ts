import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { properties } from '@/lib/data';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

/**
 * Contact information for RD Realty
 */
const CONTACT_INFO = {
  company: 'RD Realty Development Corporation',
  address: 'Cagampang Ext. Brgy. Bula, General Santos City',
  phone: '+63 (83) 552-4435',
  email: 'marketing@rdrealty.com.ph',
  website: 'www.rdrealty.com.ph',
  officeHours: 'Monday to Saturday, 7:30 AM - 5:10 PM',
};

/**
 * Build condensed property summaries to reduce token usage
 */
function buildPropertySummaries(): string {
  return properties.map(p => {
    const availableUnits = p.availableUnits
      .filter(u => u.status === 'Available')
      .map(u => `${u.name} (${u.size}, ${u.type})`)
      .join('; ');
    
    // Generate Google Maps link from coordinates
    const mapsLink = `https://www.google.com/maps?q=${p.lat},${p.lng}`;
    
    return `${p.name} (${p.category})
  Location: ${p.location}
  Map: [View on Google Maps](${mapsLink})
  Description: ${p.description.substring(0, 100)}...
  Features: ${p.features.slice(0, 4).join(', ')}
  ${availableUnits ? `Available: ${availableUnits}` : ''}`;
  }).join('\n\n');
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

    // Build property summaries
    const propertySummaries = buildPropertySummaries();

    // Build conversation history string
    const conversationHistory = history.length > 0
      ? `\nPREVIOUS CONVERSATION:\n${history.map((h: { role: string; content: string }) => 
          `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`
        ).join('\n')}\n`
      : '';

    // Build system prompt - optimized for fewer tokens
    const systemPrompt = `You are RD Realty Assistant, the Virtual Assitant for RD Realty Development Corporation in General Santos City, Philippines.

PROPERTIES:
${propertySummaries}

CONTACT INFO:
• Company: ${CONTACT_INFO.company}
• Address: ${CONTACT_INFO.address}
• Phone: ${CONTACT_INFO.phone}
• Email: ${CONTACT_INFO.email}
• Hours: ${CONTACT_INFO.officeHours}

LEASING PROCESS:
1. Inquire - Contact leasing team to discuss requirements
2. View - Schedule a site visit
3. Propose - Review lease proposal and terms
4. Move In - Sign agreement and complete documentation

NAVIGATION:
• Properties: [/properties](/properties)
• Leasing Info: [/leasing](/leasing)
• Contact Us: [/contact](/contact)

RESPONSE RULES:
• Keep responses concise (2-4 sentences)
• Use bullet points (•) for lists
• Be warm and helpful with Filipino hospitality
• Only discuss RD Realty topics
• Direct specific pricing/availability questions to leasing team
• Use navigation links when directing users
• ALWAYS include the Google Maps link when mentioning property locations
${conversationHistory}
User asks: ${message}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
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

    return NextResponse.json(
      { success: false, error: "I'm having trouble connecting right now. Please try again later." },
      { status: 500 }
    );
  }
}
