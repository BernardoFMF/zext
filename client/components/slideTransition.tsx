import { motion } from "framer-motion"

function Section({ children, delay = 0 }: { children: any, delay: number}) {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay }}
        >
            {children}
        </motion.div>
    )
}

export default Section