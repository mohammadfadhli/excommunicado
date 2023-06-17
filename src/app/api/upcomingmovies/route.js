import { NextResponse } from 'next/server';
 
export async function GET(request) {

  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  const genres = searchParams.get("genres")

  const max_date = "2023-07-06"
  const min_date = "2023-06-17"

  // const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&region=${process.env.TMDB_REGION}&page=${page}`)
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}&api_key=${process.env.TMDB_API_KEY}&region=${process.env.TMDB_REGION}&page=${page}&with_genres=${genres}`)
  

  const data = await res.json();
 
  return NextResponse.json({ data });
}