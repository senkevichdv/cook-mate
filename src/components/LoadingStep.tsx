import { motion } from "framer-motion"
import { Box, Typography } from "@mui/material"

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
      minHeight: 400,
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 80,
          height: 80,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #171717 0%, #262626 100%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2.5rem',
          }}
        >
          👨‍🍳
        </Box>
      </Box>
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            mb: 1,
          }}
        >
          Ищем рецепты...
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
          }}
        >
          Это займёт всего пару секунд
        </Typography>
      </Box>
    </Box>
  </motion.div>
)

export default LoadingStep