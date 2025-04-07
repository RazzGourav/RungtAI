// Campus data types and structures
export type Building = {
  id: string
  name: string
  description: string
  location: string
  facilities: string[]
  history: string
  image: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export type BuildingCategory = {
  id: string
  name: string
  buildings: Building[]
}

// Campus events data type
export type CampusEvent = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
}

// Academic information data type
export type AcademicInfo = {
  id: string
  title: string
  description: string
  deadline?: string
  category: string
}

// Campus services data type
export type CampusService = {
  id: string
  name: string
  description: string
  location: string
  hours: string
  contactInfo: string
  category: string
}

// Campus buildings data
export const campusBuildings: BuildingCategory[] = [
  {
    id: "academic",
    name: "Academic Buildings",
    buildings: [
      {
        id: "library",
        name: "Central Library",
        description: "The central library houses over 1 million books and provides quiet study spaces for students.",
        location: "Rungta R1 Campus",
        facilities: ["Study rooms", "Computer lab", "Special collections"],
        history:
          " the library was renovated in 2018 to include modern technology and collaborative spaces.",
        image: "/l1.jpg?height=300&width=500",
        coordinates: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
      {
        id: "science",
        name: "Science block",
        description: "Home to the departments of Biology, Chemistry, and Physics with state-of-the-art laboratories.",
        location: "R1 Campus",
        facilities: ["Research labs", "Lecture halls", "Observatory", "Computer labs"],
        history: "Completed in 2008, the Science Center is one of the newest buildings on campus.",
        image: "/GD.jpg?height=300&width=500",
        coordinates: {
          lat: 40.714,
          lng: -74.009,
        },
      },
      {
        id: "humanities",
        name: "Pharmacy Block",
        description: "Houses the departments of Pharmaceuticals.",
        location: "R1 Campus",
        facilities: ["Classrooms", "Faculty offices", "Student lounge", "Bio lab"],
        history: "Originally built in 2009, the Humanities Building is one of the oldest structures on campus.",
        image: "/ph.jpg?height=300&width=500",
        coordinates: {
          lat: 40.711,
          lng: -74.012,
        },
      },
      {
        id: "business",
        name: "Engineering Block",
        description: "A modern facility dedicated to Engineering Students with high tech labs.",
        location: "R1 Campus",
        facilities: ["study rooms", "Labs", "Conference hall", "Career services TNP"],
        history: "The Engineering Block was established in 2009 and moved to its current building in 2010.",
        image: "/cc.jpg?height=300&width=500",
        coordinates: {
          lat: 40.715,
          lng: -74.003,
        },
      },
    ],
  },
  {
    id: "residential",
    name: "Residential Halls",
    buildings: [
      {
        id: "freshman",
        name: "Boys Hostel",
        description: "Housing complex dedicated to  students with community-style living arrangements.",
        location: "R1 Campus",
        facilities: ["Double rooms", "Community bathrooms", "Study lounges", "Laundry facilities"],
        history: "Built in 2015 to create a dedicated space for  students to build community.",
        image: "/placeholder.svg?height=300&width=500",
        coordinates: {
          lat: 40.71,
          lng: -74.007,
        },
      },
      {
        id: "upperclass",
        name: "Girls Hostel",
        description: "Apartment-style living for Girls with private kitchens and bathrooms.",
        location: "Main Campus",
        facilities: ["Full kitchens", "Private bathrooms", "Living rooms", "In-unit laundry"],
        history: "Constructed in 2015 to provide independent living options for Girls.",
        image: "/placeholder.svg?height=300&width=500",
        coordinates: {
          lat: 40.716,
          lng: -74.005,
        },
      },
      {
        id: "graduate",
        name: "faculty Housing",
        description:
          "Dedicated housing for faculties with quiet  environments and private accommodations.",
        location: "R1 Campus",
        facilities: ["Studio apartments", "One-bedroom apartments", "Communal kitchen", "Quiet  areas"],
        history: "Opened in 2015 to address the growing need for faculty housing on campus.",
        image: "/placeholder.svg?height=300&width=500",
        coordinates: {
          lat: 40.7145,
          lng: -74.008,
        },
      },
    ],
  },
  {
    id: "facilities",
    name: "Campus Facilities",
    buildings: [
      {
        id: "student-center",
        name: "Student Center",
        description: "The hub of student life featuring dining options, meeting spaces, and recreational activities.",
        location: "R1 Campus",
        facilities: ["Food court", "Bookstore", "Game room", "Meeting rooms", "Auditorium"],
        history: "Renovated in 2019 to expand dining options and create more student gathering spaces.",
        image: "/placeholder.svg?height=300&width=500",
        coordinates: {
          lat: 40.713,
          lng: -74.0065,
        },
      },
      {
        id: "rec-center",
        name: "Auditorium",
        description: "A large auditorium for lectures, performances, and campus events.",
        location: "R1 Campus",
        facilities: ["Big hall", "Huge screen ", "Sound proof", "full AC"],
        history: "Opened in 2014 as part of the campus wellness initiative.",
        image: "/audi.jpeg?height=300&width=500",
        coordinates: {
          lat: 40.7135,
          lng: -74.0095,
        },
      },
      {
        id: "health-center",
        name: "Google Lab",
        description: "A state-of-the-art Google Lab on campus empowering students with hands-on experience in cutting-edge technologies, innovation, and collaboration",
        location: "R1 Campus",
        facilities: ["High tech lab", "free softwares", "connections", "certifications"],
        history: "Established in 2025 to provide better oppertunity for students.",
        image: "/go2.jpg?height=300&width=500",
        coordinates: {
          lat: 40.7155,
          lng: -74.004,
        },
      },
      {
        id: "performing-arts",
        name: "Microsoft Lab",
        description: "A state-of-the-art Microsoft Lab on campus empowering students with hands-on experience in cutting-edge technologies, innovation, and collaboration",
        location: "R1 Campus",
        facilities: ["High tech lab", "free softwares", "connections", "certifications"],
        history: "Established in 2025 to provide better oppertunity for students.",
        image: "/mco.jpg?height=300&width=500",
        coordinates: {
          lat: 40.7115,
          lng: -74.011,
        },
      },
    ],
  },
]

// Campus events data
export const campusEvents: CampusEvent[] = [
  {
    id: "orientation",
    title: "Vyom",
    description: "Vyom 2025 very own annual fest! This celebration is for the students, by the students, and it truly reflects the energy, creativity, and spirit of our Rungta family.",
    date: "April 7-9, 2025",
    time: "8:00 AM - 8:00 PM",
    location: "R1 Campus",
    category: "Academic",
  },
  {
    id: "career-fair",
    title: "Ai Agent Showcase",
    description: "Annual showcase of AI agents developed by students, featuring presentations and demonstrations.",
    date: "April 7, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "FB19",
    category: "Career",
  },
  {
    id: "homecoming",
    title: "DJ Night & Celebrity Performance",
    description: "An evening of music and dance with a live DJ performance, open to all students.",
    date: "April 9, 2025",
    time: "5:00 PM - 9:00 PM",
    location: "Near Central Library",
    category: "Social",
  },
  {
    id: "finals-prep",
    title: "Finals Preparation Workshop",
    description: "Workshop on study strategies and stress management techniques for final exams.",
    date: "November 28, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Main Library",
    category: "Academic",
  },
]

// Academic information data
export const academicInfo: AcademicInfo[] = [
  {
    id: "registration",
    title: "Course Registration",
    description:
      "Registration period for the upcoming semester. Students should consult with their advisors before registering.",
    deadline: "November 15, 2025",
    category: "Registration",
  },
  {
    id: "add-drop",
    title: "Add/Drop Period",
    description: "Period during which students can add or drop courses without academic penalty.",
    deadline: "September 10, 2025",
    category: "Registration",
  },
  {
    id: "withdrawal",
    title: "Course Withdrawal Deadline",
    description: "Last day to withdraw from a course with a 'W' grade instead of a letter grade.",
    deadline: "October 30, 2025",
    category: "Registration",
  },
  {
    id: "graduation",
    title: "Graduation Application",
    description: "Deadline for seniors to apply for graduation and commencement ceremonies.",
    deadline: "February 1, 2026",
    category: "Graduation",
  },
]

// Campus services data
export const campusServices: CampusService[] = [
  {
    id: "dining",
    name: "Campus Dining Services",
    description: "Multiple dining options across campus including cafeterias, cafes, and food courts.",
    location: "Various locations",
    hours: "7:00 AM - 10:00 PM (varies by location)",
    contactInfo: "dining@campus.edu | (555) 123-4567",
    category: "Food",
  },
  {
    id: "counseling",
    name: "Counseling Services",
    description:
      "Confidential mental health services including individual counseling, group therapy, and crisis intervention.",
    location: "Health and Counseling Center",
    hours: "Monday-Friday: 9:00 AM - 5:00 PM, Crisis services available 24/7",
    contactInfo: "counseling@campus.edu | (555) 123-8900",
    category: "Health",
  },
  {
    id: "career",
    name: "Career Services",
    description: "Resources for career exploration, job searching, resume building, and interview preparation.",
    location: "Student Center, 2nd Floor",
    hours: "Monday-Friday: 8:30 AM - 4:30 PM",
    contactInfo: "careers@campus.edu | (555) 123-7890",
    category: "Career",
  },
  {
    id: "tutoring",
    name: "Academic Tutoring Center",
    description: "Free tutoring services for undergraduate students in various subjects.",
    location: "Main Library, 1st Floor",
    hours: "Monday-Thursday: 10:00 AM - 8:00 PM, Friday: 10:00 AM - 5:00 PM, Sunday: 2:00 PM - 8:00 PM",
    contactInfo: "tutoring@campus.edu | (555) 123-4321",
    category: "Academic",
  },
]

