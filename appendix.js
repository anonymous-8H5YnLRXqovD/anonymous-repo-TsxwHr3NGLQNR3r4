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
Object.assign(CODES, {
    'predefined_template_content': 
    "\n<div class=\"mt-4\">\n    <p class=\"lead text-muted\">We initialize the project structure through a predefined script. The specific contents are as follows:</p>\n\n    <h4>Tech Stack</h4>\n    <div class=\"row mb-4\">\n        <div class=\"col-md-4\">\n            <h5>Frontend</h5>\n            <ul>\n                <li><strong>Framework:</strong> React 18+ (Vite)</li>\n                <li><strong>Language:</strong> JavaScript (ES6+)</li>\n                <li><strong>Styling:</strong> Tailwind CSS v4</li>\n                <li><strong>HTTP:</strong> Axios</li>\n            </ul>\n        </div>\n        <div class=\"col-md-4\">\n            <h5>Backend</h5>\n            <ul>\n                <li><strong>Runtime:</strong> Node.js (LTS)</li>\n                <li><strong>Framework:</strong> Express.js</li>\n                <li><strong>Database:</strong> SQLite3 </li>\n            </ul>\n        </div>\n        <div class=\"col-md-4\">\n            <h5>Testing</h5>\n            <ul>\n                <li><strong>Vitest:</strong> Used for Unit and Integration testing.</li>\n                <li><strong>Supertest:</strong> Used with Vitest for API route testing.</li>\n                <li><strong>Playwright:</strong> Used for End-to-End (E2E) testing.</li>\n            </ul>\n        </div>\n    </div>\n\n    <h4>Project Structure</h4>\n    <div class=\"bg-light rounded p-3 mb-5\">\n<pre><code class=\"language-text\">├── backend\n│   ├── .gitignore\n│   ├── package.json\n│   └── src\n│       ├── app.js\n│       ├── database\n│       │   ├── init_db.js\n│       │   └── seed_db.js\n│       └── index.js\n└── frontend\n    ├── .gitignore\n    ├── README.md\n    ├── eslint.config.js\n    ├── index.html\n    ├── package.json\n    ├── src\n    │   ├── App.jsx\n    │   ├── api\n    │   │   └── index.js\n    │   ├── index.css\n    │   ├── main.jsx\n    │   └── pages\n    │       └── HomePage.jsx\n    └── vite.config.js</code></pre>\n    </div>\n\n    <h4>Template Files (Core Code)</h4>\n    <div class=\"accordion shadow-sm\" id=\"accordionTemplates\">\n\n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"headingTpl0\">\n                <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTpl0\" aria-expanded=\"false\" aria-controls=\"collapseTpl0\">\n                    <strong><i class=\"fas fa-file-code me-2\"></i>backend/src/index.js</strong>\n                </button>\n            </h2>\n            <div id=\"collapseTpl0\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTpl0\" data-bs-parent=\"#accordionTemplates\">\n                <div class=\"accordion-body bg-light p-0\">\n                    <div class=\"position-relative\">\n                        <div class=\"d-flex justify-content-end p-2 position-absolute w-100\" style=\"z-index: 10;\">\n                            <button class=\"btn btn-sm btn-outline-secondary bg-white\" onclick=\"copyTemplateCode(this, 'tpl-code-0')\">Copy Code</button>\n                        </div>\n                        <pre class=\"m-0 p-3 pt-5\" style=\"max-height: 400px; overflow-y: auto;\"><code class=\"language-javascript\" id=\"tpl-code-0\">const app = require('./app');\nconst port = 3050;\n\napp.listen(port, () =&gt; {\n  console.log(`Backend listening at http://localhost:${port}`);\n});</code></pre>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"headingTpl1\">\n                <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTpl1\" aria-expanded=\"false\" aria-controls=\"collapseTpl1\">\n                    <strong><i class=\"fas fa-file-code me-2\"></i>backend/src/app.js</strong>\n                </button>\n            </h2>\n            <div id=\"collapseTpl1\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTpl1\" data-bs-parent=\"#accordionTemplates\">\n                <div class=\"accordion-body bg-light p-0\">\n                    <div class=\"position-relative\">\n                        <div class=\"d-flex justify-content-end p-2 position-absolute w-100\" style=\"z-index: 10;\">\n                            <button class=\"btn btn-sm btn-outline-secondary bg-white\" onclick=\"copyTemplateCode(this, 'tpl-code-1')\">Copy Code</button>\n                        </div>\n                        <pre class=\"m-0 p-3 pt-5\" style=\"max-height: 400px; overflow-y: auto;\"><code class=\"language-javascript\" id=\"tpl-code-1\">const express = require('express');\nconst cors = require('cors');\nconst bodyParser = require('body-parser');\nconst app = express();\n\n// route modules imports\n\n// middleware imports\napp.use(cors());\napp.use(bodyParser.json());\n\n// initialize database\nrequire('./database/init_db');\n\n// register routes\napp.get('/', (req, res) =&gt; {\n  res.json({ code: 200, message: 'Backend Ready' });\n});\n\nmodule.exports = app;</code></pre>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"headingTpl2\">\n                <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTpl2\" aria-expanded=\"false\" aria-controls=\"collapseTpl2\">\n                    <strong><i class=\"fas fa-file-code me-2\"></i>backend/src/database/init_db.js</strong>\n                </button>\n            </h2>\n            <div id=\"collapseTpl2\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTpl2\" data-bs-parent=\"#accordionTemplates\">\n                <div class=\"accordion-body bg-light p-0\">\n                    <div class=\"position-relative\">\n                        <div class=\"d-flex justify-content-end p-2 position-absolute w-100\" style=\"z-index: 10;\">\n                            <button class=\"btn btn-sm btn-outline-secondary bg-white\" onclick=\"copyTemplateCode(this, 'tpl-code-2')\">Copy Code</button>\n                        </div>\n                        <pre class=\"m-0 p-3 pt-5\" style=\"max-height: 400px; overflow-y: auto;\"><code class=\"language-javascript\" id=\"tpl-code-2\">const sqlite3 = require('sqlite3').verbose();\nconst path = require('path');\n\n// Database file stored in the root directory\nconst dbPath = path.resolve(process.cwd(), 'database.db');\nconst db = new sqlite3.Database(dbPath);\n\n/**\n * Guide model instructions:\n * 1. Use CREATE TABLE IF NOT EXISTS to create new tables.\n * 2. When adding fields, use ALTER TABLE ... ADD COLUMN ... and wrap it in try/catch logic, or check if the field exists via PRAGMA table_info.\n * 3. Always execute within db.serialize to ensure DDL order.\n */\ndb.serialize(() =&gt; {\n  // [CREATE TABLE statements added by the model as needed here]\n  \n  // [ALTER TABLE statements for incremental evolution added by the model as needed here]\n});\n\nmodule.exports = db;</code></pre>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"headingTpl3\">\n                <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTpl3\" aria-expanded=\"false\" aria-controls=\"collapseTpl3\">\n                    <strong><i class=\"fas fa-file-code me-2\"></i>backend/src/database/seed_db.js</strong>\n                </button>\n            </h2>\n            <div id=\"collapseTpl3\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTpl3\" data-bs-parent=\"#accordionTemplates\">\n                <div class=\"accordion-body bg-light p-0\">\n                    <div class=\"position-relative\">\n                        <div class=\"d-flex justify-content-end p-2 position-absolute w-100\" style=\"z-index: 10;\">\n                            <button class=\"btn btn-sm btn-outline-secondary bg-white\" onclick=\"copyTemplateCode(this, 'tpl-code-3')\">Copy Code</button>\n                        </div>\n                        <pre class=\"m-0 p-3 pt-5\" style=\"max-height: 400px; overflow-y: auto;\"><code class=\"language-javascript\" id=\"tpl-code-3\">const db = require('./init_db');\n\n/**\n * Guide model instructions:\n * 1. Must use INSERT OR IGNORE or INSERT OR REPLACE to prevent errors when running the script repeatedly.\n * 2. Must define UNIQUE constraints (in init_db.js) to support OR IGNORE logic.\n * 3. Insert data according to foreign key dependency order (parent table before child table).\n */\nfunction seed() {\n  db.serialize(() =&gt; {\n    // [INSERT OR IGNORE statements added by the model as needed here]\n  });\n}\n\n// Support running directly from the terminal: node src/database/seed_db.js\nif (require.main === module) {\n  seed();\n}\n\nmodule.exports = seed;</code></pre>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"headingTpl4\">\n                <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTpl4\" aria-expanded=\"false\" aria-controls=\"collapseTpl4\">\n                    <strong><i class=\"fas fa-file-code me-2\"></i>frontend/src/main.jsx</strong>\n                </button>\n            </h2>\n            <div id=\"collapseTpl4\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTpl4\" data-bs-parent=\"#accordionTemplates\">\n                <div class=\"accordion-body bg-light p-0\">\n                    <div class=\"position-relative\">\n                        <div class=\"d-flex justify-content-end p-2 position-absolute w-100\" style=\"z-index: 10;\">\n                            <button class=\"btn btn-sm btn-outline-secondary bg-white\" onclick=\"copyTemplateCode(this, 'tpl-code-4')\">Copy Code</button>\n                        </div>\n                        <pre class=\"m-0 p-3 pt-5\" style=\"max-height: 400px; overflow-y: auto;\"><code class=\"language-jsx\" id=\"tpl-code-4\">import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport { BrowserRouter } from 'react-router-dom';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  &lt;React.StrictMode&gt;\n    &lt;BrowserRouter&gt;\n      &lt;App /&gt;\n    &lt;/BrowserRouter&gt;\n  &lt;/React.StrictMode&gt;,\n);</code></pre>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"headingTpl5\">\n                <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTpl5\" aria-expanded=\"false\" aria-controls=\"collapseTpl5\">\n                    <strong><i class=\"fas fa-file-code me-2\"></i>frontend/src/App.jsx</strong>\n                </button>\n            </h2>\n            <div id=\"collapseTpl5\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTpl5\" data-bs-parent=\"#accordionTemplates\">\n                <div class=\"accordion-body bg-light p-0\">\n                    <div class=\"position-relative\">\n                        <div class=\"d-flex justify-content-end p-2 position-absolute w-100\" style=\"z-index: 10;\">\n                            <button class=\"btn btn-sm btn-outline-secondary bg-white\" onclick=\"copyTemplateCode(this, 'tpl-code-5')\">Copy Code</button>\n                        </div>\n                        <pre class=\"m-0 p-3 pt-5\" style=\"max-height: 400px; overflow-y: auto;\"><code class=\"language-jsx\" id=\"tpl-code-5\">import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\nimport HomePage from './pages/HomePage';\nfunction App() {\n  return (\n    &lt;Routes&gt;\n      &lt;Route path=\"/\" element={&lt;HomePage /&gt;} /&gt;\n    &lt;/Routes&gt;\n  );\n}\nexport default App;</code></pre>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"headingTpl6\">\n                <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTpl6\" aria-expanded=\"false\" aria-controls=\"collapseTpl6\">\n                    <strong><i class=\"fas fa-file-code me-2\"></i>frontend/src/api/index.js</strong>\n                </button>\n            </h2>\n            <div id=\"collapseTpl6\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTpl6\" data-bs-parent=\"#accordionTemplates\">\n                <div class=\"accordion-body bg-light p-0\">\n                    <div class=\"position-relative\">\n                        <div class=\"d-flex justify-content-end p-2 position-absolute w-100\" style=\"z-index: 10;\">\n                            <button class=\"btn btn-sm btn-outline-secondary bg-white\" onclick=\"copyTemplateCode(this, 'tpl-code-6')\">Copy Code</button>\n                        </div>\n                        <pre class=\"m-0 p-3 pt-5\" style=\"max-height: 400px; overflow-y: auto;\"><code class=\"language-javascript\" id=\"tpl-code-6\">import axios from 'axios';\nconst apiClient = axios.create({\n  baseURL: '/api',\n  timeout: 5000,\n  headers: { 'Content-Type': 'application/json' }\n});\nexport default apiClient;</code></pre>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"headingTpl7\">\n                <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTpl7\" aria-expanded=\"false\" aria-controls=\"collapseTpl7\">\n                    <strong><i class=\"fas fa-file-code me-2\"></i>frontend/src/pages/HomePage.jsx</strong>\n                </button>\n            </h2>\n            <div id=\"collapseTpl7\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTpl7\" data-bs-parent=\"#accordionTemplates\">\n                <div class=\"accordion-body bg-light p-0\">\n                    <div class=\"position-relative\">\n                        <div class=\"d-flex justify-content-end p-2 position-absolute w-100\" style=\"z-index: 10;\">\n                            <button class=\"btn btn-sm btn-outline-secondary bg-white\" onclick=\"copyTemplateCode(this, 'tpl-code-7')\">Copy Code</button>\n                        </div>\n                        <pre class=\"m-0 p-3 pt-5\" style=\"max-height: 400px; overflow-y: auto;\"><code class=\"language-jsx\" id=\"tpl-code-7\">import React from 'react';\n\nconst HomePage = () =&gt; {\n  return (\n    &lt;div&gt;Home&lt;/div&gt;\n  );\n};\nexport default HomePage;</code></pre>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n    </div>\n</div>\n"
});
Object.assign(CODES, {
    'baseline_setup_content': "\n<h4 class=\"mb-4\">Baseline Setup Process</h4>\n\n<!-- Github Copilot Section -->\n<div class=\"mb-5\">\n    <h5 class=\"text-primary border-bottom pb-2 mb-3\"><i class=\"fas fa-robot me-2\"></i>Github Copilot</h5>\n    <ol class=\"fs-6\">\n        <li class=\"mb-3\">\n            Add custom model provider (we use OpenRouter) and fill in api key.\n            <div class=\"row mt-2\">\n                <div class=\"col-md-6 mb-2\">\n                    <img src=\"assets/baseline-setup/copilot1.png\" alt=\"copilot1\" class=\"img-fluid border rounded shadow-sm\">\n                </div>\n                <div class=\"col-md-6 mb-2\">\n                    <img src=\"assets/baseline-setup/copilot2.png\" alt=\"copilot2\" class=\"img-fluid border rounded shadow-sm\">\n                </div>\n            </div>\n        </li>\n        <li class=\"mb-3\">\n            Make the specific model available under OpenRouter (we use gemini 3 pro proview).\n            <div class=\"mt-2\">\n                <img src=\"assets/baseline-setup/copilot3.png\" alt=\"copilot3\" class=\"img-fluid border rounded shadow-sm\" style=\"max-width: 600px;\">\n            </div>\n        </li>\n        <li class=\"mb-3\">\n            Prepare project structure.\n            <ul>\n                <li>Create a new directory for the project and open with VS Code.</li>\n                <li>Copy the content of <code>structure.zip</code> (which contains the initial skeleton of project with backend, frontend and <code>metadata.md</code>) to this workspace.</li>\n                <li>Create a requirement folder and copy the <code>reqirements.yaml</code> and reference images of the target web app to it.</li>\n            </ul>\n            <div class=\"mt-2\">\n                <img src=\"assets/baseline-setup/copilot4.png\" alt=\"copilot4\" class=\"img-fluid border rounded shadow-sm\" style=\"max-width: 600px;\">\n            </div>\n        </li>\n        <li class=\"mb-3\">\n            Start running.\n            <ul>\n                <li>Open the copilot sidebar, open a new chat session.</li>\n                <li>Copy and paste the following prompt in the chatbox:</li>\n            </ul>\n            <pre class=\"my-2 bg-light\"><code class=\"language-markdown\">Please implement the requirements defined in `requirements.yaml`. Strictly follow the project specifications described in `metadata.md`.\n\n#### Image References in Requirements\n\nSome requirements include image references in the following format:\n![image](./reference/index_after_login.png)\n\nThese image paths are **relative to the location of the requirements document**.\n\nFor example, if the requirements file is located at:\n\"path\\to\\requirement\\requirements.yaml\"\n\nthen the corresponding image file is located at:\n\"path\\to\\requirement\\reference\\index_after_login.png\"\n\nYou **must load and examine the referenced images** and use them as visual guidance when implementing the corresponding requirements.</code></pre>\n            <ul>\n                <li>Select agent mode and the custom model added before, start running.</li>\n            </ul>\n            <div class=\"mt-2\">\n                <img src=\"assets/baseline-setup/copilot5.png\" alt=\"copilot5\" class=\"img-fluid border rounded shadow-sm\" style=\"max-width: 600px;\">\n            </div>\n        </li>\n    </ol>\n</div>\n\n<!-- Cursor Section -->\n<div class=\"mb-5\">\n    <h5 class=\"text-primary border-bottom pb-2 mb-3\"><i class=\"fas fa-mouse-pointer me-2\"></i>Cursor</h5>\n    <p class=\"fs-6 ms-3\">Same as the startup method for Copilot. See above.</p>\n</div>\n\n<!-- OpenHands Section -->\n<div class=\"mb-5\">\n    <h5 class=\"text-primary border-bottom pb-2 mb-3\"><i class=\"fas fa-hand-paper me-2\"></i>OpenHands</h5>\n    <ol class=\"fs-6\">\n        <li class=\"mb-3\">Follow the official documentation of OpenHands to set up the environment. <a href=\"https://docs.openhands.dev/openhands/usage/run-openhands/local-setup\" target=\"_blank\">OpenHands Setup Guide <i class=\"fas fa-external-link-alt ms-1 small\"></i></a></li>\n        <li class=\"mb-3\">\n            Start running.\n            <ul>\n                <li>Open the GUI of OpenHands.</li>\n                <li>We package the project structure and requirements into a zip file, and upload it to OpenHands.</li>\n                <li>Fill in the prompt above in the chatbox, and start running.</li>\n            </ul>\n            <div class=\"mt-2\">\n                <img src=\"assets/baseline-setup/openhands.png\" alt=\"openhands\" class=\"img-fluid border rounded shadow-sm\" style=\"max-width: 800px;\">\n            </div>\n        </li>\n    </ol>\n</div>\n\n<!-- MetaGPT Section -->\n<div class=\"mb-5\">\n    <h5 class=\"text-primary border-bottom pb-2 mb-3\"><i class=\"fas fa-network-wired me-2\"></i>MetaGPT</h5>\n    <ol class=\"fs-6\">\n        <li class=\"mb-3\">\n            Set up the environment (we use docker):\n            <pre class=\"my-2 bg-light\"><code class=\"language-bash\">docker pull metagpt/metagpt:latest</code></pre>\n        </li>\n        <li class=\"mb-3\">\n            Open a new workspace and save the <code>config2.yaml</code> in it:\n            <pre class=\"my-2 bg-light\"><code class=\"language-yaml\">llm:\n  api_type: \"gemini\"\n  base_url: \"your_openai_base_url\"\n  api_key: \"your_openai_api_key\"\n  model: \"gemini-3-pro-proview\"\n\nrepair_llm_output: true\n\nmermaid:\n  engine: \"nodejs\"\n  path: \"mmdc\"\n  puppeteer_config: \"/app/metagpt/config/puppeteer-config.json\"\n  pyppeteer_path: \"/usr/bin/chromium\"</code></pre>\n        </li>\n        <li class=\"mb-3\">Put the requirements in a txt file named <code>requirements.txt</code>.</li>\n        <li class=\"mb-3\">\n            Create a <code>start.py</code> script with the following content:\n            <pre class=\"my-2 bg-light\"><code class=\"language-python\">import asyncio\nfrom pathlib import Path\nfrom metagpt.roles import ProductManager, Architect, ProjectManager, Engineer\nfrom metagpt.team import Team\n\nasync def main():\n    requirements_path = Path(\"/app/metagpt/workspace/requirements.txt\")\n    if not requirements_path.exists():\n        print(f\"Error: no requirements file found at {requirements_path}\")\n        return\n    idea = requirements_path.read_text(encoding='utf-8')\n    company = Team()\n    company.hire(\n        [\n            ProductManager(),\n            Architect(),\n            ProjectManager(),\n            Engineer(),\n        ]\n    )\n    company.invest(investment=3.0)\n    company.run_project(idea=idea)\n    await company.run()\n\nif __name__ == \"__main__\":\n    asyncio.run(main())</code></pre>\n            <p class=\"text-muted small mt-1\">this script will read the requirements from <code>requirements.txt</code> and trigger the MetaGPT to run the project.</p>\n            <div class=\"mt-2\">\n                <img src=\"assets/baseline-setup/metagpt.png\" alt=\"metagpt\" class=\"img-fluid border rounded shadow-sm\" style=\"max-width: 800px;\">\n            </div>\n        </li>\n        <li class=\"mb-3\">\n            Run the script in docker, pay attention to modify the path of the config2.yaml (path\\to\\config2.yaml) and the workspace (path\\to\\workspace).\n            <pre class=\"my-2 bg-light\"><code class=\"language-bash\">docker run --rm --privileged -v \"path\\to\\config2.yaml:/app/metagpt/config/config2.yaml\" -v \"path\\to\\workspace:/app/metagpt/workspace\" metagpt/metagpt:latest python /app/metagpt/workspace/start.py</code></pre>\n        </li>\n    </ol>\n</div>\n"
});
