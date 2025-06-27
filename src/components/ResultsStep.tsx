import { Button, List, Section } from "@telegram-apps/telegram-ui"

import { Recipe } from "@/models"
import { motion } from "framer-motion"
import RecipeComponent from "./Recipe"

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
      <List>
        <Section header={<Section.Header large>Найденные рецепты</Section.Header>}>
          {recipes.map((recipe, idx) => (
            <RecipeComponent key={idx} recipe={recipe} idx={idx} />
          ))}
        </Section>
      </List>
      <div style={{ padding: 16, textAlign: "center" }}>
        <Button size="l" mode="gray" onClick={onBack}>
          Назад к поиску
        </Button>
      </div>
    </motion.div>
  )
}

export default ResultsStep
