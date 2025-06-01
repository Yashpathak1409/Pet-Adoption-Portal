import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb'; // Adjust path as necessary
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { petId } = await request.json();

    if (!petId || !ObjectId.isValid(petId)) {
      return NextResponse.json(
        { error: 'A valid pet ID is required.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas'); // Your DB name
    const petsCollection = db.collection('petprofiles');

    const result = await petsCollection.updateOne(
      { _id: new ObjectId(petId) },
      { $set: { status: 'adopted' } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'No pet found or status already adopted.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Payment successful. Pet status updated to adopted.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment success error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
