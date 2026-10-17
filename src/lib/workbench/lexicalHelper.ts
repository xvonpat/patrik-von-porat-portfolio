// Converts text or markdown-style paragraphs into Payload Lexical JSON AST

export interface LexicalNode {
  type: string;
  version: number;
  [key: string]: any;
}

export interface LexicalRoot {
  root: {
    type: 'root';
    format: string;
    indent: number;
    version: number;
    children: LexicalNode[];
  };
}

export function markdownToLexical(markdown: string): LexicalRoot {
  if (!markdown || typeof markdown !== 'string') {
    return {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [],
          },
        ],
      },
    };
  }

  const lines = markdown.split(/\r?\n/);
  const children: LexicalNode[] = [];
  let currentList: { tag: 'ul' | 'ol'; items: string[] } | null = null;

  function flushList() {
    if (!currentList) return;
    const listChildren: LexicalNode[] = currentList.items.map((itemText, index) => ({
      type: 'listitem',
      value: index + 1,
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'text',
          format: 0,
          text: itemText,
          version: 1,
        },
      ],
    }));

    children.push({
      type: 'list',
      tag: currentList.tag,
      listType: currentList.tag === 'ol' ? 'number' : 'bullet',
      start: 1,
      format: '',
      indent: 0,
      version: 1,
      children: listChildren,
    });
    currentList = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Heading 3: ### ...
    if (trimmed.startsWith('### ')) {
      flushList();
      children.push({
        type: 'heading',
        tag: 'h3',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            format: 0,
            text: trimmed.replace(/^###\s+/, ''),
            version: 1,
          },
        ],
      });
      continue;
    }

    // Heading 2: ## ...
    if (trimmed.startsWith('## ')) {
      flushList();
      children.push({
        type: 'heading',
        tag: 'h2',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            format: 0,
            text: trimmed.replace(/^##\s+/, ''),
            version: 1,
          },
        ],
      });
      continue;
    }

    // Blockquote: > ...
    if (trimmed.startsWith('> ')) {
      flushList();
      children.push({
        type: 'quote',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            format: 0,
            text: trimmed.replace(/^>\s+/, ''),
            version: 1,
          },
        ],
      });
      continue;
    }

    // Unordered list item: - or *
    if (/^[-*]\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^[-*]\s+/, '');
      if (!currentList || currentList.tag !== 'ul') {
        flushList();
        currentList = { tag: 'ul', items: [] };
      }
      currentList.items.push(itemText);
      continue;
    }

    // Ordered list item: 1. ...
    if (/^\d+\.\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^\d+\.\s+/, '');
      if (!currentList || currentList.tag !== 'ol') {
        flushList();
        currentList = { tag: 'ol', items: [] };
      }
      currentList.items.push(itemText);
      continue;
    }

    // Regular paragraph
    flushList();
    children.push({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'text',
          format: 0,
          text: trimmed,
          version: 1,
        },
      ],
    });
  }

  flushList();

  if (children.length === 0) {
    children.push({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      children: [],
    });
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children,
    },
  };
}
