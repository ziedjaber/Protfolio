"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "fr" | "ar";

interface Translations {
  [key: string]: { en: string; fr: string; ar: string };
}

const translations: Translations = {
  "nav.about":      { en: "About",      fr: "À propos",     ar: "حول" },
  "nav.skills":     { en: "Skills",     fr: "Compétences",  ar: "المهارات" },
  "nav.experience": { en: "Experience", fr: "Expérience",   ar: "الخبرة" },
  "nav.projects":   { en: "Projects",   fr: "Projets",      ar: "المشاريع" },
  "nav.education":  { en: "Education",  fr: "Éducation",    ar: "التعليم" },
  "nav.currently":  { en: "Currently",  fr: "Actuellement", ar: "حالياً" },
  "nav.contact":    { en: "Contact",    fr: "Contact",      ar: "اتصال" },
  "button.hireMe":  { en: "Hire Me",    fr: "Engagez-Moi",  ar: "وظّفني" },
  "button.downloadCv": { en: "Download CV", fr: "Télécharger CV", ar: "تحميل السيرة الذاتية" },
  "hero.badge":     { en: "Software Engineering Student", fr: "Étudiant en Génie Logiciel", ar: "طالب هندسة البرمجيات" },
  "hero.tagline":   { en: "Full-Stack Development • Mobile Development • AI Solutions", fr: "Développement Full-Stack • Mobile • Solutions IA", ar: "تطوير Full-Stack • تطوير جوال • حلول الذكاء الاصطناعي" },
  "hero.desc":      { en: "Top-ranked Software Engineering student with experience building web, mobile, and AI-powered applications.", fr: "Étudiant en génie logiciel classé premier avec expérience en développement web, mobile et IA.", ar: "طالب هندسة برمجيات متفوق، لديه خبرة في بناء تطبيقات الويب والجوال والذكاء الاصطناعي." },
  "hero.award":     { en: "Awarded Best Final Year Project (19.5/20)", fr: "Prix du meilleur projet de fin d'études (19.5/20)", ar: "جائزة أفضل مشروع تخرج (19.5/20)" },
  "hero.and":       { en: "and recognized for academic excellence.", fr: "et reconnu pour l'excellence académique.", ar: "ومُعترف به للتميز الأكاديمي." },
  "hero.viewProjects": { en: "View Projects", fr: "Voir les projets", ar: "عرض المشاريع" },
  "hero.contactMe": { en: "Contact Me", fr: "Me Contacter", ar: "تواصل معي" },
  "about.my":       { en: "My", fr: "Ma", ar: "سيرتي" },
  "about.word":     { en: "biography", fr: "biographie", ar: "الذاتية" },
  "about.p1":       { en: "Currently pursuing an engineering degree at ISIMS Sfax, I have built my path upon solid academic records and practical experiences. I graduated top of the class in the Information Systems Development program at ISET Tataouine.", fr: "Actuellement en cursus ingénierie à l'ISIMS Sfax, j'ai construit mon parcours sur des résultats académiques solides et des expériences pratiques. J'ai obtenu la première place en développement des systèmes d'information à l'ISET Tataouine.", ar: "أدرس حالياً درجة الهندسة في ISIMS صفاقس، وبنيت مساري على سجل أكاديمي متميز وخبرات عملية. تخرجت في المرتبة الأولى في برنامج تطوير نظم المعلومات بـ ISET تطاوين." },
  "about.p2":       { en: "Driven by product excellence and clean software architecture, I focus on constructing secure, highly performant systems. My final year project LocaStore was awarded a grade of 19.5/20 for its MERN structure, AI integrations, and Scrum-driven execution.", fr: "Animé par l'excellence produit et une architecture logicielle propre, je me concentre sur la construction de systèmes sécurisés et hautement performants. Mon projet LocaStore a obtenu 19.5/20 pour sa structure MERN, ses intégrations IA et son exécution Scrum.", ar: "مدفوعاً بالتميز في المنتج وبنية البرمجيات النظيفة، أركز على بناء أنظمة آمنة وعالية الأداء. حاز مشروع LocaStore على 19.5/20 بفضل بنيته MERN ودمج الذكاء الاصطناعي ومنهجية Scrum." },
  "about.card1.title": { en: "Academic Excellence", fr: "Excellence Académique", ar: "التميز الأكاديمي" },
  "about.card1.desc":  { en: "Ranked 1st at ISET Tataouine. Awarded the top final project honors with a score of 19.5/20.", fr: "Classé 1er à l'ISET Tataouine. Meilleur projet de fin d'études avec 19.5/20.", ar: "المرتبة الأولى في ISET تطاوين. جائزة أفضل مشروع تخرج بدرجة 19.5/20." },
  "about.card2.title": { en: "Scalable Architectures", fr: "Architectures Évolutives", ar: "هندسة قابلة للتوسع" },
  "about.card2.desc":  { en: "Designing components following OOP, MVC, and robust microservices patterns with Clean Code practices.", fr: "Conception de composants selon OOP, MVC et microservices robustes avec des pratiques de code propre.", ar: "تصميم مكونات وفق OOP وMVC ومبادئ الخدمات المصغرة مع ممارسات الكود النظيف." },
  "skills.my":      { en: "My", fr: "Mes", ar: "مهاراتي" },
  "skills.word":    { en: "technical skills", fr: "compétences techniques", ar: "التقنية" },
  "skills.subtitle":{ en: "Languages, frameworks, and tools I work with daily.", fr: "Langages, frameworks et outils que j'utilise quotidiennement.", ar: "اللغات والأطر والأدوات التي أستخدمها يومياً." },
  "exp.my":         { en: "My", fr: "Mon", ar: "خبرتي" },
  "exp.word":       { en: "work experience", fr: "expérience professionnelle", ar: "المهنية" },
  "exp.subtitle":   { en: "Hands-on development positions — full-stack web, AI integrations, and scalable platform builds.", fr: "Postes de développement pratique — web full-stack, intégrations IA et plateformes évolutives.", ar: "مناصب تطوير عملية — ويب متكامل ودمج ذكاء اصطناعي وبناء منصات قابلة للتوسع." },
  
  // Experience Details
  "exp.role.1":     { en: "Full Stack Developer Intern", fr: "Stagiaire Développeur Full Stack", ar: "متدرب مطور متكامل" },
  "exp.desc.1":     { en: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.", fr: "Contribué au développement d'une plateforme web en utilisant React.js, améliorant l'interactivité.", ar: "ساعدت في تطوير منصة قائمة على الويب باستخدام React.js، مما أدى إلى تحسين التفاعل." },
  "exp.role.2":     { en: "Mobile App Dev", fr: "Développeur d'Applications Mobiles", ar: "مطور تطبيقات جوال" },
  "exp.desc.2":     { en: "Designed and developed mobile app for both iOS & Android platforms using React Native.", fr: "Conçu et développé une application mobile pour les plateformes iOS & Android en utilisant React Native.", ar: "تصميم وتطوير تطبيق جوال لكل من منصتي iOS و Android باستخدام React Native." },
  "exp.role.3":     { en: "Freelance App Dev Project", fr: "Projet de Dév d'App en Freelance", ar: "مشروع تطوير تطبيق حر" },
  "exp.desc.3":     { en: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.", fr: "Dirigé le développement d'une application mobile pour un client, du concept initial au déploiement sur les app stores.", ar: "قيادة تطوير تطبيق جوال لعميل، من الفكرة الأولية إلى النشر على متاجر التطبيقات." },
  "exp.role.4":     { en: "Lead Full Stack Developer", fr: "Développeur Full Stack Principal", ar: "مطور متكامل رئيسي" },
  "exp.desc.4":     { en: "Developed and maintained user-facing features using modern frontend technologies.", fr: "Développé et maintenu des fonctionnalités destinées aux utilisateurs en utilisant des technologies frontend modernes.", ar: "تطوير وصيانة الميزات الموجهة للمستخدمين باستخدام تقنيات الواجهة الأمامية الحديثة." },

  "projects.my":    { en: "My", fr: "Mes", ar: "مشاريعي" },
  "projects.word":  { en: "featured projects", fr: "projets phares", ar: "المميزة" },
  "projects.subtitle":{ en: "Apps and systems built with modern stacks — web, mobile, and AI-powered.", fr: "Applications et systèmes construits avec des stacks modernes — web, mobile et IA.", ar: "تطبيقات وأنظمة مبنية بتقنيات حديثة — ويب وجوال وذكاء اصطناعي." },
  "projects.other":   { en: "Other Projects", fr: "Autres Projets", ar: "مشاريع أخرى" },
  "projects.viewCode":{ en: "View Code", fr: "Voir le code", ar: "عرض الكود" },
  
  // Projects Details
  "proj.title.locastore": { en: "LocaStore", fr: "LocaStore", ar: "LocaStore" },
  "proj.desc.locastore":  { en: "Marketplace platform connecting local businesses and residents. Built secure transactional flow, receipt engines, and integrated intelligent features.", fr: "Plateforme de marché reliant les commerces locaux et les résidents. Flux transactionnel sécurisé, moteurs de reçus et fonctionnalités intelligentes intégrées.", ar: "منصة سوق تربط الشركات المحلية والمقيمين. بناء تدفق معاملات آمن، ومحركات إيصالات، ودمج ميزات ذكية." },
  "proj.title.livedocs":  { en: "LiveDocs", fr: "LiveDocs", ar: "LiveDocs" },
  "proj.desc.livedocs":   { en: "Real-time collaborative document editor. Supports multi-user concurrent typing, presence cursor indicators, and persistent document models.", fr: "Éditeur de documents collaboratif en temps réel. Prise en charge de la saisie simultanée de plusieurs utilisateurs, indicateurs de curseur de présence et modèles de documents persistants.", ar: "محرر مستندات تعاوني في الوقت الفعلي. يدعم الكتابة المتزامنة لعدة مستخدمين، ومؤشرات حضور مؤشر الماوس، ونماذج مستندات مستمرة." },
  "proj.title.evently":   { en: "Evently", fr: "Evently", ar: "Evently" },
  "proj.desc.evently":    { en: "Event management system built with MERN stack, featuring real-time updates and QR code integration.", fr: "Système de gestion d'événements construit avec la stack MERN, comprenant des mises à jour en temps réel et l'intégration de codes QR.", ar: "نظام إدارة الأحداث مبني باستخدام تقنيات MERN، يتميز بتحديثات في الوقت الفعلي وتكامل رمز الاستجابة السريعة (QR)." },
  "proj.sys_implementations": { en: "System Implementations", fr: "Implémentations de Systèmes", ar: "تطبيقات الأنظمة" },
  "proj.title.gym":       { en: "Gym Management System", fr: "Système de Gestion de Gym", ar: "نظام إدارة الصالات الرياضية" },
  "proj.desc.gym":        { en: "A complete system tracking member subscriptions, trainers schedules, and automated billing alerts.", fr: "Un système complet de suivi des abonnements des membres, des horaires des entraîneurs et des alertes de facturation automatisées.", ar: "نظام كامل لتتبع اشتراكات الأعضاء، وجداول المدربين، وتنبيهات الفواتير الآلية." },
  "proj.title.hospital":  { en: "Hospital Management System", fr: "Système de Gestion Hospitalière", ar: "نظام إدارة المستشفيات" },
  "proj.desc.hospital":   { en: "Platform facilitating patient records administration, appointments scheduling, and doctor-patient interaction portals.", fr: "Plateforme facilitant l'administration des dossiers des patients, la planification des rendez-vous et les portails d'interaction médecin-patient.", ar: "منصة تسهل إدارة سجلات المرضى، وجدولة المواعيد، وبوابات التفاعل بين الأطباء والمرضى." },
  "proj.title.university":{ en: "University Management System", fr: "Système de Gestion Universitaire", ar: "نظام إدارة الجامعات" },
  "proj.desc.university": { en: "An educational portal managing student enrollment, courses, exam schedules, and department grade lists.", fr: "Un portail éducatif gérant les inscriptions des étudiants, les cours, les horaires des examens et les listes de notes des départements.", ar: "بوابة تعليمية تدير تسجيل الطلاب، والمقررات الدراسية، وجداول الامتحانات، وقوائم درجات الأقسام." },

  "edu.my":         { en: "My", fr: "Mon", ar: "مساري" },
  "edu.word":       { en: "education", fr: "parcours éducatif", ar: "التعليمي" },
  "edu.title":      { en: "Academic Education", fr: "Parcours Académique", ar: "التعليم الأكاديمي" },
  "edu.achievements":{ en: "Key Achievements", fr: "Réalisations Clés", ar: "الإنجازات الرئيسية" },
  
  // Education Details
  "edu.deg.1":      { en: "Software Engineering Degree", fr: "Diplôme d'Ingénieur en Génie Logiciel", ar: "شهادة هندسة البرمجيات" },
  "edu.det.1":      { en: "Focusing on advanced algorithms, software engineering principles, system architecture, and AI.", fr: "Spécialisation dans les algorithmes avancés, les principes de génie logiciel, l'architecture système et l'IA.", ar: "التركيز على الخوارزميات المتقدمة، ومبادئ هندسة البرمجيات، وبنية الأنظمة، والذكاء الاصطناعي." },
  "edu.deg.2":      { en: "Bachelor in Information Systems Development", fr: "Licence en Développement des Systèmes d'Information", ar: "إجازة في تطوير نظم المعلومات" },
  "edu.det.2":      { en: "Ranked 1st in the University. Awarded Best Final Year Project (19.5/20).", fr: "Major de promotion de l'Université. Lauréat du meilleur projet de fin d'études (19.5/20).", ar: "المرتبة الأولى على مستوى الجامعة. حائز على جائزة أفضل مشروع تخرج (19.5/20)." },
  "edu.deg.3":      { en: "Full-Stack Development Certification", fr: "Certification de Développement Full-Stack", ar: "شهادة تطوير Full-Stack" },
  "edu.det.3":      { en: "Intensive training in modern javascript frameworks, MERN stack, and software development methodologies.", fr: "Formation intensive sur les frameworks javascript modernes, la stack MERN et les méthodologies de développement logiciel.", ar: "تدريب مكثف في أطر عمل جافا سكريبت الحديثة، ومجموعة تقنيات MERN، ومنهجيات تطوير البرمجيات." },

  // Achievements Details
  "ach.stat.1":     { en: "Rank 1", fr: "1er", ar: "المرتبة 1" },
  "ach.title.1":    { en: "Ranked 1st in University", fr: "Classé 1er à l'Université", ar: "المرتبة الأولى في الجامعة" },
  "ach.desc.1":     { en: "Ranked top of the university during Bachelor studies in Information Systems Development.", fr: "Classé premier de l'université pendant les études de licence en développement des systèmes d'information.", ar: "حصلت على المرتبة الأولى في الجامعة خلال دراسة البكالوريوس في تطوير نظم المعلومات." },
  "ach.stat.2":     { en: "19.5/20", fr: "19.5/20", ar: "19.5/20" },
  "ach.title.2":    { en: "Best Final Year Project Award", fr: "Prix du meilleur projet de fin d'études", ar: "جائزة أفضل مشروع تخرج" },
  "ach.desc.2":     { en: "Received a grade of 19.5/20 for LocaStore marketplace project from the academic jury.", fr: "A obtenu la note de 19.5/20 pour le projet de marché LocaStore de la part du jury académique.", ar: "حصلت على درجة 19.5/20 لمشروع سوق LocaStore من لجنة التحكيم الأكاديمية." },
  "ach.stat.3":     { en: "Multiple", fr: "Plusieurs", ar: "متعدد" },
  "ach.title.3":    { en: "Top of IT Department", fr: "Major du département informatique", ar: "الأول في قسم تكنولوجيا المعلومات" },
  "ach.desc.3":     { en: "Recognized multiple times for academic excellence in the Information Technology department.", fr: "Reconnu plusieurs fois pour l'excellence académique au sein du département informatique.", ar: "تلقيت تكريمات متعددة للتميز الأكاديمي في قسم تكنولوجيا المعلومات." },
  "ach.stat.4":     { en: "Top 4", fr: "Top 4", ar: "أفضل 4" },
  "ach.title.4":    { en: "Nefsawa Hackathon Top 4", fr: "Top 4 du Hackathon Nefsawa", ar: "أفضل 4 فرق في هكاثون نفزاوة" },
  "ach.desc.4":     { en: "Competed and reached the top 4 teams, developing software solutions under strict deadlines.", fr: "A concouru et atteint le top 4 des équipes, développant des solutions logicielles sous des délais stricts.", ar: "نافست ووصلت مع فريقي إلى أفضل 4 فرق، مع تطوير حلول برمجية في ظل مواعيد نهائية صارمة." },
  "ach.stat.5":     { en: "Multiple", fr: "Plusieurs", ar: "متعدد" },
  "ach.title.5":    { en: "Software Internships", fr: "Stages en développement de logiciels", ar: "تدريبات برمجية" },
  "ach.desc.5":     { en: "Gained real-world development experience at HELLO DATA and AMWORKS during academic terms.", fr: "Acquis de l'expérience de développement en situation réelle chez HELLO DATA et AMWORKS pendant les semestres universitaires.", ar: "اكتسبت خبرة تطوير واقعية في HELLO DATA و AMWORKS خلال الفترات الأكاديمية." },

  "currently.badge":   { en: "Focus Areas", fr: "Domaines de concentration", ar: "مجالات التركيز" },
  "currently.title":   { en: "Currently", fr: "Actuellement", ar: "حالياً" },
  "currently.subtitle":{ en: "I am actively expanding my capabilities across enterprise systems and advanced frameworks, committing myself to:", fr: "J'élargis activement mes compétences dans les systèmes d'entreprise et les frameworks avancés, en m'engageant à :", ar: "أعمل بنشاط على توسيع قدراتي في أنظمة المؤسسات والأطر المتقدمة، وألتزم بـ:" },
  "focus.0": { en: "Advanced Spring Boot Development & Enterprise Patterns", fr: "Développement Spring Boot avancé & Patterns Entreprise", ar: "تطوير Spring Boot المتقدم وأنماط المؤسسات" },
  "focus.1": { en: "Angular Ecosystem Architecture & Performance Tuning", fr: "Architecture Angular & Optimisation des performances", ar: "معمارية Angular وضبط الأداء" },
  "focus.2": { en: "Software Engineering Studies at ISIMS Sfax", fr: "Études en génie logiciel à l'ISIMS Sfax", ar: "دراسة هندسة البرمجيات في ISIMS صفاقس" },
  "focus.3": { en: "Mobile Application Development (React Native & Android CLI)", fr: "Développement mobile (React Native & Android CLI)", ar: "تطوير تطبيقات الجوال (React Native & Android CLI)" },
  "focus.4": { en: "Artificial Intelligence & Machine Learning Integration", fr: "Intégration de l'Intelligence Artificielle & Machine Learning", ar: "دمج الذكاء الاصطناعي والتعلم الآلي" },
  
  "contact.getIn":    { en: "Get In Touch", fr: "Entrer en Contact", ar: "تواصل معي" },
  "contact.subtitle": { en: "Contact Information", fr: "Informations de Contact", ar: "معلومات الاتصال" },
  "contact.desc":     { en: "Recruiters, founders, and engineering managers: let's connect. I am open to discussing full-time opportunities, innovative development contracts, or software consultations.", fr: "Recruteurs, fondateurs et directeurs techniques: connectons-nous. Je suis ouvert aux opportunités à temps plein, aux contrats de développement innovants ou aux consultations logicielles.", ar: "المجندون والمؤسسون ومديرو الهندسة: لنتواصل. أنا منفتح على مناقشة فرص العمل بدوام كامل وعقود التطوير المبتكرة واستشارات البرمجيات." },
  "contact.email":    { en: "Email Address", fr: "Adresse Email", ar: "البريد الإلكتروني" },
  "contact.phone":    { en: "Phone Connection", fr: "Connexion Téléphonique", ar: "رقم الهاتف" },
  "contact.location": { en: "Location Base", fr: "Localisation", ar: "الموقع" },
  "contact.locationVal": { en: "Tunisia", fr: "Tunisie", ar: "تونس" },
  "contact.sendMsg":  { en: "Send a Direct Message", fr: "Envoyer un message direct", ar: "أرسل رسالة مباشرة" },
  "cat.Languages":      { en: "Languages",        fr: "Langages",           ar: "اللغات" },
  "cat.Frontend":       { en: "Frontend",          fr: "Frontend",           ar: "الواجهة الأمامية" },
  "cat.Backend & Devops":{ en: "Backend & Devops", fr: "Backend & Devops",   ar: "الخلفية والـ DevOps" },
  "cat.Mobile":         { en: "Mobile",            fr: "Mobile",             ar: "تطبيقات الجوال" },
  "cat.Databases":      { en: "Databases",         fr: "Bases de données",   ar: "قواعد البيانات" },
  "cat.Tools & Arch":   { en: "Tools & Arch",      fr: "Outils & Arch",      ar: "أدوات والهندسة" },
};

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>(null!);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const t = (key: string) => translations[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
