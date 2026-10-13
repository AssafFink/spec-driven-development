Based on the project documents **PRD.md**, **ARCHITECTURE.md**, and **DESIGN.md** we created, generate a document named **MILESTONES.md** defining the main development milestones of the project.

The final document must be written in English. However, all user-facing UI text, such as headings, buttons, messages, and labels, must use the interface language defined in the PRD, regardless of the document language.

Divide the development process into **clear, meaningful, logical, and testable Milestones**, based on the product requirements, design, architecture, and dependencies between components.

**For each Milestone, specify:**
- **Name and Purpose:** The objective of the Milestone and what it is intended to achieve.
- **Implementation Scope:** The main features and components to be developed as part of the Milestone.
- **Expected Deliverable:** What should be functional and available upon completion of the Milestone.
- **Definition of Done:** Clear, verifiable criteria that determine when the Milestone is considered complete.

**Development Breakdown Guidelines:**

- Prefer dividing the development into **Vertical Slices**, where each Slice implements a complete, end-to-end user capability, rather than a separate technical layer such as UI, Backend, or Database.
- Separate technical Milestones may be defined only when they are necessary for initial project setup or represent a significant prerequisite for further development.
- Arrange the Milestones in a logical development order based on their dependencies, ensuring that each stage builds upon previously implemented capabilities and components.
- Maintain a reasonable number of meaningful Milestones, and do not create a separate Milestone for every small task.
- Ensure that at the end of each Milestone, the system remains functional and testable, whenever relevant to that stage.
- If ARCHITECTURE.md defines separate Development and Production environments, such as two Supabase projects: include the setup of both environments in the first Milestone that uses the Database, as an action the user performs with step-by-step guidance. Every Milestone that changes the database schema must be built and tested against the Development environment only, and its Definition of Done must include applying the Database Migrations to it. Updating the Production environment must be defined as part of the deployment Milestone, or as an explicit condition in the Definition of Done of every Milestone published after it.
- Do not introduce features, requirements, or capabilities that are not defined in the project documents.

**Development Execution Rules:**

Include explicit instructions in the document for the AI system that will carry out the development later:

- Develop the Milestones in the order defined in the document.
- After completing each Milestone, stop development and present the completed deliverable and the test results against the Definition of Done to the user.
- Do not begin developing the next Milestone without the user's explicit approval.

**Final Document Guidelines:**

- The document must be clear, well-structured, and concise, while providing sufficient detail to serve as a foundation for AI-assisted project development.
- Maintain a breakdown into meaningful Milestones, avoiding excessive fragmentation into small tasks and unnecessary repetition.
- Ensure that each Milestone can be independently tested and approved before proceeding to the next one.
