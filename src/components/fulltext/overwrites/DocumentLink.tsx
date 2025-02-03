import React, { PropsWithChildren } from "react";
import {
  IGenAsset,
  IGenBlogArticleGrid,
} from "../../../services/graphql/__generated/sdk";
import { Asset } from "../../Asset";
import { BlogArticleGrid } from "../../blog-article-grid/BlogArticleGrid";

interface IDocumentLink {
  children?: React.ReactNode;
  connections: any;
  node: any;
}

export const DocumentLink: React.FC<IDocumentLink> = ({
  connections,
  node,
  children,
}) => {
  return (
    <>
      {connections?.map((component: IGenAsset | IGenBlogArticleGrid) => {
        if (
          component?.__typename == "Asset" &&
          node?.attrs?.documentId == component.id
        ) {
          return <Asset key={component.id} {...component} />;
        }

        // example of how to support more components
        // if (
        //   component?.__typename == "BlogArticleGrid" &&
        //   node?.attrs?.documentId == component.id
        // ) {
        //   return <BlogArticleGrid key={component.id} {...component} />;
        // }

        return null;
      })}
      {children}
    </>
  );
};
