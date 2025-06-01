import clientPromise from '../../../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('petyashauth1409atlas');

    // Fetch all users except the 'password' field
    const users = await db.collection('petusers')
      .find({}, { projection: { password: 0 } }) // Exclude password
      .toArray();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[Get Users Error]', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
    });
  }
}
