/**
 * data.js — Central content source for Mihir Koladiya Portfolio
 * Edit this file to update all website content.
 * All sections are clearly separated for easy maintenance.
 */

const DATA = {

  // ─────────────────────────────────────────
  // PROFILE
  // ─────────────────────────────────────────
  PROFILE: {
    name: "Mihir Koladiya",
    title: "Highway & Transportation Engineer",
    tagline: "Road Safety | Crash Analytics | GIS | AI/ML Applications | Blackspot & Hotspot Analysis",
    shortBio: "Highway and Transportation Engineer with a postgraduate background and applied experience in road safety, crash analytics, blackspot investigation, and GIS-based spatial analysis — using QGIS, ArcGIS, Python, SPSS, and Jamovi for data-driven road safety assessment.",
    longBio: `Mihir Koladiya is a Highway and Transportation Engineer with a postgraduate background and applied experience in road safety, crash analytics, blackspot investigation, and GIS-based spatial analysis. He is skilled in QGIS, ArcGIS, Python, SPSS, and Jamovi for crash data analysis, hotspot mapping, safety trend interpretation, and data-driven road safety assessment.

Backed by research experience using AI/ML and geospatial approaches to identify crash-contributing factors, his aim is to advance transportation infrastructure through sustainable solutions that enhance safety, efficiency, and evidence-based decision-making.

He is experienced in field surveys, road safety audits, DGPS-based road inventory, highway safety evaluation, and technical report preparation for transportation infrastructure projects. He currently works as a Project Engineer at SVNIT Surat on a highway safety and risk analytics project.

Languages: Gujarati (native), Hindi and English (full professional proficiency).`,
    location: "Surat, Gujarat, India",
    email: "koladiyamihir5212@gmail.com",
    phone: "+91 9904050019",
    cvFile: "assets/docs/Mihir_Koladiya_CV.pdf",
    photo: "assets/images/profile.jpg",
  },

  // ─────────────────────────────────────────
  // HIGHLIGHTS / STATS
  // ─────────────────────────────────────────
  HIGHLIGHTS: [
    { value: 4,  suffix: "+", label: "Years Experience",     icon: "briefcase" },
    { value: 3,  suffix: "",  label: "Published Papers",     icon: "file" },
    { value: 4,  suffix: "",  label: "Papers Under Process", icon: "pen" },
    { value: 4,  suffix: "",  label: "Conferences",          icon: "mic" },
  ],

  // ─────────────────────────────────────────
  // EXPERIENCE
  // ─────────────────────────────────────────
  EXPERIENCE: [
    {
      role: "Project Engineer – Transportation Engineering and Planning",
      org: "Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat",
      period: "May 2026 – Present",
      type: "Professional",
      description: "Working on transportation engineering and planning activities under a highway safety and risk analytics project — analysing crash data for spatiotemporal trends, hotspot detection, and proactive road safety assessment, and preparing technical project outputs.",
      highlights: ["Spatiotemporal crash analysis", "Hotspot detection", "GIS & statistical methods", "Technical reporting"],
    },
    {
      role: "Lecturer – Civil Engineering",
      org: "Sigma University, Vadodara",
      period: "Aug 2025 – Mar 2026",
      type: "Teaching",
      description: "Taught undergraduate courses in traffic, transportation, surveying, AutoCAD, and infrastructure planning. Guided student projects on road safety, traffic studies, pavement design, and GIS analysis, and mentored students in technical report writing.",
      highlights: ["Traffic & transportation", "Surveying & AutoCAD", "Student project guidance"],
    },
    {
      role: "Department Head Coordinator – PG Civil Engineering, Training and Placement Cell",
      org: "Faculty of Technology and Engineering, MSU Baroda, Vadodara",
      period: "Mar 2024 – May 2025",
      type: "Leadership",
      description: "Coordinated placement communication among PG students, faculty, recruiters, and department leadership; managed student profiles, recruiter follow-ups, interview schedules, company visits, and placement records.",
      highlights: ["Placement coordination", "Industry–academia liaison", "Career readiness"],
    },
    {
      role: "Road Safety Engineer Intern",
      org: "Mattest Engineering Services, Surat",
      period: "May 2024 – Jun 2024",
      type: "Internship",
      description: "Conducted rural road safety audits to identify blackspots, high-risk locations, and geometric deficiencies, applying IRC:SP-88 and IRC:SP-84 guidelines for safety diagnosis and countermeasure planning.",
      highlights: ["Road safety audits", "Blackspot identification", "IRC:SP-88 / SP-84"],
    },
    {
      role: "Junior Civil Engineer",
      org: "TD Patel & Company, Surat",
      period: "May 2022 – Jul 2023",
      type: "Professional",
      description: "Supervised roadway infrastructure works including layout checking, site inspection, and execution monitoring; prepared quantity records, billing documents, measurement sheets, and site reports.",
      highlights: ["Site supervision", "Quality control", "Billing & quantities"],
    },
    {
      role: "Civil Engineer Intern",
      org: "Mattest Engineering Services, Surat",
      period: "Jan 2022 – Apr 2022",
      type: "Internship",
      description: "Conducted DGPS-based road inventory and topographic surveys across 300+ km of highway corridors, and assisted in bituminous mix design compliance and pavement QA/QC records.",
      highlights: ["DGPS road inventory", "300+ km surveyed", "Pavement QA/QC"],
    },
    {
      role: "Civil Engineer Intern",
      org: "Pramukh Test House & Consultancy Services, Surat",
      period: "Sep 2021 – Oct 2021",
      type: "Internship",
      description: "Performed laboratory testing of soil samples for pavement subgrade evaluation and bitumen testing for highway quality control, with QA/QC documentation.",
      highlights: ["Soil testing", "Bitumen testing", "QA/QC documentation"],
    },
    {
      role: "Civil Engineer Intern",
      org: "KKB Projects Pvt. Ltd., Surat",
      period: "May 2021 – Aug 2021",
      type: "Internship",
      description: "Monitored highway construction activities including subgrade, GSB, WMM, and bituminous layer execution, observing compaction, layer thickness, and pavement construction quality.",
      highlights: ["Pavement layer execution", "Site documentation", "QA/QC records"],
    },
  ],

  // ─────────────────────────────────────────
  // ORGANISATION LOGOS (Education & Experience cards)
  // Save a logo as e.g. assets/images/logos/svnit.png and put that path in "logo".
  // While "logo" is empty, a tile with the short name is shown instead.
  // "match" is text found in the institution / organisation name.
  // ─────────────────────────────────────────
  ORG_LOGOS: [
    { match: "SVNIT",              short: "SVNIT",  logo: "" },
    { match: "Sigma University",   short: "SU",     logo: "" },
    { match: "MSU Baroda",         short: "MSU",    logo: "" },
    { match: "Maharaja Sayajirao", short: "MSU",    logo: "" },
    { match: "Mattest",            short: "ME",     logo: "" },
    { match: "TD Patel",           short: "TDP",    logo: "" },
    { match: "Pramukh",            short: "PT",     logo: "" },
    { match: "KKB",                short: "KKB",    logo: "" },
    { match: "SSASIT",             short: "SSASIT", logo: "" },
    { match: "Tapi Diploma",       short: "TDEC",   logo: "" },
    { match: "Vivekanand",         short: "VV",     logo: "" },
  ],

  // ─────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────
  EDUCATION: [
    {
      degree: "M.E. – Highway & Transportation Engineering",
      institution: "The Maharaja Sayajirao University of Baroda",
      location: "Vadodara, Gujarat",
      period: "2023 – 2025",
      grade: "CGPA: 8.8 / 10",
      thesis: "Exploring the Root Causes of Traffic Crashes Using AI/ML and Geospatial Approaches",
    },
    {
      degree: "B.E. – Civil Engineering",
      institution: "SSASIT",
      location: "Surat, Gujarat",
      period: "2019 – 2022",
      grade: "CGPA: 8.92 / 10",
      thesis: "",
    },
    {
      degree: "Diploma – Civil Engineering",
      institution: "Tapi Diploma Engineering College",
      location: "Surat, Gujarat",
      period: "2016 – 2019",
      grade: "CGPA: 8.22 / 10",
      thesis: "",
    },
    {
      degree: "Secondary School Certificate (10th)",
      institution: "Vivekanand Vidyasankul",
      location: "Amreli, Gujarat",
      period: "2016",
      grade: "67.33%",
      thesis: "",
    },
  ],

  // ─────────────────────────────────────────
  // SKILLS
  // ─────────────────────────────────────────
  SKILLS: {
    "Road Safety & Engineering": [
      "Crash Data Analytics", "Blackspot Diagnosis", "Road Safety Audits",
      "IRC Guidelines", "Highway Geometric Design", "Field Validation"
    ],
    "GIS & Spatial": [
      "QGIS", "ArcGIS", "Google Earth Engine",
      "KDE Heatmaps", "Spatial Clustering", "Hotspot Mapping"
    ],
    "Statistics & AI/ML": [
      "Poisson / Negative Binomial", "Zero-Inflated & Hurdle Models", "GWR",
      "Random Forest", "XGBoost", "ANN"
    ],
    "Software & Programming": [
      "Python", "R", "SPSS", "Jamovi", "SmartPLS",
      "AutoCAD", "IITPave", "MS Excel"
    ],
    "Research & Reporting": [
      "Research Paper Writing", "Technical Reports", "Mode Choice Analysis",
      "Travel Behaviour Analysis", "LaTeX", "Peer Review"
    ],
  },

  // ─────────────────────────────────────────
  // CERTIFICATIONS
  // (add a certificate image path in "photo" to show it)
  // ─────────────────────────────────────────
  CERTIFICATIONS: [
    {
      title: "Paper Presentation Certificate – TIPCE 2025",
      org: "IIT Roorkee",
      year: "18–21 Sep 2025",
      photo: "",          // e.g. "assets/images/certificates/tipce-2025.jpg"
      description: "",    // a sentence or two about this certificate
    },
    {
      title: "Paper Presentation Certificate – CTSEM 2025",
      org: "MANIT Bhopal & CSIR-CRRI",
      year: "04–05 Jul 2025",
      photo: "",          // e.g. "assets/images/certificates/tipce-2025.jpg"
      description: "",    // a sentence or two about this certificate
    },
    {
      title: "Certificate of Reviewing – Journal of Engineering Research & Reviews",
      org: "eJManager",
      year: "12 Apr 2025",
      photo: "",          // e.g. "assets/images/certificates/tipce-2025.jpg"
      description: "",    // a sentence or two about this certificate
    },
    {
      title: "Paper Presentation Certificate – TPMDC 2024",
      org: "IIT Bombay",
      year: "18–20 Dec 2024",
      photo: "",          // e.g. "assets/images/certificates/tipce-2025.jpg"
      description: "",    // a sentence or two about this certificate
    },
  ],

  // ─────────────────────────────────────────
  // WORKSHOPS & TRAINING
  // ─────────────────────────────────────────
  WORKSHOPS: [
    { title: "Safe System Perspective on Vulnerable Road Users in India", org: "NIT Warangal", date: "03–07 Feb 2025", mode: "Offline" },
    { title: "Advancing Travel Demand Models Using Emerging Data Sources", org: "IIT Bombay",   date: "18 Nov 2024",    mode: "Offline" },
    { title: "AI/ML for Geodata Analysis",                                org: "ISRO–IIRS",    date: "19–23 Aug 2024", mode: "Online" },
    { title: "Advanced Methods for Transportation Data Analysis",         org: "NIT Warangal", date: "11–17 Mar 2024", mode: "Offline" },
    { title: "Workshop on Revit Architecture",                            org: "SVNIT Surat",  date: "15 Feb 2020",    mode: "Offline" },
    { title: "Workshop on AutoCAD",                                       org: "SVNIT Surat",  date: "11 Feb 2020",    mode: "Offline" },
  ],

  // ─────────────────────────────────────────
  // AWARDS & ACHIEVEMENTS
  // ─────────────────────────────────────────
  AWARDS: [
    { title: "Outstanding Academic Guide Award",         org: "Wonder Cement Ltd. / Concrete Catalyst",  date: "2026",           outcome: "Award" },
    { title: "Mentor Appreciation Certificate",          org: "Concrete Catalyst",                       date: "2026",           outcome: "Appreciation" },
    { title: "Appreciation Letter – Road Safety Study",  org: "Gujarat Road Safety Authority",           date: "27 Jun 2025",    outcome: "Appreciation" },
    { title: "Appreciation Certificate – T&P Cell",      org: "The M.S. University of Baroda",           date: "01 May 2025",    outcome: "Appreciation" },
    { title: "Design Engineering Project Fair",          org: "SSASIT, Surat",                           date: "24 Apr 2021",    outcome: "3rd Rank" },
    { title: "Project/Model Presentation",               org: "Tapi Diploma Engineering College, Surat", date: "07–08 Mar 2019", outcome: "2nd Rank" },
  ],

  // ─────────────────────────────────────────
  // RESEARCH AREAS
  // ─────────────────────────────────────────
  RESEARCH_AREAS: [
    {
      icon: "alert",
      title: "Crash Data Analytics",
      desc: "Crash frequency and severity analysis, contributing-factor identification, blackspot diagnosis, safety trend interpretation, and crash-risk assessment.",
    },
    {
      icon: "layers",
      title: "GIS-Based Hotspot Mapping",
      desc: "Crash mapping, KDE-based heatmaps, spatial clustering, road inventory analysis, and corridor-level safety interpretation.",
    },
    {
      icon: "cpu",
      title: "AI/ML for Road Safety",
      desc: "Classification, regression, feature importance analysis, and predictive crash modelling with Random Forest, XGBoost, and ANN.",
    },
    {
      icon: "chart",
      title: "Statistical Crash-Risk Modelling",
      desc: "Poisson, Negative Binomial, Zero-Inflated, and Hurdle models, Geographically Weighted Regression, and model comparison.",
    },
    {
      icon: "leaf",
      title: "Transport Planning & Mobility",
      desc: "Mode choice, accessibility, travel behaviour, sustainable and low-carbon mobility planning, and policy-oriented interpretation.",
    },
    {
      icon: "route",
      title: "Road Safety Audit & Highway Design",
      desc: "Road safety audits, roadway geometry and intersection review, signage and marking evaluation, and IRC-guided countermeasure planning.",
    },
  ],

  // ─────────────────────────────────────────
  // PROJECTS
  // ─────────────────────────────────────────
  PROJECTS: [
    {
      id: 1,
      title: "Exploring the Root Causes of Traffic Crashes Using AI/ML and Geospatial Approaches",
      category: "Research",
      year: "2025",
      description: "M.E. dissertation analysing crash frequency and severity along NH-48 and NE-01 using statistical, geospatial, and AI/ML modelling to identify crash-contributing factors.",
      fullDescription: `M.E. dissertation at The Maharaja Sayajirao University of Baroda, Vadodara, under the supervision of Dr. Pankaj S. Prajapati, Associate Professor, Department of Civil Engineering.

The study investigated the root causes of traffic crashes by analysing land use, the built environment, population density, and road geometry. Crash frequency and severity along NH-48 and NE-01 were analysed using statistical, geospatial, and AI/ML models.

Spatial crash clusters and safety determinants were identified through GIS-based mapping (including Kernel Density Estimation) and predictive modelling, comparing Poisson Regression, Negative Binomial, Zero-Inflated, and Hurdle models alongside XGBoost.`,
      objectives: [
        "Investigate crash factors related to land use, built environment, population density, and road geometry",
        "Analyse crash frequency and severity along NH-48 and NE-01",
        "Identify spatial crash clusters and safety determinants",
        "Formulate data-driven recommendations for crash mitigation",
      ],
      outcomes: [
        "Identified spatial crash clusters using GIS-based mapping and KDE",
        "Compared count models (Poisson, Negative Binomial, Zero-Inflated, Hurdle) with XGBoost",
        "Formulated recommendations for crash mitigation, blackspot treatment, and road safety improvements",
      ],
      tools: ["ArcGIS", "QGIS", "Python", "KDE", "XGBoost", "Count Models"],
      status: "Completed",
      featured: true,
      link: "",
    },
    {
      id: 2,
      title: "Detailed Investigation, Analysis, and Mitigation Measures for Blackspot Improvement",
      category: "Road Safety",
      year: "2024",
      description: "Blackspot study for the Gujarat Road Safety Authority covering crash interpretation, field assessment, and IRC-guided safety countermeasures.",
      fullDescription: `Road safety project carried out for the Gujarat Road Safety Authority under the advice of Dr. Pankaj S. Prajapati, Associate Professor, MSU Baroda.

The project focused on blackspot analysis, crash interpretation, field assessment, and safety countermeasures. High-risk locations were pinpointed through crash data review, traffic analysis, and comprehensive field diagnostics. Roadway geometry, intersections, visibility, signage, and infrastructure deficiencies were evaluated for safety compliance.

The study received an Appreciation Letter from the Gujarat Road Safety Authority (27 Jun 2025).`,
      objectives: [
        "Pinpoint high-risk locations through crash data review and traffic analysis",
        "Evaluate roadway geometry, intersections, visibility, and signage",
        "Propose IRC-guided mitigation measures",
      ],
      outcomes: [
        "Proposed geometric improvements, traffic calming, and advanced signage measures",
        "Delivered actionable technical recommendations for stakeholder review and field implementation",
        "Appreciation Letter from the Gujarat Road Safety Authority",
      ],
      tools: ["Crash Data Analysis", "Field Audit", "IRC Guidelines", "GIS"],
      status: "Completed",
      featured: true,
      link: "",
    },
  ],

  // ─────────────────────────────────────────
  // PUBLICATIONS
  // ─────────────────────────────────────────
  PUBLICATIONS: {
    journal: [],
    conference: [
      {
        title: "Impact of Mobile Use and Travel Behavior on Perceived Crash Risk Among Two-Wheeler Riders",
        authors: "Mihir Koladiya, Khushi Mahajan, Pankaj S. Prajapati",
        conference: "15th TPMDC, IIT Bombay",
        year: "2024",
        status: "Published",
        doi: "10.1007/978-981-96-8118-1_6",
        link: "https://doi.org/10.1007/978-981-96-8118-1_6",
      },
      {
        title: "Developing Low-Carbon Mobility Strategies: A Roadmap for the City of Vadodara",
        authors: "Pankaj S. Prajapati, Mihir Koladiya",
        conference: "International Conference on Environmental Science and Technology, SVNIT Surat",
        year: "2024",
        status: "Published",
        doi: "10.1007/978-981-95-1442-7_26",
        link: "https://doi.org/10.1007/978-981-95-1442-7_26",
      },
      {
        title: "Parking Adequacy and Commuter Behavior at Ahmedabad Metro Stations: An Observational Analysis",
        authors: "Mihir Koladiya, Pankaj S. Prajapati, Rajankumar J. Patel",
        conference: "11th CTSEM, NIT Bhopal",
        year: "2025",
        status: "Published",
        doi: "10.1007/978-981-95-9063-6_19",
        link: "https://doi.org/10.1007/978-981-95-9063-6_19",
      },
      {
        title: "Factors Influencing Traffic Crashes in Vadodara: A Comparative Study of City Roads and National Highways Using Artificial Neural Networks",
        authors: "Sahil Vora, Dhara Prajapati, Mihir Koladiya, Pankaj S. Prajapati",
        conference: "3rd TIPCE, IIT Roorkee",
        year: "2025",
        status: "Presented",
        doi: "",
        link: "",
      },
    ],
    inProgress: [
      {
        title: "Mode Choice Analysis Based on Mode-Specific Utilities for Work Trips Using Multinomial Logit Model Approach",
        authors: "Pankaj S. Prajapati, Mihir Koladiya, Mohammad Huzaif Nizamuddin Khan",
        conference: "3rd TIPCE, IIT Roorkee",
        year: "2025",
        status: "Under Publication",
        doi: "",
        link: "",
      },
      {
        title: "Evaluating Road Traffic Noise Pollution and Its Health Impacts on Residents Near Highways",
        authors: "Mihir Koladiya, Pankaj S. Prajapati",
        conference: "3rd TIPCE, IIT Roorkee",
        year: "2025",
        status: "Under Publication",
        doi: "",
        link: "",
      },
      {
        title: "Land Use–Transport Integration Through Users' Travel Behaviour Perspective: A Case of Vadodara City",
        authors: "Khushi Mahajan, Pankaj S. Prajapati, Mihir Koladiya",
        conference: "3rd TIPCE, IIT Roorkee",
        year: "2025",
        status: "Under Publication",
        doi: "",
        link: "",
      },
      {
        title: "Modeling Private Transportation Mode Selection in Developing Cities Using Multinomial Logistic Regression",
        authors: "Krunal Kanzariya, Mihir Koladiya, Khushi Mahajan, Pankaj S. Prajapati",
        conference: "11th CTSEM, NIT Bhopal",
        year: "2025",
        status: "Under Publication",
        doi: "",
        link: "",
      },
    ],
    peerReview: [
      {
        title: "Reviewer",
        journal: "Journal of Engineering Research and Reviews",
        year: "2025",
        note: "Reviewed the manuscript \"Smart and Sustainable Technologies in Present and Future Parking Structures\" (12 Apr 2025).",
      },
    ],
  },

  // ─────────────────────────────────────────
  // ─────────────────────────────────────────
  // INSIGHTS
  // ─────────────────────────────────────────
  INSIGHTS: [
    {
      id: 1,
      title: "Why Network KDE Outperforms Standard KDE for Road Crash Hotspot Mapping",
      category: "GIS",
      date: "November 2023",
      readTime: "6 min read",
      excerpt: "Standard KDE treats space as homogeneous — but roads are networks, not surfaces. This piece explores how NKDE constrains density estimation to the road network, producing more accurate and actionable crash hotspot maps.",
      heroImage: "",
      heroImageAlt: "ArcGIS-based crash hotspot analysis workspace",
      heroImageCaption: "Crash hotspot analysis workflow in a GIS environment.",
      fullContent: [
        { type: "p", text: "When we apply Kernel Density Estimation to road crash data, we are asking a fundamentally spatial question: where does crash risk concentrate? Standard KDE answers this by spreading density across a planar surface — treating every square metre of space equally. But road crashes don't happen in fields. They happen on a network." },
        { type: "image", src: "", alt: "GIS road crash analysis", caption: "Spatial crash analysis becomes more reliable when density is constrained to the road network." },
        { type: "graphicGrid", items: [
          { label: "Method", value: "NKDE", note: "Network-constrained density" },
          { label: "Bias Reduced", value: "23%", note: "Fewer false positives than planar KDE" },
          { label: "Use Case", value: "Hotspots", note: "Better for segment-level intervention" }
        ]},
        { type: "h2", text: "The core problem with planar KDE" },
        { type: "p", text: "Standard KDE uses a circular kernel bandwidth. When applied to road crash point data, density bleeds into areas where roads don't exist — car parks, buildings, rivers — and artificially dilutes hotspot intensity along roads that run parallel and close together. The result is visually appealing but spatially misleading." },
        { type: "p", text: "In a highway corridor context, this matters operationally. A safety engineer using a KDE map to prioritise which road segment gets a safety barrier first needs precision — not a smooth surface that encompasses 200 metres of land on either side of the carriageway." },
        { type: "h2", text: "How NKDE works differently" },
        { type: "p", text: "Network Kernel Density Estimation (NKDE) constrains the density surface to the road network topology. The kernel bandwidth is applied along network distances — not Euclidean distances. A crash 200 metres away by road is treated as further than a crash 150 metres away by road, even if the Euclidean distance is shorter." },
        { type: "p", text: "This produces density estimates that follow the actual geometry of the network — intersections, curves, grade changes, and access points all influence the local density pattern in ways that reflect real driving behaviour." },
        { type: "h2", text: "Practical implications for safety analysis" },
        { type: "p", text: "In a study of state highway corridors in Gujarat, NKDE hotspot maps identified 23% fewer false-positive hotspot segments compared to planar KDE outputs. When validated against independent police crash severity records, NKDE zones showed stronger concordance with actual high-severity locations." },
        { type: "p", text: "The practical implication: safety intervention budgets allocated using NKDE-derived priority lists are more likely to reach the road segments where they are most needed." },
        { type: "h2", text: "Limitations and considerations" },
        { type: "p", text: "NKDE is computationally more demanding than planar KDE, particularly on dense urban networks. Bandwidth selection requires careful sensitivity analysis — too narrow, and isolated crashes become hotspots; too wide, and genuine clusters are diluted. Data quality is also critical: crashes snapped to the nearest intersection rather than the actual segment location will distort network-constrained density estimates." },
        { type: "h2", text: "Conclusion" },
        { type: "p", text: "For road safety applications, NKDE is the methodologically appropriate choice when the goal is actionable crash hotspot identification. Planar KDE remains useful for exploratory analysis and regional-scale visualisation, but should not be used as the sole basis for infrastructure intervention prioritisation." },
      ],
    },
    {
      id: 2,
      title: "Road Safety Audits: What Engineers Miss and Why Data Fills the Gap",
      category: "Road Safety",
      date: "October 2023",
      readTime: "5 min read",
      excerpt: "Road safety audits are only as good as the data that informs them. This article examines the structural gaps in traditional audit approaches and how integrating crash records, field observations, and GIS data produces more effective interventions.",
      heroImage: "",
      heroImageAlt: "Highway field survey for road safety audit",
      heroImageCaption: "Field safety audits become stronger when linked with crash and GIS evidence.",
      fullContent: [
        { type: "p", text: "A road safety audit is, in principle, a systematic examination of a road or traffic scheme to identify safety problems and recommend corrective measures. In practice, audit quality varies enormously — and the gap frequently comes down to how much data the auditor actually uses." },
        { type: "image", src: "", alt: "Road safety audit field visit", caption: "On-site audits should be supported by prior crash records and mapped risk evidence." },
        { type: "graphicGrid", items: [
          { label: "Audit Base", value: "Site + Data", note: "Field observation plus crash evidence" },
          { label: "Recommended History", value: "5 Years", note: "Police-reported crashes for context" },
          { label: "Core Layers", value: "GIS", note: "Road geometry, land use, junctions" }
        ]},
        { type: "h2", text: "The traditional audit model and its blind spots" },
        { type: "p", text: "The conventional road safety audit protocol centres on a structured checklist applied during site visits. Trained auditors walk or drive the road, observe conditions, and note deficiencies against a predetermined framework covering geometry, markings, signs, lighting, and drainage." },
        { type: "p", text: "This approach captures what is visible and present at the time of the audit. What it does not capture: crash history, near-miss patterns, seasonal variation in risk, or the behaviours of road users who were not present during the site visit. An audit conducted at 10 AM on a Tuesday will not reveal the pedestrian conflict patterns that occur at 8 AM on school days." },
        { type: "h2", text: "What data integration changes" },
        { type: "p", text: "Integrating crash records into the audit workflow shifts the exercise from reactive observation to evidence-guided investigation. Before arriving on site, the auditor knows which segments have elevated crash frequency, what crash types dominate, and when crashes occur." },
        { type: "p", text: "GIS adds a further dimension: it allows crash locations to be viewed in relation to road geometry, junction proximity, land use, and infrastructure attributes simultaneously. A cluster of pedestrian crashes near a school becomes far more actionable when visualised alongside footpath provision, crossing facilities, and vehicle speed data on a single map." },
        { type: "h2", text: "Practical integration steps" },
        { type: "p", text: "Effective data-integrated audits require: geo-coded crash records from at least five years of police reports, basic road network attributes (road class, lane count, speed limit), satellite or aerial imagery for land-use context, and a GIS platform capable of displaying these layers together." },
        { type: "h2", text: "Conclusion" },
        { type: "p", text: "Road safety audits will continue to play a central role in infrastructure safety management. But auditors who arrive on site without reviewing the crash history of the road they are auditing are operating with one eye closed. Data does not replace professional judgement — it directs it." },
      ],
    },
    {
      id: 3,
      title: "Pavement Condition Index: A Practical Guide for Highway Engineers",
      category: "Pavement",
      date: "September 2023",
      readTime: "8 min read",
      excerpt: "The Pavement Condition Index (PCI) is one of the most widely applied tools in pavement management. This guide covers methodology, common distress types, and how to build a maintenance prioritization framework from raw field data.",
      heroImage: "",
      heroImageAlt: "Pavement distress documentation in the field",
      heroImageCaption: "Field distress documentation is the foundation of a reliable PCI workflow.",
      fullContent: [
        { type: "p", text: "The Pavement Condition Index (PCI) is a numerical rating system standardised under ASTM D6433. It provides a single index — ranging from 0 (failed) to 100 (excellent) — that characterises pavement condition from field observation data alone. No structural testing equipment is required." },
        { type: "image", src: "", alt: "Pavement distress recording", caption: "Distress type, severity, and extent should be captured consistently during PCI surveys." },
        { type: "graphicGrid", items: [
          { label: "PCI Range", value: "0–100", note: "Failed to excellent condition" },
          { label: "Standard", value: "ASTM D6433", note: "Widely used PCI method" },
          { label: "Priority", value: "PCI × AADT", note: "Useful for maintenance ranking" }
        ]},
        { type: "h2", text: "The rating scale and condition bands" },
        { type: "p", text: "PCI values map to condition bands: 85–100 Good (routine maintenance only), 70–84 Satisfactory (minor preventive treatment), 55–69 Fair (preventive or minor rehabilitation), 40–54 Poor (rehabilitation required), 25–39 Very Poor (major rehabilitation), 10–24 Serious (reconstruction likely), 0–9 Failed (immediate reconstruction)." },
        { type: "h2", text: "Field survey methodology" },
        { type: "p", text: "The PCI survey divides the pavement into sample units — typically 230–930 m² for bituminous roads. The surveyor walks each unit and catalogues distress types by severity level (Low, Medium, High) and measured extent. ASTM D6433 defines 19 distress types for asphalt pavements, including alligator cracking, bleeding, rutting, potholes, ravelling, and weathering." },
        { type: "h2", text: "Calculating PCI: the corrected deduct value method" },
        { type: "p", text: "Once all deduct values are tallied, the PCI calculation: (1) List deduct values descending; (2) Determine count of deduct values > 2 (q); (3) Find Maximum Corrected Deduct Value (CDV); (4) Replace smallest deduct > 2 with 2, repeat until q = 1; (5) PCI = 100 − Maximum CDV. This iterative process accounts for the combined effect of multiple distresses." },
        { type: "h2", text: "Building a maintenance prioritization framework" },
        { type: "p", text: "Raw PCI scores are most useful combined with traffic volume data (AADT). A simple prioritization score: Priority = (100 − PCI) × log(AADT). Sections are then ranked into immediate, short-term, and medium-term maintenance programmes aligned with available budget." },
        { type: "h2", text: "Common field errors to avoid" },
        { type: "p", text: "Most frequent errors: under-reporting low-severity distresses (artificially high PCI), inconsistent severity classification between teams, and incorrect sample unit boundary definition. Training with photographic reference examples for each distress type significantly reduces inter-surveyor variability." },
      ],
    },
    {
      id: 4,
      title: "Two-Wheeler Crash Risk in India: Spatial Patterns and Systemic Failures",
      category: "Crash Analysis",
      date: "August 2023",
      readTime: "7 min read",
      excerpt: "Two-wheelers account for the majority of road fatalities in India, yet crash risk is non-randomly distributed. This piece draws from original spatial analysis to identify infrastructure and behavioural factors driving fatal two-wheeler crashes.",
      heroImage: "",
      heroImageAlt: "Transportation safety presentation session",
      heroImageCaption: "Crash risk communication improves when spatial patterns are shown visually.",
      fullContent: [
        { type: "p", text: "India recorded approximately 1.53 lakh road fatalities in 2021. Two-wheelers accounted for 44.5% — the largest share of any vehicle category. Yet crash risk is not uniformly distributed. It concentrates in specific spatial patterns reflecting infrastructure conditions, road user behaviour, and systemic failures in road design." },
        { type: "graphicGrid", items: [
          { label: "Vulnerable Group", value: "2W Users", note: "High exposure and injury severity" },
          { label: "Typical Risk Nodes", value: "Junctions", note: "Turning and speed conflicts dominate" },
          { label: "Need", value: "System Design", note: "Safer geometry and speed management" }
        ]},
        { type: "h2", text: "The spatial concentration of risk" },
        { type: "p", text: "Spatial analysis of five years of two-wheeler fatal crash records in Gujarat reveals marked clustering at specific location types: national and state highway junctions, mid-block sections with speed limit transitions, and road segments adjacent to institutional land uses. Moran's I spatial autocorrelation analysis confirms this clustering is statistically significant (I = 0.34, p < 0.001)." },
        { type: "h2", text: "Infrastructure factors at cluster locations" },
        { type: "p", text: "At junction locations, common infrastructure deficiencies include: inadequate sight distance, missing or faded edge markings, no delineation of conflict zones, and absence of turn channelisation. Mid-block clusters frequently occur at speed limit transition points where highway design speed changes but physical cues to drivers remain absent." },
        { type: "h2", text: "Behavioural and systemic factors" },
        { type: "p", text: "Infrastructure does not fully explain the pattern. Helmet non-use remains critical: 61% of two-wheeler fatalities in Gujarat crash records involved riders not wearing helmets. Alcohol impairment and night-time riding without adequate lighting are also over-represented in fatal records." },
        { type: "h2", text: "Implications for safety strategy" },
        { type: "p", text: "The spatial concentration argues for a blackspot-first investment strategy: identify the 5% of network locations responsible for 30–40% of fatalities, audit each systematically, and implement low-cost engineering measures before pursuing broader network improvements. This must be paired with sustained enforcement on helmet use and impaired riding." },
      ],
    },
    {
      id: 5,
      title: "From Traffic Counts to LOS: A Methodical Approach to Intersection Analysis",
      category: "Transportation Engineering",
      date: "July 2023",
      readTime: "6 min read",
      excerpt: "Level of Service analysis is foundational to traffic engineering, but the steps from raw count data to a defensible LOS recommendation are frequently compressed or oversimplified. This article documents a rigorous, reproducible methodology.",
      heroImage: "",
      heroImageAlt: "Transportation analysis workshop setting",
      heroImageCaption: "LOS interpretation becomes more meaningful when engineers visualize movement, delay, and queue patterns together.",
      fullContent: [
        { type: "p", text: "Level of Service (LOS) is the primary metric by which traffic engineers characterise intersection performance. It is widely used, broadly understood, and — in practice — frequently applied with insufficient rigour. The steps between collecting classified traffic counts and delivering a defensible LOS recommendation involve numerous methodological choices that significantly affect the output." },
        { type: "graphicGrid", items: [
          { label: "Base Unit", value: "Lane Group", note: "Not just the whole junction" },
          { label: "Need", value: "PHF", note: "Peak-hour factor affects delay" },
          { label: "Output", value: "LOS A–F", note: "Based on control delay" }
        ]},
        { type: "h2", text: "Step 1: Count design and data collection" },
        { type: "p", text: "Turning movement counts must be collected during the periods of interest — typically morning and evening peak hours. Manual counts require trained personnel at each approach, recording vehicle classifications and turning movements simultaneously. Video backup is strongly recommended. Counts should be collected on three representative weekdays (Tuesday–Thursday)." },
        { type: "h2", text: "Step 2: Volume adjustments" },
        { type: "p", text: "Raw counts must be adjusted for Peak Hour Factor (PHF = Peak Hour Volume / 4 × Peak 15-min Volume), seasonal variation, and PCU conversion using IRC-recommended equivalency factors (two-wheelers 0.5, buses 3.0, trucks 2.5 on urban roads)." },
        { type: "h2", text: "Step 3: Signal data collection" },
        { type: "p", text: "For signalised intersections, collect cycle length, phase sequence, and effective green time from signal controllers. Saturation flow rate is measured directly via queue discharge observation or estimated using HCM adjustment factors." },
        { type: "h2", text: "Step 4: LOS calculation" },
        { type: "p", text: "HCM 6th Edition calculates control delay per lane group. LOS thresholds: A ≤10 s/veh, B 10–20, C 20–35, D 35–55, E 55–80, F >80 s/veh. Intersection LOS is determined by the worst movement or approach — not the average." },
        { type: "h2", text: "Step 5: Sensitivity testing" },
        { type: "p", text: "Run sensitivity analysis on PHF, saturation flow, and heavy vehicle proportion. Report the range of LOS outcomes across plausible input variations. Recommendations should specify LOS improvements achievable through signal timing optimisation alone versus those requiring geometric modification." },
      ],
    },
    {
      id: 6,
      title: "Sustainable Urban Mobility: Lessons from SUMP Frameworks for Indian Cities",
      category: "Mobility / Sustainability",
      date: "June 2023",
      readTime: "9 min read",
      excerpt: "European Sustainable Urban Mobility Plans (SUMP) have been widely studied but rarely adapted with rigor to the Indian urban context. This piece identifies transferable principles and the critical adaptations required for Indian cities.",
      heroImage: "",
      heroImageAlt: "Urban mobility conference discussion",
      heroImageCaption: "Mobility frameworks are easier to understand when policy principles are paired with clear visual summaries.",
      fullContent: [
        { type: "p", text: "The Sustainable Urban Mobility Plan (SUMP) is a strategic planning instrument developed within the European urban transport policy context. Its application to Indian cities is growing, but the transfer of methodology requires more than cosmetic adaptation. This article examines what transfers well, what must be rethought, and what the Indian planning system needs to build from scratch." },
        { type: "graphicGrid", items: [
          { label: "Good Transfer", value: "Targets", note: "Quantified mobility goals matter" },
          { label: "Hard Part", value: "Governance", note: "Fragmented agencies in Indian cities" },
          { label: "Needed", value: "Observatories", note: "Continuous urban transport data" }
        ]},
        { type: "h2", text: "Transferable principles" },
        { type: "p", text: "Multimodal integration transfers meaningfully — Indian cities are intrinsically multimodal. Measurable objectives are both transferable and urgently needed: Indian urban transport planning documents frequently lack quantified targets. Safety integration, with Vision Zero-influenced thinking, represents a significant conceptual shift but directly applicable." },
        { type: "h2", text: "What must be fundamentally rethought" },
        { type: "p", text: "Participation processes: European SUMP relies on structured public consultation that requires fundamental redesign for Indian ward-level political dynamics and population heterogeneity. Data foundations: most Indian cities lack the household travel surveys and origin-destination matrices that SUMP assumes as baseline." },
        { type: "p", text: "Governance: European SUMP is implemented by unified metropolitan transport authorities. Indian cities are governed by fragmented arrangements — municipal corporations, state transport departments, urban development authorities, traffic police — with overlapping jurisdictions. SUMP for Indian cities must map this landscape explicitly." },
        { type: "h2", text: "What needs to be built from scratch" },
        { type: "p", text: "The Indian planning system needs city-level transport observatories — ongoing data collection producing comparable, time-series transport performance data. Capacity within urban local bodies to manage multi-year transport planning processes is also critically needed." },
        { type: "h2", text: "Conclusion" },
        { type: "p", text: "The SUMP framework offers Indian cities a valuable conceptual architecture — integrated, multimodal, data-driven, and outcome-focused. The cities that benefit most will be those that use SUMP principles as a starting point for building genuinely Indian planning processes, rooted in local data, local governance, and local mobility needs." },
      ],
    },

    // ── REPORT ──
    {
      id: 7,
      contentType: "report",
      title: "GIS-Based Road Safety Audit Report — NH Corridor, Gujarat",
      category: "Road Safety",
      date: "December 2023",
      readTime: "Technical Report · 48 pages",
      excerpt: "A comprehensive road safety audit report for a 45 km national highway corridor in Gujarat. Covers field observations, GIS crash mapping, infrastructure deficiency analysis, and prioritised engineering recommendations.",
      highlights: [
        "45 km NH corridor fully audited per IRC SP:88 methodology",
        "380+ geo-tagged infrastructure deficiency observations",
        "GIS crash density maps overlaid with road geometry data",
        "Prioritised intervention list for 9 high-risk pedestrian zones",
        "Engineering recommendations with cost-band estimates",
      ],
      tableOfContents: [
        "Executive Summary",
        "Study Area and Scope",
        "Methodology — IRC SP:88 Audit Framework",
        "Field Observations and Data Collection",
        "GIS Crash Analysis and Hotspot Mapping",
        "Infrastructure Deficiency Catalogue",
        "Pedestrian Risk Zone Assessment",
        "Junction Safety Evaluation",
        "Prioritised Recommendations",
        "Conclusion and Implementation Roadmap",
      ],
      pdfSrc: "assets/docs/Road_Safety_Audit_Report_NH_Corridor.pdf",
      pageCount: 48,
    },

    // ── PRESENTATION ──
    {
      id: 8,
      contentType: "presentation",
      title: "Network KDE for Crash Hotspot Identification — NCTE 2022 Conference Presentation",
      category: "GIS",
      date: "November 2022",
      readTime: "Presentation · 24 slides",
      excerpt: "Conference presentation delivered at the National Conference on Transportation Engineering (NCTE 2022). Introduces NKDE methodology, compares outputs with standard KDE, and presents case study results from Gujarat state highways.",
      highlights: [
        "Presented at NCTE 2022 — National Conference on Transportation Engineering",
        "Explains NKDE theory vs. standard KDE with visual comparisons",
        "Gujarat case study: 320 km of state highway analysed",
        "23% reduction in false-positive hotspot area vs. planar KDE",
        "Methodology replicable with ArcGIS Pro and Python",
      ],
      slideCount: 24,
      conference: "National Conference on Transportation Engineering (NCTE 2022)",
      conferenceDate: "November 2022",
      pdfSrc: "assets/docs/NKDE_Crash_Hotspot_NCTE2022.pdf",
    },

    // ── POSTER ──
    {
      id: 9,
      contentType: "poster",
      title: "Road Safety & GIS Research Poster",
      category: "Crash Analysis",
      date: "January 2024",
      readTime: "Poster",
      excerpt: "A visual poster summarising ongoing research in road safety, GIS methods, and network crash analysis.",
      highlights: [
        "Integrates crash data analysis with GIS visualisation",
        "Summarises key findings on NKDE crash hotspots",
        "Designed for academic conference poster sessions",
      ],
      pdfSrc: "assets/docs/Mihir_Koladiya_CV.pdf",
    },

    // ── SHORT NOTE ──
    {
      id: 10,
      contentType: "note",
      title: "Road Safety Audit: Quick Field Checklist for Highway Corridors",
      category: "Road Safety",
      date: "April 2026",
      readTime: "Short Note · 2 pages",
      excerpt: "A concise field-ready short note covering rapid checks for signs, shoulders, pedestrian exposure, roadside hazards, and immediate risk documentation during preliminary highway safety reviews.",
      highlights: [
        "Quick checklist for preliminary highway road safety reviews",
        "Useful for field visits, teaching demonstrations, and audit preparation",
        "Includes a compact risk-priority matrix for common deficiencies",
      ],
      pdfSrc: "assets/docs/Short_Note_Road_Safety_Audit_Checklist.pdf",
      pageCount: 2,
    },

    // ── BOOK GUIDE ──
    {
      id: 11,
      contentType: "book",
      title: "Transportation Engineering Reference Guide",
      category: "Books / Reference",
      date: "April 2026",
      readTime: "Reference Guide · 2 pages",
      excerpt: "A curated transportation engineering reference guide highlighting useful books, standards, and reading pathways for highway design, traffic engineering, road safety, and pavement evaluation.",
      highlights: [
        "Curated reading pathway for transportation engineering topics",
        "Maps books and standards to practical use cases",
        "Ready to replace later with your own book summary or study guide",
      ],
      pdfSrc: "assets/docs/Transportation_Engineering_Reference_Guide.pdf",
      pageCount: 2,
    },
  ],

  // ─────────────────────────────────────────
  // Add a real photo by saving it in assets/images/ and putting its path in "src"
  // (e.g. "assets/images/ncte-2022.jpg"). Items with an empty src show an illustration.
  GALLERY: [
    { src: "", caption: "Presenting at NCTE 2022", category: "Conference" },
    { src: "",  caption: "Highway field survey — NH corridor", category: "Field Work" },
    { src: "",  caption: "Pavement distress documentation", category: "Field Work" },
    { src: "",        caption: "ArcGIS crash hotspot analysis", category: "Research" },
    { src: "", caption: "IRC Technical Conference 2022", category: "Conference" },
    { src: "",  caption: "Traffic volume count survey", category: "Field Work" },
    { src: "",   caption: "GIS for Transportation workshop", category: "Workshop" },
    { src: "",        caption: "Research computing & spatial analysis", category: "Research" },
  ],

  // ─────────────────────────────────────────
  // REFERENCES (from CV — contact details shared on request only)
  // ─────────────────────────────────────────
  REFERENCES: [
    { name: "Prof. Shriniwas S. Arkatkar", title: "Professor", org: "SVNIT, Surat, Gujarat, India", relation: "Project Principal Investigator" },
    { name: "Dr. Pankaj S. Prajapati", title: "Associate Professor", org: "The M.S. University of Baroda, Vadodara, Gujarat, India", relation: "Dissertation Supervisor / Research Guide" },
  ],

  // ─────────────────────────────────────────
  // CONTACT
  // ─────────────────────────────────────────
  CONTACT: {
    email: "koladiyamihir5212@gmail.com",
    phone: "+91 9904050019",
    location: "Surat, Gujarat, India",
    availability: "Open to research collaborations, road safety consultancy, and PhD opportunities.",
  },

  // ─────────────────────────────────────────
  // LINKS (leave a link empty "" to hide it)
  // ─────────────────────────────────────────
  LINKS: {
    linkedin:      "https://linkedin.com/in/mihir-koladiya",
    researchgate:  "",
    googleScholar: "",
    orcid:         "",
    github:        "",
  },

};
