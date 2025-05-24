// components/MarkdownRenderer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface Props {
    content: string;
}

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
    return (
        <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
