#!/usr/bin/env python3
import os
import json
import re
import sys

def count_md_files(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                count += 1
    return count

def count_directories(directory):
    if not os.path.exists(directory):
        return 0
    return len([d for d in os.listdir(directory) if os.path.isdir(os.path.join(directory, d))])

def main():
    plugin_dir = "plugins/compound-engineering"
    agents_dir = os.path.join(plugin_dir, "agents")
    commands_dir = os.path.join(plugin_dir, "commands")
    skills_dir = os.path.join(plugin_dir, "skills")
    
    actual_agents = count_md_files(agents_dir)
    actual_commands = count_md_files(commands_dir)
    actual_skills = count_directories(skills_dir)
    
    print(f"Actual counts: Agents={actual_agents}, Commands={actual_commands}, Skills={actual_skills}")
    
    # Check plugin.json
    with open(os.path.join(plugin_dir, ".claude-plugin/plugin.json"), "r") as f:
        plugin_json = json.load(f)
        description = plugin_json.get("description", "")
        
        # Match "X agents, Y commands, Z skills"
        match = re.search(r"(\d+) agents, (\d+) commands, (\d+) skills", description)
        if match:
            json_agents, json_commands, json_skills = map(int, match.groups())
            if json_agents != actual_agents or json_commands != actual_commands or json_skills != actual_skills:
                print(f"❌ plugin.json counts MISMATCH: {json_agents}, {json_commands}, {json_skills}")
            else:
                print("✅ plugin.json counts match actual files.")
        else:
            print("⚠️ Could not find counts in plugin.json description.")

    # Check marketplace.json
    with open(".claude-plugin/marketplace.json", "r") as f:
        m_json = json.load(f)
        for p in m_json.get("plugins", []):
            if p["name"] == "compound-engineering":
                m_desc = p.get("description", "")
                m_match = re.search(r"(\d+) specialized agents, (\d+) commands, and (\d+) skills", m_desc)
                if m_match:
                    m_agents, m_commands, m_skills = map(int, m_match.groups())
                    if m_agents != actual_agents or m_commands != actual_commands or m_skills != actual_skills:
                        print(f"❌ marketplace.json counts MISMATCH: {m_agents}, {m_commands}, {m_skills}")
                    else:
                        print("✅ marketplace.json counts match actual files.")
                else:
                    print("⚠️ Could not find counts in marketplace.json description.")

    # Check README.md
    with open(os.path.join(plugin_dir, "README.md"), "r") as f:
        readme = f.read()
        # Find the table rows
        agents_match = re.search(r"\| Agents \| (\d+) \|", readme)
        commands_match = re.search(r"\| Commands \| (\d+) \|", readme)
        skills_match = re.search(r"\| Skills \| (\d+) \|", readme)
        
        if agents_match and commands_match and skills_match:
            r_agents = int(agents_match.group(1))
            r_commands = int(commands_match.group(1))
            r_skills = int(skills_match.group(1))
            
            if r_agents != actual_agents or r_commands != actual_commands or r_skills != actual_skills:
                print(f"❌ README.md table counts MISMATCH: {r_agents}, {r_commands}, {r_skills}")
            else:
                print("✅ README.md table counts match actual files.")
        else:
            print("⚠️ Could not find component count table in README.md.")

if __name__ == "__main__":
    main()
