"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Camera,
  Upload,
  Plus,
  Bell,
  Calendar,
  Menu,
  Folder,
  MapPin,
  ArrowLeft,
  Clock,
  Users,
  AlertCircle,
  Edit3,
  Trash2,
  Share,
  X,
  CheckCircle2,
  Circle,
  ShoppingCart,
  Briefcase,
  Home,
  Heart,
  Star,
  ChevronRight,
  Target,
} from "lucide-react"
import { SkegLogo } from "./components/skeg-logo"

// Static data moved outside component
const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"]
const MANHATTAN_LOCATIONS = [
  "Central Park",
  "Times Square",
  "SoHo Cafe",
  "Greenwich Village",
  "Chelsea Market",
  "Bryant Park",
  "Madison Square Garden",
  "Union Square",
  "Grand Central Terminal",
  "Washington Square Park",
  "The High Line",
  "Rockefeller Center",
  "Tribeca Grill",
  "East Village",
  "Hudson Yards",
  "Flatiron District",
  "Chinatown",
  "Little Italy",
  "Financial District",
  "Battery Park",
  "Midtown Office",
  "Upper East Side",
  "Upper West Side",
  "Harlem",
  "Lower East Side",
]

const SUGGESTED_TAGS = ["work", "personal", "health", "social", "important", "recurring"]

const TODO_CATEGORIES = [
  { id: "work", title: "Work & Career", icon: Briefcase, color: "bg-blue-100", iconColor: "text-blue-600" },
  { id: "personal", title: "Personal", icon: Star, color: "bg-purple-100", iconColor: "text-purple-600" },
  { id: "health", title: "Health & Fitness", icon: Heart, color: "bg-rose-100", iconColor: "text-rose-600" },
  {
    id: "shopping",
    title: "Shopping & Errands",
    icon: ShoppingCart,
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  { id: "home", title: "Home & Family", icon: Home, color: "bg-amber-100", iconColor: "text-amber-600" },
  { id: "goals", title: "Goals & Learning", icon: Target, color: "bg-indigo-100", iconColor: "text-indigo-600" },
]

const TODOS_DATA = [
  // Work & Career
  {
    id: 1,
    title: "Project Presentation Prep",
    description: "Prepare slides and materials for the quarterly project review meeting",
    category: "work",
    priority: "high",
    completed: false,
    color: "bg-blue-300",
    dueDate: "2024-05-18",
    hasSubItems: true,
    subItems: [
      {
        id: 101,
        title: "Create slide deck outline",
        completed: true,
        category: "planning",
        notes: "Focus on Q1 achievements and Q2 goals",
      },
      {
        id: 102,
        title: "Gather Q1 performance data",
        completed: true,
        category: "research",
        notes: "Include metrics from analytics dashboard",
      },
      {
        id: 103,
        title: "Design visual charts and graphs",
        completed: false,
        category: "design",
        notes: "Use company brand colors",
      },
      {
        id: 104,
        title: "Write detailed speaker notes",
        completed: false,
        category: "content",
        notes: "Practice timing for each slide",
      },
      {
        id: 105,
        title: "Practice presentation delivery",
        completed: false,
        category: "preparation",
        notes: "Record practice session for review",
      },
      {
        id: 106,
        title: "Prepare backup slides for Q&A",
        completed: false,
        category: "contingency",
        notes: "Anticipate potential questions",
      },
    ],
  },
  {
    id: 2,
    title: "Team Meeting Follow-ups",
    description: "Complete action items from this week's team meeting",
    category: "work",
    priority: "medium",
    completed: false,
    color: "bg-blue-300",
    dueDate: "2024-05-17",
    hasSubItems: true,
    subItems: [
      {
        id: 201,
        title: "Send meeting notes to team",
        completed: true,
        category: "communication",
        notes: "Include action items and deadlines",
      },
      {
        id: 202,
        title: "Update project timeline",
        completed: false,
        category: "planning",
        notes: "Adjust for new requirements",
      },
      {
        id: 203,
        title: "Schedule one-on-ones with team members",
        completed: false,
        category: "management",
        notes: "Focus on career development",
      },
    ],
  },

  // Personal
  {
    id: 3,
    title: "Weekend Trip Planning",
    description: "Plan and organize weekend getaway to the mountains",
    category: "personal",
    priority: "medium",
    completed: true,
    color: "bg-purple-300",
    dueDate: "2024-05-14",
    hasSubItems: true,
    subItems: [
      {
        id: 301,
        title: "Research mountain destinations",
        completed: true,
        category: "research",
        notes: "Found great cabin rental in Blue Ridge",
      },
      {
        id: 302,
        title: "Book accommodation",
        completed: true,
        category: "booking",
        notes: "Confirmed reservation for 2 nights",
      },
      {
        id: 303,
        title: "Plan hiking routes",
        completed: true,
        category: "activities",
        notes: "Downloaded trail maps and GPS coordinates",
      },
      {
        id: 304,
        title: "Pack hiking gear and clothes",
        completed: true,
        category: "preparation",
        notes: "Don't forget camera and first aid kit",
      },
      {
        id: 305,
        title: "Check weather forecast",
        completed: true,
        category: "planning",
        notes: "Sunny with mild temperatures expected",
      },
    ],
  },
  {
    id: 4,
    title: "Home Organization Project",
    description: "Declutter and organize living spaces for better productivity",
    category: "personal",
    priority: "low",
    completed: false,
    color: "bg-purple-300",
    dueDate: "2024-05-25",
    hasSubItems: true,
    subItems: [
      {
        id: 401,
        title: "Sort through bedroom closet",
        completed: false,
        category: "bedroom",
        notes: "Donate clothes not worn in past year",
      },
      {
        id: 402,
        title: "Organize kitchen cabinets",
        completed: false,
        category: "kitchen",
        notes: "Group similar items together",
      },
      {
        id: 403,
        title: "Clean out garage storage",
        completed: false,
        category: "garage",
        notes: "Create designated zones for tools, sports equipment",
      },
      {
        id: 404,
        title: "Donate unused items to charity",
        completed: false,
        category: "general",
        notes: "Schedule pickup with local donation center",
      },
    ],
  },

  // Health & Fitness
  {
    id: 5,
    title: "Weekly Fitness Goals",
    description: "Maintain healthy lifestyle with regular exercise and proper nutrition",
    category: "health",
    priority: "high",
    completed: false,
    color: "bg-rose-300",
    dueDate: "2024-05-20",
    hasSubItems: true,
    subItems: [
      {
        id: 501,
        title: "Morning jog (30 minutes)",
        completed: true,
        category: "cardio",
        notes: "Completed 3 miles in Central Park",
      },
      {
        id: 502,
        title: "Drink 8 glasses of water daily",
        completed: false,
        category: "nutrition",
        notes: "Use water tracking app",
      },
      {
        id: 503,
        title: "Meal prep for 3 days",
        completed: false,
        category: "nutrition",
        notes: "Focus on lean proteins and vegetables",
      },
      {
        id: 504,
        title: "Evening yoga session",
        completed: false,
        category: "flexibility",
        notes: "Try new 20-minute routine",
      },
      {
        id: 505,
        title: "Take daily vitamins",
        completed: true,
        category: "supplements",
        notes: "Vitamin D and multivitamin",
      },
    ],
  },
  {
    id: 6,
    title: "Annual Health Checkup",
    description: "Schedule and complete routine medical appointments",
    category: "health",
    priority: "medium",
    completed: false,
    color: "bg-rose-300",
    dueDate: "2024-05-30",
    hasSubItems: true,
    subItems: [
      {
        id: 601,
        title: "Schedule doctor appointment",
        completed: true,
        category: "medical",
        notes: "Appointment set for May 28th",
      },
      {
        id: 602,
        title: "Schedule dental cleaning",
        completed: false,
        category: "dental",
        notes: "Call Dr. Smith's office",
      },
      {
        id: 603,
        title: "Update insurance information",
        completed: false,
        category: "administrative",
        notes: "Bring new insurance card",
      },
      {
        id: 604,
        title: "Prepare list of current medications",
        completed: false,
        category: "preparation",
        notes: "Include vitamins and supplements",
      },
    ],
  },

  // Shopping & Errands
  {
    id: 7,
    title: "Weekly Grocery Shopping",
    description: "Buy groceries and household essentials for the week",
    category: "shopping",
    priority: "medium",
    completed: false,
    color: "bg-emerald-300",
    dueDate: "2024-05-16",
    hasSubItems: true,
    subItems: [
      {
        id: 701,
        title: "Organic bananas (6)",
        completed: false,
        category: "produce",
        notes: "Look for ripe but not overripe",
      },
      { id: 702, title: "Whole grain bread", completed: false, category: "bakery", notes: "Check expiration date" },
      {
        id: 703,
        title: "Greek yogurt (2 containers)",
        completed: true,
        category: "dairy",
        notes: "Got the vanilla flavor",
      },
      {
        id: 704,
        title: "Chicken breast (2 lbs)",
        completed: false,
        category: "meat",
        notes: "Ask butcher for lean cuts",
      },
      {
        id: 705,
        title: "Fresh spinach leaves",
        completed: false,
        category: "produce",
        notes: "For salads and smoothies",
      },
      {
        id: 706,
        title: "Extra virgin olive oil",
        completed: false,
        category: "pantry",
        notes: "Check if current bottle is running low",
      },
      { id: 707, title: "Roma tomatoes (4)", completed: false, category: "produce", notes: "For pasta sauce recipe" },
      {
        id: 708,
        title: "Whole wheat pasta (2 boxes)",
        completed: true,
        category: "pantry",
        notes: "Got penne and spaghetti",
      },
    ],
  },
  {
    id: 8,
    title: "Household Supplies",
    description: "Restock essential household and cleaning supplies",
    category: "shopping",
    priority: "low",
    completed: false,
    color: "bg-emerald-300",
    dueDate: "2024-05-19",
    hasSubItems: true,
    subItems: [
      {
        id: 801,
        title: "Laundry detergent",
        completed: false,
        category: "cleaning",
        notes: "Eco-friendly brand preferred",
      },
      {
        id: 802,
        title: "Paper towels (2 rolls)",
        completed: false,
        category: "paper goods",
        notes: "Check for bulk discounts",
      },
      { id: 803, title: "Dish soap", completed: false, category: "cleaning", notes: "Dawn or similar brand" },
      {
        id: 804,
        title: "Toilet paper (12 pack)",
        completed: false,
        category: "paper goods",
        notes: "Stock up while on sale",
      },
    ],
  },

  // Home & Family
  {
    id: 9,
    title: "Family Dinner Planning",
    description: "Plan and prepare special family dinner for Sunday",
    category: "home",
    priority: "medium",
    completed: false,
    color: "bg-amber-300",
    dueDate: "2024-05-19",
    hasSubItems: true,
    subItems: [
      {
        id: 901,
        title: "Choose menu and recipes",
        completed: false,
        category: "planning",
        notes: "Consider dietary restrictions",
      },
      {
        id: 902,
        title: "Create shopping list",
        completed: false,
        category: "preparation",
        notes: "Check what's already in pantry",
      },
      {
        id: 903,
        title: "Set table with good china",
        completed: false,
        category: "setup",
        notes: "Use the wedding china set",
      },
      {
        id: 904,
        title: "Prepare appetizers",
        completed: false,
        category: "cooking",
        notes: "Make bruschetta and cheese board",
      },
    ],
  },

  // Goals & Learning
  {
    id: 10,
    title: "Learn New Cooking Skills",
    description: "Master cooking authentic international cuisine",
    category: "goals",
    priority: "low",
    completed: false,
    color: "bg-indigo-300",
    dueDate: "2024-05-25",
    hasSubItems: true,
    subItems: [
      {
        id: 1001,
        title: "Research authentic Thai curry recipes",
        completed: false,
        category: "research",
        notes: "Focus on green and red curry techniques",
      },
      {
        id: 1002,
        title: "Buy specialty ingredients",
        completed: false,
        category: "shopping",
        notes: "Visit Asian grocery store for authentic spices",
      },
      {
        id: 1003,
        title: "Watch cooking tutorial videos",
        completed: false,
        category: "learning",
        notes: "YouTube channels by Thai chefs",
      },
      {
        id: 1004,
        title: "Practice cooking technique",
        completed: false,
        category: "practice",
        notes: "Start with simple green curry",
      },
      {
        id: 1005,
        title: "Invite friends for taste test",
        completed: false,
        category: "social",
        notes: "Get feedback and suggestions",
      },
    ],
  },
]

const EVENTS_DATA = [
  {
    id: 1,
    title: "Morning Jog",
    time: "7:00 AM-8:00 AM",
    color: "bg-emerald-300",
    date: 2,
    location: "Central Park",
    description: "Daily morning exercise routine to stay healthy and energized for the day ahead.",
    attendees: ["Just me"],
    alert: "15 minutes before",
    repeat: "Daily",
    notes: "Bring water bottle and headphones",
    url: "",
  },
  {
    id: 2,
    title: "Team Meeting",
    time: "10:00 AM-11:00 AM",
    color: "bg-blue-300",
    date: 5,
    location: "Midtown Office",
    description: "Weekly team sync to discuss project progress and upcoming deadlines.",
    attendees: ["Sarah Johnson", "Mike Chen", "Lisa Rodriguez", "David Kim"],
    alert: "10 minutes before",
    repeat: "Weekly",
    notes: "Prepare quarterly report summary",
    url: "https://zoom.us/j/123456789",
  },
  {
    id: 3,
    title: "Lunch Date",
    time: "12:30 PM-1:30 PM",
    color: "bg-rose-300",
    date: 5,
    location: "SoHo Cafe",
    description: "Catching up with an old friend over lunch at our favorite spot.",
    attendees: ["Emma Wilson"],
    alert: "30 minutes before",
    repeat: "None",
    notes: "Try their new seasonal menu",
    url: "",
  },
  {
    id: 4,
    title: "Gym Session",
    time: "6:00 PM-7:00 PM",
    color: "bg-orange-300",
    date: 8,
    location: "Chelsea Market",
    description: "Strength training session focusing on upper body exercises.",
    attendees: ["Personal Trainer - Alex"],
    alert: "20 minutes before",
    repeat: "Twice a week",
    notes: "Focus on bench press and pull-ups",
    url: "",
  },
  {
    id: 5,
    title: "Client Call",
    time: "9:00 AM-10:00 AM",
    color: "bg-purple-300",
    date: 11,
    location: "Financial District",
    description: "Important client presentation for the new marketing campaign proposal.",
    attendees: ["Client Team", "Marketing Director"],
    alert: "1 hour before",
    repeat: "None",
    notes: "Bring printed proposals and portfolio samples",
    url: "https://teams.microsoft.com/l/meetup-join/...",
  },
  {
    id: 6,
    title: "Project Review",
    time: "2:00 PM-3:00 PM",
    color: "bg-amber-300",
    date: 11,
    location: "Flatiron District",
    description: "Monthly project review with stakeholders to assess progress and next steps.",
    attendees: ["Project Manager", "Lead Developer", "UX Designer"],
    alert: "15 minutes before",
    repeat: "Monthly",
    notes: "Review milestone deliverables",
    url: "",
  },
  {
    id: 7,
    title: "Dinner Plans",
    time: "7:00 PM-8:30 PM",
    color: "bg-indigo-300",
    date: 11,
    location: "Tribeca Grill",
    description: "Celebrating anniversary dinner at a special restaurant.",
    attendees: ["Partner"],
    alert: "1 hour before",
    repeat: "Yearly",
    notes: "Make sure to dress nicely, reservation confirmed",
    url: "",
  },
  {
    id: 8,
    title: "Birthday Reminder",
    time: "9:00 AM-9:30 AM",
    color: "bg-pink-300",
    date: 14,
    location: "Upper East Side",
    description: "Mom's birthday - don't forget to call and send flowers!",
    attendees: ["Mom"],
    alert: "1 day before",
    repeat: "Yearly",
    notes: "Order flowers from her favorite florist",
    url: "",
  },
  {
    id: 9,
    title: "Birthday Reminder",
    time: "9:00 AM-9:30 AM",
    color: "bg-pink-300",
    date: 15,
    location: "Washington Square Park",
    description: "Friend's birthday celebration in the park with a small gathering.",
    attendees: ["Birthday Friend", "Mutual Friends"],
    alert: "2 hours before",
    repeat: "Yearly",
    notes: "Bring the gift and cake",
    url: "",
  },
  {
    id: 10,
    title: "Social Event",
    time: "12:00 PM-1:00 PM",
    color: "bg-emerald-300",
    date: 15,
    location: "The High Line",
    description: "Networking event for local entrepreneurs and startup founders.",
    attendees: ["Various entrepreneurs"],
    alert: "30 minutes before",
    repeat: "None",
    notes: "Bring business cards",
    url: "",
  },
  {
    id: 11,
    title: "Work Event",
    time: "3:00 PM-4:00 PM",
    color: "bg-blue-300",
    date: 15,
    location: "Grand Central Terminal",
    description: "Company all-hands meeting to discuss quarterly results.",
    attendees: ["All Company Staff"],
    alert: "15 minutes before",
    repeat: "Quarterly",
    notes: "Mandatory attendance",
    url: "",
  },
  {
    id: 12,
    title: "Doctor Appointment",
    time: "10:00 AM-11:00 AM",
    color: "bg-teal-300",
    date: 18,
    location: "Upper West Side",
    description: "Annual health checkup with primary care physician.",
    attendees: ["Dr. Smith"],
    alert: "1 hour before",
    repeat: "Yearly",
    notes: "Bring insurance card and list of current medications",
    url: "",
  },
]

// Utility functions
const generateCalendarDays = () => {
  const days = []
  const firstDay = new Date(2024, 4, 1).getDay()
  const daysInMonth = new Date(2024, 4 + 1, 0).getDate()

  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let day = 1; day <= daysInMonth; day++) days.push(day)

  return days
}

const getDayName = (day) => {
  return new Date(2024, 4, day).toLocaleDateString("en-US", { weekday: "long" })
}

// Memoized components
const StatusBar = () => (
  <div className="flex justify-between items-center px-6 py-3 text-stone-700 font-medium">
    <span>9:41</span>
    <div className="flex items-center gap-1">
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-1 h-3 bg-stone-600 rounded-full" />
        ))}
      </div>
      <div className="w-4 h-3 border border-stone-600 rounded-sm">
        <div className="w-2 h-1 bg-stone-600 rounded-full mt-1 ml-1" />
      </div>
      <div className="w-6 h-3 bg-stone-600 rounded-sm" />
    </div>
  </div>
)

const Header = ({ onBack, showBack = false, title = "" }) => (
  <div className="flex items-center justify-between px-6 py-6">
    {showBack ? (
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="flex items-center gap-2 text-stone-600 hover:text-stone-800"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Button>
    ) : (
      <div className="flex items-center gap-4">
        <Camera className="w-6 h-6 text-stone-600" />
        <Upload className="w-6 h-6 text-stone-600" />
      </div>
    )}

    <div className="flex items-center gap-2">
      {title ? <h1 className="text-lg font-bold text-stone-800">{title}</h1> : <SkegLogo />}
    </div>

    <div className="flex items-center gap-2">
      {showBack ? (
        <>
          <Button variant="ghost" size="sm" className="text-stone-600">
            <Edit3 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-stone-600">
            <Share className="w-5 h-5" />
          </Button>
        </>
      ) : (
        <>
          <Plus className="w-6 h-6 text-stone-600" />
          <Bell className="w-6 h-6 text-stone-600" />
        </>
      )}
    </div>
  </div>
)

const CalendarGrid = ({ calendarDays, selectedDate, onDateSelect, eventsMap }) => (
  <div className="grid grid-cols-7 gap-0 border border-stone-200 rounded-2xl overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm">
    {calendarDays.map((day, index) => (
      <div key={index} className="relative">
        {day && (
          <Button
            variant="ghost"
            className={`w-full h-14 p-0 text-lg font-semibold relative border-r border-b border-stone-200/50 rounded-none transition-all duration-200 ${
              day === selectedDate
                ? "bg-gradient-to-br from-stone-300 to-neutral-300 text-stone-800 hover:from-stone-400 hover:to-neutral-400 shadow-md"
                : "hover:bg-gradient-to-br hover:from-stone-100 hover:to-neutral-100 text-stone-700"
            }`}
            onClick={() => onDateSelect(day)}
          >
            {day}
            {eventsMap[day] && (
              <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 flex gap-1">
                {eventsMap[day].slice(0, 3).map((event, eventIndex) => (
                  <div key={eventIndex} className={`w-2 h-2 rounded-full ${event.color} shadow-sm`} />
                ))}
              </div>
            )}
          </Button>
        )}
      </div>
    ))}
  </div>
)

const EventCard = ({ event, onClick }) => (
  <button
    onClick={() => onClick(event)}
    className="w-full p-3 bg-white/70 rounded-xl border border-stone-200/30 shadow-sm hover:bg-white/90 hover:shadow-md transition-all duration-200 text-left"
  >
    <div className="flex items-center gap-2 mb-2">
      <div className={`w-4 h-4 rounded-full ${event.color} shadow-sm`} />
      <span className="text-base font-semibold text-stone-800">{event.title}</span>
    </div>
    <div className="pl-6 space-y-1.5">
      <div className="text-xs text-stone-600">{event.time}</div>
      <div className="flex items-center gap-1 text-stone-500">
        <MapPin className="w-3 h-3" />
        <span className="text-xs">{event.location}</span>
      </div>
    </div>
  </button>
)

const TodoItem = ({ todo, onClick }) => {
  const completedSubItems = todo.subItems?.filter((item) => item.completed).length || 0
  const totalSubItems = todo.subItems?.length || 0

  return (
    <button
      onClick={() => onClick(todo)}
      className="w-full p-4 bg-white/70 rounded-xl border border-stone-200/30 shadow-sm hover:bg-white/90 hover:shadow-md transition-all duration-200 text-left group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-shrink-0">
            {todo.completed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <Circle className="w-5 h-5 text-stone-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`text-sm font-semibold mb-1 ${todo.completed ? "text-stone-500 line-through" : "text-stone-800"}`}
            >
              {todo.title}
            </h3>
            <p className="text-xs text-stone-600 line-clamp-1">{todo.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  todo.priority === "high"
                    ? "bg-red-100 text-red-700"
                    : todo.priority === "medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-stone-100 text-stone-600"
                }`}
              >
                {todo.priority}
              </span>
              {todo.hasSubItems && (
                <span className="text-xs text-stone-500">
                  {completedSubItems}/{totalSubItems} items
                </span>
              )}
              <span className="text-xs text-stone-500 ml-auto">{todo.dueDate}</span>
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-600 flex-shrink-0 ml-2" />
      </div>
    </button>
  )
}

const TodoSection = ({ category, todos, onTodoClick }) => {
  const Icon = category.icon
  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  return (
    <div className="mb-6">
      <div className={`${category.color} rounded-xl p-4 mb-4`}>
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${category.iconColor}`} />
          <div>
            <h2 className="text-lg font-bold text-stone-800">{category.title}</h2>
            <span className="text-sm text-stone-600">
              {activeTodos.length} active, {completedTodos.length} completed
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Active todos first */}
        {activeTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onClick={onTodoClick} />
        ))}

        {/* Completed todos */}
        {completedTodos.length > 0 && (
          <>
            {activeTodos.length > 0 && <div className="border-t border-stone-200 my-4" />}
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onClick={onTodoClick} />
            ))}
          </>
        )}

        {todos.length === 0 && (
          <div className="text-center py-8 text-stone-500 italic">No tasks in this category yet</div>
        )}
      </div>
    </div>
  )
}

const TodoDetailView = ({ todo, onBack, onToggleSubItem }) => {
  const completedSubItems = todo.subItems?.filter((item) => item.completed).length || 0
  const totalSubItems = todo.subItems?.length || 0
  const progressPercentage = totalSubItems > 0 ? (completedSubItems / totalSubItems) * 100 : 0

  // Group sub-items by category
  const groupedSubItems = useMemo(() => {
    if (!todo.subItems) return {}
    return todo.subItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    }, {})
  }, [todo.subItems])

  return (
    <>
      <StatusBar />
      <Header onBack={onBack} showBack title="Task Details" />

      <div className="px-6 pb-32 space-y-6">
        {/* Todo Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 mt-1">
              {todo.completed ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              ) : (
                <Circle className="w-8 h-8 text-stone-400" />
              )}
            </div>
            <div className="flex-1">
              <h2
                className={`text-xl font-bold mb-2 ${todo.completed ? "text-stone-500 line-through" : "text-stone-800"}`}
              >
                {todo.title}
              </h2>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    todo.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : todo.priority === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {todo.priority} priority
                </span>
                <span className="text-xs text-stone-500">Due: {todo.dueDate}</span>
              </div>
            </div>
          </div>
          <p className="text-stone-600 leading-relaxed mb-4">{todo.description}</p>

          {/* Progress Bar */}
          {todo.hasSubItems && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Progress</span>
                <span className="text-stone-600">
                  {completedSubItems}/{totalSubItems} completed ({Math.round(progressPercentage)}%)
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Sub-items */}
        {todo.hasSubItems && (
          <div className="space-y-4">
            {Object.entries(groupedSubItems).map(([category, items]) => (
              <div
                key={category}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50"
              >
                <h3 className="text-lg font-semibold text-stone-800 mb-4 capitalize">{category}</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg hover:bg-stone-50 transition-colors border border-stone-100"
                    >
                      <div className="flex items-start gap-3">
                        <button onClick={() => onToggleSubItem(todo.id, item.id)} className="flex-shrink-0 mt-0.5">
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-stone-400 hover:text-stone-600" />
                          )}
                        </button>
                        <div className="flex-1">
                          <span
                            className={`block text-sm font-medium mb-1 ${
                              item.completed ? "text-stone-500 line-through" : "text-stone-700"
                            }`}
                          >
                            {item.title}
                          </span>
                          {item.notes && <p className="text-xs text-stone-500 leading-relaxed">{item.notes}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Task
          </Button>
          <Button className="flex-1 bg-stone-600 hover:bg-stone-700 text-white">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Task
          </Button>
        </div>
      </div>
    </>
  )
}

const TagSection = ({ eventId, eventTags, onAddTag, onRemoveTag, newTag, setNewTag }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
    <h3 className="text-lg font-semibold text-stone-800 mb-4">Tags</h3>

    <div className="flex flex-wrap gap-2 mb-4">
      {(eventTags[eventId] || []).map((tag, index) => (
        <div key={index} className="flex items-center gap-1 bg-stone-200 rounded-full px-3 py-1">
          <span className="text-xs text-stone-700">{tag}</span>
          <button onClick={() => onRemoveTag(eventId, index)} className="text-stone-500 hover:text-stone-700">
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>

    <div className="flex gap-2">
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        placeholder="Add a tag..."
        className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
        onKeyPress={(e) => e.key === "Enter" && onAddTag(eventId)}
      />
      <Button onClick={() => onAddTag(eventId)} size="sm" className="bg-stone-600 hover:bg-stone-700 text-white">
        Add
      </Button>
    </div>

    <div className="mt-4">
      <p className="text-xs text-stone-500 mb-2">Suggested tags:</p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_TAGS.map((suggestedTag) => (
          <button
            key={suggestedTag}
            onClick={() => {
              setNewTag(suggestedTag)
              onAddTag(eventId)
            }}
            className="px-2 py-1 text-xs bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors"
          >
            {suggestedTag}
          </button>
        ))}
      </div>
    </div>
  </div>
)

const BottomNavigation = ({ activeTab, setActiveTab }) => (
  <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-gradient-to-t from-stone-100 to-neutral-100 border-t border-stone-200 backdrop-blur-sm">
    <div className="flex justify-around py-3">
      {[
        { id: "calendar", icon: Calendar, label: "Calendar" },
        { id: "todo", icon: Menu, label: "To Do" },
        { id: "attachments", icon: Folder, label: "Attachments" },
      ].map(({ id, icon: Icon, label }) => (
        <Button
          key={id}
          variant="ghost"
          className={`flex flex-col items-center gap-1 p-4 rounded-xl transition-all duration-200 ${
            activeTab === id ? "text-stone-700 bg-white/60" : "text-stone-600 hover:bg-white/40"
          }`}
          onClick={() => setActiveTab(id)}
        >
          <Icon className="w-6 h-6" />
          <span className="text-xs font-medium">{label}</span>
        </Button>
      ))}
    </div>
    <div className="w-32 h-1 bg-stone-700 rounded-full mx-auto mb-3" />
  </div>
)

export default function Component() {
  const [selectedDate, setSelectedDate] = useState(15)
  const [activeTab, setActiveTab] = useState("calendar")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showEventDetail, setShowEventDetail] = useState(false)
  const [eventTags, setEventTags] = useState({})
  const [newTag, setNewTag] = useState("")

  // Todo states
  const [todos, setTodos] = useState(TODOS_DATA)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [showTodoDetail, setShowTodoDetail] = useState(false)

  // Memoized calculations
  const calendarDays = useMemo(() => generateCalendarDays(), [])

  const eventsMap = useMemo(() => {
    return EVENTS_DATA.reduce((acc, event) => {
      if (!acc[event.date]) acc[event.date] = []
      acc[event.date].push(event)
      return acc
    }, {})
  }, [])

  const selectedDateEvents = useMemo(() => eventsMap[selectedDate] || [], [eventsMap, selectedDate])
  const selectedDayName = useMemo(() => getDayName(selectedDate), [selectedDate])

  const todosByCategory = useMemo(() => {
    return TODO_CATEGORIES.reduce((acc, category) => {
      acc[category.id] = todos.filter((todo) => todo.category === category.id)
      return acc
    }, {})
  }, [todos])

  // Memoized handlers
  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event)
    setShowEventDetail(true)
  }, [])

  const handleBackToCalendar = useCallback(() => {
    setShowEventDetail(false)
    setSelectedEvent(null)
  }, [])

  const handleTodoClick = useCallback((todo) => {
    setSelectedTodo(todo)
    setShowTodoDetail(true)
  }, [])

  const handleBackToTodos = useCallback(() => {
    setShowTodoDetail(false)
    setSelectedTodo(null)
  }, [])

  const handleToggleSubItem = useCallback((todoId, subItemId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subItems: todo.subItems.map((item) =>
                item.id === subItemId ? { ...item, completed: !item.completed } : item,
              ),
            }
          : todo,
      ),
    )
  }, [])

  const addTag = useCallback(
    (eventId) => {
      if (newTag.trim()) {
        setEventTags((prev) => ({
          ...prev,
          [eventId]: [...(prev[eventId] || []), newTag.trim()],
        }))
        setNewTag("")
      }
    },
    [newTag],
  )

  const removeTag = useCallback((eventId, tagIndex) => {
    setEventTags((prev) => ({
      ...prev,
      [eventId]: prev[eventId].filter((_, index) => index !== tagIndex),
    }))
  }, [])

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-br from-stone-50 via-neutral-50 to-stone-100 min-h-screen overflow-hidden relative">
      {/* Main Views Container */}
      <div
        className={`transition-transform duration-300 ease-in-out ${
          showEventDetail || showTodoDetail ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Calendar View */}
        {activeTab === "calendar" && (
          <>
            <StatusBar />
            <Header />

            <div className="px-6 mb-3">
              <h1 className="text-lg font-bold text-stone-800 tracking-wide">May 2024</h1>
            </div>

            <div className="px-6 mb-8">
              <div className="grid grid-cols-7 gap-0 mb-0">
                {DAY_NAMES.map((day, index) => (
                  <div
                    key={index}
                    className="text-center text-stone-500 font-medium text-sm py-2 border-r border-b border-stone-200 bg-gradient-to-b from-stone-100 to-neutral-100 last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <CalendarGrid
                calendarDays={calendarDays}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                eventsMap={eventsMap}
              />
            </div>

            <div className="px-6 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
                <div className="flex items-center mb-4">
                  <h2 className="text-base font-semibold text-stone-800">{selectedDayName}</h2>
                  <span className="mx-2 text-stone-400">|</span>
                  <p className="text-base text-stone-600 font-medium">{selectedDate} May</p>
                </div>

                <div className="space-y-3">
                  {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map((event) => (
                      <EventCard key={event.id} event={event} onClick={handleEventClick} />
                    ))
                  ) : (
                    <p className="text-stone-500 italic text-center py-4">No events scheduled</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Todo View */}
        {activeTab === "todo" && (
          <>
            <StatusBar />
            <Header />

            <div className="px-6 mb-3">
              <h1 className="text-lg font-bold text-stone-800 tracking-wide">Tasks & Projects</h1>
            </div>

            <div className="px-6 pb-32">
              {TODO_CATEGORIES.map((category) => (
                <TodoSection
                  key={category.id}
                  category={category}
                  todos={todosByCategory[category.id]}
                  onTodoClick={handleTodoClick}
                />
              ))}
            </div>
          </>
        )}

        {/* Attachments View */}
        {activeTab === "attachments" && (
          <>
            <StatusBar />
            <Header />

            <div className="px-6 mb-3">
              <h1 className="text-lg font-bold text-stone-800 tracking-wide">Attachments</h1>
            </div>

            <div className="px-6 pb-32">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
                <p className="text-stone-500 italic text-center py-8">No attachments yet</p>
              </div>
            </div>
          </>
        )}

        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Event Detail View */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-stone-50 via-neutral-50 to-stone-100 transition-transform duration-300 ease-in-out ${showEventDetail ? "translate-x-0" : "translate-x-full"}`}
      >
        {selectedEvent && (
          <>
            <StatusBar />
            <Header onBack={handleBackToCalendar} showBack title="Event Details" />

            <div className="px-6 pb-32 space-y-6">
              {/* Event Title & Color */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-6 h-6 rounded-full ${selectedEvent.color} shadow-sm`} />
                  <h2 className="text-xl font-bold text-stone-800">{selectedEvent.title}</h2>
                </div>
                <p className="text-stone-600 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Time & Date */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-stone-600" />
                  <h3 className="text-lg font-semibold text-stone-800">Time & Date</h3>
                </div>
                <div className="space-y-2 text-stone-600">
                  <p>
                    <span className="font-medium">Date:</span> {selectedEvent.date} May 2024
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {selectedEvent.time}
                  </p>
                  <p>
                    <span className="font-medium">Repeat:</span> {selectedEvent.repeat}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-stone-600" />
                  <h3 className="text-lg font-semibold text-stone-800">Location</h3>
                </div>
                <p className="text-stone-600">{selectedEvent.location}</p>
                <Button variant="outline" size="sm" className="mt-3 text-xs">
                  Open in Maps
                </Button>
              </div>

              {/* Attendees */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-stone-600" />
                  <h3 className="text-lg font-semibold text-stone-800">Attendees</h3>
                </div>
                <div className="space-y-2">
                  {selectedEvent.attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-stone-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-stone-700">
                          {attendee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-stone-600">{attendee}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts & Notifications */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-stone-600" />
                  <h3 className="text-lg font-semibold text-stone-800">Alerts</h3>
                </div>
                <p className="text-stone-600">{selectedEvent.alert}</p>
              </div>

              {/* Notes */}
              {selectedEvent.notes && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">Notes</h3>
                  <p className="text-stone-600">{selectedEvent.notes}</p>
                </div>
              )}

              {/* URL */}
              {selectedEvent.url && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50">
                  <h3 className="text-lg font-semibold text-stone-800 mb-3">Meeting Link</h3>
                  <Button variant="outline" size="sm" className="text-xs">
                    Join Meeting
                  </Button>
                </div>
              )}

              <TagSection
                eventId={selectedEvent.id}
                eventTags={eventTags}
                onAddTag={addTag}
                onRemoveTag={removeTag}
                newTag={newTag}
                setNewTag={setNewTag}
              />

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Event
                </Button>
                <Button className="flex-1 bg-stone-600 hover:bg-stone-700 text-white">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Event
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Todo Detail View */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-stone-50 via-neutral-50 to-stone-100 transition-transform duration-300 ease-in-out ${showTodoDetail ? "translate-x-0" : "translate-x-full"}`}
      >
        {selectedTodo && (
          <TodoDetailView todo={selectedTodo} onBack={handleBackToTodos} onToggleSubItem={handleToggleSubItem} />
        )}
      </div>
    </div>
  )
}
