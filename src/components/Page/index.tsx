import React from "react";

export default function Page({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ margin: "auto", marginTop: 24, maxWidth: "700px", padding: "0 15px" }}>
      {children}
    </div>
  );
}
