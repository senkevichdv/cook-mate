import { Accordion, List, Subheadline, Text } from "@telegram-apps/telegram-ui"
import { useState } from "react"
import LikeButton from "./LikeButton"
import { Recipe } from "@/models"

interface RecipeComponentProps {
  recipe: Recipe
  idx: number
}

const RecipeComponent = ({ recipe, idx }: RecipeComponentProps) => {
  const [expanded, setExpanded] = useState<number | null>(null)
  return (
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
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", right: 36, top: 12 }}>
            <LikeButton recipe={recipe} />
          </div>
          <List>
            <Text weight="3">Ингредиенты:</Text>
            <ul style={{ margin: 0, paddingLeft: 18, marginBottom: 16 }}>
              {recipe.ingredients.map((ing: string, i: number) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
            <Text weight="3">Шаги:</Text>
            <ol style={{ margin: 0, paddingLeft: 18, marginBottom: 16 }}>
              {recipe.steps.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            {recipe.tips?.length && <Text weight="3">Советы:</Text>}
            <ul style={{ margin: 0, paddingLeft: 18, marginBottom: 16 }}>
              {recipe.tips?.map((tip: string, i: number) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </List>
        </Subheadline>
      </Accordion.Content>
    </Accordion>
  )
}

export default RecipeComponent