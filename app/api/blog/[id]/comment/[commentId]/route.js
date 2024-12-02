// http://localhost:3000/api/blog/blogid/comment/commentId/
import Blog from '@/models/Blog';
import { connect } from '@/lib/db';
import { verifyJwtToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function DELETE(req, res) {
  await connect();

  const id = res.params.id;
  const commentId = res.params.commentId;
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
    const blog = await Blog.findById(id)
      .populate('authorId')
      .populate('comments.user');

    const comment = blog.comments.find((comment) => comment.id === commentId);

    if (!comment) {
      return NextResponse.json(
        {
          message: 'Comment does not exist',
        },
        { status: 404 }
      );
    }
    if (comment?.user?._id.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { message: 'Only author can update his/her comment' },
        { status: 403 }
      );
    }

    blog.comments = blog.comments.filter((comment) => comment.id !== commentId);

    await blog.save();

    return NextResponse.json(
      { message: 'Successfully deleted comment' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Delete error ' }, { status: 500 });
  }
}
