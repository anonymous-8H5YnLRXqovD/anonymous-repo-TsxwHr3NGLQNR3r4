const SENTENCES = {
    "BNF_source":`
$$
\\begin{aligned}
\\text{RequirementDoc} & ::= \\text{Node} \\\\
\\text{Node}           & ::= \\mathbf{id:\\ } \\text{ID} \\\\
                      & \\quad \\mathbf{name:\\ } \\text{String} \\\\
                      & \\quad \\mathbf{description:\\ } \\text{MultiModalText} \\\\
                      & \\quad \\mathbf{dependencies:\\ [} [\\text{ID} \\{ , \\text{ID} \\}] \\mathbf{]} \\\\
                      & \\quad \\mathbf{scenarios:\\ [} [\\text{Scenario} \\{ , \\text{Scenario} \\}] \\mathbf{]} \\\\
                      & \\quad \\mathbf{children:\\ [} [\\text{Node} \\{ , \\text{Node} \\}] \\mathbf{]} \\\\
\\\\
\\text{Scenario}       & ::= \\mathbf{id:\\ } \\text{ID} \\\\
                      & \\quad \\mathbf{name:\\ } \\text{String} \\\\
                      & \\quad \\mathbf{prerequisites:\\ [} [\\text{ID} \\{ , \\text{ID} \\}] \\mathbf{]} \\\\
                      & \\quad \\mathbf{steps:\\ [} [\\text{Step} \\{ , \\text{Step} \\}] \\mathbf{]} \\\\
\\\\
\\text{Step}           & ::= \\mathbf{given:\\ } \\text{String} \\quad \\mathbf{when:\\ } \\text{String} \\quad \\mathbf{then:\\ } \\text{String} \\\\
\\\\
\\text{MultiModalText} & ::= \\{ \\text{Text} \\mid \\text{ImageTag} \\} \\\\
\\text{ImageTag}       & ::= \\mathbf{![image](} \\text{Path} \\mathbf{)}
\\end{aligned}
$$
`,
}