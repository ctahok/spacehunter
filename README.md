# RSDC v3.1: Recursive Specs-Driven Coding Framework

**See video at [https://youtu.be/hCb6vL_wvi4 ](https://youtu.be/yIpMqjnWVdU)**

### *Deep Research Edition with Glass Box Traceability*

**RSDC v3.0** is an autonomous engineering framework designed to transform Large Language Models (LLMs) from "Black Box" code generators into transparent, self-correcting engineering teams. It merges **Google Antigravity's agentic patterns**, **TALM's re-reasoning**, and **Vibe Coding principles**.

It forces AI models to stop "just writing code" and instead act as a coordinated team that defines the **"Soul" (Vibe)**, the **"Brain" (Logic)**, and the **"Memory" (Traceability)** of the software.

---

## 🧠 Core Philosophy: The "Glass Box" Protocol

Unlike standard agent frameworks, RSDC v3.0 enforces **100% Traceability**. Agents are forbidden from making silent decisions. Alongside the code, the system generates a complete audit trail of **Why** (Decision Journal) and **How** (Dev Trace).

### The "Traceability" Artifacts

1. **`/artifacts/00_decision_journal.md` (High-Level Reasoning)**
   * Captures the strategic "Why" behind architectural choices.
   * *Example Entry:* "Architect: Selected HTML5 Canvas because DOM manipulation for a Snake grid is performance-heavy on mobile. Rejected SVG due to high node count concerns."
   * *Example Entry:* "PM: Defined 'Neon' vibe to leverage the 'Glassmorphism' CSS capability defined in the Tech Stack rules." [1, 2]
2. **`/artifacts/05_dev_decision_trace.md` (Low-Level Logic)**
   * Captures the tactical "How" during atomic coding loops.
   * *Example Entry:* "Task 2.1 GameLoop: Decided to use `requestAnimationFrame` timestamp delta for movement speed logic to ensure smooth 60fps regardless of monitor refresh rate, rather than `setInterval`." [3]

---

## 📂 Installation

1. Place the core files (`system_prompt.md`, `agent-orchestration.md`, `process-task-list.md`) in `.cursor/rules` (for Cursor) or your project root.
2. Create an empty `/artifacts/` folder to enable context isolation.

## 🚀 How to Trigger

> **"Use @system_prompt.md to create a "Budget Tracker App" -stagedapprovals"**
> **"Use @system_prompt.md to create a "In-browser 1st person shooter game" -autoapproval"**
>

## 🔄 The 5-Stage Pipeline (Enhanced)

| Stage       | Role                      | Output Artifact                 | Key Upgrade (v3.0)                                                                                                                                                            |
| :---------- | :------------------------ | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Architect**       | `00_tech_stack_rules.md`      | **Skill Loading:** Defines strict "Context Packing" rules (e.g., "Use Vanilla JS, No external libraries") [1]. Loads specific skills like `HTML5_Canvas_Mastery` [4]. |
| **2** | **Product Manager** | `02_pm_prd.md`                | **Vibe Spec:** Defines Visual Personality (e.g., "Neon Cyber-Organic") & Motion (e.g., "Radial Pulse on eating") [2].                                                   |
| **3** | **Tech Lead**       | `03_tl_gherkin_specs.feature` | **Validation Gate:** Rejects PRDs missing "Vibe" definitions. Maps visuals to logic (e.g., "When snake eats, then particle explosion triggers") [5].                    |
| **4** | **Eng. Manager**    | `04_em_task_breakdown.md`     | **Verification Conditions:** Defines *how* to prove a task is done (e.g., "Console logs show steady 60fps") [3].                                                      |
| **5** | **Developer**       | `06_verification_logs.md`     | **Artifact-Centric:** Generates logs/screenshots to bridge the "Trust Gap" (e.g., "[x] Task 1: Scaffolding Status: Completed") [6].                                     |

---
> ## **Summary of Updates in v.3.1**
>
> **By integrating these bits, your RSDC framework becomes ****self-evolving** and  **environment-aware** **:**
>
> | **Feature**        | **Source**   | **Benefit**                                                                                         |
> | ------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------- |
> | **Self-Annealing** | `agents.md`      | **The framework gets smarter by updating its own rules (**`00_tech_stack_rules.md`) after errors. |
> | **Link Handshake** | `mega_prompt.md` | **Prevents writing 500 lines of code against a dead API key.**                                      |
> | **Data Schema**    | `mega_prompt.md` | **Prevents Frontend/Backend type mismatches.**                                                      |
> | **.tmp/ Folder**   | `agents.md`      | **Keeps the repo clean of debug debris.**                                                           |

---
## 🛡️ Self-Healing Mechanism

* **Localized Re-Reasoning:** If a task verification fails twice, the system triggers a "Subtree Repair" (summoning the Tech Lead) instead of crashing or hallucinating a fix.
* **Completeness Heuristic:** The Architect and Tech Lead use a Google ADK-inspired heuristic to ensure Logic, Progression, and Visuals are fully defined before coding begins [7].

## **❓ FAQ: Framework Mechanics & Game Design**

**Q: How do Stage 4's verification conditions prevent development hallucinations?****A:** In the `04_em_task_breakdown.md` file, the Engineering Manager assigns specific "Truth Conditions" to every task (e.g., "Console logs show steady 60fps execution" or "Game stops... upon collision")**. This prevents the Developer agent from simply claiming a task is done; it must prove the specific functionality exists against a pre-defined metric before marking it **`[x]`.

**Q: Can you explain the 'Bento Box' layout for level selection?****A:** The "Bento Box" layout is a UI design pattern mandated in the Tech Stack Rules** and Gherkin Specs**. It organizes the level selection options into distinct, modular rectangular containers (like a Japanese lunch box) to create a clean, modern grid interface for the user**.**

**Q: How does the 'Vibe Engine' use HSL for dynamic effects?****A:** The framework mandates using **HSL (Hue-Saturation-Lightness)** values instead of static Hex codes**. This allows the game to programmatically shift colors based on the current score or level (e.g., shifting the hue by +10 for every level up), creating fluid, dynamic theme transitions**.

**Q: How do Stage 5 walkthrough artifacts prove task completion?****A:** Stage 5 generates **Verification Logs** (found in `06_verification_logs.md`)**. These act as a "Proof of Work" where the Developer records the status of specific tasks (e.g., "Status: Completed. Neon rendering... added") to bridge the "Trust Gap" between the AI's internal state and the human user**.

**Q: Explain the role of 'Juice' in modern UI design.****A:** "Juice" refers to non-functional visual feedback that makes the interface feel alive. In this framework, it includes specific requirements like particle explosions when the snake eats, screen shake on collision, and a "lagging" trail effect for the snake's body**. This ensures the app feels like a "high-end digital organism" rather than a static utility**.

**Q: How can localized re-reasoning fix logic bugs efficiently?****A:** If a verification step fails twice (e.g., the snake moves through walls), the system triggers a **"Subtree Repair."** Instead of restarting the entire project or hallucinating a blind fix, the Developer summons the Tech Lead to review only the specific failing module and generate a targeted patch.

**Q: How is the 'Neon Cyber-Organic' vibe applied to game visuals?****A:** The design specification requires a dark mode background (`#0a0a0c`) contrasted with vibrant accents like Electric Cyan and Hot Pink**. The "Cyber-Organic" feel is achieved by rendering the snake with rounded corners and gradients (rather than blocky squares) and using "Glassmorphism" (blur filters) for UI overlays**.

**Q: Tell me about the specific obstacle layouts for levels 1-5.****A:** The PRD explicitly defines the progression**:**

**1. ****Open Void:** No walls (infinite wrap).

**2. ****The Box:** Classic solid border.

**3. ****The Pillars:** 4 static blocks in the center.

**4. ****The Corridors:** Long vertical walls forcing narrow movement.

**5. ****The Gauntlet:** Moving or dense static obstacles.

**Q: How do verification logs ensure the game maintains 60fps?****A:** The Tech Stack Rules mandate the use of `requestAnimationFrame` for rendering**. During implementation (Task 2.1), the verification condition explicitly requires that "Console logs show steady 60fps execution"**. If the logs show frame drops, the task cannot be marked as complete.

**Which ADK RSDC uses?**

The Recursive Specs-Driven Coding (RSDC) framework is built upon the Google Agent Development Kit (ADK), specifically leveraging Google Antigravity's agentic patterns.
The framework implements ADK concepts in two distinct ways, depending on the version:
1. The Core Architecture (Programmatic ADK)
In its formal "Whitepaper" or Python-based implementation (Version A), RSDC uses specific Python classes and services from the Google ADK:
• RecursivePipelineOrchestrator: Used to manage state transitions between agents.
• SessionService: Uses InMemorySessionService or DatabaseSessionService to persist the session.state dictionaries across agent instantiations.
• ToolContext: Used to inject session state into tools selectively.
• Runner: Event loops that spawn LlmAgent instances.
2. The "Hybrid" Simulation (Prompt-Driven ADK)
In the Markdown-based "Deep Research" version (Version B) you are currently using for LLM IDEs (like Cursor or Windsurf), the framework simulates ADK primitives using text-based schemas to enforce the architecture without requiring the Python runtime:
• Simulated Handover: The NextAgentConfig JSON object is designed to simulate the ADK output_schema, strictly enforcing the "mathematical contract" between agents.
• Completeness Heuristic: The Architect (Stage 1) and Tech Lead (Stage 3) explicitly use the "Google ADK 'Completeness Heuristic'" to validate requirements before coding begins.
• State Machine: The system_prompt.md acts as a "Recursive Pipeline Orchestrator" that enforces state transitions and "Reflexion Loops" derived from the ADK research.
