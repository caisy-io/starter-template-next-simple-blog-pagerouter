import React from "react";
import { IGenHeadline } from "../services/graphql/__generated/sdk";
import { CenterContainer } from "./CenterContainer";
import { getCaisyInspectProps } from "@caisy/live-preview-react";

export const Headline: React.FC<IGenHeadline> = ({
  headline,
  subheadline,
  id,
}) => {
  return (
    <CenterContainer>
      <div className="mb-8 flex flex-col justify-start items-center gap-2.5">
        {headline && (
          <h1
            {...getCaisyInspectProps({ id: id!, fieldName: "headline" })}
            className="text-4xl font-bold text-left text-slate-900"
          >
            {headline}
          </h1>
        )}
        {subheadline && (
          <h4
            {...getCaisyInspectProps({ id: id!, fieldName: "subheadline" })}
            className="mt-2 text-xl text-center text-gray-400"
          >
            {subheadline}
          </h4>
        )}
      </div>
    </CenterContainer>
  );
};
