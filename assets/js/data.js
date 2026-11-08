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
    tagline: "Engineering safer roads through spatial analysis, crash data, and evidence-based transport research.",
    shortBio: "Transportation engineer specializing in road safety analysis, GIS-based crash hotspot identification, and highway infrastructure evaluation. Bridging field engineering practice with rigorous academic research in sustainable mobility and traffic safety.",
    longBio: `Mihir Koladiya is a highway and transportation engineer with a focused research track in road safety, crash analysis, and geospatial transportation analytics. His work integrates field engineering practice with spatial data science — applying tools such as ArcGIS, QGIS, and Python to identify crash patterns, evaluate road infrastructure risk, and inform evidence-based safety interventions.

His research interests span Kernel Density Estimation (KDE), Network Kernel Density Estimation (NKDE), black spot identification, and sustainable mobility systems. He has contributed to peer-reviewed publications and presented at national transportation engineering conferences, positioning him at the intersection of applied engineering and academic research.

Mihir's professional objective is to contribute to transportation systems that are safer, smarter, and more equitable — whether through industry consulting, research collaboration, or advanced academic study.`,
    location: "Surat, Gujarat, India",
    email: "mihir.koladiya@example.com",
    phone: "+91 XXXXX XXXXX",
    cvFile: "assets/docs/cv/Mihir_Koladiya_CV.pdf",
    photo: "assets/images/profile/profile.jpg",
  },

  // ─────────────────────────────────────────
  // HIGHLIGHTS / STATS
  // ─────────────────────────────────────────
  HIGHLIGHTS: [
    { value: 2,  suffix: "+", label: "Years Experience",     icon: "⚙" },
    { value: 1, suffix: "+", label: "Engineering Projects", icon: "🛣" },
    { value: 2,  suffix: "+", label: "Publications",         icon: "📄" },
    { value: 3,  suffix: "+", label: "Conferences",          icon: "🎤" },
  ],

  // ─────────────────────────────────────────
  // EXPERIENCE
  // ─────────────────────────────────────────
  EXPERIENCE: [
    {
      role: "Transportation Engineering Consultant",
      org: "Independent Practice",
      period: "2023 – Present",
      type: "Professional",
      description: "Providing technical consultation on highway design, traffic safety audits, and GIS-based crash analysis for road improvement projects across Gujarat.",
      highlights: ["Road safety audits", "Crash pattern analysis", "Highway design review"],
    },
    {
      role: "Research Associate – Road Safety",
      org: "Transportation Research Group",
      period: "2022 – 2023",
      type: "Research",
      description: "Conducted spatial analysis of crash data using NKDE and KDE methods to identify high-risk zones along state highways. Contributed to journal publications and conference presentations.",
      highlights: ["NKDE-based hotspot mapping", "Crash severity modeling", "GIS data processing"],
    },
    {
      role: "Graduate Research Assistant",
      org: "Civil Engineering Department, SVNIT",
      period: "2021 – 2022",
      type: "Research",
      description: "Assisted in data collection, traffic volume surveys, and pavement condition assessment for multiple highway corridor studies across Surat and surrounding districts.",
      highlights: ["Traffic volume surveys", "Pavement condition index", "Field data collection"],
    },
  ],

  // ─────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────
  EDUCATION: [
    {
      degree: "M.Tech – Transportation Engineering",
      institution: "Sardar Vallabhbhai National Institute of Technology (SVNIT)",
      location: "Surat, Gujarat",
      period: "2021 – 2023",
      grade: "CGPA: 8.8 / 10",
      thesis: "Spatial Analysis of Road Crash Hotspots Using Network Kernel Density Estimation",
    },
    {
      degree: "B.E. – Civil Engineering",
      institution: "Gujarat Technological University",
      location: "Gujarat, India",
      period: "2017 – 2021",
      grade: "CGPA: 8.2 / 10",
      thesis: "Evaluation of Pavement Condition Index on Urban Road Sections",
    },
  ],

  // ─────────────────────────────────────────
  // SKILLS
  // ─────────────────────────────────────────
  SKILLS: {
    "Engineering": [
      "Highway Design", "Traffic Engineering", "Pavement Analysis",
      "Road Safety Audits", "Geometric Design", "Traffic Impact Assessment"
    ],
    "GIS & Spatial": [
      "ArcGIS Pro", "QGIS", "Network Analysis",
      "KDE / NKDE", "Spatial Statistics", "Crash Mapping"
    ],
    "Data & Programming": [
      "Python (Pandas, NumPy, Matplotlib)", "SPSS", "R (Basic)",
      "Excel (Advanced)", "AutoCAD", "Civil 3D"
    ],
    "Research": [
      "Crash Data Analysis", "Statistical Modeling", "Literature Review",
      "Academic Writing", "Peer Review"
    ],
  },

  // ─────────────────────────────────────────
  // CERTIFICATIONS
  // ─────────────────────────────────────────
  CERTIFICATIONS: [
    {
      title: "GIS for Transportation",
      org: "Esri Training",
      year: "2023",
      photo: "assets/images/certificates/cert-gis.svg",
    },
    {
      title: "Road Safety Audit – Level 1",
      org: "IRC / MoRTH Guidelines",
      year: "2022",
      photo: "assets/images/certificates/cert-rsa.svg",
    },
    {
      title: "Python for Data Science",
      org: "NPTEL / IIT",
      year: "2022",
      photo: "assets/images/certificates/cert-python.svg",
    },
    {
      title: "AutoCAD Civil 3D Fundamentals",
      org: "Autodesk",
      year: "2021",
      photo: "assets/images/certificates/cert-autocad.svg",
    },
  ],

  // ─────────────────────────────────────────
  // RESEARCH AREAS
  // ─────────────────────────────────────────
  RESEARCH_AREAS: [
    {
      icon: "🛑",
      title: "Road Safety & Crash Analysis",
      desc: "Investigating crash contributing factors, severity determinants, and spatial distribution of road accidents using statistical and geospatial methods.",
    },
    {
      icon: "🗺",
      title: "GIS & Geospatial Analytics",
      desc: "Applying Kernel Density Estimation, NKDE, and spatial clustering to identify crash hotspots and support infrastructure safety improvements.",
    },
    {
      icon: "🛣",
      title: "Highway & Traffic Engineering",
      desc: "Evaluation of highway geometric design, traffic flow modeling, Level of Service analysis, and corridor performance assessment.",
    },
    {
      icon: "🌱",
      title: "Sustainable Mobility",
      desc: "Exploring non-motorized transport, pedestrian safety, and sustainable urban mobility frameworks aligned with modern transportation planning goals.",
    },
    {
      icon: "📊",
      title: "Pavement Engineering",
      desc: "Pavement Condition Index (PCI) assessment, distress cataloguing, and maintenance prioritization for urban and rural road networks.",
    },
    {
      icon: "🔬",
      title: "Transport Data Science",
      desc: "Leveraging Python, SPSS, and spatial tools for advanced transportation data analysis, regression modeling, and predictive safety analytics.",
    },
  ],

  // ─────────────────────────────────────────
  // PROJECTS
  // ─────────────────────────────────────────
  PROJECTS: [
    {
      id: 1,
      title: "NKDE-Based Crash Hotspot Identification on State Highways",
      category: "Road Safety",
      year: "2023",
      description: "Applied Network Kernel Density Estimation (NKDE) to identify statistically significant crash hotspots along state highways in Gujarat. Results were validated against traditional KDE outputs and police crash records.",
      fullDescription: `This project applied Network Kernel Density Estimation (NKDE) to map road crash hotspots across selected state highway corridors in Gujarat. Unlike standard KDE, which spreads density across a planar surface, NKDE constrains the density estimation to the road network itself — producing more spatially accurate and operationally meaningful hotspot maps.

Crash records from five years of police-reported accident data were geo-coded and integrated into ArcGIS Pro. The NKDE outputs were then compared against traditional KDE maps and validated using independent crash severity records. High-density crash zones were overlaid with road geometry, junction type, speed limits, and land-use data to identify contributing infrastructure factors.

The project resulted in a ranked list of high-risk segments with recommended safety intervention types — including geometric improvements, signage upgrades, and speed management measures — prioritized by crash frequency and severity index.`,
      objectives: [
        "Compare NKDE and KDE hotspot outputs on the same highway network",
        "Identify statistically significant crash clusters using bandwidth sensitivity analysis",
        "Correlate hotspot locations with road geometry and infrastructure deficiencies",
        "Produce a ranked safety intervention priority list for highway authorities",
      ],
      outcomes: [
        "Identified 14 primary hotspot zones across 320 km of state highway",
        "NKDE outperformed KDE in precision — 23% reduction in false-positive hotspot area",
        "Results published in a peer-reviewed transportation safety journal",
        "Framework adopted for a follow-up GIS safety audit study",
      ],
      tools: ["ArcGIS Pro", "Python", "NKDE", "Spatial Statistics"],
      status: "Completed",
      featured: true,
      link: "",
    },
    {
      id: 2,
      title: "GIS-Based Road Safety Audit – NH Corridor",
      category: "GIS",
      year: "2023",
      description: "Conducted a comprehensive GIS-integrated road safety audit of a 45 km national highway corridor. Mapped infrastructure deficiencies, pedestrian risk zones, and junction conflicts using QGIS and field data.",
      fullDescription: `This study conducted a systematic road safety audit of a 45 km national highway corridor using an integrated GIS workflow. The audit protocol was structured around IRC SP:88 guidelines, supplemented by field observation, video recording at high-risk segments, and GPS-tagged infrastructure mapping.

All field data — including road markings, signage condition, shoulder width, drainage, lighting, and junction geometry — was logged and geo-referenced. QGIS was used to build a spatial database of infrastructure attributes that was analysed against historical crash records to identify risk-correlated deficiencies.

Pedestrian risk zones were assessed using a proximity-to-settlement analysis combined with mid-block crossing identification. Junction conflict zones were mapped using turning movement counts and gap acceptance data. The final audit report included a geo-visualised risk map, prioritised deficiency list, and engineering recommendations for each segment category.`,
      objectives: [
        "Conduct field-based road safety audit following IRC SP:88 methodology",
        "Build a geo-referenced infrastructure attribute database for the corridor",
        "Identify pedestrian risk zones and junction conflict areas",
        "Produce actionable safety recommendations with spatial reference",
      ],
      outcomes: [
        "Audited 45 km corridor with 380+ geo-tagged infrastructure observations",
        "Identified 9 high-risk pedestrian exposure zones near settlements",
        "Flagged 12 junction locations with inadequate sight distance or lane markings",
        "Delivered GIS-based audit report accepted by the client highway authority",
      ],
      tools: ["QGIS", "ArcGIS", "Field Survey", "AutoCAD"],
      status: "Completed",
      featured: true,
      link: "",
    },
    {
      id: 3,
      title: "Pavement Condition Assessment – Urban Roads, Surat",
      category: "Pavement",
      year: "2022",
      description: "Assessed Pavement Condition Index (PCI) across 32 urban road sections in Surat using ASTM D6433 methodology. Developed a maintenance prioritization framework based on distress severity and extent.",
      fullDescription: `This project assessed the structural and functional condition of 32 urban road sections across Surat Municipal Corporation limits using the Pavement Condition Index (PCI) methodology as per ASTM D6433. The study covered arterial and collector roads with a combined length of approximately 48 km.

Field teams systematically walked each road section, cataloguing distress types (alligator cracking, rutting, potholes, ravelling, bleeding, etc.) by severity level and extent. Deduct values were calculated for each distress and combined into PCI scores using the standard correction curve methodology.

The resulting PCI scores were spatially mapped in QGIS, enabling a network-level view of pavement condition. Sections were classified into maintenance categories — routine maintenance, preventive treatment, rehabilitation, or reconstruction — based on PCI thresholds. A maintenance prioritization matrix was developed incorporating traffic volume (AADT) and socioeconomic road importance factors.`,
      objectives: [
        "Survey 32 urban road sections using ASTM D6433 PCI methodology",
        "Catalogue distress types, severity, and extent for each section",
        "Map PCI scores spatially across the Surat road network",
        "Develop a maintenance prioritization framework for the municipal authority",
      ],
      outcomes: [
        "Completed PCI assessment for 48 km of urban roads in Surat",
        "Average network PCI: 54 (Poor condition band) — 38% of sections below PCI 40",
        "Maintenance priority map delivered to Surat Municipal Corporation",
        "Framework cited in follow-up thesis research on urban pavement management",
      ],
      tools: ["PCI Method", "Excel", "AutoCAD", "Field Survey"],
      status: "Completed",
      featured: true,
      link: "",
    },
    {
      id: 4,
      title: "Traffic Volume Study & Level of Service Analysis",
      category: "Traffic",
      year: "2022",
      description: "Performed classified traffic volume counts at 6 key intersections. Estimated Level of Service (LOS) using HCM methodology and recommended intersection capacity improvements.",
      fullDescription: `This study conducted classified traffic volume counts at 6 signalised and unsignalised intersections in the Surat urban area during peak and off-peak periods. Turning movement counts were recorded using manual counting teams with video backup for validation.

Volume data was processed to derive peak hour factors, directional splits, and vehicle composition ratios. Level of Service (LOS) was estimated using HCM 6th Edition methodology for signalised intersections, with cycle length and phase timing data collected from traffic signal controllers.

Microsimulation was conducted in VISSIM to validate LOS estimates and test alternative signal timing plans. Two intersections showed LOS E and F conditions during evening peak. Recommendations included revised signal phasing, channelisation improvements, and one intersection geometry redesign.`,
      objectives: [
        "Collect classified turning movement counts at 6 urban intersections",
        "Estimate Level of Service using HCM 6th Edition methodology",
        "Validate LOS with VISSIM microsimulation",
        "Recommend signal timing and geometric improvements",
      ],
      outcomes: [
        "Two intersections operating at LOS E/F during peak hours — redesign recommended",
        "Revised signal timing plans reduced average delay by 18% in simulation",
        "Channelisation proposals developed for 3 heavily conflicted intersections",
        "Report submitted to urban local body for infrastructure planning input",
      ],
      tools: ["HCM 6th Edition", "VISSIM", "Excel", "AutoCAD"],
      status: "Completed",
      featured: false,
      link: "",
    },
    {
      id: 5,
      title: "Crash Severity Prediction Using Machine Learning",
      category: "Data / ML",
      year: "2023",
      description: "Developed a crash severity prediction model using Random Forest and logistic regression on historical crash records from Gujarat. Model achieved 82% accuracy for fatal/non-fatal classification.",
      fullDescription: `This ongoing research project develops predictive models for road crash severity classification using historical accident records from Gujarat state. The dataset includes 5,000+ crash records covering attributes such as road type, weather conditions, time of day, vehicle type, speed limit zone, driver age, and crash location.

Preprocessing involved handling class imbalance (fatal crashes represent ~14% of records) using SMOTE oversampling, encoding categorical variables, and feature selection via permutation importance. Three model architectures were evaluated: logistic regression (baseline), Random Forest, and Gradient Boosting.

Random Forest achieved 82% accuracy and 0.79 AUC on the test set for fatal vs. non-fatal classification. Key predictive features were speed limit zone, vehicle type, and time-of-day band. Model interpretation used SHAP values to identify variable contributions and ensure results were explainable to transport authority stakeholders.`,
      objectives: [
        "Build a binary crash severity classifier (fatal / non-fatal) from Gujarat crash records",
        "Address class imbalance using SMOTE and evaluate multiple ML architectures",
        "Identify key contributing factors using SHAP-based model interpretation",
        "Produce an explainable model suitable for policy communication",
      ],
      outcomes: [
        "Random Forest model: 82% accuracy, 0.79 AUC on held-out test set",
        "SHAP analysis identified speed limit zone and vehicle type as top severity predictors",
        "Under review for submission to Transportation Research Part F",
        "Model framework adaptable to other Indian state highway crash datasets",
      ],
      tools: ["Python", "Scikit-learn", "Pandas", "SPSS"],
      status: "In Progress",
      featured: false,
      link: "",
    },
    {
      id: 6,
      title: "Pedestrian Safety Analysis at Mid-Block Crossings",
      category: "Road Safety",
      year: "2022",
      description: "Evaluated pedestrian conflict events at 10 uncontrolled mid-block crossings using video data and surrogate safety measures. Recommended geometric and signage interventions.",
      fullDescription: `This study evaluated pedestrian–vehicle conflict exposure at 10 uncontrolled mid-block crossings in Surat across mixed land-use zones including commercial, residential, and school-proximity areas. Video cameras were installed at each crossing for a one-week data collection period during term time.

Pedestrian conflict events were extracted from video using the Surrogate Safety Assessment Model (SSAM), which identifies post-encroachment time (PET) and time-to-collision (TTC) events. Conflict severity was classified using established thresholds. Pedestrian behaviour metrics — including gap acceptance, crossing speed, and hesitation events — were also tabulated.

Results showed significant variation in conflict rates across site types, with school-proximity crossings recording 3.4× higher serious conflict rates than commercial locations. Geometric interventions (raised crosswalks, refuge islands) and signage improvements were ranked by cost-effectiveness and recommended to the municipal traffic engineering cell.`,
      objectives: [
        "Quantify pedestrian conflict events at 10 mid-block crossings using SSAM",
        "Analyse pedestrian gap acceptance behaviour and crossing speed",
        "Identify site characteristics correlated with elevated conflict rates",
        "Recommend prioritised geometric and signage interventions",
      ],
      outcomes: [
        "2,400+ pedestrian crossing events logged across 10 sites over one week",
        "School-proximity crossings showed 3.4× higher serious conflict rates",
        "Raised crosswalk intervention recommended at 4 high-priority sites",
        "Findings presented to Surat traffic engineering cell for infrastructure planning",
      ],
      tools: ["Video Analysis", "SSAM", "AutoCAD", "Excel"],
      status: "Completed",
      featured: false,
      link: "",
    },
    {
      id: 7,
      title: "Sustainable Urban Mobility Plan – Small City Framework",
      category: "Transportation Planning",
      year: "2023",
      description: "Developed a conceptual Sustainable Urban Mobility Plan (SUMP) framework for a mid-size Indian city, integrating NMT infrastructure, transit priority, and land-use connectivity analysis.",
      fullDescription: `This project developed a Sustainable Urban Mobility Plan (SUMP) framework tailored to the constraints and context of a mid-size Indian city (population 300,000–800,000). European SUMP methodology was reviewed and critically assessed for applicability, with significant adaptations made for Indian urban governance structures, informal transport modes, and data availability limitations.

The framework integrates four thematic pillars: non-motorised transport (NMT) infrastructure planning, public transit priority corridors, land-use–transport connectivity, and road safety integration. GIS-based accessibility analysis was used to identify underserved areas and prioritise NMT network investment. Stakeholder analysis mapped the institutional roles of municipal corporations, state transport departments, and urban development authorities.

The resulting framework document provides a replicable planning methodology with decision trees, data collection templates, and evaluation criteria adapted for Indian planning cycles.`,
      objectives: [
        "Critically adapt European SUMP methodology to the Indian small-city context",
        "Develop a GIS-based accessibility analysis framework for NMT prioritisation",
        "Map institutional stakeholder roles and governance pathways",
        "Produce a replicable planning framework document",
      ],
      outcomes: [
        "Framework document covering NMT, transit priority, land-use, and road safety pillars",
        "GIS accessibility analysis template adaptable to any Indian city dataset",
        "Stakeholder mapping matrix covering 12 institutional actor types",
        "Framework presented at a national urban mobility planning workshop",
      ],
      tools: ["GIS", "Python", "Literature Review", "Stakeholder Analysis"],
      status: "Completed",
      featured: false,
      link: "",
    },
    {
      id: 8,
      title: "Spatial Analysis of Two-Wheeler Fatal Crash Patterns",
      category: "Research",
      year: "2023",
      description: "Investigated spatial clustering of two-wheeler fatal crashes using point pattern analysis and road network proximity metrics. Published in a peer-reviewed transportation journal.",
      fullDescription: `This research investigated the spatial distribution and clustering of two-wheeler fatal crashes across a study region in Gujarat using point pattern analysis and road network proximity metrics. Two-wheelers account for approximately 44% of road fatalities in India, yet their spatial crash patterns remain understudied at the corridor level.

Geo-coded fatal crash records involving two-wheelers were subjected to spatial autocorrelation analysis (Moran's I), kernel density estimation, and nearest-neighbour analysis to identify clustering intensity and scale. Road network attributes — including road class, number of lanes, speed limit, and junction proximity — were extracted at each crash location using ArcGIS proximity tools.

Logistic regression modelling identified road class, junction proximity (within 50 m), and speed limit zone as significant predictors of two-wheeler fatality clustering. Results were published in a peer-reviewed transportation safety journal and contribute a spatial analysis framework applicable to other Indian states with comparable crash data.`,
      objectives: [
        "Characterise spatial clustering of two-wheeler fatal crashes using point pattern methods",
        "Identify road network attributes correlated with fatal crash cluster locations",
        "Apply logistic regression to model fatality cluster probability",
        "Contribute a replicable spatial analysis framework for Indian highway safety research",
      ],
      outcomes: [
        "Significant spatial clustering confirmed — Moran's I = 0.34, p < 0.001",
        "Junction proximity (≤50 m) associated with 2.1× higher fatal cluster probability",
        "Published in peer-reviewed journal — Accident Analysis & Prevention",
        "Framework cited in subsequent road safety research in the region",
      ],
      tools: ["ArcGIS", "Python", "Statistical Analysis", "SPSS"],
      status: "Published",
      featured: false,
      link: "",
    },
  ],

  // ─────────────────────────────────────────
  // PUBLICATIONS
  // ─────────────────────────────────────────
  PUBLICATIONS: {
    journal: [
      {
        title: "Spatial Identification of Road Crash Hotspots Using Network Kernel Density Estimation: A Case Study of Gujarat State Highways",
        authors: "Koladiya, M., & [Co-author]",
        journal: "Journal of Transportation Safety & Security",
        year: "2023",
        status: "Published",
        doi: "10.xxxx/jtss.2023.xxxxx",
        link: "",
      },
      {
        title: "Two-Wheeler Fatal Crash Pattern Analysis Using GIS-Based Spatial Methods",
        authors: "Koladiya, M., [Co-author], & [Co-author]",
        journal: "Accident Analysis & Prevention",
        year: "2023",
        status: "Published",
        doi: "10.xxxx/aap.2023.xxxxx",
        link: "",
      },
    ],
    conference: [
      {
        title: "GIS-Integrated Road Safety Audit Framework for National Highway Corridors in India",
        authors: "Koladiya, M., & [Co-author]",
        conference: "National Conference on Transportation Engineering (NCTE 2022)",
        year: "2022",
        status: "Presented",
        doi: "",
        link: "",
      },
      {
        title: "Pavement Distress Classification and Maintenance Prioritization Using PCI Methodology",
        authors: "Koladiya, M.",
        conference: "Indian Roads Congress – Annual Technical Conference 2022",
        year: "2022",
        status: "Presented",
        doi: "",
        link: "",
      },
    ],
    inProgress: [
      {
        title: "Crash Severity Prediction at Rural Highways Using Ensemble Machine Learning Models",
        authors: "Koladiya, M., & [Co-author]",
        journal: "Transportation Research Part F",
        year: "2024",
        status: "Under Review",
        doi: "",
        link: "",
      },
    ],
    peerReview: [
      {
        title: "Reviewer",
        journal: "Journal of Safety Research (Elsevier)",
        year: "2023",
        note: "Reviewed 2 manuscripts on road crash severity and pedestrian safety.",
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
      heroImage: "assets/images/gallery/gallery-gis-1.svg",
      heroImageAlt: "ArcGIS-based crash hotspot analysis workspace",
      heroImageCaption: "Crash hotspot analysis workflow in a GIS environment.",
      fullContent: [
        { type: "p", text: "When we apply Kernel Density Estimation to road crash data, we are asking a fundamentally spatial question: where does crash risk concentrate? Standard KDE answers this by spreading density across a planar surface — treating every square metre of space equally. But road crashes don't happen in fields. They happen on a network." },
        { type: "image", src: "assets/images/gallery/gallery-gis-1.svg", alt: "GIS road crash analysis", caption: "Spatial crash analysis becomes more reliable when density is constrained to the road network." },
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
      heroImage: "assets/images/gallery/gallery-fieldwork-1.svg",
      heroImageAlt: "Highway field survey for road safety audit",
      heroImageCaption: "Field safety audits become stronger when linked with crash and GIS evidence.",
      fullContent: [
        { type: "p", text: "A road safety audit is, in principle, a systematic examination of a road or traffic scheme to identify safety problems and recommend corrective measures. In practice, audit quality varies enormously — and the gap frequently comes down to how much data the auditor actually uses." },
        { type: "image", src: "assets/images/gallery/gallery-fieldwork-1.svg", alt: "Road safety audit field visit", caption: "On-site audits should be supported by prior crash records and mapped risk evidence." },
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
      heroImage: "assets/images/gallery/gallery-fieldwork-2.svg",
      heroImageAlt: "Pavement distress documentation in the field",
      heroImageCaption: "Field distress documentation is the foundation of a reliable PCI workflow.",
      fullContent: [
        { type: "p", text: "The Pavement Condition Index (PCI) is a numerical rating system standardised under ASTM D6433. It provides a single index — ranging from 0 (failed) to 100 (excellent) — that characterises pavement condition from field observation data alone. No structural testing equipment is required." },
        { type: "image", src: "assets/images/gallery/gallery-fieldwork-2.svg", alt: "Pavement distress recording", caption: "Distress type, severity, and extent should be captured consistently during PCI surveys." },
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
      heroImage: "assets/images/gallery/gallery-conference-1.svg",
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
      heroImage: "assets/images/gallery/gallery-workshop-1.svg",
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
      heroImage: "assets/images/gallery/gallery-conference-2.svg",
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
      pdfSrc: "assets/docs/reports/Road_Safety_Audit_Report_NH_Corridor.pdf",
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
      pdfSrc: "assets/docs/publications/NKDE_Crash_Hotspot_NCTE2022.pdf",
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
      pdfSrc: "assets/docs/cv/Mihir_Koladiya_CV.pdf",
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
      pdfSrc: "assets/docs/reports/Short_Note_Road_Safety_Audit_Checklist.pdf",
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
      pdfSrc: "assets/docs/reports/Transportation_Engineering_Reference_Guide.pdf",
      pageCount: 2,
    },
  ],

  // ─────────────────────────────────────────
  GALLERY: [
    { src: "assets/images/gallery/gallery-conference-1.svg", caption: "Presenting at NCTE 2022", category: "Conference" },
    { src: "assets/images/gallery/gallery-fieldwork-1.svg",  caption: "Highway field survey — NH corridor", category: "Field Work" },
    { src: "assets/images/gallery/gallery-fieldwork-2.svg",  caption: "Pavement distress documentation", category: "Field Work" },
    { src: "assets/images/gallery/gallery-gis-1.svg",        caption: "ArcGIS crash hotspot analysis", category: "Research" },
    { src: "assets/images/gallery/gallery-conference-2.svg", caption: "IRC Technical Conference 2022", category: "Conference" },
    { src: "assets/images/gallery/gallery-fieldwork-3.svg",  caption: "Traffic volume count survey", category: "Field Work" },
    { src: "assets/images/gallery/gallery-workshop-1.svg",   caption: "GIS for Transportation workshop", category: "Workshop" },
    { src: "assets/images/gallery/gallery-lab-1.svg",        caption: "Research computing & spatial analysis", category: "Research" },
  ],

  // ─────────────────────────────────────────
  // CONTACT
  // ─────────────────────────────────────────
  CONTACT: {
    email: "mihir.koladiya@example.com",
    phone: "+91 XXXXX XXXXX",
    location: "Surat, Gujarat, India",
    availability: "Open to research collaborations, consultancy inquiries, and PhD opportunities.",
  },

  // ─────────────────────────────────────────
  // LINKS
  // ─────────────────────────────────────────
  LINKS: {
    linkedin:      "https://linkedin.com/in/mihirkoladiya",
    researchgate:  "https://researchgate.net/profile/Mihir_Koladiya",
    googleScholar: "https://scholar.google.com/citations?user=XXXXXXXX",
    orcid:         "https://orcid.org/0000-0000-0000-0000",
    github:        "https://github.com/mihirkoladiya",
  },

};
