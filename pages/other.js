import React from "react";
import Link from "next/link";

const other = () => {
  return (
    <div>
      hello
      <div>
        <Link href="/">
          <a> to index</a>
        </Link>
      </div>
    </div>
  );
};

export default other;
