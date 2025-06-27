import { Accordion, Button, List, Section, Subheadline, Text } from "@telegram-apps/telegram-ui"

import { Recipe } from "@/models"
import { motion } from "framer-motion"
import { useState } from "react"

interface ResultsStepProps {
  recipes: Recipe[]
  onBack: () => void
}

const ResultsStep = ({ recipes, onBack }: ResultsStepProps) => {
  const [expanded, setExpanded] = useState<number | null>(null)
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
            <Accordion
              onChange={() => setExpanded(expanded === idx ? null : idx)}
              key={idx}
              expanded={expanded === idx}
            >
              <Accordion.Summary>
                <Text weight="3">
                  {recipe.title} ({recipe.cookingTime})
                </Text>
              </Accordion.Summary>
              <Accordion.Content>
                <Subheadline
                  level="2"
                  style={{
                    padding: "12px 24px 24px",
                  }}
                >
                  <List>
                    <Text weight="3">Ингредиенты:</Text>
                    <ul
                      style={{ margin: 0, paddingLeft: 18, marginBottom: 16 }}
                    >
                      {recipe.ingredients.map((ing: string, i: number) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                    <Text weight="3">Шаги:</Text>
                    <ol
                      style={{ margin: 0, paddingLeft: 18, marginBottom: 16 }}
                    >
                      {recipe.steps.map((step: string, i: number) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                    {recipe.tips?.length && <Text weight="3">Советы:</Text>}
                    <ul
                      style={{ margin: 0, paddingLeft: 18, marginBottom: 16 }}
                    >
                      {recipe.tips?.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </List>
                </Subheadline>
              </Accordion.Content>
            </Accordion>
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
