export const guidesData = [
  {
    id: 'use-ai-tools',
    title: 'How to Use AI Tools',
    kind: 'steps',
    content: [
      'Define one clear goal and target output.',
      'Choose a model and add context examples.',
      'Iterate with short feedback loops.',
      'Validate with facts and human review.',
    ],
  },
  {
    id: 'coding-basics-ai',
    title: 'Coding Basics for AI',
    kind: 'code',
    code: `# basic prompt workflow in Python
def build_prompt(topic: str) -> str:
    return f"Explain {topic} for a beginner in 5 bullet points."

print(build_prompt("vector databases"))`,
  },
  {
    id: 'tech-tips-tricks',
    title: 'Tech Tips & Tricks',
    kind: 'list',
    content: [
      'Use keyboard shortcuts to speed up deep work.',
      'Set weekly learning sprints for one emerging tool.',
      'Document your AI prompts like code snippets.',
    ],
  },
]
