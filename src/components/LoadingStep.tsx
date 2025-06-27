import { motion } from "framer-motion"
import { Box, CircularProgress, Typography } from "@mui/material"

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
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <CircularProgress
        size="large"
        color="primary"
        variant="indeterminate"
        sx={{
          height: 50,
          width: 50,
        }}
      />
      <Typography style={{ marginTop: 16 }}>
        Исследуем кулинарную книгу
      </Typography>
    </Box>
  </motion.div>
)

export default LoadingStep