'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from 'next/link'
import { ExternalLink, Send, Calendar, User, PlayCircle } from 'lucide-react'
import { BLOGS } from '@/data/blogsData'
import { RESEARCH } from "@/data/researchData"
import { EDUCATION, EXPERIENCE, LEADERSHIP } from "@/data/experienceData"
import { AWARDS, CERTIFICATIONS } from "@/data/awardsData"
import { BEYOND } from "@/data/beyondData"

type Entry = { dates: string; type?: string; role: string; org: string; points: string[] }

type Project = {
  title: string
  context?: string
  description: string
  tools?: string[]
  image: string
  imagePosition?: string
  link: string
  demo?: string
}

type Award = { title: string; note?: string; org: string; year: string; image?: string; imagePosition?: string; link?: string }
type Beyond = { title: string; text: string; image?: string; imagePosition?: string }
function Timeline({ items }: { items: Entry[] }) {
  return (
    <ol className="relative border-l border-border ml-3">
      {items.map((item, i) => (
                       <li key={i} data-reveal className="relative mb-12 ml-8">
          <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-signal" />
          <p className="text-sm font-medium text-signal mb-1">{item.dates}{item.type ? ` · ${item.type}` : ''}</p>
          <h3 className="font-serif text-xl font-medium text-foreground">{item.role}</h3>
          <p className="text-muted-foreground mb-3">{item.org}</p>
          <ul className="list-disc ml-5 space-y-1 text-foreground/80">
            {item.points.map((p, j) => <li key={j}>{p}</li>)}
          </ul>
        </li>
      ))}
    </ol>
  )
}

export default function Home() {
  const [animatedText, setAnimatedText] = useState('Health economics')
  const [isVisible, setIsVisible] = useState(true)
  const roles = ['Health economics', 'Real-world evidence', 'Outcomes research', 'Healthcare data science']

  // rotating focus areas under the name
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setAnimatedText(prev => roles[(roles.indexOf(prev) + 1) % roles.length])
        setIsVisible(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // fade sections in once as they scroll into view
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('revealed'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-4 px-4 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
        <div className="container max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-foreground whitespace-nowrap">
            Rishi Lamichhane
          </Link>
          <nav className="flex gap-1 md:gap-2 overflow-x-auto">
            {['Education', 'Experience', 'Projects', 'Research', 'Leadership', 'Contact'].map((item) => (
              <Button key={item} variant="ghost" asChild className="text-base font-medium">
                <Link href={`#${item.toLowerCase()}`}>{item}</Link>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section id="about" className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-muted">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-left">
                <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight mb-4 text-foreground">
                  Rishi Lamichhane
                </h1>
                <div className="text-2xl mb-6 h-[70px]">
                  <div className={`font-medium text-signal transition duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
                    {animatedText}
                  </div>
                </div>
                <p className="text-xl mb-8 text-muted-foreground">
                  MPH candidate in Health Economics and Policy Analysis at Brown University, with a background in data science and public health. I use data and economic methods to assess the value of health interventions.
                </p>
                <Button asChild size="lg">
                  <a href="/RishiResume.pdf" target="_blank" rel="noopener noreferrer">View Resume</a>
                </Button>
              </div>

              <div className="flex-1 flex justify-center items-center">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-0 rounded-full border border-border"></div>
                  <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <img
                         src="/Beyond/headshot.jpg"
                                               style={{ objectPosition: "50% 15%" }}
                      alt="Rishi Lamichhane"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="py-20 px-4 md:px-6 bg-muted/50">
                    <div className="container max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl font-medium tracking-tight mb-12 text-center text-foreground">Education</h2>
                        <div className="grid gap-6 md:grid-cols-3">
              {EDUCATION.map((ed, i) => (
                <div key={i} data-reveal className="bg-card border border-border rounded-lg p-6 border-t-4 border-t-signal">
                  {ed.years && <p className="text-sm font-medium text-signal mb-3">{ed.years}</p>}
                  <h3 className="font-serif text-2xl font-medium tracking-tight text-foreground leading-tight">{ed.school}</h3>
                  {ed.unit && <p className="text-muted-foreground">{ed.unit}</p>}
                  <p className="mt-4 font-medium text-foreground">{ed.degree}</p>
                  {ed.detail && <p className="text-muted-foreground">{ed.detail}</p>}
                                    {ed.courses.length > 0 && (
                    <p className="mt-5 pt-4 border-t border-border text-sm text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Coursework: </span>
                      {ed.courses.join(' · ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 px-4 md:px-6 bg-background">
          <div className="container max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl font-medium tracking-tight mb-12 text-center text-foreground">Experience</h2>
            <Timeline items={EXPERIENCE as Entry[]} />
          </div>
        </section>

        <section id="projects" className="py-20 px-4 md:px-6 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl font-medium tracking-tight mb-10 text-center text-foreground">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(BLOGS as Project[]).map((blog, index) => (
                <Card key={index} data-reveal className="overflow-hidden transition-all hover:shadow-lg group flex flex-col">
                  <CardHeader className="p-0">
                    <a href={blog.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        style={{ objectPosition: blog.imagePosition || "center" }}
                      />
                    </a>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {blog.context && (
                      <p className="text-xs font-medium uppercase tracking-wide text-signal mb-2">{blog.context}</p>
                    )}
                    <CardTitle className="mb-2 font-serif font-medium text-xl leading-snug">{blog.title}</CardTitle>
                    <CardDescription className="mb-4">{blog.description}</CardDescription>
                    {blog.tools && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tools.map((tool) => (
                          <span key={tool} className="text-xs font-medium px-2.5 py-1 rounded-full bg-signal/10 text-signal">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      <Button variant="outline" size="sm" asChild>
                        <a href={blog.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </a>
                      </Button>
                      {blog.demo && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={blog.demo} target="_blank" rel="noopener noreferrer">
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Watch demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

                        <section id="awards" className="py-20 px-4 md:px-6 bg-background">
          <div className="container max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl font-medium tracking-tight mb-12 text-center text-foreground">Awards and Certifications</h2>

            <h3 className="text-sm font-medium text-signal mb-2">Awards</h3>
            <ul className="divide-y divide-border mb-12">
              {(AWARDS as Award[]).map((a, i) => (
                <li key={i} data-reveal className="py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <p className="font-serif text-lg font-medium text-foreground">
                      {a.link ? <a href={a.link} target="_blank" rel="noopener noreferrer" className="hover:text-signal">{a.title}</a> : a.title}
                      {a.note && <span className="ml-2 text-sm font-sans text-signal">{a.note}</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{a.org}</p>
                  </div>
                  <p className="text-sm font-medium text-signal whitespace-nowrap">{a.year}</p>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-medium text-signal mb-2">Certifications</h3>
            <ul className="divide-y divide-border">
              {(CERTIFICATIONS as Award[]).map((c, i) => (
                <li key={i} data-reveal className="py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <p className="font-serif text-lg font-medium text-foreground">
                      {c.link ? <a href={c.link} target="_blank" rel="noopener noreferrer" className="hover:text-signal">{c.title}</a> : c.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{c.org}</p>
                  </div>
                  {c.year && <p className="text-sm font-medium text-signal whitespace-nowrap">{c.year}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
                        <section id="research" className="py-20 px-4 md:px-6 bg-background">
          <div className="container max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-medium tracking-tight mb-12 text-center text-foreground">Research</h2>
            <ul className="divide-y divide-border border-y border-border">
              {RESEARCH?.map((research, index) => (
                <li key={index} data-reveal className="grid gap-4 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
                  <div>
                    {research.image && (
                      <img
                        src={research.image}
                        alt={research.title}
                        className="aspect-[4/3] w-full rounded-md object-cover border border-border"
                      />
                    )}
                    <p className="mt-2 text-sm font-medium text-signal">{research.year}</p>
                  </div>
                  <div>
                    {research.link ? (
                      <a
                        href={research.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif text-xl font-medium leading-snug text-foreground hover:text-signal transition-colors"
                      >
                        {research.title}
                      </a>
                    ) : (
                      <p className="font-serif text-xl font-medium leading-snug text-foreground">{research.title}</p>
                    )}
                    <p className="mt-2 text-sm text-muted-foreground">
                      {research.authors.map((author, i) => (
                        <span key={i} dangerouslySetInnerHTML={{ __html: author }} />
                      ))}
                    </p>
                    <p className="mt-1 text-sm italic text-foreground/80">{research.journal}</p>
                    {research.description && (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{research.description}</p>
                    )}
                    {research.link && (
                      <a
                        href={research.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-signal hover:underline underline-offset-4"
                      >
                                                {(research as { linkLabel?: string }).linkLabel || "View PDF"} ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="leadership" className="py-20 px-4 md:px-6 bg-muted/50">
          <div className="container max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl font-medium tracking-tight mb-12 text-center text-foreground">Leadership</h2>
            <Timeline items={LEADERSHIP as Entry[]} />
          </div>
        </section>

                                <section id="beyond" className="py-20 px-4 md:px-6 bg-background">
          <div className="container max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl font-medium tracking-tight mb-12 text-center text-foreground">Beyond Work</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(BEYOND as Beyond[]).map((b, i) => {
                const delay = { transitionDelay: `${600 + i * 200}ms` };
                return (
                  <div
                    key={i}
                    data-reveal
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-primary"
                  >
                    {b.image && (
                      <>
                        <img
                          src={b.image}
                          alt={b.title}
                          style={{ objectPosition: b.imagePosition || "center", ...delay }}
                          className="absolute inset-0 h-full w-full object-cover scale-110 blur-md transition duration-1000 ease-out group-[.revealed]:blur-0 group-[.revealed]:scale-100 motion-reduce:blur-0 motion-reduce:scale-100"
                        />
                        <div
                          style={delay}
                          className="absolute inset-0 bg-primary/65 transition-colors duration-1000 group-[.revealed]:bg-primary/0"
                        />
                        <div
                          style={delay}
                          className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-1000 group-[.revealed]:opacity-100"
                        />
                      </>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="font-serif text-2xl font-semibold text-white mb-2">{b.title}</p>
                      <p className="text-sm text-white/85 leading-relaxed">{b.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section id="contact" className="py-20 px-4 md:px-6 bg-gradient-to-t from-background to-muted">
          <div className="container max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl font-medium tracking-tight mb-10 text-center text-foreground">Contact Me</h2>
            <Card className="backdrop-blur-sm bg-background/60">
              <CardContent className="p-6">
                <form action="https://formspree.io/f/meoqalqd" className="space-y-6" method="POST">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input id="name" name="name" placeholder="Your Name" required className="bg-background/50" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" required className="bg-background/50" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea id="message" name="message" placeholder="Your message here..." required className="bg-background/50" />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-6 px-4 md:px-6 bg-background border-t border-border/40">
        <div className="container max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-serif text-xl font-medium text-foreground">
            Rishi Lamichhane
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}