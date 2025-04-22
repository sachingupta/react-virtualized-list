import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 500px;
  overflow-y: auto; /* Only vertical scrolling */
  position: relative; /* Needed for absolute positioning of the virtual content */
`;

const ListWrapper = styled.ul<{ totalHeight: number }>`
  margin: 0;
  padding: 0;
  position: absolute; /* Take it out of the normal flow */
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.totalHeight}px; /* Full height of the virtualized list */
`;

const VirtualContent = styled.div<{ translateY: number }>`
  position: absolute;
  top: ${(props) => props.translateY}px;
  left: 0;
  width: 100%;
`;

export interface ListProps {
  items: string[];
}

export const List: FC<ListProps> = ({ items, children }) => {
  const itemHeight = 30;
  const visibleItemCount = 50; // Adjust for performance/visuals
  const safelyRenderLimit = 5000;

  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const listTotalHeight = items.length * itemHeight;

  const scrollPosition = useScrollPosition(scrollWrapperRef, 50);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  useEffect(() => {
    const startIndex = Math.max(0, Math.floor(scrollPosition / itemHeight));
    setVisibleStartIndex(startIndex);
  }, [scrollPosition, itemHeight]);

  const endIndex = Math.min(items.length, visibleStartIndex + visibleItemCount);
  const visibleItems = items.slice(visibleStartIndex, endIndex);
  const traslateY = visibleStartIndex * itemHeight;

  return (
    <ScrollWrapper ref={scrollWrapperRef}>
      <ListWrapper totalHeight={listTotalHeight}>
        <VirtualContent translateY={traslateY}>
        {/**
          * Note: `SafelyRenderChildren` should NOT be removed while solving
          * this interview. This prevents rendering too many list items and
          * potentially crashing the web page. This also enforces an artificial
          * limit (5,000) to the amount of children that can be rendered at one
          * time during virtualization.
        */}
        <SafelyRenderChildren limit={safelyRenderLimit}>
          {visibleItems.map((word) => <Item key={word}>{word}</Item>)}
        </SafelyRenderChildren>
        </VirtualContent>
      </ListWrapper>
    </ScrollWrapper>
  );
};
