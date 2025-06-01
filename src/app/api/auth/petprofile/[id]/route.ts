// File: /app/api/auth/petprofile/[id]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '../../../../../../lib/mongodb'; // Adjust path if needed
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas');
    const petsCollection = db.collection('petsauthprofile');

    // Convert id string to MongoDB ObjectId
    const objectId = new ObjectId(id);

    const pet = await petsCollection.findOne({ _id: objectId });

    if (!pet) {
      return NextResponse.json({ message: 'Pet not found' }, { status: 404 });
    }

    return NextResponse.json(pet);
  } catch (error: any) {
    console.error('Fetch pet by id error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch pet by id' },
      { status: 500 }
    );
  }
}
