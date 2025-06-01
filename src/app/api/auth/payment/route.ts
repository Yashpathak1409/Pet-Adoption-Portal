import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb'; // Adjust the path as needed
import { ObjectId } from 'mongodb';

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

    // Check if petId is a valid ObjectId string
    if (!ObjectId.isValid(petId)) {
      return NextResponse.json(
        { error: 'Invalid pet ID format.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas'); // Replace with your actual DB name
    const adoptionCollection = db.collection('adoptionauthrequests');
    const petsCollection = db.collection('petprofiles'); // Assuming pets are stored here

    const newRequest = {
      fullName,
      email,
      phone,
      address,
      message: message || '',
      petId: new ObjectId(petId),
      submittedAt: new Date(),
    };

    // Insert the adoption request
    await adoptionCollection.insertOne(newRequest);

    // Optionally update pet status to 'pending' or 'adopted'
    await petsCollection.updateOne(
      { _id: new ObjectId(petId) },
      { $set: { status: 'pending' } }
    );

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
