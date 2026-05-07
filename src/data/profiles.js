export const profiles = [
  {
    id: 1,
    initials: 'MJ',
    name: 'Mr. Jansen',
    role: 'teacher',
    displayRole: 'Teacher',
    image: null,

    matchConfidence: 68,

    professional: [
      { label: 'Current Position', value: 'Mathematics Teacher' },
      { label: 'Institution', value: 'Westfield High School' },
      { label: 'Years of Experience', value: '12 years' },
      { label: 'Education', value: 'MSc Mathematics Education' },
    ],

    dataSources: [
      'School records',
      'Public reviews',
      'Behaviour analysis',
      'Student feedback',
    ],

    reviews: {
      overallRating: 2.3,
      totalReviews: 23,
      difficultyLevel: 4.2,

      commonTags: [
        'Tough grader',
        'Strict',
        'Unclear',
      ],

      list: [
        {
          text: 'Very difficult to understand. Expects too much from students.',
          date: '3 weeks ago',
          rating: 2,
        },
      ],
    },
  },

  {
    id: 2,
    initials: 'LS',
    name: 'Lina Smit',
    role: 'student',
    displayRole: 'Student',
    image: null,

    matchConfidence: 74,

    professional: [
      { label: 'Current Role', value: 'Student' },
      { label: 'Institution', value: 'Westfield High School' },
      { label: 'Study Year', value: 'Year 2' },
      { label: 'Program', value: 'Science & Technology' },
    ],

    dataSources: [
      'School records',
      'Class attendance',
      'Behaviour analysis',
      'Teacher feedback',
    ],

    reviews: {
      overallRating: 2.6,
      totalReviews: 17,
      difficultyLevel: 2.1,

      commonTags: [
        'Uncooperative',
        'Low participation',
        'Avoids teamwork',
        'Inconsistent effort',
      ],

      list: [
        {
          text: 'Frequently avoids group responsibilities and contributes minimally during group projects.',
          date: '1 week ago',
          rating: 2,
        },
        {
          text: 'Shows limited engagement in class discussions and rarely participates unless prompted.',
          date: '3 weeks ago',
          rating: 2,
        },
      ],
    },
  },

  {
    id: 3,
    initials: 'DK',
    name: 'Daan Kramer',
    role: 'student',
    displayRole: 'Student',
    image: null,

    matchConfidence: 82,

    professional: [
      { label: 'Current Role', value: 'Student' },
      { label: 'Institution', value: 'Westfield High School' },
      { label: 'Study Year', value: 'Year 3' },
      { label: 'Program', value: 'Media & Communication' },
    ],

    dataSources: [
      'School records',
      'Class attendance',
      'Social media activity',
      'Peer feedback',
    ],

    reviews: {
      overallRating: 1.9,
      totalReviews: 21,
      difficultyLevel: 1.7,

      commonTags: [
        'Distracted',
        'Frequently absent',
        'Disruptive',
        'Avoids deadlines',
      ],

      list: [
        {
          text: 'Often appears distracted during group work and spends more time on his phone than participating.',
          date: '5 days ago',
          rating: 2,
        },
        {
          text: 'Has a tendency to disappear shortly before deadlines and leaves most responsibilities to teammates.',
          date: '2 weeks ago',
          rating: 1,
        },
      ],
    },
  },

  {
    id: 4,
    initials: 'NW',
    name: 'Nora Willems',
    role: 'student',
    displayRole: 'Student',
    image: null,

    matchConfidence: 88,

    professional: [
      { label: 'Current Role', value: 'Student' },
      { label: 'Institution', value: 'Westfield High School' },
      { label: 'Study Year', value: 'Year 2' },
      { label: 'Program', value: 'Business & Society' },
    ],

    dataSources: [
      'School records',
      'Class attendance',
      'Teacher feedback',
      'Peer feedback',
    ],

    reviews: {
      overallRating: 4.4,
      totalReviews: 19,
      difficultyLevel: 4.6,

      commonTags: [
        'Reliable',
        'Organized',
        'Takes initiative',
        'Strong leader',
      ],

      list: [
        {
          text: 'Always takes responsibility during group projects and makes sure deadlines are met.',
          date: '6 days ago',
          rating: 5,
        },
        {
          text: 'Good at leading discussions, but sometimes takes over too much.',
          date: '2 weeks ago',
          rating: 4,
        },
      ],
    },
  },

  {
    id: 5,
    initials: 'YA',
    name: 'Yusuf Aydin',
    role: 'student',
    displayRole: 'Student',
    image: null,

    matchConfidence: 71,

    professional: [
      { label: 'Current Role', value: 'Student' },
      { label: 'Institution', value: 'Westfield High School' },
      { label: 'Study Year', value: 'Year 2' },
      { label: 'Program', value: 'Computer Science' },
    ],

    dataSources: [
      'School records',
      'Project submissions',
      'Class attendance',
      'Peer feedback',
    ],

    reviews: {
      overallRating: 3.7,
      totalReviews: 12,
      difficultyLevel: 3.2,

      commonTags: [
        'Technical',
        'Quiet',
        'Works independently',
        'Helpful when asked',
      ],

      list: [
        {
          text: 'Very good with technical tasks, but does not always explain his work to the group.',
          date: '1 week ago',
          rating: 4,
        },
        {
          text: 'Quiet during meetings, but usually delivers good work.',
          date: '1 month ago',
          rating: 3,
        },
      ],
    },
  },

  {
    id: 6,
    initials: 'EB',
    name: 'Emma Bakker',
    role: 'student',
    displayRole: 'Student',
    image: null,

    matchConfidence: 79,

    professional: [
      { label: 'Current Role', value: 'Student' },
      { label: 'Institution', value: 'Westfield High School' },
      { label: 'Study Year', value: 'Year 3' },
      { label: 'Program', value: 'Health & Behaviour' },
    ],

    dataSources: [
      'School records',
      'Class attendance',
      'Teacher feedback',
      'Student feedback',
    ],

    reviews: {
      overallRating: 4.1,
      totalReviews: 16,
      difficultyLevel: 4.0,

      commonTags: [
        'Empathetic',
        'Good presenter',
        'Supportive',
        'Confident',
      ],

      list: [
        {
          text: 'Strong presenter and good at making others feel included.',
          date: '3 days ago',
          rating: 5,
        },
        {
          text: 'Works well in groups, but sometimes avoids conflict too much.',
          date: '2 weeks ago',
          rating: 4,
        },
      ],
    },
  },

  {
    id: 7,
    initials: 'RS',
    name: 'Ravi Singh',
    role: 'student',
    displayRole: 'Student',
    image: null,

    matchConfidence: 63,

    professional: [
      { label: 'Current Role', value: 'Student' },
      { label: 'Institution', value: 'Westfield High School' },
      { label: 'Study Year', value: 'Year 2' },
      { label: 'Program', value: 'Creative Technology' },
    ],

    dataSources: [
      'School records',
      'Project activity',
      'Peer feedback',
      'Public portfolio',
    ],

    reviews: {
      overallRating: 3.0,
      totalReviews: 9,
      difficultyLevel: 2.8,

      commonTags: [
        'Creative',
        'Unfocused',
        'Original ideas',
        'Needs structure',
      ],

      list: [
        {
          text: 'Comes up with creative ideas, but often needs someone else to structure the work.',
          date: '1 week ago',
          rating: 3,
        },
        {
          text: 'Can be very useful in brainstorming, but less reliable during execution.',
          date: '4 weeks ago',
          rating: 3,
        },
      ],
    },
  },
]