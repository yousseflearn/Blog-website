// http://localhost:3000/api/blog
import Blog from '@/models/Blog';
import { connect } from '@/lib/db';
import { verifyJwtToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connect();
  const accessToken = req.headers.get('authorization');
  const token = accessToken.split(' ')[1]; // get [bearer,token] and we use split to take token
  const decodedToken = verifyJwtToken(token);
  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: 'unauthorized (wrong or expired token)' }),
      {
        status: 403,
      }
    );
  }
  try {
    const body = await req.json();
    const newBlog = await Blog.create(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'POST error (create blog)' });
  }
}
