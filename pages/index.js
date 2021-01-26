import { signIn, useSession } from "next-auth/client";
import Dashboard from "../components/Dashboard";
import { connectToDatabase } from "../util/mongodb";

export default function Page({ clients }) {
  const [session, loading] = useSession();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          {/* <signIn>{signIn}</signIn> */}
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && <Dashboard user={session.user} clients={clients} />}
    </>
  );
}

/**
 * This will get the client names from "clients" collection
 */
export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const clients = await db.collection("clients").find({}).limit(20).toArray();

  return {
    props: {
      clients: JSON.parse(JSON.stringify(clients)),
    },
  };
}
