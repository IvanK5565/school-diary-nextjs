import Header from "@/components/Header";
import LocationCards from "@/components/LocationCards";
import SearchBar from "@/components/SearchBar";
import { getHousesData, Location } from "@/pages/api/data";
import container from "@/server/container/container";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next"

export default function Home({ data, session }: { data: Location[], session:Session }) {
  return (
    <div className="min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen">
      <Header />
      <div className="xl:flex-1 xl:flex xl:overflow-y-hidden">
        <SearchBar />
        <main className="py-6 xl:flex-1 xl:overflow-x-hidden">
          <p>{session?.user?.firstName}</p>
          {data.map((d, i) => <LocationCards data={d} key={i} />)}
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx:GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, container.resolve('authOptions'))
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/workcation/splash",
  //       permanent: false,
  //     },
  //   }
  // }
  const data = getHousesData();
  return {
    props: {
      session,
      data,
    },
  }
}