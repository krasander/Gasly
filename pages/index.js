import { signIn, signOut, useSession } from 'next-auth/client'
import Dashboard from '../components/Dashboard'

import { connectToDatabase } from "../util/mongodb";

export async function getServerSideProps() {

  const { db } = await connectToDatabase();

  const movies = await db

    .collection("movies")

    .find({})

    .sort({ metacritic: -1 })

    .limit(20)

    .toArray();

  return {

    props: {

      movies: JSON.parse(JSON.stringify(movies)),

    },

  };

}

export default function Page({movies}) {
  const [session, loading] = useSession()

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <Dashboard user={session.user} movies={movies}/>
      )}
    </>
  )
}
