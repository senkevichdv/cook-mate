import { Recipe } from "@/models"
import { motion } from "framer-motion"
import RecipeComponent from "./Recipe"
import { Box, Button, List, ListItem, Typography } from "@mui/material"

interface ResultsStepProps {
  recipes: Recipe[]
  onBack: () => void
}

const ResultsStep = ({ recipes, onBack }: ResultsStepProps) => {
  return (
    <motion.div
      key="results"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            textAlign: 'center',
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Найденные рецепты 🍳
        </Typography>
        <List sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
          {recipes.map((recipe, idx) => (
            <ListItem key={idx} sx={{ width: "100%", p: 0 }}>
              <RecipeComponent key={idx} recipe={recipe} idx={idx} />
            </ListItem>
          ))}
        </List>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onBack}
          sx={{ minWidth: 250, mt: 2 }}
        >
          ← Назад к поиску
        </Button>
      </Box>
    </motion.div>
  )
}

export default ResultsStep
