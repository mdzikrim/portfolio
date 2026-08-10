import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renders the Markdown body of a project case study. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-site max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: linkChildren, ...rest }) => {
            const external = typeof href === "string" && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                {...rest}
              >
                {linkChildren}
              </a>
            );
          },
          table: ({ children: tableChildren, ...rest }) => (
            <div className="overflow-x-auto">
              <table {...rest}>{tableChildren}</table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
