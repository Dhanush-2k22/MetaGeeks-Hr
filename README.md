Meta Geeks HR: Next-Generation Talent & Mentorship Portal

Meta Geeks HR is an AI-powered, serverless talent management and mentorship platform built to transform how tech companies handle junior developer onboarding, sprint tracking, and performance evaluations. By combining structured human feedback with generative AI, the platform eliminates manual administrative overhead while delivering fair, standardized performance insights.

🚀 Key Features

Role-Based Access Control (RBAC): Dedicated, secure dashboards tailored specifically for HR Managers, Technical Engineers (Mentors), and Junior Interns.

Automated Kickoff Workflow: HR assigns mentors via a streamlined UI, instantly triggering interactive Microsoft Teams webhooks to schedule kickoff syncs automatically.

Frictionless 1–5 Star Sprint Reviews: Mentors evaluate intern competencies (Code Quality, Communication, Task Completion, Teamwork, Initiative) using rapid rating controls instead of writing long essays.

Amazon Bedrock AI Synthesis: Automatically converts quantitative 1–5 star sprint metrics into comprehensive, unbiased, executive-ready qualitative performance reports.

Real-time Org Hierarchy: Auto-generates visual org trees and data visualizers to track team bandwidth and growth trajectory across multiple sprints.

🛠️ Architecture & Tech Stack

Frontend: React.js (Vite), Tailwind CSS, Lucide Icons, Recharts (Data Visualizations)

Backend Compute: AWS Lambda (Python 3.x using boto3)

API Layer: Amazon API Gateway (REST API with CORS)

Database: Amazon DynamoDB (NoSQL Single-Table Design)

Generative AI: Amazon Bedrock (Anthropic Claude Foundational Models)

Integrations: Microsoft Power Automate & Microsoft Teams Webhooks

⚡ Quick Start (Frontend Development)

Clone the repository:

git clone https://github.com/Dhanush-2k22/metageeks-hr.git
cd metageeks-hr/frontend


Install dependencies:

npm install


Start local development server:

npm run dev
