import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ClientOnly component - ensures children only render on client-side
 * Prevents hydration mismatches by not rendering on server
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClientOnly.tsx:17',message:'ClientOnly render',data:{hasMounted,isClient:typeof window!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClientOnly.tsx:23',message:'ClientOnly useEffect - setting hasMounted',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClientOnly.tsx:29',message:'ClientOnly returning fallback',data:{hasMounted},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    return <>{fallback}</>;
  }

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClientOnly.tsx:35',message:'ClientOnly returning children',data:{hasMounted},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  return <>{children}</>;
}

