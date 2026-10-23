// Fixed course catalogue. Prices are placeholders until the academy confirms real fees.
export const SAMPLE_VIDEO =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export type Lesson = { id: string; title: string; duration: string; summary: string };
export type Question = { q: string; options: string[]; answer: number };
export type Course = {
  slug: string;
  title: string;
  category: string;
  format: string;
  price: number;
  duration: string;
  description: string;
  outcomes: string[];
  lessons: Lesson[];
  quiz: Question[];
};

const L = (titles: [string, string][]): Lesson[] =>
  titles.map(([title, summary], i) => ({
    id: `l${i + 1}`,
    title,
    summary,
    duration: `${12 + ((i * 7) % 14)} min`,
  }));

const safety: Question = {
  q: "Before any treatment or procedure, what must always be completed first?",
  options: ["Payment", "A consultation and suitability check", "A social media post", "Aftercare"],
  answer: 1,
};
const records: Question = {
  q: "Why is accurate documentation essential?",
  options: [
    "It is optional paperwork",
    "It protects the client and practitioner and supports safe care",
    "Only for marketing",
    "Only insurers read it",
  ],
  answer: 1,
};

export const courses: Course[] = [
  {
    slug: "ear-microsuction",
    title: "Ear Microsuction Training & Update",
    category: "Clinic-Based Training",
    format: "Online theory + practical",
    price: 595,
    duration: "6 hrs",
    description:
      "Practical ear-care training covering ear assessment, microsuction principles, safety considerations and professional client care.",
    outcomes: [
      "Ear anatomy & otoscopy",
      "Microsuction technique",
      "Contraindications",
      "Client aftercare",
    ],
    lessons: L([
      ["Anatomy of the ear", "Outer, middle and inner ear structures."],
      ["Otoscopy & assessment", "Examining the canal and recognising normal findings."],
      ["Microsuction technique", "Equipment, positioning and safe removal."],
      ["Red flags & referral", "When to stop and refer onwards."],
    ]),
    quiz: [
      safety,
      {
        q: "Which instrument is used to view the ear canal?",
        options: ["Stethoscope", "Otoscope", "Dermatoscope", "Tourniquet"],
        answer: 1,
      },
      {
        q: "Sudden hearing loss with pain should be…",
        options: [
          "Ignored",
          "Treated immediately",
          "Referred to a medical professional",
          "Irrigated",
        ],
        answer: 2,
      },
      records,
      {
        q: "Microsuction removes wax using…",
        options: ["Water pressure", "Gentle low-pressure suction", "Heat", "Cotton buds"],
        answer: 1,
      },
    ],
  },
  {
    slug: "adhd-practitioner-workshop",
    title: "ADHD Practitioner Practical Workshop",
    category: "Professional Workshop",
    format: "Workshop",
    price: 349,
    duration: "4 hrs",
    description:
      "Develop confidence around ADHD-related client support, communication, documentation and professional boundaries.",
    outcomes: [
      "Understanding ADHD presentations",
      "Supportive communication",
      "Professional boundaries",
      "Record keeping",
    ],
    lessons: L([
      ["Understanding ADHD", "Core traits across ages and genders."],
      ["Communication skills", "Structuring calm, clear sessions."],
      ["Boundaries & scope", "Knowing your role and limits."],
      ["Documentation", "Recording sessions accurately."],
    ]),
    quiz: [
      {
        q: "ADHD is best described as…",
        options: [
          "A lack of discipline",
          "A neurodevelopmental condition",
          "A mood disorder only",
          "Temporary",
        ],
        answer: 1,
      },
      {
        q: "Working within your scope means…",
        options: [
          "Diagnosing anyone",
          "Acting only within your training and role",
          "Prescribing",
          "Avoiding referral",
        ],
        answer: 1,
      },
      records,
      {
        q: "A helpful session structure is…",
        options: ["Unplanned", "Clear, predictable and paced", "As long as possible", "Text-only"],
        answer: 1,
      },
      safety,
    ],
  },
  {
    slug: "adhd-assessor-training",
    title: "ADHD Assessor Training Course",
    category: "Assessor Training",
    format: "Course / workshop",
    price: 895,
    duration: "10 hrs",
    description:
      "Understand ADHD assessment pathways, structured history-taking, documentation and professional responsibilities.",
    outcomes: [
      "Assessment pathways",
      "Structured history-taking",
      "Rating scales",
      "Report writing",
    ],
    lessons: L([
      ["Assessment pathways", "How referrals and assessments flow."],
      ["History-taking", "Developmental, school and family history."],
      ["Rating scales & tools", "Using validated screening tools."],
      ["Writing the report", "Clear, defensible conclusions."],
    ]),
    quiz: [
      {
        q: "A structured history should include…",
        options: [
          "Only current symptoms",
          "Developmental and childhood history",
          "Only medication",
          "Nothing written",
        ],
        answer: 1,
      },
      {
        q: "Rating scales should be…",
        options: [
          "Used alone to diagnose",
          "Validated and used alongside clinical judgement",
          "Invented",
          "Skipped",
        ],
        answer: 1,
      },
      records,
      {
        q: "Collateral information comes from…",
        options: ["Social media", "Family, school or partners", "The assessor's opinion", "Nobody"],
        answer: 1,
      },
      safety,
    ],
  },
  {
    slug: "virtual-consultation",
    title: "Virtual Consultation Training",
    category: "Online",
    format: "Online / virtual",
    price: 195,
    duration: "3 hrs",
    description:
      "Structure professional online consultations, gather relevant information, communicate clearly and maintain safe documentation.",
    outcomes: [
      "Setting up remote consults",
      "Information gathering",
      "Consent online",
      "Safe documentation",
    ],
    lessons: L([
      ["Your virtual setup", "Lighting, privacy and technology."],
      ["Structuring the consult", "Opening, exploring and closing."],
      ["Consent & confidentiality", "GDPR and identity checks."],
      ["Follow-up & records", "Notes and next steps."],
    ]),
    quiz: [
      {
        q: "Before starting a video consult you should confirm…",
        options: [
          "The client's identity and privacy",
          "Their favourite colour",
          "Nothing",
          "Payment only",
        ],
        answer: 0,
      },
      safety,
      records,
      {
        q: "Client data must be stored…",
        options: [
          "On a personal phone",
          "Securely and in line with GDPR",
          "In email drafts",
          "Publicly",
        ],
        answer: 1,
      },
      {
        q: "If a client needs a physical examination you should…",
        options: [
          "Guess",
          "Arrange an in-person appointment or referral",
          "Ignore it",
          "End the call",
        ],
        answer: 1,
      },
    ],
  },
  {
    slug: "iv-therapy",
    title: "IV Therapy Training",
    category: "Wellness Training",
    format: "Practical training",
    price: 795,
    duration: "8 hrs",
    description:
      "IV therapy principles, client suitability, preparation, safety awareness and professional standards.",
    outcomes: ["IV principles", "Client suitability", "Aseptic technique", "Managing reactions"],
    lessons: L([
      ["Principles of IV therapy", "How infusions work."],
      ["Client suitability", "Screening and contraindications."],
      ["Preparation & aseptic technique", "Setting up safely."],
      ["Adverse reactions", "Recognising and responding."],
    ]),
    quiz: [
      safety,
      {
        q: "Aseptic technique aims to…",
        options: ["Save time", "Prevent infection", "Reduce cost", "Speed infusion"],
        answer: 1,
      },
      {
        q: "Signs of an allergic reaction include…",
        options: ["Calmness", "Rash, swelling or breathing difficulty", "Improved energy", "None"],
        answer: 1,
      },
      records,
      {
        q: "If a reaction occurs, first…",
        options: [
          "Continue the infusion",
          "Stop the infusion and follow emergency protocol",
          "Leave the room",
          "Increase the rate",
        ],
        answer: 1,
      },
    ],
  },
  {
    slug: "phlebotomy-cannulation",
    title: "Phlebotomy & Cannulation Training",
    category: "Practical Clinical Skills",
    format: "Practical training",
    price: 495,
    duration: "6 hrs",
    description:
      "Blood collection, cannulation awareness, client preparation, safety, infection control and procedure standards.",
    outcomes: ["Vein selection", "Order of draw", "Cannulation basics", "Infection control"],
    lessons: L([
      ["Anatomy & vein selection", "Choosing the right site."],
      ["Order of draw", "Tubes, labelling and handling."],
      ["Cannulation essentials", "Insertion and securing."],
      ["Infection control & sharps", "Keeping everyone safe."],
    ]),
    quiz: [
      {
        q: "The most common vein for venepuncture is…",
        options: ["Femoral", "Median cubital", "Jugular", "Saphenous"],
        answer: 1,
      },
      {
        q: "Used needles go…",
        options: [
          "In general waste",
          "Straight into a sharps bin",
          "Recapped by hand",
          "In a pocket",
        ],
        answer: 1,
      },
      safety,
      records,
      {
        q: "Samples must be labelled…",
        options: ["Later", "At the time, in front of the client", "Never", "By the client"],
        answer: 1,
      },
    ],
  },
  {
    slug: "prp-hair-skin",
    title: "PRP Hair & Skin Training",
    category: "Aesthetic Training",
    format: "Practical training",
    price: 695,
    duration: "7 hrs",
    description:
      "PRP/PRF principles for hair and skin, treatment planning, client suitability, practical awareness and aftercare.",
    outcomes: ["PRP vs PRF", "Treatment planning", "Centrifuge preparation", "Aftercare"],
    lessons: L([
      ["What is PRP / PRF?", "The science of platelet concentrates."],
      ["Consultation & planning", "Setting realistic expectations."],
      ["Preparation & centrifuge", "Processing samples correctly."],
      ["Treatment & aftercare", "Delivery and recovery advice."],
    ]),
    quiz: [
      {
        q: "PRP is derived from…",
        options: ["Synthetic gel", "The client's own blood", "Plant extracts", "Donor plasma"],
        answer: 1,
      },
      safety,
      {
        q: "Realistic expectations are set during…",
        options: ["Aftercare", "Consultation", "Payment", "Never"],
        answer: 1,
      },
      records,
      {
        q: "Typical aftercare includes…",
        options: [
          "Heavy makeup immediately",
          "Avoiding heat and strenuous activity for a period",
          "Swimming straight away",
          "Nothing",
        ],
        answer: 1,
      },
    ],
  },
  {
    slug: "medical-eyelash",
    title: "Medical Eyelash Training",
    category: "Specialist Aesthetic Training",
    format: "Course / workshop",
    price: 395,
    duration: "4 hrs",
    description:
      "Eyelash growth, lash-loss concerns, consultation principles, treatment rationale and safe professional service setup.",
    outcomes: ["Lash growth cycle", "Causes of lash loss", "Treatment options", "Service setup"],
    lessons: L([
      ["The lash growth cycle", "Anagen, catagen and telogen."],
      ["Lash loss concerns", "Common causes and red flags."],
      ["Treatment rationale", "Options and evidence."],
      ["Setting up your service", "Protocols, pricing and safety."],
    ]),
    quiz: [
      {
        q: "The active growth phase of a lash is…",
        options: ["Telogen", "Anagen", "Catagen", "Dormant"],
        answer: 1,
      },
      safety,
      {
        q: "Sudden lash loss with other symptoms should be…",
        options: [
          "Treated cosmetically only",
          "Referred for medical review",
          "Ignored",
          "Covered with extensions",
        ],
        answer: 1,
      },
      records,
      {
        q: "Patch testing is used to…",
        options: ["Check for sensitivity", "Speed treatment", "Choose colour", "Nothing"],
        answer: 0,
      },
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
