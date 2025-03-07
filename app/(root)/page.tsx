import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import headerImage from '../../public/assets/images/sgdsgdsd.png'
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";

export default async function Home({searchParams}: SearchParamProps) {

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || ''
  const category = (searchParams?.category as string) || ''

  const events = await getAllEvents({
    query: searchText,
    category: category,
    page: page,
    limit: 6
  })


  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Share, Connect, Empower: Strengthening Communities Together!            
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Join our community to share, connect, and empower others by placing or donating useful items outside your home for those in need to pick up for free.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>
          <Image 
            src={headerImage} 
            alt="hero" 
            width={1200} 
            height={1200}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">
          Trusted by <br/> Thousands of Peoples
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search/>
          <CategoryFilter/>
        </div>

        <Collection data={events?.data} emptyTitle="No Lists Found" emptyStateSubText="Come back Later" collectionType="All_Events" limit={6} page={1} totalPages={events?.totalPages}/>
      </section>

    </>
  );
}
