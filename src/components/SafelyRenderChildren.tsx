import React, { Children, FC } from "react";

export const SafelyRenderChildren: FC = ({ limit, children }) => {
  const count = Children.count(children);
  if (count > limit) {
    return <span>You're attempting to render too many children</span>;
  }

  return <>{children}</>;
};
