import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import HeroCards from "@/components/HeroCards";
import MemoryMarquee from "@/components/MemoryMarquee";
import ScrollProgress from "@/components/ScrollProgress";
import type { PortalMessage } from "@/types";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create your PortalBox",
    description: "Sign up and pay a one-time ₦500 to activate your personal memory capsule.",
  },
  {
    step: "02",
    title: "Share your link",
    description: "Send your unique PortalBox link to family, friends, lecturers and mentors.",
  },
  {
    step: "03",
    title: "Receive messages",
    description: "Everyone who shaped your journey leaves a memory, wish or testimonial.",
  },
  {
    step: "04",
    title: "Keep memories forever",
    description: "Revisit every message anytime, long after the gowns are returned.",
  },
];

const EXAMPLE_MESSAGES: PortalMessage[] = [
  {
    id: "1",
    user_id: "demo",
    sender_name: "Mrs. Adeyemi",
    relationship: "Mother",
    message:
      "From your first day of school to this moment — I have watched you become someone truly remarkable. So proud of you, my dear.",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "demo",
    sender_name: "Dr. Okonkwo",
    relationship: "Lecturer",
    message:
      "Few students ask the questions you asked in class. You made the lecture hall better. Go build something the world needs.",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "demo",
    sender_name: "Tobi",
    relationship: "Coursemate",
    message:
      "Four years, countless all-nighters, and one unforgettable final year project. We did it. Forever grateful you were my partner in this.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: "demo",
    sender_name: "Aisha",
    relationship: "Friend",
    message:
      "Watching you walk that stage made every late-night study call worth it. You earned every bit of this, and more.",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    user_id: "demo",
    sender_name: "Mr. Eze",
    relationship: "Mentor",
    message:
      "You asked for feedback nobody else wanted to hear, and you used every bit of it. That's rare. Proud doesn't quite cover it.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    user_id: "demo",
    sender_name: "Funmi",
    relationship: "Roommate",
    message:
      "Three years of shared instant noodles and shared dreams. Watching you graduate feels like watching myself win too.",
    created_at: new Date().toISOString(),
  },
];

export default function LandingPage() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 text-center sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-220px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
        />
        <HeroCards />
        <div className="relative z-[2] mx-auto max-w-5xl">
          <Reveal>
            <h1 className="mx-auto max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-primary sm:text-6xl">
              Your graduation lasts a day.
              <br />
              The memories should last <span className="text-accent">forever.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
              Collect messages, wishes and memories from everyone who helped shape your journey.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/create">
                <Button variant="accent" size="lg">
                  Create My PortalBox — ₦500
                </Button>
              </Link>
              <Link href="#memory-wall">
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-border bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
              Most graduation memories disappear.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-4 text-lg text-muted sm:grid-cols-3">
              <p>Messages get lost.</p>
              <p>Chats get deleted.</p>
              <p>People move on.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-heading text-xl font-medium text-primary">
              PortalBox preserves them forever.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-center font-heading text-3xl font-semibold sm:text-4xl">
              How it works
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                  <span className="font-heading text-sm font-semibold text-accent">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE MEMORY WALL */}
      <section id="memory-wall" className="border-t border-border bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-center font-heading text-3xl font-semibold sm:text-4xl">
              What a PortalBox looks like
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-md text-center text-muted">
              A real wall of memories from people who watched the journey happen.
            </p>
          </Reveal>
          <div className="mt-12">
            <MemoryMarquee messages={EXAMPLE_MESSAGES} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold leading-tight sm:text-4xl">
              One graduation.
              <br />
              Hundreds of memories.
              <br />
              One place to keep them forever.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link href="/create" className="mt-9 inline-block">
              <Button variant="accent" size="lg">
                Create Your PortalBox
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
