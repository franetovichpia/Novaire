import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import { About } from "@/sections/about/about";
import { Contact } from "@/sections/contact/contact";
import { Faq } from "@/sections/faq/faq";
import { Hero } from "@/sections/hero/hero";
import { Process } from "@/sections/process/process";
import { Projects } from "@/sections/projects/projects";
import { Services } from "@/sections/services/services";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}