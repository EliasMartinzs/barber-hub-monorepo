import { CTA } from "@/app/(public)/_componentes/cta";
import { Features } from "@/app/(public)/_componentes/features";
import { Footer } from "@/app/(public)/_componentes/footer";
import { Hero } from "@/app/(public)/_componentes/hero";
import { Nav } from "@/app/(public)/_componentes/nav";
import { Showcase } from "@/app/(public)/_componentes/showcase";
import { Stats } from "@/app/(public)/_componentes/stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Showcase />
      <CTA />
      <Footer />
    </main>
  );
}
