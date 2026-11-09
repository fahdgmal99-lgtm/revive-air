/**
 * REVIVE AIR — Portfolio & Media Configuration File
 * 
 * Instructions for adding real photos and videos:
 * ---------------------------------------------------------------------
 * 1. Put your images into the corresponding folder:
 *    - AC Copper Piping:      assets/images/projects/piping/
 *    - Split AC:              assets/images/projects/split-ac/
 *    - Concealed AC:          assets/images/projects/concealed-ac/
 *    - Maintenance:           assets/images/projects/maintenance/
 *    - Water Filters:         assets/images/projects/water-filters/
 * 
 * 2. Put your videos into:    assets/videos/projects/
 * 
 * 3. Update the projects list below:
 *    - Set "hasRealImage: true" when you have placed a real photo.
 *    - Provide the exact path in "image" (e.g., 'assets/images/projects/piping/site-01.jpg').
 *    - You can add or remove items from the array anytime.
 */

const PROJECTS_DATA = [
  {
    id: 'proj-concealed-palm-hills',
    category: 'concealed-ac',
    projectType: 'residential',
    title: {
      ar: 'تأسيس وتوريد وتركيب 4 أجهزة تكييف كونسيلد كارير (Carrier) لفيلا بكمبوند بالم هيلز',
      en: 'Piping Infrastructure, Supply & Installation of 4 Carrier Concealed AC Units — Palm Hills Villa'
    },
    location: {
      ar: 'كمبوند بالم هيلز، الشيخ زايد',
      en: 'Palm Hills, Sheikh Zayed'
    },
    description: {
      ar: 'تنفيذ هندسي متكامل لمنظومة التكييف الكونسيلد المخفي شمل: تمديد واختبار مسارات النحاس الجنوب إفريقي الأصلي مع عوازل الأرموفليكس وشبكة صرف المياه، توريد وتثبيت 4 أجهزة كونسيلد ماركة كارير (Carrier) أسفل الأسقف الخرسانية بمثبتات مانعة للاهتزاز، وتركيب مخارج الهواء الخطية (Linear Slot Diffusers) بدقة هندسية تحقق أقصى درجات الهدوء وتتناغم بجمالية مع الديكورات المعمارية للفيلا.',
      en: 'Turnkey HVAC engineering project including: heavy-duty certified South African copper piping with Armaflex insulation and concealed drainage, rigid suspension of 4 Carrier concealed units with anti-vibration damping, and precision architectural linear slot diffusers delivering ultra-quiet, balanced cooling integrated seamlessly with luxury ceiling interior designs.'
    },
    completionDate: '2024',
    image: 'assets/images/projects/concealed-ac/palm-hills-villa/linear-diffuser-01.jpg',
    hasRealImage: true,
    additionalImages: [
      {
        url: 'assets/images/projects/concealed-ac/palm-hills-villa/linear-diffuser-01.jpg',
        caption: {
          ar: 'المظهر المعماري الأنيق لجريلات الهواء الخطية (Linear Slot Diffusers) المدمجة بالأسقف',
          en: 'Architectural linear slot diffuser integrated flush into modern ceiling'
        }
      },
      {
        url: 'assets/images/projects/concealed-ac/palm-hills-villa/carrier-unit-installation.jpg',
        caption: {
          ar: 'تثبيت وحدة كونسيلد كارير (Carrier) أسفل الخرسانة مع العزل الحراري التام',
          en: 'Carrier concealed indoor unit suspended from slab with full thermal insulation'
        }
      },
      {
        url: 'assets/images/projects/concealed-ac/palm-hills-villa/carrier-unit-piping.jpg',
        caption: {
          ar: 'تمديد مسارات النحاس المعزولة وتأمين خراطيم صرف المياه والأسلاك الكهربائية',
          en: 'Insulated copper lines, drainage lines, and protected wiring conduits'
        }
      },
      {
        url: 'assets/images/projects/concealed-ac/palm-hills-villa/carrier-indoor-coil.jpg',
        caption: {
          ar: 'الكويل الداخلي الذهبي عالي التحمل ومسارات الصرف قبل أعمال تقفيل الجبس بورد',
          en: 'High-durability indoor coil and level-calibrated drainage rough-in'
        }
      },
      {
        url: 'assets/images/projects/concealed-ac/palm-hills-villa/linear-diffuser-02.jpg',
        caption: {
          ar: 'توزيع هواء متجانس وصامت يتناسق بانسيابية مع التجاليد الخشبية والديكور الداخلي',
          en: 'Balanced airflow distribution complementing interior wood paneling and lighting'
        }
      }
    ],
    video: null,
    alt: {
      ar: 'تأسيس وتوريد وتركيب 4 أجهزة كونسيلد كارير فيلا بالم هيلز الشيخ زايد - ريفايف إير',
      en: 'Installation of 4 Carrier Concealed AC Units at Palm Hills Villa - REVIVE AIR'
    }
  },
  {
    id: 'proj-piping-01',
    category: 'piping',
    projectType: 'residential',
    title: {
      ar: 'تأسيس مواسير التكييف النحاس',
      en: 'AC Copper Piping Infrastructure'
    },
    location: {
      ar: 'مدينة الشيخ زايد و6 أكتوبر',
      en: 'Sheikh Zayed & 6th of October City'
    },
    description: {
      ar: 'جزء من أعمال تاسيس مواسير التكيف من فريقنا في مدينة الشيخ زايد و6 أكتوبر',
      en: 'Part of HVAC copper piping installation works executed by our team in Sheikh Zayed and 6th of October City.'
    },
    completionDate: '2024',
    image: 'assets/images/projects/piping/piping-sheikh-zayed-6october-02.jpg',
    hasRealImage: true,
    additionalImages: [
      {
        url: 'assets/images/projects/piping/piping-sheikh-zayed-6october-02.jpg',
        caption: {
          ar: 'تجهيز وتمديد مسارات مواسير التكييف النحاس المعزولة بالأرضيات والجدران',
          en: 'Floor and wall insulated HVAC copper piping line rough-in'
        }
      },
      {
        url: 'assets/images/projects/piping/piping-sheikh-zayed-6october-01.jpg',
        caption: {
          ar: 'تمديد مسار النحاس رأسياً داخل الحائط وتأمين مواسير الصرف والتغذية الكهربائية',
          en: 'Vertical wall-embedded copper piping conduit, drainage, and electrical lines'
        }
      },
      {
        url: 'assets/images/projects/piping/piping-sheikh-zayed-6october-03.jpg',
        caption: {
          ar: 'تأسيس خط النحاس وتجهيز فتحات الخروج للوحدة الخارجية قبل أعمال المحارة',
          en: 'Piping route and exterior unit penetration sleeve prepared before wall plastering'
        }
      },
      {
        url: 'assets/images/projects/piping/piping-sheikh-zayed-6october-04.jpg',
        caption: {
          ar: 'تثبيت مسارات التكييف بالأقفال الإسمنتية وضمان الميول الهندسية السليمة',
          en: 'Solid mortar anchoring and calibrated slope retention for AC copper conduits'
        }
      }
    ],
    video: null,
    alt: {
      ar: 'أعمال تأسيس مواسير التكييف النحاس في مدينة الشيخ زايد و6 أكتوبر - ريفايف إير',
      en: 'HVAC copper piping installation in Sheikh Zayed and 6th of October City - REVIVE AIR'
    }
  },

  {
    id: 'proj-split-european-countryside',
    category: 'split-ac',
    projectType: 'residential',
    title: {
      ar: 'توريد وتركيب تكييف سبليت كارير (Carrier) لفيلا بالريف الأوروبي مع تأسيس دفن مخفي',
      en: 'Supply & Flush-Mount Installation of Carrier Split AC Unit — European Countryside Villa'
    },
    location: {
      ar: 'الريف الأوروبي، طريق مصر الإسكندرية الصحراوي',
      en: 'European Countryside, Cairo-Alexandria Road'
    },
    description: {
      ar: 'تثبيت وتركيب وحدة تكييف سبليت ماركة كارير (Carrier Optimax) بمحاذاة سنتر هندسي دقيق أعلى ديكور الأرفف والتجاليد الجدارية، مع التأسيس والربط الخلفي المباشر لمواسير النحاس وصرف المياه داخل الجدار (تأسيس دفن مخفي 100% بدون أي تمديدات ظاهرة)، واختبار ضغوط الفريون والتشغيل بأعلى كفاءة تبريد.',
      en: 'Precision installation of a Carrier Optimax split AC unit featuring 100% concealed rear-entry piping with zero visible exterior lines, centered seamlessly above custom architectural wall shelving and wallpaper, complete with vacuum test, drain line calibration, and whisper-quiet cooling performance verification.'
    },
    completionDate: '2024',
    image: 'assets/images/projects/split-ac/carrier-split-european-countryside.jpg',
    hasRealImage: true,
    additionalImages: [
      {
        url: 'assets/images/projects/split-ac/carrier-split-european-countryside.jpg',
        caption: {
          ar: 'تثبيت ومحاذاة تكييف كارير سبليت بدقة ميزان المياه أعلى الديكور الخشبي مع إخفاء تام لمسارات التوصيل',
          en: 'Carrier split AC installation flush-mounted above custom woodwork with fully concealed rear piping'
        }
      }
    ],
    video: null,
    alt: {
      ar: 'تركيب تكييف كارير سبليت فيلا الريف الأوروبي - ريفايف إير',
      en: 'Carrier Split AC installation at European Countryside Villa - REVIVE AIR'
    }
  },
  {
    id: 'proj-split-01',
    category: 'split-ac',
    projectType: 'residential',
    title: {
      ar: 'توريد وتركيب جهاز تكييف سبليت حديث بمحاذاة هندسية دقيقة لشقة سكنية',
      en: 'Supply & Precision Installation of High-Wall Split AC Unit for Residential Apartment'
    },
    location: {
      ar: 'القاهرة والجيزة',
      en: 'Cairo & Giza'
    },
    description: {
      ar: 'تركيب وتثبيت الوحدة الداخلية للتكييف السبليت بدقة هندسية عالية بمحاذاة ديكورات بيت النور بالأسقف الجبسية، مع عزل مسارات النحاس وصرف المياه بشريط الحماية الأبيض المقاوم للرطوبة، واختبار كفاءة التبريد والتشغيل الصامت.',
      en: 'High-precision installation of an indoor split AC unit aligned with gypsum ceiling cove lighting, featuring moisture-resistant insulated piping routing, seamless drainage connectivity, and full cooling efficiency testing.'
    },
    completionDate: '2024',
    image: 'assets/images/projects/split-ac/split-ac-installation-residential.jpg',
    hasRealImage: true,
    additionalImages: [
      {
        url: 'assets/images/projects/split-ac/split-ac-installation-residential.jpg',
        caption: {
          ar: 'تثبيت ومحاذاة الوحدة الداخلية للتكييف السبليت مع بيت النور والعزل التام لمسار النحاس والصرف',
          en: 'Precision indoor split AC unit mounting aligned with ceiling cove lighting and insulated piping'
        }
      }
    ],
    video: null,
    alt: {
      ar: 'تركيب تكييف سبليت شقة سكنية - ريفايف إير',
      en: 'Split AC installation for residential apartment - REVIVE AIR'
    }
  }
];

/**
 * Project Videos Configuration
 * ---------------------------------------------------------------------
 * To add real project videos:
 * 1. Place .mp4 files into 'assets/videos/projects/'
 * 2. Update the array below with title and file path.
 */
const VIDEOS_DATA = [
  {
    id: 'vid-lake-west',
    category: 'split-ac',
    title: {
      ar: 'توريد وتركيب عدد 5 أجهزة بقدرات مختلفة في كمبوند Lake West الشيخ زايد وصلة دهشور',
      en: 'Supply and Installation of 5 AC Units with Various Capacities — Lake West Compound, Sheikh Zayed (Dahshur Link)'
    },
    location: {
      ar: 'كمبوند Lake West - الشيخ زايد (وصلة دهشور)',
      en: 'Lake West Compound, Sheikh Zayed'
    },
    description: {
      ar: 'توثيق ميداني لأعمال توريد وتركيب عدد 5 أجهزة تكييف بقدرات مختلفة في كمبوند Lake West بالشيخ زايد وصلة دهشور، مع مراعاة دقة التثبيت وتمديدات مسارات النحاس واختبار ضغوط التبريد لضمان أعلى كفاءة تشغيلية.',
      en: 'Field documentation of supplying and installing 5 AC units of various capacities in Lake West Compound, Sheikh Zayed (Dahshur Link), with precise mounting, copper routing, and operational performance testing.'
    },
    videoUrl: 'assets/videos/projects/lake-west-sheikh-zayed.mp4',
    thumbnail: 'assets/images/projects/split-ac/lake-west-thumb.jpg',
    hasRealVideo: true
  },
  {
    id: 'vid-piping-october',
    category: 'piping',
    title: {
      ar: 'تأسيس مسار وصلة تكييف نحاس باحترافية لشقة سكنية بـ 6 أكتوبر',
      en: 'Field Walkthrough: Professional AC Copper Piping Routing — 6th of October Apartment'
    },
    location: {
      ar: 'مدينة 6 أكتوبر',
      en: '6th of October City'
    },
    description: {
      ar: 'توثيق ميداني يوضح خطوات تمديد مواسير النحاس الجنوب إفريقي المعزول بالأرموفليكس، وتأمين مسار صرف التكييف والتغذية الكهربائية بدقة هندسية عالية داخل الجدران قبل أعمال المحارة والتشطيبات.',
      en: 'Field video documenting high-precision routing of certified South African copper piping, Armaflex insulation, calibrated drainage slope, and electrical cabling prior to plastering and finishing works.'
    },
    videoUrl: 'assets/videos/projects/piping-installation-6october.mp4',
    thumbnail: 'assets/images/projects/piping/piping-6october-thumb.jpg',
    hasRealVideo: true
  }
];
