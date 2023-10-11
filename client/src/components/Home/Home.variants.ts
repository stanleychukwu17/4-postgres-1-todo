import { Variant } from "framer-motion";

export type general = {
    initial: Variant;
    animate: Variant;
}

export const mainCvr_1variant: general = {
    initial: {
        // opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: .5,
        }
    },
}

export const logoVariant: general = {
    initial: {
        opacity: 0,
        y: 50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.6,
            delay: .3
        }
    },
}

export const phoneImgVariant: general = {
    initial: {
        opacity: 0,
        x: -150,
    },
    animate: {
        opacity: 1,
        x: 0,
        y: [10, -60, -60, 10],
        transition: {
            y: {
                times: [0, .48, .52, 1],
                repeat: Infinity,
                ease: ['easeOut', 'linear', 'linear', 'easeIn'],
                duration: 10,
                delay: 2,
            },
            duration: 1.6,
            delay: .35
        }
    },
}

export const signUpVariant: general = {
    initial: {
        opacity: 0,
        x: 150,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1.6,
            delay: .4
        }
    },
}

export const dbsVariant: general = {
    initial: {
        opacity: 0,
        y: -100,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.6,
            delay: .4
        }
    },
}