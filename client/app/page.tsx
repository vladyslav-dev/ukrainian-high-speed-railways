import HeroText from "@/components/HeroText";
import SearchTicketsForm from "@/widgets/SearchTicketsForm";


export default async function Home() {



  console.log('Home render',)

  return (
    <div className="h-1/2 flex flex-col justify-center items-center gap-y-16">
      <HeroText />
      <SearchTicketsForm />
    </div>
  )
}
