import { formatFrontmatter } from "../utils/frontmatter"
import type { ClaudeAgent, ClaudeCommand, ClaudePlugin } from "../types/claude"
import type { CodexBundle, CodexGeneratedSkill } from "../types/codex"
import type { ClaudeToOpenCodeOptions } from "./claude-to-opencode"

export type ClaudeToCodexOptions = ClaudeToOpenCodeOptions

const CODEX_DESCRIPTION_MAX_LENGTH = 1024

export function convertClaudeToCodex(
  plugin: ClaudePlugin,
  _options: ClaudeToCodexOptions,
): CodexBundle {
  const promptNames = new Set<string>()
  const skillDirs = plugin.skills.map((skill) => ({
    name: skill.name,
    sourceDir: skill.sourceDir,
  }))

  const usedSkillNames = new Set<string>(skillDirs.map((skill) => normalizeName(skill.name)))
  const commandSkills: CodexGeneratedSkill[] = []
  const prompts = plugin.commands.map((command) => {
    const promptName = uniqueName(normalizeName(command.name), promptNames)
    const commandSkill = convertCommandSkill(command, usedSkillNames)
    commandSkills.push(commandSkill)
    const content = renderPrompt(command, commandSkill.name)
    return { name: promptName, content }
  })

  const agentSkills = plugin.agents.map((agent) => convertAgent(agent, usedSkillNames))
  const generatedSkills = [...commandSkills, ...agentSkills]

  return {
    prompts,
    skillDirs,
    generatedSkills,
    mcpServers: plugin.mcpServers,
  }
}

function convertAgent(agent: ClaudeAgent, usedNames: Set<string>): CodexGeneratedSkill {
  const name = uniqueName(normalizeName(agent.name), usedNames)
  const description = sanitizeDescription(
    agent.description ?? `Converted from Claude agent ${agent.name}`,
  )
  const frontmatter: Record<string, unknown> = { name, description }

  let body = agent.body.trim()
  if (agent.capabilities && agent.capabilities.length > 0) {
    const capabilities = agent.capabilities.map((capability) => `- ${capability}`).join("\n")
    body = `## Capabilities\n${capabilities}\n\n${body}`.trim()
  }
  if (body.length === 0) {
    body = `Instructions converted from the ${agent.name} agent.`
  }

  const content = formatFrontmatter(frontmatter, body)
  return { name, content }
}

function convertCommandSkill(command: ClaudeCommand, usedNames: Set<string>): CodexGeneratedSkill {
  const name = uniqueName(normalizeName(command.name), usedNames)
  const frontmatter: Record<string, unknown> = {
    name,
    description: sanitizeDescription(
      command.description ?? `Converted from Claude command ${command.name}`,
    ),
  }
  const sections: string[] = []
  if (command.argumentHint) {
    sections.push(`## Arguments\n${command.argumentHint}`)
  }
  if (command.allowedTools && command.allowedTools.length > 0) {
    sections.push(`## Allowed tools\n${command.allowedTools.map((tool) => `- ${tool}`).join("\n")}`)
  }
  // Transform @agent- syntax to Task() calls for Codex
  const transformedBody = transformAgentSyntax(command.body.trim())
  sections.push(transformedBody)
  const body = sections.filter(Boolean).join("\n\n").trim()
  const content = formatFrontmatter(frontmatter, body.length > 0 ? body : transformedBody)
  return { name, content }
}

function renderPrompt(command: ClaudeCommand, skillName: string): string {
  const frontmatter: Record<string, unknown> = {
    description: command.description,
    "argument-hint": command.argumentHint,
  }
  const instructions = `Use the $${skillName} skill for this command and follow its instructions.`
  // Transform @agent- syntax to Task() calls for Codex
  const transformedBody = transformAgentSyntax(command.body)
  const body = [instructions, "", transformedBody].join("\n").trim()
  return formatFrontmatter(frontmatter, body)
}

/**
 * Transform Claude Code @agent-name syntax to Codex Task() calls
 * Example: "@agent-dhh-rails-reviewer @agent-kieran-rails-reviewer"
 * becomes: "Task(subagent_type='dhh-rails-reviewer', ...) and Task(subagent_type='kieran-rails-reviewer', ...)"
 */
function transformAgentSyntax(text: string): string {
  // Match @agent-<name> pattern
  const agentPattern = /@agent-([a-z0-9-]+)/gi
  const matches = Array.from(text.matchAll(agentPattern))
  
  if (matches.length === 0) {
    return text
  }
  
  // Build replacement text with Task() calls
  const taskCalls = matches.map((match) => {
    const agentName = match[1]
    return `Task(\n  subagent_type="${agentName}",\n  description="${agentName} review",\n  prompt="[Your prompt here with context]"\n)`
  })
  
  // Replace the @agent- mentions with a helpful instruction
  let result = text.replace(
    agentPattern,
    (match) => {
      const agentName = match.substring(7) // Remove '@agent-'
      return `the ${agentName} agent`
    }
  )
  
  // Add instructions for launching agents in parallel
  if (matches.length > 1) {
    result += `\n\n**Launch these ${matches.length} agents IN PARALLEL using the Task tool:**\n\n${taskCalls.join("\n\n")}\n\n**IMPORTANT:** Include all Task calls in a single message to run them in parallel.`
  } else {
    result += `\n\n**Launch this agent using the Task tool:**\n\n${taskCalls[0]}`
  }
  
  return result
}

function normalizeName(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return "item"
  const normalized = trimmed
    .toLowerCase()
    .replace(/[\\/]+/g, "-")
    .replace(/[:\s]+/g, "-")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
  return normalized || "item"
}

function sanitizeDescription(value: string, maxLength = CODEX_DESCRIPTION_MAX_LENGTH): string {
  const normalized = value.replace(/\s+/g, " ").trim()
  if (normalized.length <= maxLength) return normalized
  const ellipsis = "..."
  return normalized.slice(0, Math.max(0, maxLength - ellipsis.length)).trimEnd() + ellipsis
}

function uniqueName(base: string, used: Set<string>): string {
  if (!used.has(base)) {
    used.add(base)
    return base
  }
  let index = 2
  while (used.has(`${base}-${index}`)) {
    index += 1
  }
  const name = `${base}-${index}`
  used.add(name)
  return name
}
