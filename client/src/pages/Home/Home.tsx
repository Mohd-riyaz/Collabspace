import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  LayoutDashboard,
  Folder,
  CheckSquare,
  ArrowRight,
  Shield,
  Zap,
  Grid
} from "lucide-react";

export default function Home() {
  // const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      title: "Interactive Kanban Boards",
      desc: "Coordinate sprint tasks, set priority indicators, assign developers, and track status columns in real time.",
      icon: CheckSquare,
      color: "blue"
    },
    {
      title: "Workspace Customization",
      desc: "Configure name, URL slugs, invite initial members, and select personalized color themes matching team identities.",
      icon: LayoutDashboard,
      color: "emerald"
    },
    {
      title: "Integration Ecosystem",
      desc: "Directly connect and feed notifications from developer environments like Slack, GitHub, Figma, and Notion.",
      icon: Grid,
      color: "amber"
    },
    {
      title: "Security & Compliance",
      desc: "Robust endpoints, custom workspace invite rules, access audits, and compliance-first data stores.",
      icon: Shield,
      color: "purple"
    },
    {
      title: "Fluid Multi-Project Hub",
      desc: "Create and monitor multiple parallel projects in your workspace with visual completeness meters.",
      icon: Folder,
      color: "rose"
    },
    {
      title: "Global Search & Shortcuts",
      desc: "Navigate through workspaces, look up task cards, filter priority lists instantly via quick keyboard shortcuts.",
      icon: Compass,
      color: "teal"
    }
  ];

  // const pricingPlans = [
  //   {
  //     name: "Starter Lab",
  //     price: billingPeriod === "monthly" ? "0" : "0",
  //     period: "forever",
  //     desc: "Ideal for individual developers, testing setups, and personal experiment scratchpads.",
  //     features: [
  //       "1 active workspace",
  //       "Up to 3 active projects",
  //       "Classic Kanban task board",
  //       "Local data persistency",
  //       "Slack integration support"
  //     ],
  //     cta: "Get Started Free",
  //     popular: false
  //   },
  //   {
  //     name: "Pro Team",
  //     price: billingPeriod === "monthly" ? "12" : "9",
  //     period: "per user/month",
  //     desc: "Perfect for scaling startups, engineering organizations, and collaborative teams.",
  //     features: [
  //       "Unlimited workspaces",
  //       "Unlimited parallel projects",
  //       "Stateful Kanban & grid tasks",
  //       "All integration connectors",
  //       "Prioritized support access",
  //       "Advanced workspace stats dashboard"
  //     ],
  //     cta: "Start Pro Trial",
  //     popular: true
  //   },
  //   {
  //     name: "Enterprise Core",
  //     price: "Custom",
  //     period: "tailored contact",
  //     desc: "Built for regulated enterprises requiring custom limits, audits, and dedicated hosting.",
  //     features: [
  //       "SLA guarantees",
  //       "Dedicated workspace containers",
  //       "SOC2 security compliance logs",
  //       "Custom billing models",
  //       "Account manager mapping",
  //       "Whiteglove setup services"
  //     ],
  //     cta: "Contact Enterprise Sales",
  //     popular: false
  //   }
  // ];

  const faqs = [
    {
      q: "How does CollabSpace maintain state updates?",
      a: "CollabSpace features a client-side reactive store backed by localStorage. This ensures all workspaces, projects, tasks, user profile edits, and marketplace integrations persist seamlessly across navigation routes, providing a fully functional dashboard workflow without database overhead."
    },
    {
      q: "Can I invite external stakeholders to specific boards?",
      a: "Yes! CollabSpace workspaces support member permission setups. You can add users via email invitations, categorize their role scopes (Admin, Member, Guest), and customize access permissions from the Workspace Settings panel."
    },
    {
      q: "Does CollabSpace support integrations like GitHub and Slack?",
      a: "Absolutely. In the Explore Apps tab, you can search for productivity, developer tools, analytics, and communication systems, and toggle active connectors (e.g. GitHub branches syncing, Slack notify streams, Figma mocks embeds)."
    },
    {
      q: "Is there a discount for annual pricing options?",
      a: "Yes. By selecting the annual pricing toggle on this landing page, you save up to 25% on subscription plans, lowering Pro Team costs from $12 to $9 per user/month."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-radial from-blue-50/50 via-transparent to-transparent dark:from-blue-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          {/* Tagline pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-100 dark:border-blue-900 shadow-sm mx-auto">
            <Zap className="w-3.5 h-3.5" />
            <span>CollabSpace V2 Platform is Live</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-[1.1]!">
            Where engineering teams <span className="text-blue-600 dark:text-blue-500">align</span>, collaborate, and <span className="text-blue-600 dark:text-blue-500">ship</span> fast.
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A premium SaaS workspace combining boards, multi-project status trackers, integration metrics, and team profile configurations into a single desktop canvas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-705 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="border border-gray-250 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 px-6 py-3 rounded-lg text-base font-semibold transition"
            >
              Learn More
            </a>
          </div>

          {/* Interactive CSS dashboard demo preview */}
          <div className="mt-12 max-w-5xl mx-auto border border-gray-250 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900/60 p-2 md:p-3 relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-gray-950 pointer-events-none z-10" />
            <div className="rounded-xl border border-gray-150 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-gray-950 p-4 min-h-[300px] md:min-h-[480px] flex gap-4 text-left shadow-inner">
              {/* Fake Sidebar */}
              <div className="w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 hidden md:flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                  <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">A</div>
                  <span className="text-xs font-bold text-gray-800 dark:text-white">Acme Engineering</span>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="w-full h-7 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-450 flex items-center gap-2 px-2 text-[11px] font-semibold">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </div>
                  <div className="w-full h-7 rounded text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 px-2 text-[11px] font-medium">
                    <Folder className="w-3.5 h-3.5" />
                    <span>Projects</span>
                  </div>
                  <div className="w-full h-7 rounded text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 px-2 text-[11px] font-medium">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Tasks Board</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-850 pt-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-750 dark:text-white truncate">Riyaz Ahmed</p>
                  </div>
                </div>
              </div>

              {/* Fake Content area */}
              <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                <div className="flex justify-between items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5">
                  <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">CollabSpace / Dashboard</div>
                  <div className="w-20 h-6 bg-gray-100 dark:bg-gray-800 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Active Projects</span>
                    <span className="text-lg font-bold text-gray-800 dark:text-white">4</span>
                  </div>
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Tasks Completed</span>
                    <span className="text-lg font-bold text-gray-800 dark:text-white">82%</span>
                  </div>
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Focus Score</span>
                    <span className="text-lg font-bold text-gray-850 dark:text-white">96</span>
                  </div>
                </div>
                {/* Fake Kanban column */}
                <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 flex flex-col gap-2">
                  <div className="text-xs font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-1">Sprint Backlog</div>
                  <div className="flex flex-col gap-2 overflow-y-auto">
                    <div className="border border-gray-150 dark:border-gray-800 rounded p-2 text-[10px] space-y-1">
                      <span className="bg-red-50 text-red-650 px-1 rounded font-bold text-[9px] dark:bg-red-950/20 dark:text-red-400">HIGH</span>
                      <p className="font-semibold text-gray-700 dark:text-gray-200">Fix Tailwind CSS v4 Vite compiler plugin bugs</p>
                    </div>
                    <div className="border border-gray-150 dark:border-gray-800 rounded p-2 text-[10px] space-y-1">
                      <span className="bg-blue-50 text-blue-650 px-1 rounded font-bold text-[9px] dark:bg-blue-950/20 dark:text-blue-400">MEDIUM</span>
                      <p className="font-semibold text-gray-700 dark:text-gray-200">Design onboarding color choice RadioGroup UI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900/30 transition-colors border-y border-gray-150 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Supercharge your shipping engine
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Everything your agile team requires to move from ideas to production blueprints in record time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-250 dark:border-gray-800/80 shadow-sm hover:shadow-md transition flex flex-col text-left space-y-4"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white bg-blue-600`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-450 leading-relaxed flex-grow">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Accordion FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-150 dark:border-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Clear answers regarding capabilities, state setups, and team configurations.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-250 dark:border-gray-800/80 rounded-xl bg-white dark:bg-gray-900 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-base font-semibold text-gray-905 dark:text-white text-left hover:bg-gray-50 dark:hover:bg-gray-850/50 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl text-gray-400 shrink-0 ml-4 select-none">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-850">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-700 to-blue-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Ready to streamline your team's roadmap?
          </h2>
          <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
            Create your account today, establish your workspace color theme, invite your engineering partners, and launch your first Kanban board.
          </p>
          <div className="pt-4">
            <Link
              to="/register"
              className="bg-white text-blue-750 hover:bg-blue-50 px-8 py-3.5 rounded-lg text-base font-bold shadow-lg transition inline-flex items-center gap-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
