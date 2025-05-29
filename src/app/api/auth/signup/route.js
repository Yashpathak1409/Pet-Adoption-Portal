import clientPromise from '../../../../../lib/mongodb';

import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { email, password, fullName } = await request.json();

    // Validate input fields
    if (!email || !password || !fullName) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400,
      });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas'); // Specify your DB name

    // Check if user already exists
    const existingUser = await db.collection('petusers').findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already registered.' }), {
        status: 409,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = {
      email,
      fullName,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Insert user into collection
    await db.collection('petusers').insertOne(newUser);

    return new Response(JSON.stringify({ message: 'User registered successfully.' }), {
      status: 201,
    });
  } catch (error) {
    console.error('[Signup Error]', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
