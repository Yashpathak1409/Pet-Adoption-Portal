import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb'; // Adjust path based on your project

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, address, message, petId } = await request.json();

    // Validate required fields
    if (!fullName || !email || !phone || !address || !petId) {
      return NextResponse.json(
        { error: 'Full name, email, phone, address, and pet ID are required.' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas'); // use your correct DB name
    const adoptionCollection = db.collection('adoptionauthrequests');

    // Build the document
    const newRequest = {
      fullName,
      email,
      phone,
      address,
      message: message || '',
      petId,
      submittedAt: new Date(),
    };

    // Insert into DB
    await adoptionCollection.insertOne(newRequest);

    return NextResponse.json(
      { message: 'Adoption request submitted successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Adoption form error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
