"use client";

import React, { useState, useCallback } from "react";
import {
  createEditor,
  Descendant,
  Element as SlateElement,
  Transforms,
  Editor,
  Range,
  BaseEditor,
} from "slate";
import { Slate, Editable, withReact, useSlate, ReactEditor } from "slate-react";
import isHotkey from "is-hotkey";
import { Button } from "@/components/ui/button";
import { Toolbar } from "@/components/ui/toolbar";
import {
  Bold,
  Italic,
  Underline,
  Code,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Video,
  Table,
  Quote,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import Image from "next/image";

// Custom types
type CustomText = { text: string; [key: string]: any };
console.log(123);

type ElementType =
  | "paragraph"
  | "heading-one"
  | "heading-two"
  | "heading-three"
  | "block-quote"
  | "numbered-list"
  | "bulleted-list"
  | "list-item"
  | "link"
  | "image"
  | "video"
  | "table"
  | "table-row"
  | "table-cell";

type CustomElement = {
  type: ElementType;
  children: (CustomElement | CustomText)[];
  align?: "left" | "center" | "right" | "justify";
  url?: string;
  alt?: string;
  [key: string]: any;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

export const RichTextEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "Start typing" }],
    },
  ];

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar className="mx-20">
        <MarkButton format="bold" icon={<Bold />} />
        <MarkButton format="italic" icon={<Italic />} />
        <MarkButton format="underline" icon={<Underline />} />
        <MarkButton format="code" icon={<Code />} />
        <BlockButton format="heading-one" icon={<Heading1 />} />
        <BlockButton format="heading-two" icon={<Heading2 />} />
        <BlockButton format="heading-three" icon={<Heading3 />} />
        <BlockButton format="block-quote" icon={<Quote />} />
        <BlockButton format="numbered-list" icon={<ListOrdered />} />
        <BlockButton format="bulleted-list" icon={<List />} />
        <BlockButton format="left" icon={<AlignLeft />} />
        <BlockButton format="center" icon={<AlignCenter />} />
        <BlockButton format="right" icon={<AlignRight />} />
        <BlockButton format="justify" icon={<AlignJustify />} />
        <LinkButton />
        <InsertImageButton />
        <InsertVideoButton />
        <InsertTableButton />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="enter some rich text here"
        spellCheck
        autoFocus
        className="bg-gray-200 py-10 mx-20"
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type as string) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });

  let newProperties: Partial<CustomElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive
        ? undefined
        : (format as "left" | "center" | "right" | "justify"),
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : (format as ElementType),
    };
  }
  Transforms.setNodes<CustomElement>(editor, newProperties);

  if (!isActive && isList) {
    const block: CustomElement = { type: format as ElementType, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case "link":
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      );
    case "image":
      return <Image src={element.url} alt={element.alt} {...attributes} />;
    case "video":
      return (
        <video controls {...attributes}>
          <source src={element.url} type="video/mp4" />
          {children}
        </video>
      );
    case "table":
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return <td {...attributes}>{children}</td>;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Button
      variant={isBlockActive(editor, format) ? "secondary" : "ghost"}
      size="icon"
      onClick={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Button
      variant={isMarkActive(editor, format) ? "secondary" : "ghost"}
      size="icon"
      onClick={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const LinkButton = () => {
  const editor = useSlate();

  const insertLink = () => {
    const url = prompt("Enter the URL of the link:");
    if (!url) return;
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link: CustomElement = {
      type: "link",
      url,
      children: isCollapsed ? [{ text: url }] : [],
    };
    if (isCollapsed) {
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  };

  return (
    <Button
      onMouseDown={(event: any) => {
        event.preventDefault();
        insertLink();
      }}
    >
      <Link />
    </Button>
  );
};

const InsertImageButton = () => {
  const editor = useSlate();

  const insertImage = () => {
    const url = prompt("Enter the URL of the image:");
    if (!url) return;
    const alt = prompt("Enter the alt text for the image:") || "";
    const image: CustomElement = {
      type: "image",
      url,
      alt,
      children: [{ text: "" }],
    };
    Transforms.insertNodes(editor, image);
  };

  return (
    <Button
      onMouseDown={(event: any) => {
        event.preventDefault();
        insertImage();
      }}
    >
      <Image src={""} alt={""} />
    </Button>
  );
};

const InsertVideoButton = () => {
  const editor = useSlate();

  const insertVideo = () => {
    const url = prompt("Enter the URL of the video:");
    if (!url) return;
    const video: CustomElement = {
      type: "video",
      url,
      children: [{ text: "" }],
    };
    Transforms.insertNodes(editor, video);
  };

  return (
    <Button
      onMouseDown={(event: any) => {
        event.preventDefault();
        insertVideo();
      }}
    >
      <Video />
    </Button>
  );
};

const InsertTableButton = () => {
  const editor = useSlate();

  const insertTable = () => {
    const rows = parseInt(prompt("Enter the number of rows:") || "3", 10);
    const cols = parseInt(prompt("Enter the number of columns:") || "3", 10);

    const table: CustomElement = {
      type: "table",
      children: Array(rows)
        .fill(0)
        .map(() => ({
          type: "table-row",
          children: Array(cols)
            .fill(0)
            .map(() => ({
              type: "table-cell",
              children: [{ text: "" }],
            })),
        })),
    };

    Transforms.insertNodes(editor, table);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        insertTable();
      }}
    >
      <Table />
    </Button>
  );
};

export default RichTextEditor;
