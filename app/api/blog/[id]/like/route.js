// http://localhost:3000/api/blog/blogid/like

import Blog from '@/models/Blog';
import { connect } from '@/lib/db';
import { verifyJwtToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function PUT(req, res) {
  await connect();
  const id = res.params.id;
  const accessToken = req.headers.get('authorization');
  const token = accessToken.split(' ')[1]; // get [bearer,token] and we use split to take token

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return NextResponse.json(
      { error: 'unauthorized (wrong or expired token)' },
      { status: 403 }
    );
  }

  try {
    const blog = await Blog.findById(id);

    if (blog.likes.includes(decodedToken._id)) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== decodedToken._id.toString()
      );
    } else {
      blog.likes.push(decodedToken._id);
    }
    await blog.save();

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'PUT error ' }, { status: 500 });
  }
}
