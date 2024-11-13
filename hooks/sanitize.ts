const createDOMPurify = () => {
  if (typeof window === "undefined") {
    return {
      sanitize: (content: string) => content,
    };
  }
  const DOMPurify = require("dompurify");
  return DOMPurify(window);
};

export const sanitizeContent = (content: string) => {
  try {
    return createDOMPurify().sanitize(content);
  } catch (error) {
    console.error("DOMPurify sanitization failed:", error);
    return content;
  }
};
