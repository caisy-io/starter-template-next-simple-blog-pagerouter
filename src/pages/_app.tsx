import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Footer } from "../layouts/Footer";
import { Navigation } from "../layouts/Navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "@caisy/live-preview-react/index.css";
import {
  CaisyConnectionIndicator,
  caisyLivePreview,
  useCaisyUpdates,
} from "@caisy/live-preview-react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const livePreviewEnabled =
    `${process.env.NEXT_PUBLIC_USE_DRAFT_MODE}` === "true";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = router.query.caisy_preview_access_token as string;
    const projectId = router.query.project_id as string;

    if (!token || !projectId) {
      return;
    }

    const close = caisyLivePreview({
      projectId,
      token,
      locale: router.locale,
      enabled: livePreviewEnabled,
    });

    return () => {
      close && close();
    };
  }, [router.locale, router.query, livePreviewEnabled]);

  const livePageProps = useCaisyUpdates(pageProps);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      {livePreviewEnabled && <CaisyConnectionIndicator />}
      {livePageProps.Navigation && <Navigation {...livePageProps.Navigation} />}
      <Component {...livePageProps} />
      {livePageProps.Footer && <Footer {...livePageProps.Footer} />}
    </>
  );
}
