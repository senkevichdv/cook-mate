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
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <List sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Typography sx={{ ml: 2 }} variant="h6">
            Найденные рецепты
          </Typography>
          {recipes.map((recipe, idx) => (
            <ListItem key={idx} sx={{ width: "100%" }}>
              <RecipeComponent key={idx} recipe={recipe} idx={idx} />
            </ListItem>
          ))}
        </List>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onBack}
        >
          Назад к поиску
        </Button>
      </Box>
    </motion.div>
  )
}

export default ResultsStep
