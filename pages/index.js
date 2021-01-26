import { useSession, getSession } from "next-auth/client";
import Dashboard from "../components/Dashboard";
import { connectToDatabase } from "../util/mongodb";
import { useRouter } from "next/router";

export default function Page({ clients }) {
  const [session, loading] = useSession();
  if (loading) {
    return <p>Loading...</p>;
  }

  const router = useRouter();

  return (
    <>
      {(!session && router.push("/api/auth/signin"), (<></>))}
      {session && <Dashboard user={session.user} clients={clients} />}
    </>
  );
}

/**
 * This will get the client names from "clients" collection
 */
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Only fetch clients if logged in
  if (!session) {
    return {
      props: {
        clients: {},
      },
    };
  }

  const { db } = await connectToDatabase();
  const clients = await db.collection("clients").find({}).limit(20).toArray();

  return {
    props: {
      clients: JSON.parse(JSON.stringify(clients)),
    },
  };
}
