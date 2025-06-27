import { Spinner, Text } from "@telegram-apps/telegram-ui"
import { motion } from "framer-motion"

const LoadingStep = () => (
  <motion.div
    key="loading"
    initial={{ y: 40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -40, opacity: 0 }}
    transition={{ duration: 0.3 }}
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 300,
    }}
  >
    <Spinner size="l" />
    <Text weight="3" style={{ marginTop: 16 }}>Исследуем кулинарную книгу</Text>
  </motion.div>
)

export default LoadingStep