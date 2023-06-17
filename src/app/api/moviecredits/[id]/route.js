import { NextResponse } from 'next/server';
 
export async function GET(request, {params}) {

  const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${process.env.TMDB_API_KEY}`)

  const data = await res.json();
 
  return NextResponse.json({ data });
}