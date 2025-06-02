"use client"

import Link from "next/link"
import { useActionState, useEffect, useRef } from "react"
import {
  Zap,
  Brain,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Rocket,
  Lightbulb,
  TrendingUp,
  Send,
} from "lucide-react" // Added Send icon
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitPartnershipInquiry, type PartnershipFormState } from "./actions"
import { TypewriterHeadline } from "@/components/typewriter-headline"

export default function SinglePageWebsite() {
  const contactSectionRef = useRef<HTMLDivElement>(null)

  const initialFormState: PartnershipFormState = { success: false, message: "" }
  const [formState, formAction, isPending] = useActionState(submitPartnershipInquiry, initialFormState)

  const scrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (formState.success) {
      const form = document.getElementById("partnership-form") as HTMLFormElement | null
      form?.reset()
    }
  }, [formState.success])

  const typewriterTexts = [
    "Accelerate Software Development.",
    "Disrupt Markets with AI.",
    "Enhance Product Attainability.",
    "Build with Unmatched Speed & Quality.", // New phrase emphasizing speed and quality
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-50">
      {/* Header Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-700/40 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="mx-auto flex h-16 max-w-screen-lg items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-bold text-2xl text-slate-100 pl-2">
            Periscoped
          </Link>
          <Button
            onClick={scrollToContact}
            variant="ghost"
            className="text-purple-400 hover:text-purple-300 hover:bg-slate-800 mr-2"
          >
            Partner With Us
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          <div className="mx-auto max-w-screen-lg px-6 md:px-8 text-center">
            <p className="mb-6 text-lg font-semibold text-purple-400 tracking-wider uppercase">
              HIRE AN AI-FIRST DEV TEAM
            </p>
            <TypewriterHeadline
              texts={typewriterTexts}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl min-h-[100px] md:min-h-[160px]" // min-height helps stabilize layout during text changes
            />
            {/* Adjusted margin-top from mt-8 to mt-6 to reduce gap */}
            <p className="mx-auto mt-6 max-w-[750px] text-slate-300 md:text-xl">
              Periscoped deploys elite, AI-augmented teams to build your market-disrupting software and operational
              systems, amplifying your competitive advantage with unparalleled speed and quality.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-150"
              >
                Contact Us <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* The AI Imperative (Market Trends & Value Proposition) */}
        <section id="ai-advantage" className="py-16 md:py-24 bg-slate-800/50">
          <div className="mx-auto max-w-screen-lg px-6 md:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-100">
                The AI Edge: <span className="text-purple-400">Your Catalyst for Market Leadership</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[800px] text-slate-400 md:text-lg">
                In today's hyper-competitive landscape, AI is not just an option—it's the engine for exponential growth
                and market disruption. We help you harness its power.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-start p-6 bg-slate-800 rounded-xl shadow-2xl">
                <TrendingUp className="h-10 w-10 text-pink-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100">Capitalize on AI Trends</h3>
                <p className="mt-2 text-sm text-slate-400">
                  From Generative AI to advanced automation, we integrate cutting-edge trends into your solutions,
                  ensuring you're not just current, but ahead of the curve.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-slate-800 rounded-xl shadow-2xl">
                <Zap className="h-10 w-10 text-pink-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100">Accelerate Market Entry</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Our AI-augmented development processes drastically reduce time-to-market, allowing you to seize
                  opportunities faster than your competition.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-slate-800 rounded-xl shadow-2xl">
                <Target className="h-10 w-10 text-pink-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-100">Enhance Competitive Advantage</h3>
                <p className="mt-2 text-sm text-slate-400">
                  We build bespoke "AI execution engines" that provide unique capabilities, creating sustainable
                  differentiation and market dominance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Strategic Approach */}
        <section id="our-approach" className="py-16 md:py-24 bg-slate-900">
          <div className="mx-auto max-w-screen-lg px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-100">
                Engineered for <span className="text-purple-400">Speed & Strategic Impact</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-slate-400 md:text-lg">
                Periscoped's approach is designed for one thing: delivering your disruptive vision with unparalleled
                velocity and precision.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="p-8 bg-slate-800 rounded-xl shadow-xl">
                <div className="flex items-center gap-4 mb-3">
                  <Users className="h-10 w-10 text-purple-400" />
                  <h3 className="text-2xl font-semibold text-slate-100">Elite AI-Augmented Teams</h3>
                </div>
                <p className="text-slate-400 mb-4">
                  Our core strength lies in our high-performance, in-house teams. We blend top-tier engineering talent
                  with AI-powered tools and agile methodologies to build exceptional software at an accelerated pace.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" /> Rapid, iterative development cycles.
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" /> AI-assisted coding, testing, and deployment.
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" /> Seamless integration of advanced AI
                    capabilities.
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-slate-800 rounded-xl shadow-xl">
                <div className="flex items-center gap-4 mb-3">
                  <Brain className="h-10 w-10 text-purple-400" />
                  <h3 className="text-2xl font-semibold text-slate-100">AI Execution Engines</h3>
                </div>
                <p className="text-slate-400 mb-4">
                  We don't just build applications; we architect and implement comprehensive "AI execution engines."
                  These are the core software and operational systems that power your disruptive strategy and drive your
                  business forward.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" /> Custom-built AI models and platforms.
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" /> Intelligent automation of core business
                    processes.
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" /> Data-driven insights for continuous
                    optimization.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner With Periscoped? */}
        <section id="why-partner" className="py-16 md:py-24 bg-slate-800/50">
          <div className="mx-auto max-w-screen-lg px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-100">
                The <span className="text-purple-400">Periscoped Difference</span>: Your Unfair Advantage
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 border border-slate-700 rounded-xl bg-slate-800 hover:border-purple-500 transition-colors">
                <Lightbulb className="h-8 w-8 text-purple-400 mb-3" />
                <h4 className="text-xl font-semibold text-slate-100 mb-2">Boutique Focus, Maximum Impact</h4>
                <p className="text-sm text-slate-400">
                  As a specialized firm, we dedicate our full attention and top talent to a select number of strategic
                  partnerships, ensuring profound results.
                </p>
              </div>
              <div className="p-6 border border-slate-700 rounded-xl bg-slate-800 hover:border-purple-500 transition-colors flex flex-col items-center text-center">
                <Rocket className="h-8 w-8 text-purple-400 mb-3" />
                <h4 className="text-xl font-semibold text-slate-100 mb-2">Unmatched Agility & Speed</h4>
                <p className="text-sm text-slate-400">
                  Our core philosophy: "Hire the team that moves the fastest." We are built for rapid execution without
                  compromising quality.
                </p>
              </div>
              <div className="p-6 border border-slate-700 rounded-xl bg-slate-800 hover:border-purple-500 transition-colors">
                <Users className="h-8 w-8 text-purple-400 mb-3" />
                <h4 className="text-xl font-semibold text-slate-100 mb-2">True Strategic Partnership</h4>
                <p className="text-sm text-slate-400">
                  We invest in your vision, aligning our success with yours. We're not just developers; we're
                  co-architects of your market disruption.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactSectionRef}
          className="py-16 md:py-24 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900"
        >
          <div className="mx-auto max-w-screen-lg px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-100">
                Ready to Move Fastest & <span className="text-purple-400">Disrupt Your Market?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-slate-400 md:text-lg">
                Let's discuss how Periscoped can build your AI-powered future. Initiate a strategic partnership today.
              </p>
            </div>
            <div className="max-w-lg mx-auto bg-slate-800 p-8 rounded-xl shadow-2xl">
              <form action={formAction} id="partnership-form" className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="mt-1 bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                  {formState.errors?.name && <p className="text-sm text-red-400 mt-1">{formState.errors.name[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@company.com"
                    required
                    className="mt-1 bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                  {formState.errors?.email && <p className="text-sm text-red-400 mt-1">{formState.errors.email[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="company" className="text-slate-300">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your Company"
                    required
                    className="mt-1 bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                  {formState.errors?.company && (
                    <p className="text-sm text-red-400 mt-1">{formState.errors.company[0]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="disruption_goal" className="text-slate-300">
                    Your Market Disruption Goal
                  </Label>
                  <Textarea
                    id="disruption_goal"
                    name="disruption_goal"
                    placeholder="Briefly describe how you aim to disrupt your market with AI..."
                    rows={4}
                    required
                    className="mt-1 bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-500 focus:ring-purple-500 focus:border-purple-500"
                  />
                  {formState.errors?.disruption_goal && (
                    <p className="text-sm text-red-400 mt-1">{formState.errors.disruption_goal[0]}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md text-lg py-3"
                  size="lg"
                  disabled={isPending}
                >
                  {isPending ? "Submitting..." : "Contact Us"}
                </Button>
                {formState.message && (
                  <div
                    className={`mt-4 p-3 rounded-md text-sm ${formState.success ? "bg-green-700/30 text-green-300 border border-green-600" : "bg-red-700/30 text-red-300 border border-red-600"}`}
                  >
                    {formState.success ? (
                      <CheckCircle className="inline h-4 w-4 mr-2" />
                    ) : (
                      <AlertTriangle className="inline h-4 w-4 mr-2" />
                    )}
                    {formState.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/40 bg-slate-900">
        <div className="mx-auto max-w-screen-lg flex flex-col items-center justify-center gap-2 py-8 px-6 md:px-8 md:flex-row md:justify-between">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Periscoped. All rights reserved.</p>
          <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 font-semibold">
            Move Fastest. Disrupt Decisively.
          </p>
        </div>
      </footer>
    </div>
  )
}
