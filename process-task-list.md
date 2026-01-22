**Purpose:** The "Protocol." Now includes **Localized Re-Reasoning** (Subtree Repair) to fix bugs efficiently without restarting the entire pipeline, inspired by the TALM framework [5].


# Rule: Processing the Task List (The Coder Protocol)

## Goal

To guide the AI Developer (Stage 5) in systematically executing the plan in `/artifacts/04_em_task_breakdown.md`.

## Core Execution Loop (The "LoopAgent")

For *each* sub-task:

1. **Read State**: Read `/artifacts/04_em_task_breakdown.md`, the `.feature` file, and **`/artifacts/00_tech_stack_rules.md`** [2].
2. **Trace Thought**: Explain logic in Pseudocode. Define the verification method.
        *   **Do NOT just think internally.** 
        *   **Append to `/artifacts/05_dev_decision_trace.md`**:
        *   **Plan**: Pseudocode for this specific <15 LoC block.
        *   **Risk**: What is the most likely failure point? (e.g., "Loop index might overflow").
        *   **Fix**: How you proactively addressed it.
3. **Atomic Implementation**: Write code in atomic steps of **Max 15 lines**.
4. **Verification**: Execute the test/build command.
5. **Artifact Generation**: Create a proof of work (e.g., "Task 1.1 Complete. Log: [Snippet]") in `/artifacts/06_verification_logs.md` [7].
6. **Senior Reviewer Reflexion**: Switch persona to "Senior Reviewer." Find 3 potential bugs. Fix them [21].
7. **Update**: Mark task as `[x]`.

## Error Recovery Protocol (Localized Re-Reasoning) [5]

If verification fails >2 times for a specific sub-task:

1. **STOP**. Do not attempt a 3rd blind fix.
2. **Escalate**: Create a temporary artifact `/artifacts/debug_request_[task_id].md` with the error log.
3. **Reflexion Call**: Summon the **Tech Lead** persona to review *only* this specific sub-task.
4. **Patch**: The Tech Lead generates a specific "Patch Instruction."
5. **Resume**: Apply the patch and retry verification.
6. **Anneal (Rule Update)**:
   * If the error was caused by a misunderstood library constraint (e.g., "API rate limit hit"), you MUST append a new rule to `/artifacts/00_tech_stack_rules.md`.
   * *Example:* "Added Rule: Do not call API X more than 5 times/sec."
   * This ensures future agents do not repeat your mistake.
   
## The Completion Protocol (Parent Tasks)

When a Parent Task is done:

1. **Test**: Run full test suite.
2. **Stage & Commit**: `git commit -m "feat: [Parent Task]" -m "- Details..."`.
