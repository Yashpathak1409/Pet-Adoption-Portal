// File: /app/api/auth/petprofile/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb'; // Adjust path if needed

type Pet = {
  petName: string;
  petType: string;
  breed: string;
  age: number;
  gender: string;
  color?: string;
  size?: string;
  weight?: number;
  vaccinated: boolean;
  vaccinationDate?: string;
  healthInfo?: string;
  foodPreference?: string;
  temperament?: string;
  photoUrl?: string;
  availableForAdoption: boolean;
  dateOfEntry: string;
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas');
    const petsCollection = db.collection('petsauthprofile');

    // Fetch all pets
    const pets = await petsCollection.find({}).toArray();

    // Return pets as JSON
    return NextResponse.json(pets);
  } catch (error: any) {
    console.error('Fetch pets error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch pets' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const petData: Pet = await req.json();

    // Basic validation of required fields
    if (!petData.petName || !petData.petType || !petData.breed) {
      return NextResponse.json(
        { message: 'Missing required pet fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas');
    const petsCollection = db.collection('petsauthprofile');

    const result = await petsCollection.insertOne(petData);

    return NextResponse.json(
      { message: 'Pet added successfully', insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Insert pet error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to add pet' },
      { status: 500 }
    );
  }
}
