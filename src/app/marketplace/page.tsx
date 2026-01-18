import { Suspense } from "react";
import { MarketplaceContainer, MarketplaceLoading } from "@/components/marketplace/MarketplaceContainer";

export default function Marketplace() {
    return (
        <Suspense fallback={<MarketplaceLoading />}>
            <MarketplaceContainer />
        </Suspense>
    );
}
