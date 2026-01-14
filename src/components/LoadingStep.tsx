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
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
        }}
      >
        <CircularProgress
          size={80}
          thickness={4}
          color="primary"
          variant="indeterminate"
          sx={{
            animationDuration: '1.5s',
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4">👨‍🍳</Typography>
        </Box>
      </Box>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600, 
          textAlign: 'center',
          mt: 2 
        }}
      >
        Исследуем кулинарную книгу...
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'text.secondary',
          textAlign: 'center' 
        }}
      >
        Подбираем лучшие рецепты для вас
      </Typography>
    </Box>
  </motion.div>
)

export default LoadingStep