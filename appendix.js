Object.assign(CODES, {
    "transform_script_readme": `
<h4>PRD to Structured YAML Converter</h4>
<p>This script leverages LLMs to decompose Markdown Product Requirement Documents (PRDs) into a hierarchical, agent-ready YAML format. It automatically identifies requirement trees, maps dependencies, and generates both happy-path and exception scenarios.</p>

<h5>1. Setup</h5>
<p>Install the required OpenAI integration:</p>
<pre><code class="language-bash">pip install openai</code></pre>

<h5>2. Configuration</h5>
<p>The script retrieves your API credentials from environment variables. Set them in your terminal before running:</p>

<h6>For Linux/macOS:</h6>
<pre><code class="language-bash"># Set your API Key and (optional) Base URL
export OPENAI_API_KEY="your-sk-key"
export OPENAI_BASE_URL="https://api.openai.com/v1"</code></pre>

<h6>For Windows (PowerShell):</h6>
<pre><code class="language-powershell"># Set your API Key and (optional) Base URL
$env:OPENAI_API_KEY="your-sk-key"
$env:OPENAI_BASE_URL="https://api.openai.com/v1"</code></pre>

<h6>For Windows (CMD):</h6>
<pre><code class="language-batch"># Set your API Key and (optional) Base URL
set OPENAI_API_KEY="your-sk-key"
set OPENAI_BASE_URL="https://api.openai.com/v1"</code></pre>

<h5>3. Usage</h5>
<p>Run the script by passing the path to your Markdown file. The output will be saved as <code>requirements.yaml</code> by default. Copy the python script below to a file named <code>convert_prd.py</code>.</p>
<pre><code class="language-bash">python convert_prd.py my_requirements.md -o output.yaml -m gpt-5</code></pre>
`,
    "transform_script_code_block": `<pre><code class="language-python" id="transform-script-code">import os
import os
import argparse
from openai import OpenAI

# Fetch configuration from environment variables with default fallbacks
API_KEY = os.getenv("OPENAI_API_KEY", "your-default-api-key-here")
BASE_URL = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")

client = OpenAI(
    api_key=API_KEY,
    base_url=BASE_URL
)

def read_markdown(file_path):
    """Reads the content of the markdown PRD file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def save_yaml(content, output_path):
    """Cleans LLM output and saves it as a YAML file."""
    # Remove markdown code blocks if the model included them
    clean_content = content.replace("\`\`\`yaml", "").replace("\`\`\`", "").strip()
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(clean_content)

def convert_prd_to_yaml(prd_text, model="gpt-5"):
    """Sends the PRD to OpenAI for structured YAML conversion."""
    
    system_prompt = """You are a Senior Systems Analyst. Your task is to transform a Markdown PRD into a structured YAML format.

### Transformation Rules:
1. **Decomposition**: Break down large modules into a hierarchical 'children' tree. The root ID must be 'ROOT'.
2. **Scenario Coverage**: Every requirement must have scenarios. You MUST include at least one 'Exception Scenario' (e.g., network error, invalid input, unauthorized access).
3. **Logic**: Identify logical 'dependencies' between features.
4. **Assets**: Keep all image references ![image](url) inside the 'description' field.
5. **Output**: Return ONLY valid YAML code."""

    user_prompt = f"""Convert the following Markdown PRD into the specified YAML format.

### Metamodel:
- id, name, description, dependencies, scenarios(id, name, prerequisites, steps[given, when, then]), children

### Few-shot Example:
Input:
# Travel System
![image](./ref.jpg)
## Login
Allows users to sign in.

Output:
id: ROOT
name: Travel System
description: Main platform entry. ![image](./ref.jpg)
dependencies: []
scenarios:
  - id: ROOT:SCE-0
    name: System Access
    prerequisites: []
    steps:
      - given: "User is at URL"
        when: "Page loads"
        then: "Show login screen"
children:
  - id: REQ-1
    name: Login Function
    description: User authentication module.
    dependencies: []
    scenarios:
      - id: REQ-1:SCE-0
        name: Successful Login
        prerequisites: ["User exists"]
        steps:
          - given: "Valid credentials"
            when: "Click login"
            then: "Redirect to dashboard"
      - id: REQ-1:SCE-1
        name: Invalid Password (Exception)
        prerequisites: []
        steps:
          - given: "Wrong password entered"
            when: "Click login"
            then: "Show error message: Incorrect Password"
    children: []

### PRD Content to Process:
{prd_text}
"""

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.1
    )
    
    return response.choices[0].message.content

def main():
    parser = argparse.ArgumentParser(description="Convert Markdown PRD to Structured YAML using OpenAI API")
    parser.add_argument("input", help="Path to the input Markdown file")
    parser.add_argument("-o", "--output", help="Path to the output YAML file", default="requirement.yaml")
    parser.add_argument("-m", "--model", help="OpenAI model to use", default="gpt-5")
    
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"Error: File {args.input} not found.")
        return

    print(f"[*] Reading PRD: {args.input}")
    prd_content = read_markdown(args.input)

    print(f"[*] Processing with OpenAI API ({args.model})...")
    try:
        yaml_output = convert_prd_to_yaml(prd_content, model=args.model)
        
        print(f"[*] Saving YAML to: {args.output}")
        save_yaml(yaml_output, args.output)
        print("[+] Success!")
    except Exception as e:
        print(f"[-] Error: {e}")

if __name__ == "__main__":
    main()</code></pre>`
});