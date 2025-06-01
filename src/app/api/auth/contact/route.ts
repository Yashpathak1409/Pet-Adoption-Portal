import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb'; // Adjust path if needed

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas'); // Your DB name
    const contactCollection = db.collection('contactauthusers');

    const newMessage = {
      name,
      email,
      message,
      createdAt: new Date(),
    };

    await contactCollection.insertOne(newMessage);

    return NextResponse.json(
      { message: 'Message received! Thank you for contacting us.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas');
    const contactCollection = db.collection('contactauthusers');

    // Fetch all contact messages, sorted by newest first
    const contacts = await contactCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch contact users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact users' },
      { status: 500 }
    );
  }
}
