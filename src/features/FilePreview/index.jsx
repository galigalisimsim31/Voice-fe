import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

function useContentType(url) {
    const [mime, setMime] = useState(null);
    const [loading, setLoading] = useState(!!url);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancelled = false;
        if (!url) return;
        setLoading(true);
        // Try HEAD to fetch Content-Type (works if your API allows it + CORS)
        fetch(url, { method: "HEAD", credentials: "include" })
            .then((res) => {
                const ct = res.headers.get("content-type");
                if (!cancelled) setMime(ct);
            })
            .catch((e) => !cancelled && setErr(e))
            .finally(() => !cancelled && setLoading(false));
        return () => { cancelled = true; };
    }, [url]);

    return { mime, loading, err };
}

const isImageExt = (url = "") =>
    /\.(png|jpe?g|gif|webp|bmp|svg)(\?|#|$)/i.test(url);

const isPdfExt = (url = "") => /\.(pdf)(\?|#|$)/i.test(url);

export default function FilePreview({ attachmentId, className, height = 420 }) {
    const url = useMemo(() => {
        if (!attachmentId) return "";
        return `${import.meta.env.VITE_API_BASE_URL}/show-file/${attachmentId}`;
    }, [attachmentId]);

    const { mime, loading } = useContentType(url);

    const looksLikeImage =
        (mime && mime.startsWith("image/")) || (!mime && isImageExt(url));
    const looksLikePdf =
        (mime === "application/pdf") || (!mime && isPdfExt(url));

    return (
        <Box>
            {!url ? (
                <Typography variant="body2" color="text.secondary">
                    No attachment
                </Typography>
            ) : loading && !mime ? (
                <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={18} />
                    <Typography variant="body2">Loading preview…</Typography>
                </Box>
            ) : looksLikeImage ? (
                <img
                    src={url}
                    alt="Attachment"
                    className={className}
                    style={{ maxWidth: "100%", borderRadius: 8, display: "block" }}
                />
            ) : looksLikePdf ? (
                <iframe
                    src={url}
                    title="PDF Preview"
                    style={{
                        width: "100%",
                        height,
                        border: "none",
                        borderRadius: 8,
                        background: "#fff",
                    }}
                />
            ) : (
                <Typography variant="body2">
                    Preview not supported.{" "}
                    <a href={url} target="_blank" rel="noreferrer">
                        Open / Download file
                    </a>
                </Typography>
            )}
        </Box>
    );
}
