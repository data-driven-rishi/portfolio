'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from 'next/link'
import { ExternalLink, Send, Calendar, User } from 'lucide-react'
import {BLOGS} from '@/data/blogsData';
import {RESEARCH} from "@/data/researchData";

export default function Home() {
  const [animatedText, setAnimatedText] = useState('Data Analyst')
  const [isVisible, setIsVisible] = useState(true);
  const roles = ['Data Analyst', 'Machine Learning Enthusiast', 'Researcher']
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Start the fade-out animation

      setTimeout(() => {
        setAnimatedText(prev => {
          const currentIndex = roles.indexOf(prev);
          return roles[(currentIndex + 1) % roles.length];
        });
        setIsVisible(true); // Start the fade-in animation after changing text
      }, 500); // Wait for fade-out to complete
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-4 px-4 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            RISHI
          </Link>
          <nav className="flex gap-6">
            {['About', 'Projects', 'Research', 'Contact'].map((item) => (
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
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Data Driven Rishi
                </h1>
                <div className="text-2xl mb-6 h-[70px]">
                <div
      className={`font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 transition duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
    >
      {animatedText}
    </div>
                </div>
                <p className="text-xl mb-8 text-muted-foreground">
                  Passionate about Health and Healthcare, Public health, Interdesciplinary Research in Public health and leveraging real life implication through Data Analysis and Data Visualization
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <a href="/LamichhaneCV.pdf" download>Download Resume</a>
                </Button>
              </div>
              
              <div className="flex-1 flex justify-center items-center">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 animate-spin-slow"></div>
                  <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://avatars.githubusercontent.com/u/144190032?s=400&u=6bf35d64dc177ba6d3413c69322070abaf6f89c0&v=4" 
                      alt="Rishi" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 px-4 md:px-6 bg-background"> 
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOGS?.map((blog, index) => (
                <Link  key={index} href={blog.link}>
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg group">
                  <CardHeader className="p-0">
                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2">{blog.title}</CardTitle>
                    <CardDescription className="mb-4">{blog.description}</CardDescription>
                    <div className="flex justify-between">
                      
                      <Button variant="outline" size="sm">
                        <ExternalLink href={blog.link} className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="research" className="py-20 px-4 md:px-6 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Research</h2>
            <div className="grid gap-8">
              {RESEARCH?.map((research, index) => (
                <Link  key={index} href={research.link}>
                <Card className="transition-all hover:shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img src={research.image} alt={research.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <CardHeader>
                        <CardTitle className="text-2xl font-semibold">{research.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base mb-4">{research.description}</CardDescription>
                        <div className="flex max-w-full items-start text-sm text-muted-foreground mb-2">
                          <User className="mr-2 mt-0.5 h-5 w-5" />
                          <div>
                          {research.authors.map((author, index)=> {
                              return <span className='w-max' key={index} dangerouslySetInnerHTML={{__html: author}} /> 
                          }
                          )}
                          </div>
                        
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground my-4">
                          <Calendar className="mr-2 h-4 w-4" />
                          {new Date(research.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm font-medium">Published in: {research.journal}</p>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4 md:px-6 bg-gradient-to-t from-background to-muted">
          <div className="container max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Contact Me</h2>
            <Card className="backdrop-blur-sm bg-background/60">
              <CardContent className="p-6">
                <form  action="https://formspree.io/f/meoqalqd" className="space-y-6" method='POST'>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input id="name" placeholder="Your Name" required className="bg-background/50" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input id="email" name='email' type="email" placeholder="your@email.com" required className="bg-background/50" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea id="message" name='message' placeholder="Your message here..." required className="bg-background/50" />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
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
          <Link href="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            RISHI
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}