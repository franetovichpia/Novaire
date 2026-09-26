import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import { About } from "@/sections/about/about";
import { Booking } from "@/sections/booking/booking";
import { Faq } from "@/sections/faq/faq";
import { Hero } from "@/sections/hero/hero";
import { Projects } from "@/sections/projects/projects";
import { Services } from "@/sections/services/services";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Booking />
        <Services />
        <Projects />
        <About />
        <Faq />
      </main>

      <Footer />
    </>
  );
}