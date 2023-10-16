import { Variant } from "framer-motion";

type general = {
    initial: Variant;
    animate: Variant
}

export const spanVariant: general = {
    initial: {
        y: 0
    },
    animate: {
        y: -31,
    },
}