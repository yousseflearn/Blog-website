// http://localhost:3000/api/someid
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
    const body = await req.json();
    const blog = await Blog.findById(id).populate('authorId');

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { message: 'Only author can update his/her blog' },
        { status: 403 }
      );
    }

    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );
    return NextResponse.json(updateBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'PUT error ' }, { status: 500 });
  }
}

export async function GET(req, res) {
  await connect();
  const id = res.params.id;

  try {
    const blog = await Blog.findById(id)
      .populate({
        path: 'authorId',
        select: '-password',
      })
      .populate({
        path: 'comments.user',
        select: '-password',
      });
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Get Error' }, { status: 500 });
  }
}

export async function DELETE(req, res) {
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
    const blog = await Blog.findById(id).populate('authorId');

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { message: 'Only author can update his/her blog' },
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(id);
    return NextResponse.json(
      { message: 'Successfully deleted blog' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Delete error ' }, { status: 500 });
  }
}
