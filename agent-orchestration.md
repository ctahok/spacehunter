Purpose: The "Rulebook." Now includes Skill Loading (Stage 1) and Artifact Verification (Stage 5) to align with Google Antigravity and TALM frameworks.

# Rule: Recursive Agentic Architecture Orchestration

## Core Primitive: The Handover Configuration

At the end of every stage (except Stage 5), you must generate a structured **NextAgentConfig** object. This simulates the ADK `output_schema` to strictly enforce the contract between agents.

**Handover Format:**

```json
{
  "next_agent_role": "String (e.g., 'Product Manager')",
  "source_artifact": "String (e.g., '/artifacts/00_tech_stack_rules.md')",
  "system_instruction": "String (The strict prompt for the next agent)",
  "validation_status": "String ('APPROVED' or 'REJECTED')"
}
```

**Stage-Specific Workflows**

**Stage 1: The Architect (Requirements & Skills)**

**• ** **Input** **: User Query.**

**• ** **Behavior** **:**

**    1. ** **Analysis** **: Analyze requirements using the Google ADK "Completeness Heuristic" (e.g., identify Game Logic, Progression, Visuals).**

**    2. ** **Skill Selection** **: Identify specific "Skills" required (e.g., **`HTML5_Canvas_Mastery`, `CSS_Motion_Design`).

**    3. ** **Logging Step (Glass Box)** **: ****Before** generating artifacts, append to `/artifacts/00_decision_journal.md`:

**        ▪ **Explain *why* you selected this specific Tech Stack. (e.g., "Chose Vanilla JS over React to keep bundle size <20KB per Source**").**

**    4. ** **Context Packing** **: Create **`/artifacts/00_tech_stack_rules.md`. Fill this with specific "Do's and Don'ts" (e.g., "Use requestAnimationFrame", "Use HSL for vibe").

**• ** **Output** **: **`/artifacts/01_ar_requirements_brief.md` AND `/artifacts/00_tech_stack_rules.md`.

**• ** **Handover** **: Command Stage 2 and Stage 5 to ****ALWAYS** read `/artifacts/00_tech_stack_rules.md` before generating output.

**Stage 2: The Product Manager (Specs & Vibe)**

**• ** **Input** **: **`/artifacts/01_ar_requirements_brief.md` and `/artifacts/00_tech_stack_rules.md`.

**• ** **Behavior** **:**

**    1. ** **Clarification Guardrail** **: If ambiguous, ask "1. Question? A) Opt1, B) Opt2".**

**    2. ** **Logging Step (Glass Box)** **: ****Before** generating the PRD, append to `/artifacts/00_decision_journal.md`:

**        ▪ **Document the "Vibe" selection process. Explain *why* the chosen aesthetic (e.g., "Neon Cyber-Organic") fits the goal better than alternatives.

**    3. ** **Vibe Specification** **: Include a dedicated section in the PRD for ****"Visual Personality"** and **"Motion"** (e.g., "Snake segments should have rounded corners," "Transitions use scanline effect" [Source 5]).

**• ** **Output** **: **`/artifacts/02_pm_prd.md`.

**• ** **Handover** **: Configure Stage 3 to translate prose into Gherkin.**

**Stage 3: The Tech Lead (Gherkin Specs)**

**• ** **Input** **: **`/artifacts/02_pm_prd.md`.

**• ** **Behavior** **:**

**    1. ** **Validation Gate** **: If the PRD lacks "Non-Goals" [Source 7] or "Vibe Specs," ****REJECT** it.

**    2. ** **Logging Step (Glass Box)** **: Append to **`/artifacts/00_decision_journal.md`:

**        ▪ **Log any edge cases discovered during the "Completeness Heuristic" check (e.g., "Added collision detection for self-intersection").

**    3. ** **Mapping** **: Convert User Stories to **`Given-When-Then` scenarios [Source 8].

**• ** **Output** **: **`/artifacts/03_tl_gherkin_specs.feature`.

**• ** **Handover** **: Configure Stage 4 with the "Two-Phase Protocol."**

**Stage 4: The Engineering Manager (Tasks & Verification)**

**• ** **Input** **: **`/artifacts/03_tl_gherkin_specs.feature`.

**• ** **Behavior** **:**
**    1. ** Phase 0 **. (The Link Handshake):
    * Before generating any application logic tasks, generate a "Task 0.0: Connection Handshake."
    * Requirement: Write a minimal script to verify ALL external API keys, Database connections, and Environment Variables defined in `.env`.
    * Constraint: If the Handshake fails, the pipeline STOPS. Do not proceed to application logic.

**    2. ** **Phase 1** **: Generate Parent Tasks (e.g., "1. Project Scaffolding"). ****STOP** for user "Go".

**    3. ** **Logging Step (Glass Box)** **: Append to **`/artifacts/00_decision_journal.md`:

**        ▪ **Justify the Task Breakdown strategy. (e.g., "Separated Core Engine from Visuals to allow 'Juice' implementation in isolation" [Source 10 vs 11]).

**    4. ** **Phase 2** **: Generate Sub-Tasks.**

**    5. ** **Constraint** **: Every Parent Task must include a specific ****"Verification Condition"** (e.g., "Console logs show 60fps" or "Canvas renders gradient snake").

**• ** **Output** **: **`/artifacts/04_em_task_breakdown.md`.

**• ** **Handover** **: Configure Stage 5 with the "Atomic Loop Protocol" and mandate the creation of **`/artifacts/06_verification_logs.md`.
