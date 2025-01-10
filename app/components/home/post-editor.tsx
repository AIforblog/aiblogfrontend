"use client";
import { Button } from "@/components/ui/button";
import isHotkey from "is-hotkey";
import {
  Ellipsis,
  ImageIcon,
  List,
  MapPin,
  Smile,
  Sparkles,
  Tag,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import { Descendant, Editor, createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import Image from "next/image";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const PostEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  return (
    <div className="py-5 px-3.5 rounded-[10px] bg-neutral-50">
      <Slate editor={editor} initialValue={initialValue}>
        <div className="flex gap-2.5 items-center mb-2.5">
          <input
            type="text"
            placeholder="Title"
            className="leading-[1.3] w-full text-xl font-bold placeholder:text-[#A3A3A3] bg-transparent focus-visible:outline-none"
          />
          <button className="text-[#B47AEA] hover:text-[#9542e4] leading-[1.4] text-sm">
            Drafts
          </button>
          <button
            aria-label="Options"
            title="Options"
            className="rounded-full p-1 -mr-1 aspect-square grid place-items-center hover:bg-neutral-100"
          >
            <Ellipsis className="w-3 h-3" />
          </button>
        </div>

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write your content"
          className="h-[110px] focus-visible:outline-none placeholder:text-[#A3A3A3] leading-[1.4] text-sm mb-5"
          spellCheck
          autoFocus
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
        <div className="flex justify-between text-sm leading-[1.4]">
          <Button className="rounded-[24px] py-2.5 px-3.5 flex gap-2 items-center">
            <Sparkles className="fill-white w-[18px] h-[18px]" />
            <span>Write with AI</span>
          </Button>
          <div className="flex items-center gap-[18px] py-2">
            <button
              className="hover:bg-neutral-100 rounded p-1 -mx-1"
              title="Bullet List"
              aria-label="Bullet List"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              className="hover:bg-neutral-100 rounded p-1 -mx-1"
              title="Add Image"
              aria-label="Add Image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              className="hover:bg-neutral-100 rounded p-1 -mx-1"
              title="Add Emoji"
              aria-label="Add Emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              className="hover:bg-neutral-100 rounded p-1 -mx-1"
              title="Tag"
              aria-label="Tag"
            >
              <Tag className="w-5 h-5" />
            </button>
            <button
              className="hover:bg-neutral-100 rounded p-1 -mx-1"
              title="Location"
              aria-label="Location"
            >
              <MapPin className="w-5 h-5" />
            </button>
            <button
              className="hover:bg-neutral-100 rounded p-1 -mx-1"
              title="Add GIF"
              aria-label="Add GIF"
            >
              <span className="leading-none w-5 h-5 grid place-items-center">
                GIF
              </span>
            </button>
          </div>
          <button
            disabled
            className="bg-[#FDC316] leading-none py-3 px-3.5 max-w-[104px] w-full rounded-[10px] disabled:opacity-30"
          >
            Publish
          </button>
        </div>
      </Slate>
    </div>
  );
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

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export default PostEditor;
