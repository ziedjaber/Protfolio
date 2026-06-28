import { NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `You are the AI Assistant for Mohamed Zied Jabeur's portfolio website. Your task is to answer user questions about Mohamed Zied Jabeur (often called Zied) in a helpful, friendly, and professional manner.

ABOUT MOHAMED ZIED JABEUR:
- Currently pursuing a Software Engineering Degree (Diplôme d'Ingénieur en Génie Logiciel) at ISIMS Sfax (2025 - 2028), focusing on advanced algorithms, software engineering principles, system architecture, and AI.
- Graduated 1st in his class in the Bachelor in Information Systems Development program (Licence en Développement des Systèmes d'Information) at ISET Tataouine (Graduated 2025).
- Received the Best Final Year Project Award for his project "LocaStore" with a top score of 19.5/20.
- Awarded for academic excellence and top ranking at ISET Tataouine.
- Certified Full-Stack Developer through GoMyCode (intensive training in MERN stack, modern JS frameworks, and software methodologies).

TECHNICAL SKILLS:
- Languages: Java, TypeScript, JavaScript, Python, C#, C++, PHP, SQL
- Frontend: React, Next.js, Angular, HTML5, CSS3, Tailwind CSS
- Backend & DevOps: Spring Boot, Spring Security, Node.js, Express, REST APIs, JWT Authentication
- Mobile: React Native, Android Development
- Databases: PostgreSQL, MySQL, MongoDB, Firebase
- Tools & Architecture: Git, GitHub, Agile Scrum, MVC, OOP, Postman

WORK EXPERIENCE:
1. Full Stack Developer Intern at HELLO DATA (January 2025 – June 2025):
   - Assisted in the development of a web-based platform using React.js, enhancing interactivity.
2. Mobile App Developer at AMWORKS (Previous Term):
   - Designed and developed a mobile app for both iOS & Android platforms using React Native.
3. Freelance App Development Project (Ongoing):
   - Led the development of a mobile app for a client, from initial concept to deployment on app stores.
4. Lead Full Stack Developer (Academic Years):
   - Developed and maintained user-facing features using modern frontend technologies.

FEATURED PROJECTS:
1. LocaStore (Best Final Year Project: 19.5/20):
   - Marketplace platform connecting local businesses and residents.
   - Built a secure transactional flow, receipt engines, and integrated intelligent AI features.
   - Stack: MongoDB, Express.js, React.js, Node.js, AI Integration.
   - GitHub: https://github.com/ziedjaber/LocaStore
2. LiveDocs:
   - Real-time collaborative document editor.
   - Supports multi-user concurrent typing, presence cursor indicators, and persistent document models.
   - Stack: React, Node.js, MongoDB, WebSockets.
   - GitHub: https://github.com/ziedjaber/Live-Docs
3. Evently:
   - Event management system with real-time updates and QR code integration.
   - Stack: MERN Stack (MongoDB, Express, React, Node), QR Code, Real-time.
   - GitHub: https://github.com/ziedjaber/Evently

SYSTEM IMPLEMENTATIONS (OTHER PROJECTS):
1. Gym Management System:
   - Tracks member subscriptions, trainer schedules, and automated billing alerts.
   - Stack: Java, Spring Boot, MySQL, Thymeleaf.
   - GitHub: https://github.com/ziedjaber
2. Hospital Management System:
   - Facilitates patient records administration, appointment scheduling, and doctor-patient interaction portals.
   - Stack: C#, ASP.NET Core, PostgreSQL, React.
   - GitHub: https://github.com/ziedjaber
3. University Management System:
   - Educational portal managing student enrollment, courses, exam schedules, and department grade lists.
   - Stack: PHP, Laravel, MySQL, Tailwind CSS.
   - GitHub: https://github.com/ziedjaber

ACHIEVEMENTS:
- Rank 1 in University: Ranked top of the university during Bachelor studies in Information Systems Development.
- 19.5/20 Score: Awarded Best Final Year Project for the LocaStore marketplace.
- Top of IT Department: Recognized multiple times for academic excellence.
- Nefsawa Hackathon Top 4: Reached top 4 teams, developing software solutions under strict deadlines.
- Software Internships: Gained real-world experience at HELLO DATA and AMWORKS.

CURRENT FOCUS AREAS:
- Advanced Spring Boot Development & Enterprise Patterns.
- Angular Ecosystem Architecture & Performance Tuning.
- Software Engineering Studies at ISIMS Sfax.
- Mobile Application Development (React Native & Android CLI).
- Artificial Intelligence & Machine Learning Integration.

CONTACT INFORMATION:
- Email: mohamedziedjabeur@gmail.com
- Phone: +216 28 150 013
- Location: Tunisia
- LinkedIn: https://www.linkedin.com/in/mohamed-zied-jabeur-33bb9b269
- GitHub: https://github.com/ziedjaber

RESPONSE FORMAT & INSTRUCTIONS:
- You must always respond in JSON format conforming to the requested schema.
- The schema requires:
  1. "response" (string): Your conversational message. Formatted in clear Markdown (bullet points, bold text, etc., where appropriate). Be warm, friendly, concise, and helpful. Keep responses under 2-3 paragraphs.
  2. "navigate" (string): Detect if the user wants to see, navigate to, or scroll to a specific section. Map their request to one of the following section IDs:
     - "about": Bio, biography, background, introduction, who is Zied.
     - "skills": Tech stack, languages, tools, frameworks, databases, what technologies he uses.
     - "experience": Jobs, work experience, internships, HELLO DATA, AMWORKS, freelance.
     - "projects": Projects, portfolio work, LocaStore, LiveDocs, Evently, systems, code.
     - "education": School, university, degree, studies, certifications, achievements, grades, hackathons, academic record.
     - "currently": What he is working on now, focus areas, current studies, current projects.
     - "contact": Contact info, email, phone, location, LinkedIn, how to get in touch, send message.
     - "hero": CV download, resume, welcome, greetings, general homepage top.
     - "none": If no specific navigation is requested (e.g. general chit-chat, explaining a specific concept, saying thank you).
- Dynamic Language: The visitor's current UI language is provided in the system instruction or user message context. If the user asks a question in French or Arabic, respond in that language. Otherwise, adapt to the language of their message, defaulting to the requested language.
`;

function determineNavigateSection(text: string) {
  const lower = text.toLowerCase();
  if (/\b(currently|focus|now|ongoing|working on|track|project|priority)\b/.test(lower)) return "currently";
  if (/\b(skill|tech|technology|stack|framework|library|tools)\b/.test(lower)) return "skills";
  if (/\b(experience|internship|job|work|role|company|freelance)\b/.test(lower)) return "experience";
  if (/\b(project|portfolio|demo|app|platform|system)\b/.test(lower)) return "projects";
  if (/\b(study|school|university|isims|degree|education|certification)\b/.test(lower)) return "education";
  if (/\b(contact|email|phone|linkedin|github|reach|message)\b/.test(lower)) return "contact";
  if (/\b(cv|resume|download|top|hero|welcome|greeting)\b/.test(lower)) return "hero";
  return "none";
}

function buildFallbackResponse(message: string) {
  const navigate = determineNavigateSection(message);
  let response = `I can help you navigate this portfolio.

- Ask me about my current focus areas, skills, experience, projects, education, or contact details.
- I can also guide you to any section of the page if you want.`;

  if (navigate === "currently") {
    response = `Right now, I am focusing on:

- **Advanced Spring Boot Development & Enterprise Patterns**
- **Angular Ecosystem Architecture & Performance Tuning**
- **Software Engineering Studies at ISIMS Sfax**
- **Mobile Application Development (React Native & Android CLI)**
- **Artificial Intelligence & Machine Learning Integration**`;  
  } else if (navigate === "skills") {
    response = `I use a strong modern stack including **Java**, **TypeScript**, **React**, **Next.js**, **Angular**, **Spring Boot**, **Node.js**, **React Native** and more. Ask me to show my projects, experience, or contact details.`;
  } else if (navigate === "experience") {
    response = `I have experience working with **HELLO DATA**, **AMWORKS**, and freelance mobile/web projects. I also led academic frontend initiatives while studying engineering.`;
  } else if (navigate === "projects") {
    response = `I built projects such as **LocaStore**, **LiveDocs**, and **Evently**, focusing on real-time collaboration, AI integration, and polished user experiences.`;
  } else if (navigate === "education") {
    response = `I am studying Software Engineering at ISIMS Sfax (2025-2028) and graduated top of my class from ISET Tataouine in Information Systems Development.`;
  } else if (navigate === "contact") {
    response = `You can contact me by email, LinkedIn, or GitHub. I am always open to new collaborations and frontend challenges.`;
  } else if (navigate === "hero") {
    response = `Welcome! I am here to help you explore the portfolio. Ask me about my skills, projects, experience, or current focus areas.`;
  }

  return { response, navigate };
}

export async function POST(request: Request) {
  try {
    const { messages, lang } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const lastUserMessage = messages?.length ? messages[messages.length - 1].content : "";
    if (!apiKey) {
      console.warn("Gemini API key missing in environment variables. Using fallback assistant.");
      return NextResponse.json({
        ...buildFallbackResponse(lastUserMessage),
      });
    }

    // Format message history for Gemini
    // Ensure roles are mapped correctly (user -> user, model -> model)
    const formattedContents = messages.map((m: { role: string; content: string }) => {
      const role = m.role === "assistant" || m.role === "model" ? "model" : "user";
      return {
        role,
        parts: [{ text: m.content }],
      };
    });

    // Append current language context to the prompt or system instruction
    const currentLangText = `The visitor's current portfolio UI language is "${lang || "en"}". Please reply in this language if appropriate, or match the user's input language.`;

    const requestBody = {
      contents: formattedContents,
      systemInstruction: {
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${currentLangText}` }],
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            response: {
              type: "STRING",
              description: "The chat response text in markdown formatting.",
            },
            navigate: {
              type: "STRING",
              enum: [
                "about",
                "skills",
                "experience",
                "projects",
                "education",
                "currently",
                "contact",
                "hero",
                "none",
              ],
              description:
                "Section ID to navigate to if user wants to see it, else 'none'.",
            },
          },
          required: ["response", "navigate"],
        },
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      return NextResponse.json(
        {
          ...buildFallbackResponse(lastUserMessage),
          error: `Gemini API returned error: ${response.statusText}`,
        },
        { status: 200 }
      );
    }

    const responseData = await response.json();
    
    const candidateText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!candidateText) {
      console.warn("Gemini response contained no candidate text. Falling back.");
      return NextResponse.json({
        ...buildFallbackResponse(lastUserMessage),
      });
    }

    const parsedResult = JSON.parse(candidateText.trim());

    return NextResponse.json(parsedResult);
  } catch (error) {
    const err = error as Error;
    console.error("Error in AI Chat API route:", err);
    console.error("Error in AI Chat API route:", err);
    return NextResponse.json(
      {
        ...buildFallbackResponse(""),
        error: err.message,
      },
      { status: 200 }
    );
  }
}
