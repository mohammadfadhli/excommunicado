import { NextResponse } from 'next/server';

// in nextjs 13, 2nd parameters is where we find our params 
export async function GET(request, {params}) {

  const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.TMDB_API_KEY}`)

  const data = await res.json();
 
  return NextResponse.json({ data });
}
