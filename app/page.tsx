import SiteHeader from "@/components/SiteHeader";
import InicioPremium from "@/components/home/InicioPremium";
import StudioFrame from "@/components/decision/StudioFrame";

export default function Home() {
  return (
    <div className="min-h-screen text-slate-950">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <StudioFrame><InicioPremium /></StudioFrame>
      </main>

    </div>
  );
}
