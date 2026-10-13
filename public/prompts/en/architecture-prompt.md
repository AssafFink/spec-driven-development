Based on the PRD document, conduct **in-depth, up-to-date research to select the most suitable Technology Stack for the product**, and then use the selected technologies to create a document named **ARCHITECTURE.md**, describing the technical architecture required to build the product.

The final document must be written in English. However, all user-facing UI text, such as headings, buttons, messages, and labels, must use the interface language defined in the PRD, regardless of the document language.

**The process will consist of two consecutive stages, without requiring technical approval from the user between them:**

### Stage 1: Technology Research and Stack Selection

Conduct in-depth, up-to-date research to identify the most suitable technologies and tools for developing the product.

Evaluate relevant technologies and tools in areas such as Frontend, Backend, Database, Authentication, file storage, APIs, infrastructure, Hosting, AI services, and external integrations. Consider only components that are actually required based on the PRD, and avoid recommending unnecessary components or introducing unnecessary technological complexity.

**Technology Selection Criteria:**
- Alignment with the product requirements and constraints defined in the PRD.
- Ease of development, maintenance, and operation.
- Development, Hosting, and third-party service costs.
- Performance, reliability, and scalability.
- Technology maturity, industry adoption, and a proven track record in real-world projects.
- Quality of official documentation, available support, and an active developer community.
- Suitability for AI-assisted development, including the availability of extensive documentation and code examples.

**Prefer mature, proven, mainstream technologies over new or trendy alternatives**, unless there is a compelling reason to choose a newer technology. However, suitability for the product's needs should take priority over the technology's popularity.

Base your research on reliable, up-to-date sources, prioritizing official documentation, adoption data, and proven industry evidence.

For each significant technology component, research and compare 2–3 leading, relevant alternatives, but there is no need to present the full comparison process or create a separate research report.

Select **one cohesive, consistent Technology Stack that is particularly well-suited to the product**, prioritizing the simplest possible solution that meets the requirements.

Ensure that the selected technologies are compatible with one another and collectively address the product requirements before proceeding to the architecture design.

### Stage 2: Architecture Design and ARCHITECTURE.md Creation

Based on the PRD and the Technology Stack selected in the first stage, create a document named **ARCHITECTURE.md** describing the technical architecture required to implement the product.

The document should translate the PRD requirements into a clear, practical, and consistent technical design using the selected technologies.

**The document must include:**

**1. Selected Technology Stack**
- A structured table listing the selected components and technologies, including the purpose of each component.
- A brief explanation of the key technology decisions and the reasons behind them, focusing on suitability for the product, simplicity, reliability, costs, and maintenance.
- Significant risks, limitations, or considerations associated with the selected technologies, if any.

**2. System Architecture**

Describe the architecture according to the product's needs, including:
- The overall system structure, main components, and the responsibilities of each component.
- Division into Modules and logical layers, and the relationships between them.
- Frontend and Backend architecture, where applicable.
- Data Model – the main data entities, their relationships, and how data is stored, including Database or local storage, where required.
- APIs – key interfaces, communication between components, and integrations with external services, where required.
- Data Flow – the flow of data and operations between the main system components.
- Authentication, Authorization, security, and privacy, according to the product requirements.
- Infrastructure, Hosting, Deployment, and Configuration, where relevant.
- Any additional key technical decisions required to implement the product.

### Guidelines for GitHub, Hosting, and Deployment

**Source Code Management:**
- The project's source code must be managed in a Git Repository hosted on GitHub.
- Prefer Hosting and Deployment solutions that support direct GitHub integration and automatic deployment when changes are made to the Repository, without requiring manual deployment for every update.

**Hosting and Database Preferences Based on System Type:**
- **Frontend-only Web Application:** When internet deployment is required, prioritize GitHub Pages, with automatic deployment from the Repository using GitHub Pages publishing mechanism.
- **Web Application with Frontend and Backend:** When internet deployment is required, prioritize Vercel for deploying the application, including both Frontend and Backend, through GitHub integration and automatic Deployment. Ensure that the Backend environment and product requirements are compatible with Vercel's execution model and limitations.
- **Web Application with Frontend, Backend, and Database:** Prioritize Vercel for application deployment and Supabase for a relational Database based on PostgreSQL. Prefer GitHub integration that enables automatic application deployment and management of database changes through Database Migrations. Choose a NoSQL Database only when there is a significant technical justification based on the product requirements.

**Development and Production Environments When Supabase Is Selected:**
- Define **two separate Supabase projects**, meaning two databases: one for **Development** (development and testing) and one for **Production** (the live site and real data).
- The users are not programmers, so do not rely on running Supabase locally or on installing Docker or similar tools on the user's computer. All development and testing must run against the Development project in the cloud, so that running the system for testing is as simple as possible.
- Describe in ARCHITECTURE.md which access credentials belong to each environment and where they are stored: the local development environment connects to the Development project only, and the Production credentials are stored only in the Hosting service.
- Describe a clear procedure for managing Database Migrations across the environments: every database schema change is applied and tested on Development first, and applied to Production only after the user's approval. Define who applies the change to Production and at which stage, so that deploying a new version never precedes its database update.
- Specify which settings are not carried over by Migrations and must be configured separately in each of the two projects, such as Authentication settings, file storage, and secrets.
- Check the current Supabase plan limitations relevant to this setup, such as the number of projects allowed and the pausing of inactive projects, and explain their implications to the user in plain language.

**Additional Guidelines:**
- The preferences above are recommended defaults rather than absolute requirements. If a significant technical need justifies choosing a different solution, select the more suitable option and briefly explain the reason.
- Do not introduce a Backend, Database, or Cloud services that are not required merely to fit the product into one of the deployment options.
- Verify that the selected services meet the product requirements, technical limitations, and current pricing considerations.
- Describe in ARCHITECTURE.md how the source code is hosted on GitHub and how the automated Build and Deployment process works, where relevant.
- If a Database is required, also describe how the application connects to it, how Database Migrations are managed, and how access credentials are stored securely.

### General Guidelines for Research and Architecture Design

- Conduct the research and architecture design as one continuous process. There is no need to present the research findings for user approval before creating the document.
- Make technical decisions independently based on the research and product requirements, prioritizing simplicity, reliability, maintainability, and technological maturity.
- Do not require technical knowledge or technical approval from the user. If information is missing regarding product requirements, budget, or significant business preferences, ask the user about it in plain language.
- If a conflict is identified between the PRD requirements and a technology being evaluated, prefer an alternative solution that meets the requirements. If the conflict cannot be resolved without significantly changing the product requirements or business constraints, explain the issue to the user in plain language and ask for clarification.
- Include only components that are actually required based on the PRD, and avoid introducing unnecessary components or architectural complexity.
- Do not introduce new features or modify product requirements that have not been approved.
- Ensure that the architecture addresses the functional requirements, constraints, and technical requirements defined in the PRD.
- Keep the design as simple as possible and avoid Overengineering.

### Final Document Guidelines

- The final deliverable must be **a single file named ARCHITECTURE.md**, in Markdown format, containing both the selected Technology Stack and the architecture design.
- The document must be clear, well-structured, and sufficiently detailed for an AI system to use as a foundation for developing the product.
- Describe architectural decisions in a practical and unambiguous manner, but avoid excessive detail at the level of individual files, Classes, or Functions unless essential to understanding the architecture.
- Include only sections relevant to the product, without unnecessary repetition.
- There is no need to include detailed technology comparisons or a separate research report. Briefly include the main reasons behind the technology choices and provide sources supporting significant decisions.
- Do not include Milestones, development phases, tasks, or timelines. These will be defined in a separate document later.
